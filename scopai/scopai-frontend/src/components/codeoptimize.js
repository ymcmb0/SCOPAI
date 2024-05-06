import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Styled components
const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatBox = styled.section`
  flex: 1;
  position: relative;
  background-size: cover;
  background-position: center;
  z-index: 110;
  display: flex;
  flex-direction: column;
`;

const ChatWindow = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageContainer = styled.div`
  background-color: ${(props) => (props.sender === 'user' ? '#b2ebf2' : '#e0e0e0')};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const CodeLine = styled.div`
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
`;

const SolidityEditor = styled.textarea`
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Anta', Courier, monospace;
  min-height: 100px;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Defined InputContainer component
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const SideMenu = styled.aside`
  width: 25%;
  background-color: #202123;
  padding: 4px;

  @media (min-width: 1024px) {
    width: 260px;
    padding: 10px;
  }
`;

const AnalyticsHeading = styled.h2`
  color: #fff;
  margin-bottom: 10px;
`;

const PreviousChatRecord = styled.div`
  color: #fff;
  margin-bottom: 5px;
`;

const PreviousChatRecordContainer = styled.div`
  margin-bottom: 10px;
`;

// ChatInterface component
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically
  const subscribedUser = JSON.parse(localStorage.getItem("subscribed_user"));

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    if (!subscribedUser) {
      navigate("/makepayment");
    }
  }, [navigate, subscribedUser]);
const handleMessageSubmit = async () => {
  if (!inputText.trim()) return;

  try {
    // Send the input text to the Gemini API for processing
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA49y0gUiUctEnwjEN3nFr_jnjiBycM-IU', {
      contents: [{
        parts: [{
          text: inputText
        }]
      }]
    });

    // Log the response data to the console
    console.log('Response from Gemini API:', response.data);

    // Parse the response data
    const responseData = response.data;

    // Check if the responseData is undefined or doesn't contain the expected structure
    if (!responseData || !responseData.candidates || !responseData.candidates[0] || !responseData.candidates[0].content || !responseData.candidates[0].content.parts) {
      throw new Error('Invalid response from Gemini API');
    }

    // Extract the text content from the parts array
    const textContent = responseData.candidates[0].content.parts[0].text;

    // Add the response from the Gemini API as a message to the chat window
    setMessages(prevMessages => [...prevMessages, { text: textContent, sender: 'system' }]);
  } catch (error) {
    console.error('Error:', error.message);
  }

  setInputText('');
};


  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <ChatContainer>
      <SideMenu>
        <AnalyticsHeading>Usage Analytics</AnalyticsHeading>
        {/* Render each previous chat record within its own container */}
        <PreviousChatRecordContainer>
          <PreviousChatRecord>Previous Chat</PreviousChatRecord>
        </PreviousChatRecordContainer>
        <PreviousChatRecordContainer>
          <PreviousChatRecord>Previous Chat</PreviousChatRecord>
        </PreviousChatRecordContainer>
        {/* Add more previous chat record containers as needed */}
      </SideMenu>
      <ChatBox>
        <ChatWindow>
          {messages.map((message, index) => (
            <MessageContainer key={index} sender={message.sender}>
              <CodeLine>{message.text}</CodeLine>
            </MessageContainer>
          ))}
        </ChatWindow>
        <InputContainer>
          <SolidityEditor
            value={inputText}
            onChange={handleChange}
            placeholder="Enter Solidity code here for optimization suggestions......"
          />
          <SendButton onClick={handleMessageSubmit}>Send</SendButton>
        </InputContainer>
      </ChatBox>
    </ChatContainer>
  );
};

export default ChatInterface;
