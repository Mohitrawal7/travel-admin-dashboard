import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Layout, Typography, Row, Col, Card, Button, Spin } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tours/public")
      .then((response) => {
        setTours(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch public tours:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Content
        style={{
          padding: "0 80px",
          marginTop: "570px",
          lg: { marginTop: "480px" },
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "50px 24px",
            textAlign: "center",
          }}
        >
          <Title>Welcome to TourGO</Title>
          <Paragraph
            style={{ fontSize: "18px", maxWidth: "600px", margin: "auto" }}
          >
            Your ultimate destination for planning and tracking your travel
            adventures. Discover new places, create your dream itinerary, and
            never forget a moment.
          </Paragraph>
          <div style={{ marginTop: "20px" }}>
            <Link to="/register">
              <Button
                type="primary"
                size="large"
                style={{ marginRight: "10px" }}
              >
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="large">Login</Button>
            </Link>
          </div>
        </div>

        <div style={{ padding: "50px 0" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            Featured Tours
          </Title>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {tours.map((tour) => (
                <Col xs={24} sm={12} md={8} key={tour.id}>
                  <Card
                    hoverable
                    cover={
                      <img className="w-[20px] h-[20px]"
                        alt={tour.name}
                        src={`https://picsum.photos/seed/${tour.id}/400/200`}
                        // src="./src/Forest.jpg"
                      />
                    } // Placeholder images
                  >
                    <Meta title={tour.name} description={tour.country} />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;

// // src/pages/HomePage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Layout, Typography, Row, Col, Card, Button, Spin } from 'antd';

// const { Content } = Layout;
// const { Title, Paragraph } = Typography;
// const { Meta } = Card;

// const HomePage = () => {
//     const [tours, setTours] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get('http://localhost:8080/api/tours/public')
//             .then(response => {
//                 setTours(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Failed to fetch public tours:", error);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <Layout>
//             <Content style={{ padding: '0' }}>
//                 <div style={{ background: '#fff', padding: '40px 16px', textAlign: 'center', maxWidth: '1000px', margin: 'auto' }}>
//                     <Title level={1}>Welcome to TourGO</Title>
//                     <Paragraph style={{ fontSize: '16px', maxWidth: '700px', margin: 'auto' }}>
//                         Your ultimate destination for planning and tracking your travel adventures.
//                         Discover new places, create your dream itinerary, and never forget a moment.
//                     </Paragraph>
//                     <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
//                         <Link to="/register">
//                             <Button type="primary" size="large">Get Started</Button>
//                         </Link>
//                         <Link to="/login">
//                             <Button size="large">Login</Button>
//                         </Link>
//                     </div>
//                 </div>

//                 <div style={{ padding: '40px 0', maxWidth: '1200px', margin: 'auto' }}>
//                     <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>Featured Tours</Title>
//                     {loading ? (
//                         <div style={{ textAlign: 'center' }}><Spin size="large" /></div>
//                     ) : (
//                         <Row gutter={[16, 24]} justify="center">
//                             {tours.map(tour => (
//                                 <Col key={tour.id} xs={24} sm={12} md={8} lg={6}>
//                                     <Card
//                                         hoverable
//                                         cover={
//                                             <img
//                                                 alt={tour.name}
//                                                 src={`https://picsum.photos/seed/${tour.id}/400/200`}
//                                                 style={{ height: '200px', objectFit: 'cover' }}
//                                             />
//                                         }
//                                     >
//                                         <Meta title={tour.name} description={tour.country} />
//                                     </Card>
//                                 </Col>
//                             ))}
//                         </Row>
//                     )}
//                 </div>
//             </Content>
//         </Layout>
//     );
// };

// export default HomePage;
