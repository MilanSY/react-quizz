import { useState } from 'react';
import QuizForm from './QuizzForm.jsx'
import Question from './Question.jsx'

function Home({}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const onStartQuiz = (settings) => {
    setLoading(true);
    setQuizStarted(true);
    
    const url = `https://opentdb.com/api.php?amount=${settings.amount}${settings.difficulty ? `&difficulty=${settings.difficulty}` : ''}${settings.category ? `&category=${settings.category}` : ''}&type=multiple`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const preparedQuestions = data.results.map((q) => ({
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            category: q.category,
            difficulty: q.difficulty,
            allAnswers: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5)
          }));

          setQuestions(preparedQuestions);
        }
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des questions :', error);
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
  setQuizStarted(false);
};

  return (
  <div className="home">
    {!quizStarted ? (
      <>
        <h1>Quiz App</h1>
        <p>Testez vos connaissances !</p>
        <QuizForm onStartQuiz={onStartQuiz} />
      </>
    ) : loading ? (
      <div>
        <h2>Chargement des questions...</h2>
      </div>
    ) : showResult ? (
      <div className="result">
        <h2>Quiz terminé !</h2>
        <p>Votre score : {score} / {questions.length}</p>
        <button onClick={restartQuiz}>Recommencer</button>
      </div>
    ) : (
      <Question 
        questionText={questions[currentQuestion].question}
        currentQuestionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
        allAnswers={questions[currentQuestion].allAnswers}
        onAnswerClick={handleAnswerClick}
      />
    )}
  </div>
)
}

export default Home