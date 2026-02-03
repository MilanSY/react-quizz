function Question({ questionText, currentQuestionNumber, totalQuestions, allAnswers, onAnswerClick }) {
  return (
    <div className="question-container">
      <div className="question-number">
        Question {currentQuestionNumber}/{totalQuestions}
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