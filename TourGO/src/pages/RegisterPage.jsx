import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Send register request to  backend
            await axios.post('http://localhost:8080/api/auth/register', values);
            message.success('Registration successful! Please log in.');
            navigate('/login'); // back to login page 
        } catch (error) {
            console.error('Registration failed:', error.response);
            const errorMessage = error.response?.data || 'Registration failed. Please try again.';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title={<Title level={3}>Sign Up for TourGO</Title>}
            style={{ width: 400 }}
        >
            <Form name="register" onFinish={onFinish}>
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
                {/*  Confirm Password for later*/}

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                        Sign Up
                    </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Log in now!</Link>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default RegisterPage;