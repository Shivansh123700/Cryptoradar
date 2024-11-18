import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Alerts from './components/Alerts.js';
import LandingPage from "./components/LandingPage/LandingPage"
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          
        </header>
        <nav>
          
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
};

export default App;
