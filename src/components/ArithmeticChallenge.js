import React, { useState, useEffect } from 'react';

const ArithmeticChallenge = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sign, setSign] = useState('+');
  const [x, setX] = useState(0);
  const [trueFalse, setTrueFalse] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
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
    console.log("Random: ", random);
    if(random == 1){
      setTrueFalse(random);
      setChallengeValue(result);      
    }else{
      setTrueFalse(random);
      setChallengeValue(newX);  
    }


  };
  console.log("random:", trueFalse, "value: ", challengeValue);
  console.log("num1:", num1, "num2: ", num2, "Correct Answer:", correctAnswer);

  
  
 
  const checkAnswer = (selected) => {
   // setSelectedAnswer(selected);

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
    <div>
      <h1>Arithmetic Challenge</h1>
      <h2>{num1} {sign} {num2} = {challengeValue}</h2>
      <div>
        <button onClick={() => checkAnswer(1)} disabled={selectedAnswer !== null}>
          True
        </button>
        <button onClick={() => checkAnswer(0)} disabled={selectedAnswer !== null}>
          False
        </button>
      </div>
      <h3>Score: {score}</h3>
      <h3>CA: {correctAnswer} vs {x}</h3>
    
      <h3>X: {x}</h3>
      <h3>T/F: {trueFalse}</h3>
    
    </div>
  );
};

export default ArithmeticChallenge;
