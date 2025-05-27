// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;

