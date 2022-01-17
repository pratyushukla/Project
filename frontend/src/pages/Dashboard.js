import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseModal from "../components/UseModal";
import { UserContext } from "../UserContext";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    if (!user.isLoggedin) {
      navigate("/");
    }
    return () => {};
  }, []);

  // const handleShow = () => {
  //   setIsUpdate((prev) => !prev);
  // };
  return (
    <>
      {/* {isUpdate && (
        <UseModal
          show={isUpdate}
          handleShow={handleShow}
          title="Update"
          body={"test"}
          buttonName="Update"
          buttonHandle={handleUpdate}
        />
      )} */}
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center">Welcome {user.profile.name}</h1>
          <div className="row">
            <Card
              bg="secondary"
              text="white"
              className="mx-auto text-left my-2 p-3"
              style={{ width: "40rem" }}
            >
              <Card.Header>Profile</Card.Header>
              <Card.Body>
                <Card.Title className="text-limit">
                  Name: {user.profile.name}
                </Card.Title>
                <Card.Text>
                  Email: {user.profile.email}
                  <br />
                  Phone: {user.profile.phone}
                </Card.Text>
                <Button onClick={() => navigate("/update/profile")}>
                  Update
                </Button>
              </Card.Body>
            </Card>
            <Card
              bg="secondary"
              text="white"
              className="mx-auto text-left my-2 p-3"
              style={{ width: "40rem" }}
            >
              <Card.Header>Education Details</Card.Header>
              <Card.Body>
                <Card.Title className="text-limit">Course Name:</Card.Title>
                <Card.Text>
                  Institution:
                  <br />
                  Year:
                  <br />
                  Academic Year:
                  <br />
                  Percentage/CGPA:
                </Card.Text>
                <Button onClick={() => navigate("/update/education")}>
                  Update
                </Button>
              </Card.Body>
            </Card>
            <Card
              bg="secondary"
              text="white"
              className="mx-auto text-left my-2 p-3"
              style={{ width: "40rem" }}
            >
              <Card.Header>Personal Projects</Card.Header>
              <Card.Body>
                <Card.Title className="text-limit">Title:</Card.Title>
                <Card.Text>
                  Date:
                  <br />
                  Descriptipn:
                </Card.Text>
                <Button onClick={() => navigate("/update/projects")}>
                  Update
                </Button>
              </Card.Body>
            </Card>
            <Card
              bg="secondary"
              text="white"
              className="mx-auto text-left my-2 p-3"
              style={{ width: "40rem" }}
            >
              <Card.Header>Skills</Card.Header>
              <Card.Body>
                <Card.Title className="text-limit">Skills</Card.Title>
                <Card.Text>Skills:</Card.Text>
                <Button onClick={() => navigate("/update/projects")}>
                  Update
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
