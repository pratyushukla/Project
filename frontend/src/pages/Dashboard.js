import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setqueries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(async () => {
    if (!user.isLoggedin) {
      navigate("/");
    }
    try {
      setIsLoading(true);
      let response = await fetch(
        `http://localhost:5000/api/queries/${user.userid}`
      )
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error : " + err);
        });
      setIsLoading(false);
      setqueries(response);
    } catch (error) {
      console.log("Error : " + error);
    }
    return () => {};
  }, []);
  const handleQueryOpen = (queryID) => {
    navigate(`/query/${queryID}`);
  };
  return (
    <>
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
          <h1 className="text-center">Welcome {user.name}</h1>
          <div className="row">
            {queries.map((query) => (
              <Card
                bg="secondary"
                text="white"
                className="mx-auto text-left my-2 p-3"
                style={{ width: "40rem" }}
                key={query._id}
              >
                <Card.Header>{query.date}</Card.Header>
                <Card.Body>
                  <Card.Title className="text-limit">{query.query} </Card.Title>
                  <Card.Text>
                    <p>
                      Name : {query.name}
                      <br />
                      Email : {query.email}
                    </p>
                  </Card.Text>
                  <Button onClick={() => handleQueryOpen(query._id)}>
                    Open
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
