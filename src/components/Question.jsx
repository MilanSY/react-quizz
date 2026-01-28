function Question({ questionText, currentQuestionNumber, totalQuestions }) {
  return (
    <div className="question-container">
      <div className="question-number">
        Question {currentQuestionNumber}/{totalQuestions}
      </div>
      <h2 className="question-text">
        {questionText}
      </h2>
    </div>
  )
}

export default Question