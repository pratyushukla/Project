import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../UserContext";

const UseNav = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="me-auto">Online Portfolio</Navbar.Brand>
          <Nav>
            {/* <Nav.Link as={Link} to="/">
              <Button className="btn btn-light mx-2">Home</Button>
            </Nav.Link> */}

            {!user.isLoggedin && (
              <Nav.Link as={Link} to="/">
                <Button className="btn btn-light mx-2">Authentication</Button>
              </Nav.Link>
            )}
            {user.isLoggedin && (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <Button className="btn btn-light mx-2">Dashboard</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  <Button className="btn btn-light mx-2">Logout</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default UseNav;
