function ShowError({ restartQuiz }) {
    return (
        <div className="show-error">
            <h2>Une erreur est survenue.</h2>
            <p>Veuillez réessayer plus tard.</p>
            <button onClick={restartQuiz}>Recommencer</button>
        </div>
    );
}

export default ShowError;
