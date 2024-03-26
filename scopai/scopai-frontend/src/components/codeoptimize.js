import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatBox = styled.section`
  flex: 1;
  position: relative;
  background-image: url('./Home.png');
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
  font-family: 'Courier New', Courier, monospace;
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
  const subscribedUser = JSON.parse(localStorage.getItem("subscription"));

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

    // Add the input text as a message to the chat window
    setMessages([...messages, { text: inputText, sender: 'user' }]);

    try {
      // Send the input text to the backend for processing
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch optimized code');
      }

      // Parse the response data
      const data = await response.json();

      setMessages([...messages, { text: data.optimizedCode, sender: 'system' }]);
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
