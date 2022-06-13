import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../UserContext";

const UseNav = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}>
        {/* style={{ backgroundColor: "#14213d" }} */}
        <Container>
          <Nav.Link as={Link} to="/">
            <h2 className="mx-2 text-secondary">Online Portfolio</h2>
          </Nav.Link>
          <Nav>
            {/* <Nav.Link as={Link} to="/">
              <Button className="btn btn-light mx-2">Home</Button>
            </Nav.Link> */}

            {!user.isLoggedin && (
              <Nav.Link as={Link} to="/" className="mx-2 border-bottom">
                <h5 className="text-secondary mx-2">Authentication</h5>
              </Nav.Link>
            )}
            {user.isLoggedin && (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className="mx-2 border-bottom"
                >
                  <h5 className="text-secondary ">Dashboard</h5>
                </Nav.Link>
                <Nav.Link as={Link} to="/jobs" className="mx-2 border-bottom">
                  <h5 className="text-secondary mx-2">Jobs</h5>
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" className="mx-2 border-bottom">
                  <h5 className="text-secondary mx-2">Logout</h5>
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
