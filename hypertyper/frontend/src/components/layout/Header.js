import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import useLoadUserHttp from "../../hooks/useLoadUserHttp";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignIn,
  faRegistered,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { mutate, token } = useLoadUserHttp();

  useEffect(() => {
    mutate();
  }, [token]);
  const handleLogout = () => {
    logout();
  };

  const unAuthLinks = (
    <>
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/register">
        <Nav.Link>Register</Nav.Link>
      </LinkContainer>
    </>
  );

  const authLinks = (
    <>
      <LinkContainer to="/">
        <Nav.Link>
          {" "}
          <FontAwesomeIcon icon={faHome} />
        </Nav.Link>
      </LinkContainer>
    </>
  );
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand>Hyper Typer</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? authLinks : unAuthLinks}
          </Nav>
        </Navbar.Collapse>

        <div>
          {isAuthenticated && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title={user.username} id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
