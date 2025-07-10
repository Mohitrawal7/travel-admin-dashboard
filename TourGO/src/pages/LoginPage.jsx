import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
       await login( values); 
      message.success('Login successful! Welcome.');
      
      // Redirect to the dashboard after successful login
      navigate('/');

    } catch (error) {
      console.error('Login failed:', error); 
      message.error('Login failed. Please check your username and password.');
    } finally {
      setLoading(false);
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
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
            Log in
          </Button>
        </Form.Item>
           <Form.Item style={{ textAlign: 'center' }}>
                    Don't have an account? <Link to="/register">Register now!</Link>
                </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;