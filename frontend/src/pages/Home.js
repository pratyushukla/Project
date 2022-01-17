import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import { UserContext } from "../UserContext";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSkillSubmit = async (event) => {
    event.preventDefault();
    const skill = event.target[0].value;
    try {
      setIsLoading(true);
      const newReq = {
        skills: skill,
      };
      let response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReq),
      }).then((res) => res.json());
      setJobs(response);
      console.log(response);
      if (!!response.message) {
        throw new Error(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error : " + error);
    }
  };
  const onValueChange = (evt) => {
    setSkills(evt.target.value);
  };
  return (
    <>
      <div className="container">
        <UseForm
          title="Enter Skills"
          inputs={[{ name: "Skills", type: "text", value: skills }]}
          buttonName="Submit"
          onValueChange={onValueChange}
          handleSubmit={handleSkillSubmit}
        />
      </div>
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
          {/* <h1 className="text-center">Welcome {user.name}</h1> */}
          <h1 className="text-center">Recommended Job Profiles</h1>
          <div className="row">
            {jobs.map((job, index) => (
              <Card
                bg="secondary"
                text="white"
                className="mx-auto text-left my-2 p-3"
                style={{ width: "40rem" }}
                key={index}
              >
                <Card.Header></Card.Header>
                <Card.Body>
                  <Card.Title className="text-limit">{job[0]} </Card.Title>
                  <Card.Text>Skills Required : {job[1]}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
