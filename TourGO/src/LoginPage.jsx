// src/LoginPage.jsx

import React from 'react';
import axios from 'axios'; // Make sure axios is imported
import { Card, Form, Input, Button, Typography, message } from 'antd'; // Import message
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = () => {
  // Make the onFinish function async to use await
  const onFinish = async (values) => {
    console.log('Attempting to log in with:', values);

    try {
      // Send a POST request to our new backend endpoint
      // The `values` object from the form already has {username: "...", password: "..."}
      const response = await axios.post('http://localhost:8080/api/auth/login', values);

      // Handle a successful response
      console.log('Login success:', response.data);
      message.success('Login successful! Welcome.');

      // NEXT STEP will be: save the token from response.data and redirect to a dashboard.
      
    } catch (error) {
      // Handle an error response
      console.error('Login failed:', error.response);
      message.error('Login failed. Please check your username and password.');
    }
  };

  return (
    <Card
      title={<Title level={3}>TravelApp Dashboard Login</Title>}
      style={{ width: 400 }}
    >
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;