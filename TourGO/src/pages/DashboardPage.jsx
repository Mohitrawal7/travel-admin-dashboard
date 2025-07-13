import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Table, message, Spin,Space,Popconfirm } from 'antd';
import { UserOutlined, GlobalOutlined, LogoutOutlined, PlusOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import TourFormModal from '../components/TourFormModal';



const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTour, setEditingTour] = useState(null);

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

   
    const handleFormSubmit = async (values) => {
        try {
            if(editingTour) {
                const response = await api.put(`/api/tours/${editingTour.id}`, values);
                setTours(tours.map(tour => tour.id === editingTour.id ? response.data : tour)); 
                message.success('Tour updated successfully!');
            } else {
                const response = await api.post('/api/tours', values);
                setTours([...tours, response.data]); 
                message.success('Tour created successfully!');
            }
            setIsModalVisible(false);
            setEditingTour(null);
        } catch (error) {
            message.error('error occurred .');
        }
    
    };

      const handleDeleteTour = async (tourId) => {
        try {
            await api.delete(`/api/tours/${tourId}`);
            setTours(tours.filter(t => t.id !== tourId));
            message.success('Tour deleted successfully!');
        } catch (error) {
            console.error(error);
            message.error('Failed to delete tour. Only Admins can perform this action.');
        }
    };

    const handleEditClick = (tour) => {
        setEditingTour(tour);
        setIsModalVisible(true);
    };

    const handleAddClick = () => {
        setEditingTour(null); 
        setIsModalVisible(true);
    };

     const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)}>Edit</Button>
                    
                    {user?.role === 'ROLE_ADMIN' && (
                        <Popconfirm
                            title="Are you sure you want to delete this tour?"
                            onConfirm={() => handleDeleteTour(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined />} danger>Delete</Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
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
                                onClick={handleAddClick}
                            >
                                Add Tour
                            </Button>
                        </div>

                       <Table columns={columns} dataSource={tours} rowKey="id"  />
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    TourGO ©2025 Created by MASSKN
                </Footer>
            </Layout>
            <TourFormModal
                visible={isModalVisible}
                initialValues={editingTour} 
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingTour(null);
                }}
            />
        </Layout>
    );
};

export default DashboardPage;

















