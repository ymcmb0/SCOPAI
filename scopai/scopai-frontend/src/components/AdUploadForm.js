import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './header'; // Import the Header component
import Footer from './footer'; // Import the Footer component

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the page takes up at least the full height of the viewport */
  background-color: black; /* Black background behind the form */
`;

const FormWrapper = styled.div`
  margin-top: 80px; /* Add margin on top to prevent overlap with the header */
  background-image: url('/Home.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1; /* Allow the form to grow to fill the remaining space */
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  padding: 40px;
  border-radius: 8px;
  max-width: 600px; /* Limit the maximum width */
  margin: auto; /* Center the form horizontally */
  height: 80vh; /* Set the height to 80% of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormTitle = styled.h2`
  color: #0C2D48;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FileInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`;

const SubmitButton = styled.button`
  background-color: #0C2D48;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background-color: #164A75;
  }
`;

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
    <PageWrapper>
      <Header /> {/* Add the Header component */}
      <FormWrapper>
        <FormContainer>
          <FormTitle>Upload Ad Poster</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormField>
              <Label>Choose File:</Label>
              <FileInput type="file" onChange={handleFileChange} />
            </FormField>
            <FormField>
              <Label>Website Link:</Label>
              <TextInput type="text" placeholder="Enter website link" value={link} onChange={handleLinkChange} />
            </FormField>
            <FormField>
              <Label>Description:</Label>
              <TextInput type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
            </FormField>
            <SubmitButton type="submit">Upload</SubmitButton>
          </Form>
        </FormContainer>
      </FormWrapper>
      <Footer /> {/* Add the Footer component */}
    </PageWrapper>
  );
};

export default AdUploadForm;
