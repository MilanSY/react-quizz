import QuizForm from './QuizzForm.jsx'

function Home({ onStartQuiz }) {
  return (
    <div className="home">
      <h1>Quiz App</h1>
      <p>Testez vos connaissances !</p>
      <QuizForm onStartQuiz={onStartQuiz} />
    </div>
  )
}

export default Home