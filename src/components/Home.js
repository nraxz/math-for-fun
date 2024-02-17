import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to MathForFun!</h1>
      <p>Choose a math game to play:</p>
      <ul>
        <li><Link to="/summation">Summation Challenge</Link></li>
        <li><Link to="/arithmetic">Arithmetic Challenge</Link></li>
      </ul>
    </div>
  );
};

export default Home;
