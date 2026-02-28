import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, GlobalOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Profile = () => {
  const location = useLocation();

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
            fontWeight: "bold",
          }}
        >
          <Link to="/dashboard" style={{ color: "white" }}>
            TourGO
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/dashboard" icon={<GlobalOutlined />}>
            <Link to="/dashboard">Tours</Link>
          </Menu.Item>

          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
<h1 style={{
  margin:"10px",
  text:"text-center",
  
}} >Profile</h1>
      </Layout>
    </Layout>
  );
};

export default Profile;
