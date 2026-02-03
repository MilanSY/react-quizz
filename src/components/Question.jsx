import Timer from './Timer.jsx'

function Question({ questionText, currentQuestionNumber, totalQuestions, allAnswers, onAnswerClick, timer }) {
  return (
    <div className="question-container">
      <div className="question-number">
        Question {currentQuestionNumber}/{totalQuestions}
      </div>
      <div>
        <Timer duration={timer} onTimeUp={() => onAnswerClick(null)} /> 
      </div>
      <h2 className="question-text">
        {questionText}
      </h2>
      <div className="answers-container">
        {allAnswers.map((answer, index) => (
          <button key={index} onClick={() => onAnswerClick(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question