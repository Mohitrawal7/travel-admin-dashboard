import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { UserOutlined, GlobalOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const DashboardPage = () => {
    const { user, logout } = useAuth(); 

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', textAlign: 'center', lineHeight: '32px', borderRadius: '6px' }}>
                    TourGO
                </div>

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<GlobalOutlined />}>
                        Tours
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        Profile
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div>
                        <span style={{ marginRight: '16px' }}>
                            Welcome, <strong>{user?.username || 'User'}</strong>!
                        </span>
                        <Button type="primary" icon={<LogoutOutlined />} onClick={logout} danger>
                            Logout
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Title level={2}>Manage Your Tours</Title>
                        <p>This is where the list of tours will be displayed. The next step is to build the functionality to add and view tours here.</p>
                        <p>Use the sidebar to navigate between different sections of the dashboard.</p>
                        <p>More features will be added soon!</p>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TourGO ©2024 Created with Ant Design</Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardPage;

















