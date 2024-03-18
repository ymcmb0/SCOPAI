import React, { useState } from 'react';

const AdUploadForm = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file || !link || !description) {
      console.error('Please provide a file, link, and description');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('link', link);
    formData.append('description', description);
    
    try {
      const response = await fetch('http://localhost:8000/api/adupload', {
        method: 'POST',
        body: formData,
      });
      console.log(response);
    } catch (error) {
      console.error('Error uploading ad poster:', error);
    }
  };
  
  return (
    <div>
      <h2>Upload Ad Poster</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" placeholder="Enter website link" value={link} onChange={handleLinkChange} />
        <input type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdUploadForm;
