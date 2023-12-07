// components/FeaturesSection.js
import React from 'react';
import Footer from './footer';
import Header from './header';
const FeaturesSection = () => {
  return (
  <>
  <Header />
    <section className="features">
      <div className="feature">
        {/* Feature 1 */}
        <h2>Generative AI Optimization</h2>
        <p>Utilize cutting-edge generative AI to optimize your smart contracts for efficiency and performance.</p>
      </div>
      <div className="feature">
        {/* Feature 2 */}
        <h2>User-friendly Interface</h2>
        <p>Enjoy a user-friendly interface that makes smart contract optimization accessible to developers of all levels.</p>
      </div>
      {/* Add more features as needed */}
    </section>
  <Footer />
  </>
  );
};

export default FeaturesSection;
