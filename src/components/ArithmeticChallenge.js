import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ArithmeticChallenge = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sign, setSign] = useState('+');
  const [x, setX] = useState(0);
  const [trueFalse, setTrueFalse] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [challengeValue, setChallengeValue] = useState(null);

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const generateNewProblem = () => {
    let newNum1, newNum2, newX, result;
    

    const newSign = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    setSign(newSign);

    switch (newSign) {
      case '+':
        newNum1 = generateRandomNumber(12);
        newNum2 = generateRandomNumber(12);
        newX = generateRandomNumber(newNum1 + newNum2);
        result = newNum1 + newNum2;
        
        break;
      case '-':
        newNum1 = generateRandomNumber(20);
        newNum2 = generateRandomNumber(newNum1);
        newX = generateRandomNumber(newNum2);
        result = newNum1 - newNum2;
        break;
      case '*':
        newNum1 = generateRandomNumber(12);
        newNum2 = generateRandomNumber(12);
        newX = generateRandomNumber(newNum1 * newNum2);
        result = newNum1 * newNum2;
        break;
      case '/':
        newNum2 = generateRandomNumber(12);
        if(newNum2 == 0){
          newNum1 = (newNum2 + 1)* generateRandomNumber(12);
        }else{
          newNum1 = newNum2 * generateRandomNumber(12);
        }
        
        newX = generateRandomNumber((newNum1+1) / newNum2);
        result = newNum1 / newNum2;
        break;
      default:
        newNum1 = generateRandomNumber(12);
        newNum2 = generateRandomNumber(12);
        newX = generateRandomNumber(newNum1 + newNum2);
        result = newNum1 + newNum2;
    }
    if(result === newX){
      newX = newX + 1;
    }

    setNum1(newNum1);
    setNum2(newNum2);   
    setCorrectAnswer(result);
    setX(newX);  
    const random = Math.round(Math.random());
    
    if(random == 1){
      setTrueFalse(random);
      setChallengeValue(result);      
    }else{
      setTrueFalse(random);
      setChallengeValue(newX);  
    }


  };
 

  
  
 
  const checkAnswer = (selected) => {
   // setSelectedAnswer(selected);
   setCounter(counter + 1);
    if (trueFalse === selected) {
      setScore(score + 1);
      // Show success toast
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        text: 'Well done!',
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
      setScore(score - 1);
      // Show error toast
      Swal.fire({
        icon: 'error',
        title: 'Try Again!',
        text: 'Keep practicing!',
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
    <div className="arithmetic-container min-vh-100 py-4 bg-light">
      {/* Enhanced Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded mx-3 mb-4">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="fas fa-calculator me-2 text-primary"></i>
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
                <i className="fas fa-brain me-2"></i>
                Arithmetic Challenge
              </h1>
            </div>

            <div className="card-body p-4">
              {/* Score Display */}
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
                key={`${num1}${sign}${num2}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="problem-container text-center py-4"
              >
                <h2 className="display-4 mb-3">
                  <span className="text-primary">{num1}</span>
                  <span className="text-danger mx-2">{sign}</span>
                  <span className="text-primary">{num2}</span>
                  <span className="text-muted mx-2">=</span>
                  <span className="text-success">{challengeValue}</span>
                </h2>
              </motion.div>

              {/* Answer Buttons */}
              <div className="row g-3 mt-3">
                <div className="col-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-success w-100 py-3"
                    onClick={() => checkAnswer(1)}
                    disabled={selectedAnswer !== null}
                    aria-label="Answer True"
                  >
                    <i className="fas fa-check me-2"></i>
                    True
                  </motion.button>
                </div>
                <div className="col-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-danger w-100 py-3"
                    onClick={() => checkAnswer(0)}
                    disabled={selectedAnswer !== null}
                    aria-label="Answer False"
                  >
                    <i className="fas fa-times me-2"></i>
                    False
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Game Instructions */}
            <div className="card-footer bg-light p-3">
              <p className="text-muted mb-0 small text-center">
                <i className="fas fa-info-circle me-1"></i>
                Determine if the equation is true or false. Score points for correct answers!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArithmeticChallenge;
