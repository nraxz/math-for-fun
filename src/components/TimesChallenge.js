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
   
    const choices = generateChoices(x * y);
    console.log(choices);
    setChoices(choices);
  };

  
  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    generateQuestion();
  };

  function generateChoices(correctAnswer) {
    // Generate 3 random wrong answers that are unique and different from the correct answer
    const wrongAnswers = new Set();
    while (wrongAnswers.size < 3) {
      let wrongAnswer;
      do {
        wrongAnswer = Math.floor(Math.random() * 100) + 1; // Ensure it's within 1-100 range
      } while (wrongAnswers.has(wrongAnswer) || wrongAnswer === correctAnswer);
      wrongAnswers.add(wrongAnswer);
    }
  
    // Combine the correct answer and wrong answers into an array
    const options = [correctAnswer, ...wrongAnswers];
  
    // Shuffle the choices randomly using the Fisher-Yates algorithm for efficiency
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
  
    // Return the shuffled array
    return options;
  }


  return (
    <div className="container mt-5">
         <nav class="navbar navbar-expand-lg navbar-primary bg-light">
            <a class="navbar-brand " href="/">Math For fun</a>
        </nav>
        <div class="card text-center mt-5"> 
            <div class="card-header text-primary">
                <h1>Times Challenge</h1>
            </div>
            <div class="card-body">
                <div class="text-info">Time Remaining: {timeRemaining} sec</div>
                <div class="text-success mt-3 mb-3"> Score:{score}</div>
            </div>
            <div class="card-body">
                {playing ? (
                    <div>
                        <div class="text-success mt-3 mb-5"><h2>Question: {question}</h2></div>
                        <div className="row">
                            {choices.map((choice, index) => (
                                 <div key={index} className="col-3 mt-5 mb-2">
                                     <button class="btn btn-primary btn-lg w-100" onClick={() => checkAnswer(choice)}>{choice}</button>
                                </div>
                            ))}
                        </div>

                        <div className="row">
                
                    </div>


                </div>
                ) : (
                 <button class="btn btn-success" onClick={startGame}>Start Game</button>
                )}
            </div>
      </div>
    </div>
  );
};

export default TimesChallenge;
