import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  Discord,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "react-bootstrap-icons";
import "../assets/css/MyFooter.css";

const MyFooter = ({ weatherInfo, isLoading, isError }) => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="social-icons">
          <Col className="my-2 d-flex justify-content-center">
            <Facebook className="my-2 mx-3 fs-3" />
            <Instagram className="my-2 mx-3 fs-3" />
            <Github className="my-2 mx-3 fs-3" />
            <Linkedin className="my-2 mx-3 fs-3" />
            <Discord className="my-2 mx-3 fs-3" />
          </Col>
        </Row>
        <Row className="text-center weather-info">
          <Col>
            <div className="mb-2">
              {isLoading ? (
                <Spinner animation="border" variant="light" role="status" />
              ) : null}
            </div>
            <p className="mb-0">
              {isLoading
                ? "Loading weather..."
                : isError
                ? "Error fetching weather"
                : weatherInfo
                ? `${weatherInfo.weather[0].description}, ${Math.round(
                    weatherInfo.main.temp
                  )}°C`
                : ""}
            </p>
          </Col>
        </Row>
        <Row className="copyright">
          <Col className="text-center text-light p-3">
            <p>
              &copy; {new Date().getFullYear()} Weather App. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
