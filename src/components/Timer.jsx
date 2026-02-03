import { useState, useEffect } from 'react';


function Timer({ duration, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        setTimeLeft(duration);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [duration, onTimeUp]);

    return (
        <div className={`timer ${timeLeft <= 5 ? 'timer-warning' : ''}`}>
            <span className="timer-value">Temps restant pour répondre : {timeLeft}s</span>
        </div>
    )
}

export default Timer