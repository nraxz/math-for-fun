import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/NumberMemory.css';

const NumberMemory = () => {
  // Game states
  const [gameState, setGameState] = useState('start'); // 'start', 'showNumber', 'enterNumber', 'win', 'lose'
  const [level, setLevel] = useState(1);
  const [randomNumber, setRandomNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timerWidth, setTimerWidth] = useState(120);
  const [timeIncrement, setTimeIncrement] = useState(450);
  
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  
  // Generate random number based on level
  const generateRandomNumber = () => {
    let newNumber = '';
    
    for (let i = 0; i < level; i++) {
      if (i === 0) {
        // First digit should not be 0
        newNumber += Math.floor(Math.random() * 9) + 1;
      } else {
        newNumber += Math.floor(Math.random() * 10);
      }
    }
    
    setRandomNumber(newNumber);
    return newNumber;
  };
  
  // Start the game
  const startGame = () => {
    setLevel(1);
    setUserInput('');
    setGameState('showNumber');
    generateRandomNumber();
  };
  
  // Handle number pad input
  const handleNumberInput = (num) => {
    if (gameState === 'enterNumber') {
      setUserInput(prev => prev + num);
    }
  };
  
  // Handle backspace
  const handleBackspace = () => {
    if (gameState === 'enterNumber') {
      setUserInput(prev => prev.slice(0, -1));
    }
  };
  
  // Handle submit
  const handleSubmit = () => {
    if (gameState === 'enterNumber' && userInput) {
      if (userInput === randomNumber) {
        // Correct answer
        setGameState('win');
      } else {
        // Wrong answer
        setGameState('lose');
      }
    }
  };
  
  // Go to next level
  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setUserInput('');
    setGameState('showNumber');
    
    // Increase time based on level
    setTimeIncrement(prev => prev + 550);
  };
  
  // Try again after losing
  const tryAgain = () => {
    setLevel(1);
    setUserInput('');
    setTimeIncrement(450);
    setGameState('start');
  };
  
  // Timer effect
  useEffect(() => {
    if (gameState === 'showNumber') {
      setTimerWidth(120);
      
      const duration = timeIncrement;
      const interval = 40;
      const steps = duration / interval;
      const decrementPerStep = 120 / steps;
      
      let timer;
      let count = 0;
      
      timer = setInterval(() => {
        count++;
        setTimerWidth(prev => {
          const newWidth = prev - decrementPerStep;
          if (newWidth <= 5 || count >= steps) {
            clearInterval(timer);
            setGameState('enterNumber');
            return 0;
          }
          return newWidth;
        });
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [gameState, timeIncrement]);
  
  // Focus on input when entering number
  useEffect(() => {
    if (gameState === 'enterNumber' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState]);
  
  // Generate new random number when showing number
  useEffect(() => {
    if (gameState === 'showNumber') {
      generateRandomNumber();
    }
  }, [gameState, level]);
  
  // Render number pad
  const renderNumberPad = () => {
    return (
      <div className="number-pad">
        <div className="number-pad-row">
          <button onClick={() => handleNumberInput('1')}>1</button>
          <button onClick={() => handleNumberInput('2')}>2</button>
          <button onClick={() => handleNumberInput('3')}>3</button>
        </div>
        <div className="number-pad-row">
          <button onClick={() => handleNumberInput('4')}>4</button>
          <button onClick={() => handleNumberInput('5')}>5</button>
          <button onClick={() => handleNumberInput('6')}>6</button>
        </div>
        <div className="number-pad-row">
          <button onClick={() => handleNumberInput('7')}>7</button>
          <button onClick={() => handleNumberInput('8')}>8</button>
          <button onClick={() => handleNumberInput('9')}>9</button>
        </div>
        <div className="number-pad-row">
          <button onClick={handleBackspace} className="func-btn">
            Back
          </button>
          <button onClick={() => handleNumberInput('0')}>0</button>
          <button onClick={handleSubmit} className="func-btn">
            OK
          </button>
        </div>
      </div>
    );
  };
  
  // Compare user input with correct number and highlight differences
  const renderComparisonResult = () => {
    const correctDigits = randomNumber.split('');
    const userDigits = userInput.split('');
    
    return (
      <div className="comparison-result">
        {userDigits.map((digit, index) => (
          <span 
            key={`user-${index}`} 
            className={index < correctDigits.length && digit === correctDigits[index] ? 'correct' : 'incorrect'}
          >
            {digit}
          </span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="number-memory-container min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary w-100 position-fixed top-0">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            <i className="fas fa-brain me-2"></i>
            Math For Fun
          </Link>
          <div className="ms-auto">
            <Link to="/" className="btn btn-outline-light btn-sm">
              <i className="fas fa-home me-1"></i> Home
            </Link>
          </div>
        </div>
      </nav>
      
      {gameState === 'start' && (
        <motion.div 
          className="start-screen text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo mb-4">
            <svg
              width="110"
              height="110"
              viewBox="0 0 128 128"
              fill="none"
              color="white"
              className="pulse-faint hero-icon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 0C8.95431 0 0 8.95431 0 20V108C0 119.046 8.95431 128 20 128H108C119.046 128 128 119.046 128 108V20C128 8.95431 119.046 0 108 0H20ZM76.9347 58.1152C77.6244 58.8068 78.4359 59.1525 79.3691 59.1525H102.922C103.856 59.1525 104.647 58.8068 105.296 58.1152C105.986 57.4237 106.331 56.6102 106.331 55.6746V54.2712C106.331 53.3356 105.986 52.522 105.296 51.8305C104.647 51.139 103.856 50.7932 102.922 50.7932H89.5938C89.5532 50.7932 89.5329 50.7729 89.5329 50.7322C89.5329 50.6915 89.5532 50.6508 89.5938 50.6102C96.1262 45.078 100.508 40.7051 102.74 37.4915C105.012 34.2373 106.148 30.8203 106.148 27.2407C106.148 23.0915 104.809 19.8576 102.131 17.539C99.4938 15.1797 95.7204 14 90.811 14C87.4028 14 83.8525 14.4881 80.1603 15.4644C79.146 15.7491 78.3345 16.3186 77.7259 17.1729C77.1173 17.9864 76.813 18.922 76.813 19.9797V22.5424C76.813 23.3559 77.1578 23.9864 77.8476 24.4339C78.5374 24.8814 79.2677 24.9627 80.0386 24.678C83.6903 23.2949 86.7739 22.6034 89.2895 22.6034C93.428 22.6034 95.4973 24.4746 95.4973 28.2169C95.4973 30.9017 94.3815 33.6475 92.1499 36.4542C89.9589 39.261 85.4552 43.3491 78.6388 48.7186C76.813 50.1424 75.9 51.9932 75.9 54.2712V55.6746C75.9 56.6102 76.2449 57.4237 76.9347 58.1152Z"
                fill="currentcolor"
              ></path>
            </svg>
          </div>
          <h1 className="display-4 text-white mb-3">Number Memory</h1>
          <p className="text-white mb-4 fs-5">
            The average person can remember 7 numbers at once. Can you do more?
          </p>
          <motion.button 
            className="btn btn-warning btn-lg px-4 py-3 fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            Start
          </motion.button>
          
          <div className="info-box mt-5 p-4 bg-light bg-opacity-10 rounded">
            <h5 className="text-white mb-3">Did you know?</h5>
            <p className="text-white-50 mb-2 small">
              The average person can only remember 7 digit numbers reliably, but it's possible to 
              do much better using mnemonic techniques.
            </p>
            <div className="d-flex gap-2 justify-content-center mt-3">
              <a href="https://en.wikipedia.org/wiki/Mnemonic_major_system" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light">
                Mnemonic major system
              </a>
              <a href="https://en.wikipedia.org/wiki/Dominic_system" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light">
                Dominic system
              </a>
            </div>
          </div>
        </motion.div>
      )}
      
      {gameState === 'showNumber' && (
        <motion.div 
          className="show-number-screen text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="level-display mb-2">
            <span className="badge bg-light text-primary">Level {level}</span>
          </div>
          <motion.div 
            className="number-display mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {randomNumber}
          </motion.div>
          <div className="timer-container">
            <div className="timer-background">
              <div 
                className="timer-progress" 
                ref={timerRef}
                style={{ width: `${timerWidth}px` }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
      
      {gameState === 'enterNumber' && (
        <motion.div 
          className="enter-number-screen text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="level-display mb-2">
            <span className="badge bg-light text-primary">Level {level}</span>
          </div>
          <h2 className="text-white mb-3">What was the number?</h2>
          <div className="input-container mb-4">
            <input
              type="text"
              className="number-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ''))}
              ref={inputRef}
              autoComplete="off"
              inputMode="numeric"
              maxLength={level * 2} // Limit input length
            />
          </div>
          {renderNumberPad()}
        </motion.div>
      )}
      
      {gameState === 'win' && (
        <motion.div 
          className="win-screen text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="result-icon mb-4 text-success">
            <i className="fas fa-check-circle fa-5x"></i>
          </div>
          <div className="result-details">
            <div className="mb-3">
              <div className="text-white-50 mb-1">Number</div>
              <div className="text-white fs-1">{randomNumber}</div>
            </div>
            <div className="mb-4">
              <div className="text-white-50 mb-1">Your answer</div>
              <div className="text-white fs-1">{userInput}</div>
            </div>
          </div>
          <div className="level-complete mb-4">
            <h2 className="text-white">Level {level} Complete!</h2>
          </div>
          <motion.button 
            className="btn btn-warning btn-lg px-4 py-3 fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextLevel}
          >
            Next Level
          </motion.button>
        </motion.div>
      )}
      
      {gameState === 'lose' && (
        <motion.div 
          className="lose-screen text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="result-icon mb-4 text-danger">
            <i className="fas fa-times-circle fa-5x"></i>
          </div>
          <div className="result-details">
            <div className="mb-3">
              <div className="text-white-50 mb-1">Number</div>
              <div className="text-white fs-1">{randomNumber}</div>
            </div>
            <div className="mb-4">
              <div className="text-white-50 mb-1">Your answer</div>
              <div className="comparison-container">
                {renderComparisonResult()}
              </div>
            </div>
          </div>
          <div className="level-result mb-4">
            <h2 className="text-white">You reached Level {level}</h2>
            <p className="text-white-50 mt-2">Save your score to see how you compare.</p>
          </div>
          <div className="d-flex gap-3 justify-content-center">
            <motion.button 
              className="btn btn-warning btn-lg px-4 py-2 fw-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Score
            </motion.button>
            <motion.button 
              className="btn btn-light btn-lg px-4 py-2 fw-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={tryAgain}
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NumberMemory;
