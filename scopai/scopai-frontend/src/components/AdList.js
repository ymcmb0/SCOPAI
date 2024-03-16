import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdList = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch ads from backend API
    const fetchAds = async () => {
      try {
        const response = await axios.get('/api/ads/');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="ad-list">
      <h2>Advertisement List</h2>
      {ads.map((ad, index) => (
        <div className="ad-container" key={index}>
          <a href={ad.link} target="_blank" rel="noopener noreferrer">
            <img src={ad.image} alt={`Ad ${index}`} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default AdList;