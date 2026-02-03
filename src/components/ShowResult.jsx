function ShowResult({ score, questions, restartQuiz }) {
    
    const winRate = (score / questions.length) * 100;

    return (
        <>
            <div className="result">
                <h2>Quiz terminé !</h2>
                <p>Votre score : {score} / {questions.length}</p>
                <p>Taux de réussite : {winRate.toFixed(2)}%</p>
                {winRate === 100 ? (
                    <p>Félicitations ! Vous avez un score parfait !</p>
                ) : winRate >= 70 ? (
                    <p>'Excellent travail !</p>
                ) : winRate >= 40 ? (
                    <p>Pas mal, mais vous pouvez faire mieux !</p>
                ) : (
                    <p>T'es trop nul !</p>
                )}
                
                <button onClick={restartQuiz}>Recommencer</button>
            </div>
        </>
    )
}

export default ShowResult;