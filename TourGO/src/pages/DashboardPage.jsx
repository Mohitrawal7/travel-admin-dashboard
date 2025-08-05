import React, { useState, useEffect, useMemo } from "react";
import {
  Layout,
  Menu,
  Typography,
  Button,
  Table,
  message,
  Spin,
  Space,
  Popconfirm,
  Input,
} from "antd";
import {
  UserOutlined,
  GlobalOutlined,
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import TourFormModal from "../components/TourFormModal";

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tours");
      setTours(response.data);
      console.table(response.data);
    } catch (error) {
      message.error("Failed to load tours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      if (editingTour) {
        const response = await api.put(`/api/tours/${editingTour.id}`, values);
        setTours(
          tours.map((tour) =>
            tour.id === editingTour.id ? response.data : tour
          )
        );
        message.success("Tour updated successfully!");
      } else {
        const response = await api.post("/api/tours", values);
        setTours([...tours, response.data]);
        message.success("Tour created successfully!");
      }
      setIsModalVisible(false);
      setEditingTour(null);
    } catch (error) {
      message.error("error occurred .");
    }
  };

  const handleDeleteTour = async (tourId) => {
    try {
      await api.delete(`/api/tours/${tourId}`);
      setTours(tours.filter((t) => t.id !== tourId));
      message.success("Tour deleted successfully!");
    } catch (error) {
      console.error(error);
      message.error(
        "Failed to delete tour. Only Admins can perform this action."
      );
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

  const filteredTours = useMemo(() => {
    if (!searchText) {
      return tours;
    }
    return tours.filter((tour) =>
      tour.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [tours, searchText]);

  //  const canModify = user?.role === 'ROLE_ADMIN' || user?.id === record.createdBy.id;
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const canModify =
          user?.role === "ROLE_ADMIN" || user?.id === record.createdBy.id;
        return (
          <Space size="very small" className="flex flex-row gap-2">
            {
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditClick(record)}
              >
                Edit
              </Button>
            }
            {canModify && user?.role === "ROLE_ADMIN" && (
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => handleDeleteTour(record.id)}
              >
                <Button icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            height: "32px",
            margin: "16px",
            marginTop: "10px",
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            textAlign: "center",
            lineHeight: "32px",
            borderRadius: "6px",
          }}
        >
          TourGO
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<GlobalOutlined />}>
            Tours
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ marginRight: "16px" }}>
              Welcome,{" "}
              <strong>{(user?.username || "User").toUpperCase()}</strong>
            </span>
            <span style={{ marginRight: "16px", fontStyle: "italic" }}>
              {/* (Role: {user?.role.replace('ROLE_', '')}) */}
              {user?.role.replace("ROLE_", "") === "ADMIN" ? "Admin" : "User"}
            </span>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={logout}
              danger
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Title level={2}>Manage Tours</Title>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
                <Input
                  placeholder="Search by tour name"
                  className="w-full sm:w-auto"
                  style={{ width: 200, marginRight: "16px" }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddClick}
        
                >
                  Add Tour
                </Button>
              </div>
            </div>

            <Table
            overflow={{ x:"auto"}}
              columns={columns}
              dataSource={filteredTours}
              rowKey="id"
              pagination={{ pageSize:3 }}
            />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          TourGO ©2025 Created by MASK
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
