// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, message, Space, Card } from 'antd';
import LoginPage from './LoginPage.jsx'; // Use .jsx
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  const fetchMessageFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/hello');
      setBackendMessage(response.data);
      message.success('Successfully connected to backend!');
    } catch (error) {
      console.error("Error fetching data: ", error);
      setBackendMessage('Could not connect to backend.');
      message.error('Failed to connect to backend. Is it running?');
    }
  };

  return (
    <div className="App">
      <Space direction="vertical" align="center" size="large">
        <LoginPage />
        
        <Card title="Backend Connection Test" style={{ width: 400 }}>
          <Button onClick={fetchMessageFromBackend}>
            Test Backend Connection
          </Button>
          {backendMessage && <p style={{ marginTop: '15px' }}><strong>Response:</strong> {backendMessage}</p>}
        </Card>
      </Space>
    </div>
  );
}

export default App;