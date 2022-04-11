import React, { Component } from "react";
import final_default from "../img/final_default.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Org from "../pages/Org";
import Auth from "../pages/Auth";
import User from "../pages/User";

export default class NavbarCustom extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant={"dark"} expand="lg">
            <Container>
              <img alt="Logo" src={final_default} width={64} height={64} />
              <Navbar.Brand as={Link} to={"/"}>
                Third Party Auth System
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse
                id="basic-navbar-nav"
                style={{ justifyContent: "flex-end" }}
              >
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/auth"}>
                    Login/Register
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/org"}>
                    Organization Account
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/user"}>
                    Account
                  </Nav.Link>
                  <Nav.Link
                    href="https://github.com/RoyalTechie/Third-Party-Authentication-Frontend/blob/main/third-party-auth-react/README.md"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Documentation
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/org" element={<Org />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
