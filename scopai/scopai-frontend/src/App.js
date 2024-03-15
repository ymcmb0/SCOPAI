import './App.css';
import LandingSection from './components/landingsection';
import FeaturePage from './components/featuressection';
import AboutSection from './components/aboutsection';
import ServicesSection from './components/servicessec';
import GetStartedSection from './components/getstartedsection';
import PricingPage from './components/pricingpage';
import Register from './components/Register';
import Login from './components/Login';
import "./App.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    // Make a simple API request to the Django backend
    fetch('http://127.0.0.1:8000/api/')
      .then((response) => response.json())
      .then((data) => setBackendMessage(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
<>
      <Routes>
        {/* Routes without Header and Footer */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<LandingSection />} />
//        <Route path="/features" element={<FeaturePage />} />
//        <Route path="/services" element={<ServicesSection />} />
//        <Route path="/pricingpage" element={<PricingPage />} />
//        <Route path="/about" element={<AboutSection />} />

        </Routes >
    </>
  );
}

export default App;