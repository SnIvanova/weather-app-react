import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import logo from "../assets/img/logo.png";
import SearchLocation from "./SearchLocation";

const MyNav = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Container fluid>
      <Navbar expand="lg" className="bg-light p-3">
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand className="ms-4" style={{ color: "#fd7486" }}>
            <img src={logo} alt="" style={{ width: "55px" }} />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 bg-white me-2">
          <ThreeDotsVertical color="#fd7486" />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link" onClick={refreshPage}>
              Home
            </Link>
            <Link to="/latest-search" className="nav-link">
              Latest Search
            </Link>
            <Link to="/map" className="nav-link">
              Map
            </Link>
          </Nav>

          
          <SearchLocation />
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default MyNav;
