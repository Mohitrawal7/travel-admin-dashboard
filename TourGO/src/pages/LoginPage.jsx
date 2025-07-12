// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Card, Form, Input, Button, Typography, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { useAuth } from '../context/AuthContext';

// const { Title } = Typography;

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       await login(values);
//       messageApi.success({
//         content: 'Login successful! Welcome.',
//         duration: 2,
//         placement: 'topLeft'
//       });
//       setTimeout(() => navigate('/'), 1500);
//     } catch (error) {
//       console.error('Login failed:', error);
//       messageApi.error({
//         content: 'Login failed. Please check your credentials and try again.',
//         duration: 2,
//         placement: 'topRight'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       minWidth: '100vw',
//       background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '1rem'
//     }}>
//       {contextHolder}
//       <Card
//         title={<Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>Login to TourGO</Title>}
//         style={{
//           width: '100%',
//           maxWidth: 400,
//           borderRadius: '12px',
//           boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
//           backgroundColor: '#ffffffdd'
//         }}
//       >
//         <Form name="login" onFinish={onFinish} layout="vertical">
//           <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username' }]}>
//             <Input prefix={<UserOutlined />} placeholder="Username" />
//           </Form.Item>
//           <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
//             <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block loading={loading}>
//               Log In
//             </Button>
//           </Form.Item>
//           <div style={{ textAlign: 'center' }}>
//             Don't have an account? <Link to="/register">Register</Link>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;








import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import styles from '../style';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values);
      messageApi.success({
        content: 'Login successful! Welcome.',
        duration: 2,
        placement: 'topLeft'
      });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      messageApi.error({
        content: 'Login failed. Please check your credentials.',
        duration: 2,
        placement: 'topRight'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {contextHolder}
      <Card style={styles.card} bordered={false}>
        <Title level={2} style={styles.title}>Login to TourGO</Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            label={<span style={styles.label}>Username</span>}
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={styles.label}>Password</span>}
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} style={styles.button}>
              Log In
            </Button>
          </Form.Item>

          <div style={styles.footerText}>
            Don’t have an account? <Link to="/register" style={styles.link}>Register</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};



export default LoginPage;
