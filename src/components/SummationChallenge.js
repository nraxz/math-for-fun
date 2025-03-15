import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function SummationChallenge() {
    const [score, setScore] = useState(0);
    const [counter, setCounter] = useState(0);
    const [problem, setProblem] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    useEffect(() => {
        document.title = 'Summation Challenge';
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
        setCounter(counter + 1);
        
        if (selected === correctAnswer) {
            setScore(score + 1);
            // Show success toast
            Swal.fire({
                icon: 'success',
                title: 'Correct!',
                text: 'Great job! Keep going!',
                timer: 1000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                background: '#d4edda',
                customClass: {
                    title: 'text-success'
                }
            });
        } else {
            // Show error toast
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: `The correct answer was ${correctAnswer}`,
                timer: 1000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                background: '#f8d7da',
                customClass: {
                    title: 'text-danger'
                }
            });
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            generateNewProblem();
        }, 1000);
    };

    return (
        <div className="summation-container min-vh-100 py-4 bg-light">
            {/* Enhanced Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded mx-3 mb-4">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <i className="fas fa-plus-circle me-2 text-primary"></i>
                        <span className="fw-bold">Math For Fun</span>
                    </Link>
                    <div className="ms-auto">
                        <Link to="/" className="btn btn-outline-primary btn-sm">
                            <i className="fas fa-home me-1"></i> Home
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Success/Error Alert */}
                    {selectedAnswer && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`alert ${selectedAnswer === correctAnswer ? 'alert-success' : 'alert-danger'} 
                                      alert-dismissible fade show text-center mb-4`}
                            role="alert"
                        >
                            <i className={`fas ${selectedAnswer === correctAnswer ? 'fa-check-circle' : 'fa-times-circle'} me-2`}></i>
                            <strong>{selectedAnswer === correctAnswer ? 'Great job!' : 'Try again!'}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </motion.div>
                    )}

                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-primary text-white py-3">
                            <h1 className="h3 mb-0 text-center">
                                <i className="fas fa-plus me-2"></i>
                                Summation Challenge
                            </h1>
                        </div>

                        {/* Score Display */}
                        <div className="card-body p-4">
                            <div className="score-container mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="text-muted mb-0">Current Score</h5>
                                    <div className="badge bg-success fs-6">
                                        {score} / {counter}
                                    </div>
                                </div>
                                <div className="progress mt-2" style={{ height: '6px' }}>
                                    <div 
                                        className="progress-bar bg-success" 
                                        style={{ width: `${counter ? (score/counter) * 100 : 0}%` }}
                                        role="progressbar"
                                        aria-valuenow={score}
                                        aria-valuemin="0"
                                        aria-valuemax={counter}
                                    />
                                </div>
                            </div>

                            {/* Problem Display */}
                            <motion.div
                                key={problem?.problem}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="problem-container text-center py-4"
                            >
                                <h2 className="display-4 mb-4">
                                    {problem ? problem.problem : 
                                        <span className="text-muted">Loading...</span>}
                                </h2>

                                {/* Answer Buttons */}
                                <div className="row g-3 justify-content-center">
                                    {(problem?.answers || []).map((answer, index) => (
                                        <div key={index} className="col-12 col-md-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn btn-outline-primary btn-lg w-100 py-3"
                                                onClick={() => checkAnswer(answer)}
                                                disabled={selectedAnswer !== null}
                                                aria-label={`Answer ${answer}`}
                                            >
                                                {answer}
                                            </motion.button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Game Instructions */}
                        <div className="card-footer bg-light p-3">
                            <p className="text-muted mb-0 small text-center">
                                <i className="fas fa-info-circle me-1"></i>
                                Choose the correct sum from the options provided. Each correct answer earns you a point!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default SummationChallenge;
