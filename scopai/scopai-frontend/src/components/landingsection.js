import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import FeaturePage from './featuressection';
import PricingPage from './pricingpage';
import AboutSection from './aboutsection';
import ServicesSection from './servicessec';
import HeroSec from './herosec';

const LandingPage = () => {
  const location = useLocation();
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("user")){
      navigate("/login");
    }
    const scrollToSection = (ref) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Scroll to the appropriate section when the route changes
    switch (location.hash) {
      case '#features':
        scrollToSection(featuresRef);
        break;
      case '#pricingpage':
        scrollToSection(pricingRef);
        break;
      case '#about':
        scrollToSection(aboutRef);
        break;
      case '#services':
        scrollToSection(servicesRef);
        break;
      default:
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, navigate]);

  return (
    <>
      <Header />
      <HeroSec />
      <div ref={featuresRef}>
        <FeaturePage />
      </div>
      <div ref={servicesRef}>
        <ServicesSection />
      </div>
      <div ref={pricingRef}>
        <PricingPage />
      </div>

      <div ref={aboutRef}>
        <AboutSection />
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
