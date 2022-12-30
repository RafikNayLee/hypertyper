import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useLoadUserHttp, useTheme } from "../../hooks";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignIn, faSign } from "@fortawesome/free-solid-svg-icons";
import LocaleButton from "./LocaleButton";
import styled from "styled-components";

const R = require("ramda");

const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Header = () => {
  const theme = useTheme();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const { mutate, token } = useLoadUserHttp();

  useEffect(() => {
    mutate();
  }, [token]);
  const handleLogout = () => {
    logout();
  };

  const unAuthLinks = (
    <>
      <Nav.Item>
        <LocaleButton />
      </Nav.Item>
    </>
  );

  const authLinks = (
    <div
      className="d-flex justify-content-between"
      style={{
        width: "100%",
      }}
    >
      <div></div>
      <div className="d-flex justify-content-center">
        <LinkContainer to="/">
          <Nav.Link color="white">
            <FontAwesomeIcon icon={faHome} />
          </Nav.Link>
        </LinkContainer>
      </div>

      <div className="d-flex justify-content-end">
        <NavDropdown title={R.prop("username", user)} id="basic-nav-dropdown">
          <LocaleButton />
          <NavDropdown.Item>
            <Nav.Link onClick={handleLogout}>{t("logout.title")}</Nav.Link>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
  return (
    <Navbar bg={isAuthenticated ? "light" : null} expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="collapsed-navbar" />
        <a
          style={{
            textDecoration: "none",
          }}
          href="/"
        >
          <Navbar.Brand>
            <span
              style={{
                color: theme.palette.secondary.main,
                fontWeight: "bold",
              }}
            >
              Hyper
            </span>
            <span
              style={{
                color: theme.palette.primary.dark,
              }}
            >
              Typer
            </span>
          </Navbar.Brand>
        </a>
        <Navbar.Collapse id="collapsed-navbar">
          <Nav
            className="justify-content-end"
            style={{
              width: "100%",
            }}
          >
            {isAuthenticated ? authLinks : unAuthLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
