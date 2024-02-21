import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SummationChallenge from '../components/SummationChallenge';
import ArithmeticChallenge from '../components/ArithmeticChallenge';
import TimesChallenge from '../components/TimesChallenge';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summation" element={<SummationChallenge />} />
        <Route path="/arithmetic" element={<ArithmeticChallenge />} />
        <Route path="/times" element={<TimesChallenge />} />
       
      </Routes>
    </Router>
  );
};

export default App;