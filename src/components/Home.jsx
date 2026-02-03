import { useState } from 'react';
import QuizForm from './QuizzForm.jsx';
import ShowResult from './ShowResult.jsx';
import ShowError from './ShowError.jsx';
import Question from './Question.jsx';
import Timer from './Timer.jsx'


function Home({ }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(15);

  // Fonction car l'api retourne des chaine de charactères encodées
  const decodeHTML = (text) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  const onStartQuiz = (settings) => {
    setLoading(true);
    setQuizStarted(true);

    const url = `https://opentdb.com/api.php?amount=${settings.amount}${settings.difficulty ? `&difficulty=${settings.difficulty}` : ''}${settings.category ? `&category=${settings.category}` : ''}&type=multiple`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const preparedQuestions = data.results.map((q) => ({
            question: decodeHTML(q.question),
            correct_answer: decodeHTML(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(ans => decodeHTML(ans)),
            allAnswers: [decodeHTML(q.correct_answer), ...q.incorrect_answers.map(ans => decodeHTML(ans))].sort(() => Math.random() - 0.5)
          }));

          setQuestions(preparedQuestions);
        } else {
          setShowError(true);
          setErrorMessage('Un problème est survenu lors de la récupération des questions. Veuillez réessayer.');
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrorMessage(error.message);
        console.error('Erreur lors du chargement des questions:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    setTimer(15);
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };


  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setShowError(false);
    setErrorMessage('');
    setQuizStarted(false);
  };

  return (
    <div className="home">
      <h1>Quiz App</h1>
      {!quizStarted ? (
        <>
          <p>Testez vos connaissances !</p>
          <QuizForm onStartQuiz={onStartQuiz} />
        </>
      ) : loading ? (
        <div>
          <h2>Chargement des questions...</h2>
        </div>
      ) : showResult ? (
        <ShowResult
          score={score}
          questions={questions}
          restartQuiz={restartQuiz}
        />
      ) : showError ? (
        <ShowError
          restartQuiz={restartQuiz}
          errorMessage={errorMessage}
        />
      ) : questions.length > 0 ? (
        <Question
          questionText={questions[currentQuestion].question}
          currentQuestionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          allAnswers={questions[currentQuestion].allAnswers}
          timer={timer}
          onAnswerClick={handleAnswerClick}
        />
      ) : null}
    </div>
  )
}

export default Home