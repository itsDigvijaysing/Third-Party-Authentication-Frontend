import React, { useState } from "react";
import final_default from "../img/final_default.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Org from "../pages/Org";
import Auth from "../pages/Auth";
import User from "../pages/User";
// import { useNavigate } from "react-router-dom";

function NavbarCustom() {
  const [userActive, setuserActive] = useState(false);
  // let history = useNavigate();

  React.useEffect(() => {
    let user = sessionStorage.getItem("user_id");
    console.log(user, "I am here");
    if (user) {
      console.log(user, "user present & active");
      setuserActive(true);
    }
  }, []);
  const logout = () => {
    console.log("calling");
    sessionStorage.clear();
    setuserActive(false);
    // history("/auth");
    window.location.reload();
  };

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
                <Nav.Link as={Link} to={"/org"}>
                  Organization Account
                </Nav.Link>

                {userActive === false ? (
                  <Nav.Link as={Link} to={"/auth"}>
                    User Login/Register
                  </Nav.Link>
                ) : (
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                )}
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

export default NavbarCustom;
