import React, { useState } from 'react';

const AdUploadForm = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file); // Change 'file' to 'image' to match the backend
    formData.append('link', link);
    
    fetch('/api/upload-ad', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        // Handle success or error response
        console.log(response);
      })
      .catch(error => {
        console.error('Error uploading ad poster:', error);
      });
  };

  return (
    <div>
      <h2>Upload Ad Poster</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" placeholder="Enter website link" value={link} onChange={handleLinkChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdUploadForm;
