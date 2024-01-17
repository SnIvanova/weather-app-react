import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import jpg from "../assets/img/404.jpg";
import { Container, Row, Col, Button } from "react-bootstrap";
//import "../assets/css/pageNotFound.css"; // Import a CSS file for additional styling

const PageNotFound = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
  });

  return (
    <Container fluid className="d-flex align-items-center justify-content-center h-100">
      <animated.div style={fadeIn}>
        <Row className="text-center">
          <Col xs={12} md={6} className="mb-4">
            <img src={jpg} alt="404 page not found" className="img-fluid" />
          </Col>
          <Col xs={12} md={6} className="mb-4">
            <h1 className="display-4">Oops! Page not found.</h1>
            <p className="lead">
              The page you are looking for might be in another dimension.
            </p>
            <Link to="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
          </Col>
        </Row>
      </animated.div>
    </Container>
  );
};

export default PageNotFound;

