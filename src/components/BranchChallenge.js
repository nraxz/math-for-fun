import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BranchChallenge = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectionOptions, setSelectionOptions] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [canvasScale, setCanvasScale] = useState(1);
  const [challengeCount, setChallengeCount] = useState(10);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const difficultySettings = {
    easy: { min: 10, max: 20, minNodes: 2, maxNodes: 3 },
    intermediate: { min: 20, max: 50, minNodes: 2, maxNodes: 4 },
    hard: { min: 50, max: 100, minNodes: 2, maxNodes: 5 }
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const initGame = () => {
    const settings = difficultySettings[difficulty];
    const newTargetNumber = getRandomInt(settings.min, settings.max);
    const nodeCount = getRandomInt(settings.minNodes, settings.maxNodes);
    
    // Create nodes positioned in the lower half only, in a semi-circle arrangement
    const newNodes = [];
    const centerX = 300; // Canvas center X
    const centerY = 150; // Tree center Y
    const radius = 180;  // Radius for node placement
    
    // Use only the bottom half arc (from PI/4 to 3PI/4)
    const startAngle = Math.PI / 4;       // Slightly right of bottom
    const endAngle = Math.PI - Math.PI/4; // Slightly left of bottom
    
    for (let i = 0; i < nodeCount; i++) {
      // Calculate position along the bottom arc
      const angle = startAngle + (endAngle - startAngle) * (i / (nodeCount - 1 || 1));
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      newNodes.push({
        x, 
        y,
        value: null
      });
    }

    // Pre-fill one random node with a value
    const randomNodeIndex = Math.floor(Math.random() * nodeCount);
    const maxValue = newTargetNumber - (nodeCount - 1); // Ensure we can solve with min 1 in other nodes
    const randomValue = getRandomInt(1, Math.max(1, maxValue));
    
    newNodes[randomNodeIndex] = {
      ...newNodes[randomNodeIndex],
      value: randomValue,
      prefilled: true
    };

    setTargetNumber(newTargetNumber);
    setNodes(newNodes);
    drawGame(newNodes, newTargetNumber);
  };

  useEffect(() => {
    // Handle canvas resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      const scale = container.clientWidth / 600; // 600 is our base width
      setCanvasScale(scale);

      // Update canvas size while maintaining aspect ratio
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gameStarted) {
      initGame();
    }
  }, [difficulty, gameStarted, currentChallenge]);

  const drawGame = (currentNodes, currentTarget) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw tree top
    const treeTopX = canvas.width / 2;
    const treeTopY = 150;
    
    // Draw a richer tree with shadows
    ctx.save();
    
    // Shadow for tree
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 8;
    
    // Tree foliage with gradient
    const gradient = ctx.createRadialGradient(treeTopX, treeTopY, 20, treeTopX, treeTopY, 100);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#2E7D32');
    ctx.fillStyle = gradient;
    
    // Draw main foliage
    ctx.beginPath();
    ctx.arc(treeTopX, treeTopY, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight on tree
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.arc(treeTopX - 30, treeTopY - 30, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    
    ctx.restore();

    // Draw target number circle
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    
    // Gradient for target
    const targetGradient = ctx.createRadialGradient(treeTopX, 100, 0, treeTopX, 100, 40);
    targetGradient.addColorStop(0, '#FF7043');
    targetGradient.addColorStop(1, '#E64A19');
    ctx.fillStyle = targetGradient;
    
    ctx.beginPath();
    ctx.arc(treeTopX, 100, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Target number text
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentTarget, treeTopX, 100);
    
    ctx.restore();
    
    // Draw SINGLE PLUS SIGN in the center below the target circle
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    
    // Position it below the orange circle
    const plusX = treeTopX;
    const plusY = treeTopY + 20; // Positioned below the middle of the tree
    
    // Draw plus sign circle
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(plusX, plusY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Draw plus symbol
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("+", plusX, plusY);
    
    ctx.restore();

    // Draw branches to each node
    currentNodes.forEach(node => {
      if (!node) return;
      
      ctx.save();
      
      // Start the branch from the bottom of the tree (stem)
      const stemStartX = treeTopX;
      const stemStartY = treeTopY + 70; // Start from lower part of tree
      
      // Branch gradient
      const branchGradient = ctx.createLinearGradient(stemStartX, stemStartY, node.x, node.y);
      branchGradient.addColorStop(0, '#8B4513');
      branchGradient.addColorStop(1, '#A0522D');
      
      ctx.beginPath();
      ctx.strokeStyle = branchGradient;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      
      // Add curve to branches
      const midX = (stemStartX + node.x) / 2;
      const midY = stemStartY + (node.y - stemStartY) * 0.6; // Control point for curve
      
      ctx.beginPath();
      ctx.moveTo(stemStartX, stemStartY);
      ctx.quadraticCurveTo(midX, midY, node.x, node.y);
      ctx.stroke();
      
      // Add branch texture
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const offsetX = Math.random() * 4 - 2;
        const offsetY = Math.random() * 4 - 2;
        ctx.beginPath();
        ctx.moveTo(stemStartX + offsetX, stemStartY + offsetY);
        ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, node.x + offsetX, node.y + offsetY);
        ctx.stroke();
      }
      
      ctx.restore();
    });

    // Draw each node
    currentNodes.forEach(node => {
      if (!node) return;
      drawNode(ctx, node);
    });
  };

  const drawNode = (ctx, node) => {
    if (!node) return;
    
    ctx.save();
    
    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    
    // Node gradient based on state
    let gradient;
    if (node.prefilled) {
      // Prefilled nodes are golden
      gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
      gradient.addColorStop(0, '#FFC107');
      gradient.addColorStop(1, '#FF8F00');
    } else if (node.value !== null) {
      // User-filled nodes are blue
      gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
      gradient.addColorStop(0, '#64B5F6');
      gradient.addColorStop(1, '#1976D2');
    } else {
      // Empty nodes are gray
      gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
      gradient.addColorStop(0, '#F5F5F5');
      gradient.addColorStop(1, '#E0E0E0');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Add a slight border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add highlight
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.arc(node.x - 10, node.y - 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
    
    // Draw number
    if (node.value !== null) {
      // Text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value, node.x, node.y);
    } else {
      // Draw question mark for empty nodes
      ctx.fillStyle = '#9E9E9E';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', node.x, node.y);
    }
    
    ctx.restore();
  };

  const handleCanvasClick = (e) => {
    if (!gameStarted) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const clicked = nodes.find(node => 
      !node.prefilled && node.value === null &&
      Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2) < 30
    );

    if (clicked) {
      setSelectedNode(clicked);
      generateOptions(clicked);
      setOptionsVisible(true);
    } else {
      setOptionsVisible(false);
    }
  };

  const generateOptions = (node) => {
    // Calculate the current sum without the node
    const currentSum = nodes.reduce((sum, n) => {
      if (n.value !== null) return sum + n.value;
      return sum;
    }, 0);
    
    // Calculate how many nodes still need values (including this one)
    const emptyNodes = nodes.filter(n => n.value === null).length;
    
    // Calculate what the correct value should be
    let correctValue;
    
    if (emptyNodes === 1) {
      // If this is the last node, it must be exactly the remaining value
      correctValue = targetNumber - currentSum;
    } else {
      // Otherwise, need to ensure we leave room for other nodes to have at least 0
      const maxPossible = targetNumber - currentSum;
      correctValue = getRandomInt(0, maxPossible - (emptyNodes - 1));
    }

    // Ensure correctValue is at least 0
    correctValue = Math.max(0, correctValue);
    
    // Generate 3 wrong answers
    const wrongOptions = [];
    const minOption = Math.max(0, correctValue - 10);
    const maxOption = correctValue + 10;
    
    while (wrongOptions.length < 3) {
      const wrong = getRandomInt(minOption, maxOption);
      if (wrong !== correctValue && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }
    
    // Combine and shuffle
    const options = [correctValue, ...wrongOptions];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    setSelectionOptions(options.map(value => ({
      value,
      correct: value === correctValue
    })));
  };

  const handleOptionSelect = (option) => {
    setOptionsVisible(false);
    
    const nodeIndex = nodes.findIndex(n => n === selectedNode);
    if (nodeIndex === -1) return;
    
    const newNodes = [...nodes];
    newNodes[nodeIndex] = { ...selectedNode, value: option.value };
    setNodes(newNodes);
    
    drawGame(newNodes, targetNumber);
    
    // Check if all nodes are filled
    if (newNodes.every(node => node.value !== null)) {
      checkAnswer(newNodes);
    }
  };

  const checkAnswer = (currentNodes) => {
    const sum = currentNodes.reduce((acc, node) => acc + node.value, 0);
    
    if (sum === targetNumber) {
      // Correct answer
      setScore(prev => prev + 1);
      
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Correct!',
          text: `Great job! You solved challenge ${currentChallenge}/${challengeCount}.`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          if (currentChallenge < challengeCount) {
            setCurrentChallenge(prev => prev + 1);
          } else {
            // Game complete
            Swal.fire({
              icon: 'success',
              title: 'Game Complete!',
              html: `
                <div class="text-center">
                  <h4>Final Score: ${score + 1}/${challengeCount}</h4>
                  <div class="mt-3">
                    ${Array(Math.ceil((score + 1) / (challengeCount / 5))).fill('⭐').join('')}
                  </div>
                </div>
              `,
              confirmButtonText: 'Play Again',
              showCancelButton: true,
              cancelButtonText: 'Back to Home'
            }).then((result) => {
              if (result.isConfirmed) {
                startNewGame();
              } else {
                window.location.href = '/';
              }
            });
          }
        });
      }, 500);
    } else {
      // Wrong answer
      setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: 'Not Quite Right',
          text: `The sum is ${sum}, but we need ${targetNumber}. Let's try again!`,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          initGame(); // Reset the current challenge
        });
      }, 500);
    }
  };

  const startNewGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentChallenge(1);
    initGame();
  };

  return (
    <div className="branch-challenge-container min-vh-100 py-4 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded mx-3 mb-4">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="fas fa-tree me-2 text-success"></i>
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
            <div className="card-header bg-success text-white py-3">
              <h1 className="h3 mb-0 text-center">
                <i className="fas fa-tree me-2"></i>
                Branch Math Challenge
              </h1>
            </div>

            <div className="card-body p-4">
              {!gameStarted ? (
                <motion.div 
                  className="text-center p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-5">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/489/489969.png" 
                      alt="Branch Math" 
                      className="img-fluid mb-4" 
                      style={{ maxHeight: '150px' }}
                    />
                    <h3 className="text-success mb-3">Welcome to Branch Math!</h3>
                    <p className="text-muted">
                      Fill in the branches with the right numbers that add up to the target. 
                      Look for the golden node - it's pre-filled to help you start!
                    </p>
                  </div>
                  
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                          <h5 className="mb-3">Game Settings</h5>
                          
                          <div className="mb-3">
                            <label className="form-label">Difficulty</label>
                            <select 
                              className="form-select form-select-lg mb-3"
                              value={difficulty}
                              onChange={(e) => setDifficulty(e.target.value)}
                            >
                              <option value="easy">Easy (10-20)</option>
                              <option value="intermediate">Intermediate (20-50)</option>
                              <option value="hard">Hard (50-100)</option>
                            </select>
                          </div>
                          
                          <div className="mb-4">
                            <label className="form-label">Number of Challenges</label>
                            <select 
                              className="form-select form-select-lg"
                              value={challengeCount}
                              onChange={(e) => setChallengeCount(Number(e.target.value))}
                            >
                              <option value="5">5 Challenges</option>
                              <option value="10">10 Challenges</option>
                              <option value="15">15 Challenges</option>
                              <option value="20">20 Challenges</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <motion.button 
                        className="btn btn-success btn-lg px-5 py-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startNewGame}
                      >
                        <i className="fas fa-play me-2"></i>
                        Start Game
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="score-container p-3 bg-light rounded-3 shadow-sm">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-star text-warning me-2 fs-4"></i>
                          <div>
                            <small className="text-muted d-block">Score</small>
                            <h3 className="mb-0 text-success">{score}/{challengeCount}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="challenge-container p-3 bg-light rounded-3 shadow-sm">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-flag-checkered text-primary me-2 fs-4"></i>
                          <div>
                            <small className="text-muted d-block">Challenge</small>
                            <h3 className="mb-0 text-primary">{currentChallenge}/{challengeCount}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="difficulty-container p-3 bg-light rounded-3 shadow-sm">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-sliders-h text-secondary me-2 fs-4"></i>
                          <div>
                            <small className="text-muted d-block">Difficulty</small>
                            <h3 className="mb-0 text-secondary text-capitalize">{difficulty}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="game-area position-relative">
                    <div className="canvas-container text-center bg-white p-3 rounded-3 shadow-sm mb-4">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={500}
                        onClick={handleCanvasClick}
                        className="img-fluid rounded"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                    
                    {optionsVisible && (
                      <motion.div 
                        className="options-container text-center p-3 bg-white rounded-3 shadow-sm mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h5 className="mb-3">Choose a number:</h5>
                        <div className="d-flex justify-content-center flex-wrap gap-2">
                          {selectionOptions.map((option, index) => (
                            <motion.button
                              key={index}
                              className="btn btn-outline-primary btn-lg px-4 py-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleOptionSelect(option)}
                            >
                              {option.value}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="text-center mt-4">
                      <motion.button 
                        className="btn btn-outline-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={initGame}
                      >
                        <i className="fas fa-sync-alt me-2"></i>
                        Skip Challenge
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="card-footer bg-light p-3">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <p className="text-muted mb-md-0 small">
                    <i className="fas fa-info-circle me-1"></i>
                    Golden node is pre-filled. Click empty nodes to select numbers that add up to the target.
                  </p>
                </div>
                <div className="col-md-4 text-md-end">
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => {
                      Swal.fire({
                        title: 'How to Play',
                        html: `
                          <div class="text-start">
                            <p><strong>1.</strong> The goal is to make all nodes add up to the target number (in red).</p>
                            <p><strong>2.</strong> One node is already filled (shown in gold).</p>
                            <p><strong>3.</strong> Click on empty nodes to select numbers.</p>
                            <p><strong>4.</strong> Complete all challenges to win!</p>
                          </div>
                        `,
                        confirmButtonText: 'Got it!',
                        confirmButtonColor: '#28a745'
                      });
                    }}
                  >
                    <i className="fas fa-question-circle me-1"></i>
                    Help
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BranchChallenge; 