import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TimesChallenge = () => {
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [playing, setPlaying] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (playing && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      stopGame();
    }
  }, [playing, timeRemaining]);

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setTimeRemaining(60);
    generateQuestion();
  };

  const stopGame = () => {
    setPlaying(false);
    setQuestion('');
    setChoices([]);
    
    Swal.fire({
      title: 'Game Over!',
      html: `
        <div class="text-center">
          <h3 class="text-primary mb-3">Your Final Score: ${score}</h3>
          <div class="d-flex justify-content-center">
            <i class="fas fa-star text-warning mx-1"></i>
            <i class="fas fa-star text-warning mx-1"></i>
            <i class="fas fa-star text-warning mx-1"></i>
          </div>
        </div>
      `,
      confirmButtonText: 'Play Again',
      showCancelButton: true,
      cancelButtonText: 'Back to Home',
      background: '#fff',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline-primary'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        startGame();
      } else {
        window.location.href = '/';
      }
    });
  };

  const generateQuestion = () => {
    const x = 1 + Math.round(9 * Math.random());
    const y = 1 + Math.round(9 * Math.random());
    setCorrectAnswer(x * y);
    setQuestion(`${x} x ${y}`);
   
    const choices = generateChoices(x * y);
    console.log(choices);
    setChoices(choices);
  };

  
  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    generateQuestion();
  };

  function generateChoices(correctAnswer) {
    // Generate 3 random wrong answers that are unique and different from the correct answer
    const wrongAnswers = new Set();
    while (wrongAnswers.size < 3) {
      let wrongAnswer;
      do {
        wrongAnswer = Math.floor(Math.random() * 100) + 1; // Ensure it's within 1-100 range
      } while (wrongAnswers.has(wrongAnswer) || wrongAnswer === correctAnswer);
      wrongAnswers.add(wrongAnswer);
    }
  
    // Combine the correct answer and wrong answers into an array
    const options = [correctAnswer, ...wrongAnswers];
  
    // Shuffle the choices randomly using the Fisher-Yates algorithm for efficiency
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
  
    // Return the shuffled array
    return options;
  }


  return (
    <div className="times-challenge-container min-vh-100 py-4 bg-light">
      {/* Enhanced Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded mx-3 mb-4">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="fas fa-times-circle me-2 text-primary"></i>
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
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-primary text-white py-3">
              <h1 className="h3 mb-0 text-center">
                <i className="fas fa-stopwatch me-2"></i>
                Times Challenge
              </h1>
            </div>

            <div className="card-body p-4">
              {/* Timer and Score Display */}
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="timer-container p-3 bg-light rounded-3 shadow-sm">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-clock text-warning me-2 fs-4"></i>
                      <div>
                        <small className="text-muted d-block">Time Remaining</small>
                        <h3 className="mb-0 text-warning">
                          {timeRemaining} <small>seconds</small>
                        </h3>
                      </div>
                    </div>
                    <div className="progress mt-2" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar bg-warning" 
                        style={{ width: `${(timeRemaining/60) * 100}%` }}
                        role="progressbar"
                        aria-valuenow={timeRemaining}
                        aria-valuemin="0"
                        aria-valuemax="60"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="score-container p-3 bg-light rounded-3 shadow-sm">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-star text-success me-2 fs-4"></i>
                      <div>
                        <small className="text-muted d-block">Current Score</small>
                        <h3 className="mb-0 text-success">{score}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Content */}
              {playing ? (
                <motion.div
                  key={question}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="game-content text-center"
                >
                  <div className="question-container py-4 mb-4 bg-light rounded-3">
                    <h2 className="display-4 text-primary mb-0">
                      {question} = ?
                    </h2>
                  </div>

                  <div className="row g-3 justify-content-center">
                    {choices.map((choice, index) => (
                      <div key={index} className="col-6 col-md-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-outline-primary btn-lg w-100 py-3"
                          onClick={() => checkAnswer(choice)}
                          aria-label={`Answer ${choice}`}
                        >
                          {choice}
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-success btn-lg px-5 py-3"
                    onClick={startGame}
                  >
                    <i className="fas fa-play me-2"></i>
                    Start Game
                  </motion.button>
                </div>
              )}
            </div>

            {/* Game Instructions */}
            <div className="card-footer bg-light p-3">
              <p className="text-muted mb-0 small text-center">
                <i className="fas fa-info-circle me-1"></i>
                Solve multiplication problems within 60 seconds. Choose the correct answer to score points!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimesChallenge;
