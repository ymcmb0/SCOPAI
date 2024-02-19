import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingSection from './components/landingsection';
import FeaturePage from './components/featuressection';
import AboutSection from './components/aboutsection';
import ServicesSection from './components/servicessec';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  useEffect(() => {
    // Make a simple API request to the Django backend
    fetch('http://localhost:8000/api/hello/')
      .then((response) => response.json())
      .then((data) => console.log('Backend Message:', data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<LandingSection />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/about" element={<AboutSection />} />
      </Routes>
    </Router>
  );
}

export default App;
