import React, { useState, useEffect } from 'react';

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
    alert(`Game Over! Your score is: ${score}`);
  };

  const generateQuestion = () => {
    const x = 1 + Math.round(9 * Math.random());
    const y = 1 + Math.round(9 * Math.random());
    setCorrectAnswer(x * y);
    setQuestion(`${x} x ${y}`);
    const answers = [correctAnswer];
    for (let i = 1; i <= 4; i++) {
      let wrongAnswer;
      do {
        wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
      } while (answers.includes(wrongAnswer));
      answers.push(wrongAnswer);
    }
    answers.sort(() => Math.random() - 0.5);
    setChoices(answers);
  };

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    generateQuestion();
  };

  return (
    <div>
      <h1>Times Challenge</h1>
      <div>Score: {score}</div>
      <div>Time Remaining: {timeRemaining} sec</div>
      {playing ? (
        <div>
          <div>Question: {question}</div>
          <div>
            {choices.map((choice, index) => (
              <button key={index} onClick={() => checkAnswer(choice)}>{choice}</button>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
    </div>
  );
};

export default TimesChallenge;
