import React, { useState, useEffect } from 'react';

function SummationChallenge() {
    const [score, setScore] = useState(0);
    const [problem, setProblem] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    useEffect(() => {
        generateNewProblem();
    }, []);

    const generateMathProblem = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correct = num1 + num2;

        let wrong1, wrong2;

        do {
            wrong1 = correct + Math.floor(Math.random() * 5) + 1;
        } while (wrong1 === correct);

        do {
            wrong2 = correct - Math.floor(Math.random() * 5) + 1;
        } while (wrong2 === correct || wrong2 === wrong1);

        const answers = [correct, wrong1, wrong2];
        shuffleArray(answers);

        setCorrectAnswer(correct);

        return {
            problem: `${num1} + ${num2} = ?`,
            answers: answers
        };
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const generateNewProblem = () => {
        const newProblem = generateMathProblem();
        setProblem(newProblem);
    };

    const checkAnswer = (selected) => {
        setSelectedAnswer(selected);

        if (selected === correctAnswer) {
            setScore(score + 1);
        } else {
            setScore(score - 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            generateNewProblem();
        }, 1000);
    };

    return (
        <div className="container mt-5">
            <div className={`alert alert-dismissible fade ${selectedAnswer ? 'show' : ''}`} role="alert" style={{ display: selectedAnswer ? 'block' : 'none' }}>
                <strong>{selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Score: {score}</h2>
                </div>
                <div className="card-body">
                    <h1 className="card-text">{problem ? problem.problem : 'Loading...'}</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        {(problem?.answers || []).map((answer, index) => (
                            <div key={index} className="col-4 mb-2">
                                <button
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={() => checkAnswer(answer)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {answer}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SummationChallenge;
