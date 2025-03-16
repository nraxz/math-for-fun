import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/SmartChimpanzee.css';

const SmartChimpanzee = () => {
  // Game states
  const [gameState, setGameState] = useState('start'); // 'start', 'play', 'continue', 'end'
  const [squares, setSquares] = useState(Array(40).fill({ value: '', isShown: false, isActive: false }));
  const [squareAmount, setSquareAmount] = useState(4);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(0);
  const [compareNumber, setCompareNumber] = useState(1);
  
  // Start the game
  const startGame = () => {
    setGameState('play');
    setSquareAmount(4);
    setLevel(1);
    setLives(0);
    setCompareNumber(1);
    generateSquares(4);
  };
  
  // Continue to next level
  const continueGame = () => {
    setGameState('play');
    setCompareNumber(1);
    generateSquares(squareAmount);
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
  const generateSquares = (amount) => {
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
        isShown: true,
        isActive: true
      };
    }
    
    setSquares(newSquares);
  };
  
  // Handle square click
  const handleSquareClick = (index) => {
    // Only process active squares
    if (!squares[index].isActive) return;
    
    const clickedValue = squares[index].value;
    
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
    // Update the clicked square
    const newSquares = [...squares];
    newSquares[index] = { 
      value: '', 
      isShown: false, 
      isActive: false 
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
  
  // Hide numbers after level 1
  useEffect(() => {
    if (gameState === 'play' && level > 1) {
      const timer = setTimeout(() => {
        const newSquares = squares.map(square => ({
          ...square,
          isShown: false
        }));
        setSquares(newSquares);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, squares, level]);
  
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
            className={`square ${squares[index].isActive ? 'active' : ''} ${!squares[index].isShown && squares[index].isActive ? 'hidden' : ''}`}
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
            <p>The test will get progressively harder.</p>
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
          <div className="game-info mb-3">
            <div className="badge bg-light text-primary p-2">
              <span className="me-2">Level: {level}</span>
              <span>Squares: {squareAmount}</span>
            </div>
          </div>
          <div className="game-grid">
            {renderGameGrid()}
          </div>
          <div className="game-help mt-3 text-white-50 text-center">
            <small>{level === 1 ? 'Click the squares in numerical order' : 'Remember the positions and click in order'}</small>
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
