function ShowError({ restartQuiz, errorMessage }) {
    return (
        <div className="show-error">
            <h2>Une erreur est survenue.</h2>
            <p>{errorMessage}</p>
            <button onClick={restartQuiz}>Recommencer</button>
        </div>
    );
}

export default ShowError;
