import './App.css';

import LandingSection from './components/landingsection';
import FeaturePage from './components/featuressection';
import AboutSection from './components/aboutsection';
import ServicesSection from './components/servicessec';
// import GetStartedSection from './components/getstartedsection';
import PricingPage from './components/pricingpage';
import Register from './components/Register';
import Login from './components/Login';
import AdvertisementPage from './components/advertisement';
import AdUploadForm from './components/AdUploadForm';
import AdList from './components/AdList';
import PaymentForm  from './components/payment';
import Optimize from './components/codeoptimize';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  return (
<>
      <Routes>
        {/* Routes without Header and Footer */}
        <Route path="/h" element={<LandingSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
//        <Route path="/features" element={<FeaturePage />} />
//        <Route path="/services" element={<ServicesSection />} />
//        <Route path="/pricingpage" element={<PricingPage />} />
//        <Route path="/about" element={<AboutSection />} />
          <Route path="/ad" element={<AdvertisementPage />} />
          <Route path="/adupload" element={<AdUploadForm />} />
          <Route path="/adlist" element={<AdList />} />
          <Route path="/makepayment" element={<PaymentForm />} />
          <Route path="/Optimize" element={<Optimize />} />
        </Routes >
</>
  );
}

export default App;