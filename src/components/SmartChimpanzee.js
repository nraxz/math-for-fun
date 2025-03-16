import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/SmartChimpanzee.css';

const SmartChimpanzee = () => {
  // Game states
  const [observationTime, setObservationTime] = useState(5); // Default: 5 seconds
  const [gameState, setGameState] = useState('start'); // 'start', 'play', 'continue', 'end'
  const [squares, setSquares] = useState(Array(40).fill({ value: '', isShown: false, isActive: false }));
  const [squareAmount, setSquareAmount] = useState(4);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(0);
  const [compareNumber, setCompareNumber] = useState(1);
  const [observationPhase, setObservationPhase] = useState(false); // Track if we're in observation phase
  
  // Handle observation time change
  const handleObservationTimeChange = (e) => {
    setObservationTime(parseInt(e.target.value));
  };
  
  // Start the game
  const startGame = () => {
    setGameState('play');
    setSquareAmount(4);
    setLevel(1);
    setLives(0);
    setCompareNumber(1);
    generateSquares(4, true);
  };
  
  // Continue to next level
  const continueGame = () => {
    setGameState('play');
    setCompareNumber(1);
    setObservationPhase(true); // Enter observation phase
    generateSquares(squareAmount, false);
  };
  
  // Try again after game over
  const tryAgain = () => {
    setGameState('start');
    setSquareAmount(4);
    setLevel(1);
    setLives(0);
    setCompareNumber(1);
  };
  
  // Generate squares with random numbers
  const generateSquares = (amount, isFirstLevel) => {
    // Create a new array of empty squares
    const newSquares = Array(40).fill().map(() => ({ 
      value: '', 
      isShown: false, 
      isActive: false 
    }));
    
    // Randomly place numbers in the grid
    const availableIndices = [...Array(40).keys()];
    
    for (let i = 0; i < amount; i++) {
      // Select a random index from available positions
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const squareIndex = availableIndices[randomIndex];
      
      // Remove the selected index from available positions
      availableIndices.splice(randomIndex, 1);
      
      // Place the number
      newSquares[squareIndex] = {
        value: i + 1,
        isShown: true, // Make all numbers visible initially
        isActive: true
      };
    }
    
    setSquares(newSquares);
    
    // If not the first level, start observation phase with timer
    if (!isFirstLevel) {
      setObservationPhase(true);
      
      // Set timer to auto-hide numbers after observation time
      const timerId = setTimeout(() => {
        if (observationPhase) { // Only hide if still in observation phase
          hideNumbers();
          setObservationPhase(false);
        }
      }, observationTime * 1000);
      
      // Clean up timer if component unmounts or new level starts
      return () => clearTimeout(timerId);
    }
  };
  
  // Hide numbers for gameplay
  const hideNumbers = () => {
    const newSquares = squares.map(square => ({
      ...square,
      isShown: false
    }));
    setSquares(newSquares);
  };
  
  // Handle square click
  const handleSquareClick = (index) => {
    // Only process active squares
    if (!squares[index].isActive) return;
    
    const clickedValue = squares[index].value;
    
    // Check if this is number 1 during observation phase
    if (observationPhase && clickedValue === 1) {
      // User clicked on number 1 to start early
      hideNumbers();
      setObservationPhase(false);
    }
    
    if (clickedValue === compareNumber) {
      // Correct click
      handleCorrectClick(index);
    } else {
      // Incorrect click
      handleIncorrectClick();
    }
  };
  
  // Handle correct square click
  const handleCorrectClick = (index) => {
    // Mark the clicked square as completed
    const newSquares = [...squares];
    newSquares[index] = { 
      ...newSquares[index],
      isActive: false,
      isShown: true, // Show the number again when correctly clicked
      isCompleted: true
    };
    setSquares(newSquares);
    
    // Move to next number
    const nextNumber = compareNumber + 1;
    setCompareNumber(nextNumber);
    
    // Check if level completed
    if (nextNumber > squareAmount) {
      // Level completed
      setTimeout(() => {
        setLevel(level + 1);
        setSquareAmount(squareAmount + 1);
        setGameState('continue');
      }, 300);
    }
  };
  
  // Handle incorrect square click
  const handleIncorrectClick = () => {
    const newLives = lives + 1;
    setLives(newLives);
    
    if (newLives >= 3) {
      // Game over
      setTimeout(() => {
        setGameState('end');
      }, 300);
    } else {
      // Reset current level
      setTimeout(() => {
        setCompareNumber(1);
        setGameState('continue');
      }, 300);
    }
  };
  
  // Hide numbers after level 1 - This effect is no longer needed with our new approach
  useEffect(() => {
    if (gameState === 'play' && level > 1 && observationPhase) {
      const timer = setTimeout(() => {
        hideNumbers();
        setObservationPhase(false);
      }, observationTime * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, level, observationPhase, observationTime]);
  
  // Render game grid
  const renderGameGrid = () => {
    const gridItems = [];
    
    for (let row = 0; row < 5; row++) {
      const rowItems = [];
      
      for (let col = 0; col < 8; col++) {
        const index = row * 8 + col;
        
        rowItems.push(
          <motion.div
            key={`square-${index}`}
            className={`square ${squares[index].isActive ? 'active' : ''} ${!squares[index].isShown && squares[index].isActive ? 'hidden' : ''} ${squares[index].isCompleted ? 'completed' : ''}`}
            onClick={() => handleSquareClick(index)}
            whileHover={{ scale: squares[index].isActive ? 1.05 : 1 }}
            whileTap={{ scale: squares[index].isActive ? 0.95 : 1 }}
            transition={{ duration: 0.2 }}
            aria-label={squares[index].isShown ? `Square with number ${squares[index].value}` : 'Empty square'}
          >
            {squares[index].isShown && squares[index].value}
          </motion.div>
        );
      }
      
      gridItems.push(
        <div key={`row-${row}`} className="grid-row">
          {rowItems}
        </div>
      );
    }
    
    return gridItems;
  };
  
  return (
    <div className="smart-chimpanzee-container min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-success w-100 position-fixed top-0">
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
          className="start-screen text-center px-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo mb-4">
            <div className="logo-grid">
              <span className="logo-square"></span>
              <span className="logo-square"></span>
              <span className="logo-square"></span>
              <span className="logo-square-hole"><div></div></span>
            </div>
          </div>
          <h1 className="display-5 text-white mb-3">Are You Smarter Than a Chimpanzee?</h1>
          <div className="text-white mb-4 fs-5">
            <p className="mb-2">Click the squares in order according to their numbers.</p>
            <p className="mb-4">The test will get progressively harder.</p>
            
            {/* Observation Time Selector */}
            <div className="time-selector bg-light bg-opacity-10 p-3 rounded mb-4 mx-auto" style={{ maxWidth: '400px' }}>
              <h5 className="text-white mb-3">Maximum Observation Time</h5>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="observation-time" className="text-white me-3">
                  Time to memorize: {observationTime} seconds
                </label>
                <select 
                  id="observation-time"
                  className="form-select"
                  style={{ width: '100px' }}
                  value={observationTime}
                  onChange={handleObservationTimeChange}
                  aria-label="Select maximum observation time"
                >
                  <option value="3">3s</option>
                  <option value="5">5s</option>
                  <option value="10">10s</option>
                  <option value="15">15s</option>
                  <option value="20">20s</option>
                  <option value="30">30s</option>
                </select>
              </div>
              <p className="text-white-50 small mt-2 mb-0">
                <i className="fas fa-info-circle me-1"></i>
                Numbers will hide after {observationTime} seconds or when you click on number 1
              </p>
            </div>
          </div>
          
          <motion.button 
            className="btn btn-warning btn-lg px-4 py-3 fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            Start Test
          </motion.button>
        </motion.div>
      )}
      
      {gameState === 'play' && (
        <motion.div 
          className="game-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="game-info mb-3 d-flex justify-content-between align-items-center bg-light bg-opacity-10 p-3 rounded">
            <div className="badge bg-light text-success p-2">
              <span className="me-2">Level: {level}</span>
              <span>Squares: {squareAmount}</span>
            </div>
            {observationPhase && level > 1 && (
              <div className="text-white">
                <small>Memorizing... Click 1 when ready</small>
              </div>
            )}
          </div>
          
          <div className="game-grid">
            {renderGameGrid()}
          </div>
          
          <div className="game-help mt-3 text-white-50 text-center">
            {level === 1 ? (
              <small>Click the squares in numerical order</small>
            ) : observationPhase ? (
              <small>Memorize the numbers, then click on 1 when ready (auto-hides in {observationTime}s)</small>
            ) : (
              <small>Continue clicking the squares in numerical order</small>
            )}
          </div>
        </motion.div>
      )}
      
      {gameState === 'continue' && (
        <motion.div 
          className="continue-screen text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="level-info mb-4">
            <div className="text-white-50 fs-5 mb-1">NUMBERS</div>
            <div className="display-2 text-white">{squareAmount}</div>
          </div>
          <div className="lives-info mb-4">
            <div className="text-white-50 fs-5 mb-1">STRIKES</div>
            <div className="fs-3 text-white">
              <span className="text-danger">{lives}</span> of 3
            </div>
          </div>
          
          {/* Observation time reminder */}
          <div className="mb-4 text-white-50">
            <p>You'll have up to <span className="text-white">{observationTime} seconds</span> to memorize</p>
            <p className="small">Numbers will hide automatically or when you click on 1</p>
          </div>
          
          <motion.button 
            className="btn btn-warning btn-lg px-4 py-3 fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={continueGame}
          >
            Continue
          </motion.button>
        </motion.div>
      )}
      
      {gameState === 'end' && (
        <motion.div 
          className="end-screen text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="logo-small mb-4">
            <div className="logo-grid-small">
              <span className="logo-square-small"></span>
              <span className="logo-square-small"></span>
              <span className="logo-square-small"></span>
              <span className="logo-square-hole-small"><div></div></span>
            </div>
          </div>
          <h6 className="text-white-50 fs-5 mb-1">Score</h6>
          <h1 className="display-2 text-white mb-4">{squareAmount - 1}</h1>
          <p className="text-white mb-4">Save your score to see how you compare.</p>
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

export default SmartChimpanzee;
