import './App.css';
import LandingSection from './components/landingsection';
import FeaturesSection from './components/featuressection';
import AboutSection from './components/aboutsection';
import GetStartedSection from './components/getstartedsection';

import Register from './components/Register';
import Login from './components/Login';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    // Make a simple API request to the Django backend
    fetch('http://localhost:8000/api/hello/')
      .then((response) => response.json())
      .then((data) => setBackendMessage(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Routes without Header and Footer */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landingpage" element={<LandingSection />} />
        <Route path="/features" element={<FeaturesSection />} />
      </Routes >
    </Router>
  );
}

export default App;