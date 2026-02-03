function ShowResult({ score, questions, restartQuiz }) {
    return (
        <>
            <div className="result">
                <h2>Quiz terminé !</h2>
                <p>Votre score : {score} / {questions.length}</p>
                <button onClick={restartQuiz}>Recommencer</button>
            </div>
        </>
    )
}

export default ShowResult;