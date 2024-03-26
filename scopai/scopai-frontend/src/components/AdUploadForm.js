import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './header'; 
import Footer from './footer'; 

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('/Home.png');
  background-size: cover;
`;

const FormWrapper = styled.div`
  background-image: url('/Home.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-top: 100px; /* Adjusted margin-top */
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the form horizontally */
`;

const FormTitle = styled.h2`
  color: #0C2D48;
  font-size: 1.5rem; /* Adjusted font size */
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure form takes full width of container */
  text-align: left;
`;

const FormField = styled.div`
  margin-bottom: 20px;
  width: 100%; /* Ensure form fields take full width of container */
  align-items: left;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
`;

const FileInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
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
  const navigate = useNavigate();

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
      if (response.ok) {
        // If upload is successful, navigate to '/adlist'
        navigate('/adlist');
      } else {
        console.error('Error uploading ad poster:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading ad poster:', error);
    }
  };
  
  return (
    <PageWrapper>
      <Header />
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
      <Footer />
    </PageWrapper>
  );
};

export default AdUploadForm;
