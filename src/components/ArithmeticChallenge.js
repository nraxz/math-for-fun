import React, { useState, useEffect } from 'react';

const ArithmeticChallenge = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sign, setSign] = useState('+');
  const [x, setX] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    const newSign = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];

    setNum1(newNum1);
    setNum2(newNum2);
    setSign(newSign);

    const result = eval(`${newNum1} ${newSign} ${newNum2}`);
    setCorrectAnswer(result);

    // Randomize x with 50% chance of being correct answer
    const newX = Math.floor(Math.random() * 10) + 1;
    const newXIsCorrect = Math.random() < 0.5;
    setX(newXIsCorrect ? result : newX);
  };

  const checkAnswer = (selected) => {
    setSelectedAnswer(selected);

    if (selected === correctAnswer) {
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
      <h2>{num1} {sign} {num2} = {x}</h2>
      <div>
        <button onClick={() => checkAnswer(true)} disabled={selectedAnswer !== null}>
          True
        </button>
        <button onClick={() => checkAnswer(false)} disabled={selectedAnswer !== null}>
          False
        </button>
      </div>
      <h3>Score: {score}</h3>
    </div>
  );
};

export default ArithmeticChallenge;
