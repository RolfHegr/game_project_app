import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import gamingLogo from "../resources/logo.gif";
import "../css/App.css";
// import { Container, Navbar } from "react-bootstrap";

export default function NavigationBar({
  showSignupModal,
  showLoginModal,
  handleLogout,
  activeUser,
}) {
  function createGreeting(user) {
    let greeting = "";
    const date = new Date();
    const hours = date.getHours();

    if (hours < 12) {
      return (greeting = `<div className="p1">Good Morning ${activeUser.firstName} ${activeUser.lastName}</div> `);
    }
    if (hours < 18) {
      greeting = `<div className="p1">Good afternoon ${
        activeUser.firstName || activeUser.email
      } ${activeUser.lastName || ""}</div> `;
    } else {
      greeting = `<div className="p1">Good Evening ${activeUser.firstName} ${activeUser.lastName}</div> `;
    }
    return greeting;
  }

  return (
    // <h1>NAVIGATION BAR - bootstrap crashed</h1>
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="light" variant="light">
      <Container>
        <Navbar.Brand className="px-4" href="/">
          <img
            height={30}
            width={30}
            src={gamingLogo}
            alt="gaming logo"
            className="mx-1"
          />
          <span className="p2">Gaming Center</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100 px-2">
            <Nav.Link href="/">
              <div className="p1">Home</div>
            </Nav.Link>
            {activeUser && (
              <Nav.Link href="/search-games">
                {" "}
                <div className="p1">Games</div>
              </Nav.Link>
            )}
            <div className="d-flex flex-direction-row justify-content-end w-100 justify-flex-end mx-4">
              {!activeUser && (
                <Nav.Link onClick={showLoginModal}>
                  {" "}
                  <div className="p1">Login</div>
                </Nav.Link>
              )}
              {!activeUser && (
                <Nav.Link onClick={showSignupModal}>
                  {" "}
                  <div className="p1">Sign-up</div>
                </Nav.Link>
              )}{" "}
              {activeUser && (
                <NavDropdown
                  title={createGreeting(activeUser)}
                  id="nav-dropdown"
                >
                  <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">
                    Profile Page
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item eventKey="4.3">
                    Something else here
                  </NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4" onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
