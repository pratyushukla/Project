import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import { UserContext } from "../UserContext";

const RecommendedJobs = ({ user }) => {
  //   const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: user.skills }),
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
    fetchData();
    return () => {};
  }, []);
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
          {/* <h1 className="text-center">Welcome {user.name}</h1> */}
          {/* <h1 className="text-center">Recommended Job Profiles</h1> */}
          <div className="row">
            {jobs.map((job, index) => (
              <>
                <div className="p-3">
                  <sapn className="text-limit">
                    <b>{job[0]} </b>
                  </sapn>
                  <br />
                  <span>Skills Required : {job[1]}</span>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedJobs;
