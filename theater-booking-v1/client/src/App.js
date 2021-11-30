import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/AuthContext";
import { errorMessage } from "./lib/Error";
import Logo from "../../client/src/images/movie.png";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const history = useHistory();

  useEffect(() => {
    onLoad();
  });

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    history.push("/login");
  };

  const onLoad = () => {
    try {
      if (
        null !== sessionStorage.getItem("user") &&
        "" !== sessionStorage.getItem("user")
      ) {
        if ("/login" === history.location.pathname || "/signup" === history.location.pathname) {
          history.push("/dashboard");
        }
        setIsAuthenticated(true);
      } else {
        history.push("/login");
      }
    } catch (e) {
      if (e !== "No current user") {
        errorMessage(e);
      }
    }
    setIsAuthenticating(false);
  };
  return (
    !isAuthenticating && (
      <div className="App py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 navbar">
          <Navbar.Brand className="font-weight-bold text-muted">
            <img src={Logo} className="logo" alt="logo" />
            Theater Booking System
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/bookings">
                    <Nav.Link>My Bookings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
