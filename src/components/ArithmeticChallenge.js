import React, { useState, useEffect } from 'react';

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
    
    } else {
      
        setScore(score - 1);
     
     
    }

    setTimeout(() => {
      setSelectedAnswer(null);               
      generateNewProblem();
    }, 1000);
  };

  return (
    
    <div class="container mt-5">
      <nav class="navbar navbar-expand-lg navbar-primary bg-light">
        <a class="navbar-brand " href="/">Math For fun</a>
      </nav>
    <div className='card text-center mt-5'>
      <div class="card-header text-primary">
        <h1 >Arithmetic Challenge</h1>
      </div>
      <div class="card-body">
        <h5 class="text-success mb-4">Score: {score} / {counter}</h5>
        <h1 class="text-info mt-5 mb-5">{num1} {sign} {num2} = {challengeValue}</h1>
      </div>
      <div class="card-footer mt-5">
      <div className="row">
        <div className="col-6">
                <button className="btn btn-success w-100" onClick={() => checkAnswer(1)} disabled={selectedAnswer !== null}>
                    True
                </button>
            </div>
            <div className="col-6">
                <button className="btn btn-danger w-100" onClick={() => checkAnswer(0)} disabled={selectedAnswer !== null}>
                    False
                </button>
            </div>
        </div>
      </div>
    </div>    
    
</div>
  );
};

export default ArithmeticChallenge;
