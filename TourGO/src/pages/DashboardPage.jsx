import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Table, message, Spin } from 'antd';
import { UserOutlined, GlobalOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import CreateTourModal from '../components/CreateTourModal'; // <-- Import the new modal

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch all tours when the component mounts
    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/tours');
            setTours(response.data);
        } catch (error) {
            message.error('Failed to load tours.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    // Function to handle tour creation from the modal
    const handleCreateTour = async (values) => {
        try {
            const response = await api.post('/api/tours', values);
            setTours([...tours, response.data]); // Add new tour to the list
            setIsModalVisible(false); // Close the modal
            message.success('Tour created successfully!');
        } catch (error) {
            message.error('Failed to create tour.');
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
        { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
    ];



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
                        <span style={{ marginRight: '16px', fontStyle: 'italic' }}>
                                (Role: {user?.role.replace('ROLE_', '')})
                        </span>
                        <Button type="primary" icon={<LogoutOutlined />} onClick={logout} danger>
                            Logout
                        </Button>
                    </div>
                </Header>
                  <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <Title level={2}>Manage Tours</Title>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalVisible(true)}
                            >
                                Add Tour
                            </Button>
                        </div>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
                        ) : (
                            <Table columns={columns} dataSource={tours} rowKey="id" />
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    TourGO ©2025 Created by MASSKN
                </Footer>
            </Layout>
            <CreateTourModal
                visible={isModalVisible}
                onCreate={handleCreateTour}
                onCancel={() => setIsModalVisible(false)}
            />
        </Layout>
    );
};

export default DashboardPage;

















