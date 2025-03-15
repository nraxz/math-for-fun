import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/VisualMemory.css';


const VisualMemory = () => {
  // Game state
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'end'
  const [gridSize, setGridSize] = useState(3); // Grid is gridSize x gridSize
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [tilesToMemorize, setTilesToMemorize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  
  const gameAreaRef = useRef(null);
  
  // Initialize grid when size changes
  useEffect(() => {
    if (gameState === 'playing') {
      // Set CSS variable for grid size
      document.documentElement.style.setProperty('--grid-size', gridSize.toString());
      initializeGrid();
    }
  }, [gridSize, gameState]);
  
  // Start a new game
  const startGame = () => {
    setGameState('playing');
    setGridSize(3);
    setLevel(1);
    setLives(3);
    setTilesToMemorize(3);
    setWrongAttempts(0);
    setShowFlash(false);
    setSelectedTiles([]);
  };
  
  // Initialize grid with random tiles to memorize
  const initializeGrid = () => {
    setIsAnimating(true);
    const totalTiles = gridSize * gridSize;
    const newGrid = Array(totalTiles).fill(false);
    const newRevealedTiles = [];
    
    // Randomly select tiles to memorize
    while (newRevealedTiles.length < tilesToMemorize) {
      const randomIndex = Math.floor(Math.random() * totalTiles);
      if (!newRevealedTiles.includes(randomIndex)) {
        newRevealedTiles.push(randomIndex);
        newGrid[randomIndex] = true;
      }
    }
    
    setGrid(newGrid);
    setRevealedTiles(newRevealedTiles);
    setSelectedTiles([]);
    setWrongAttempts(0);
    
    // Show tiles for memorization
    setShowFlash(true);
    
    // Hide tiles after 1.3 seconds
    setTimeout(() => {
      setShowFlash(false);
      setIsAnimating(false);
    }, 1300);
  };
  
  // Handle tile click
  const handleTileClick = (index) => {
    if (isAnimating || selectedTiles.includes(index)) return;
    
    const isTileCorrect = revealedTiles.includes(index);
    const newSelectedTiles = [...selectedTiles, index];
    setSelectedTiles(newSelectedTiles);
    
    if (!isTileCorrect) {
      // Wrong tile clicked
      setWrongAttempts(wrongAttempts + 1);
      
      if (wrongAttempts + 1 >= 3) {
        // Lose a life when 3 wrong attempts are made
        const newLives = lives - 1;
        setLives(newLives);
        
        if (newLives <= 0) {
          // Game over
          setTimeout(() => {
            setGameState('end');
          }, 1500);
        } else {
          // Reset level
          setTimeout(() => {
            initializeGrid();
          }, 1500);
        }
      }
    } else {
      // Check if all correct tiles have been found
      const correctTilesFound = revealedTiles.filter(tileIndex => 
        newSelectedTiles.includes(tileIndex)
      ).length;
      
      if (correctTilesFound === revealedTiles.length) {
        // Level complete
        setIsAnimating(true);
        
        setTimeout(() => {
          // Increase level
          const newLevel = level + 1;
          setLevel(newLevel);
          
          // Increase grid size at specific levels
          if ([3, 6, 9, 14, 19, 24, 30, 36, 42, 48, 55].includes(newLevel)) {
            setGridSize(gridSize + 1);
          }
          
          // Increase tiles to memorize
          setTilesToMemorize(tilesToMemorize + 1);
          
          // Initialize next level
          initializeGrid();
        }, 1500);
      }
    }
  };
  
  const renderGrid = () => {
    return (
      <div className="visual-memory-grid">
        {grid.map((isMemorizeTile, index) => (
          <motion.div
            key={index}
            className={`
              visual-memory-tile
              ${showFlash && isMemorizeTile ? 'show' : ''}
              ${selectedTiles.includes(index) && isMemorizeTile ? 'correct' : ''}
              ${selectedTiles.includes(index) && !isMemorizeTile ? 'wrong' : ''}
            `}
            onClick={() => handleTileClick(index)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    );
  };
  
  const renderHearts = () => {
    return Array(3).fill(0).map((_, index) => (
      <i 
        key={index}
        className="material-icons heart"
        style={{ color: index < lives ? '#fff' : '#6BABDF' }}
      >
        favorite
      </i>
    ));
  };
  
  return (
    <div className="visual-memory-container min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative">
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
      
      <div className="container px-2 py-5 my-5">
        {gameState === 'start' && (
          <motion.div 
            className="start-menu d-flex flex-column align-items-center text-center pt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo mb-4">
              <div className="logo-grid">
                <span className="logo-tile"></span>
                <span className="logo-tile"></span>
                <span className="logo-tile"></span>
                <span className="logo-tile-hole"><div></div></span>
              </div>
            </div>
            <h1 className="display-4 text-white mb-3">Visual Memory Test</h1>
            <p className="text-white mb-4 fs-5">Memorize the squares.</p>
            <motion.button 
              className="btn btn-warning btn-lg px-4 py-3 fw-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
            >
              Start
            </motion.button>
          </motion.div>
        )}
        
        {gameState === 'playing' && (
          <motion.div 
            className="game-area pt-5 mt-5"
            ref={gameAreaRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="game-header d-flex justify-content-between align-items-center mb-4">
              <div className="level-display">
                <h3 className="text-white">Level <span>{level}</span></h3>
              </div>
              <div className="lives-display">
                <h3 className="text-white">Lives <span className="hearts">{renderHearts()}</span></h3>
              </div>
            </div>
            
            <motion.div
              className={`game-board ${isAnimating ? 'animating' : ''}`}
              animate={{ 
                background: isAnimating ? '#47a6f5' : '#2B87D1'
              }}
              transition={{ duration: 0.5 }}
            >
              {renderGrid()}
            </motion.div>
          </motion.div>
        )}
        
        {gameState === 'end' && (
          <motion.div 
            className="end-menu d-flex flex-column align-items-center text-center pt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo-small mb-4">
              <div className="logo-grid-small">
                <span className="logo-tile-small"></span>
                <span className="logo-tile-small"></span>
                <span className="logo-tile-small"></span>
                <span className="logo-tile-hole-small"><div></div></span>
              </div>
            </div>
            <h6 className="text-white fs-5">Visual Memory</h6>
            <h1 className="display-4 text-white mb-4">Level {level}</h1>
            <p className="text-white mb-4">Save your score to see how you compare.</p>
            <div className="d-flex gap-3">
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
                onClick={startGame}
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VisualMemory;
