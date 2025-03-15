import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SummationChallenge from '../components/SummationChallenge';
import ArithmeticChallenge from '../components/ArithmeticChallenge';
import TimesChallenge from '../components/TimesChallenge';
import BranchChallenge from '../components/BranchChallenge';
import VisualMemory from '../components/VisualMemory';
import NumberMemory from '../components/NumberMemory';
import SmartChimpanzee from '../components/SmartChimpanzee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summation" element={<SummationChallenge />} />
        <Route path="/arithmetic" element={<ArithmeticChallenge />} />
        <Route path="/times" element={<TimesChallenge />} />
        <Route path="/branch" element={<BranchChallenge />} />
        <Route path="/visualmemory" element={<VisualMemory />} />
        <Route path="/memory" element={<NumberMemory />} />
        <Route path="/smarter-chimpanzee" element={<SmartChimpanzee />} />
      </Routes>
    </Router>
  );
};

export default App;