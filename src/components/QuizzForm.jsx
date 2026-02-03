import { useState, useEffect } from 'react'

function QuizForm({ onStartQuiz }) {
    const [amount, setAmount] = useState('5');
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = () => {
            fetch('https://opentdb.com/api_category.php')
                .then(response => response.json())
                .then(data => {
                    setCategories(data.trivia_categories.map(cat => ({
                        id: cat.id.toString(),
                        theme: cat.name
                    })));
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des catégories:', error);
                })
                .finally(() => {
                    setLoadingCategories(false);
                });
        }

        loadCategories();
    }, []);

    const startQuizz = (event) => {
        event.preventDefault();
        onStartQuiz({
            amount: parseInt(amount),
            difficulty,
            category
        });
    };

    return (
        <form onSubmit={startQuizz} className="quiz-form">
            <div className="form-group">
                <label htmlFor="amount">Nombre de questions</label>
                <select
                    id="amount"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                >
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="difficulty">Difficulté</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(event) => setDifficulty(event.target.value)}
                >
                    <option value="">Toutes difficultés</option>
                    <option value="easy">Facile</option>
                    <option value="medium">Moyen</option>
                    <option value="hard">Difficile</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="category">Catégorie</label>
                <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">
                        {loadingCategories ? 'Chargement...' : 'Toutes les catégories'}
                    </option>

                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.theme}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="start-btn">
                Commencer le Quiz
            </button>
        </form>
    );
}

export default QuizForm