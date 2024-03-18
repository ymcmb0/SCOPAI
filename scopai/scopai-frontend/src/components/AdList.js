import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Uploaded Ads</h2>
      <div>
        {ads.map(ad => (
          <div key={ad.id}>
            <img src={ad.image} alt="Ad Poster" />
            <p>{ad.link}</p>
            <p>{ad.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdList;
