import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './header'; // Import the Header component
import Footer from './footer'; // Import the Footer component

const AdSectionWrapper = styled.section`
  background-image: url('/Home.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #0C2D48;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const AdCard = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 20px;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AdImage = styled.img`
  width: 300px;
  height: 250px;
  margin-bottom: 20px;
`;

const AdLink = styled.a`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 10px;
  display: block; /* Ensures the entire area is clickable */
  text-decoration: none; /* Removes default underline */
`;

const AdDescription = styled.p`
  font-size: 1rem;
  color: #fff;
`;

const AdList = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/adlist');
        setAds(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching ads: ' + error.message); // Log error message
        setLoading(false);
      }
    };
  
    fetchAds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header /> {/* Include the Header component */}
      <AdSectionWrapper>
        <SectionTitle>Uploaded Ads</SectionTitle>
        <div>
          {ads.map(ad => (
            <AdCard key={ad.id}>
              <AdImage src={`http://localhost:8000${ad.image}`} alt="Ad Poster" />
              <AdLink href={ad.link} target="_blank" rel="noopener noreferrer">{ad.link}</AdLink>
              <AdDescription>{ad.description}</AdDescription>
            </AdCard>
          ))}
        </div>
      </AdSectionWrapper>
      <Footer /> {/* Include the Footer component */}
    </>
  );
};

export default AdList;
