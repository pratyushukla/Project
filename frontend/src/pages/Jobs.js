import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import { UserContext } from "../UserContext";
import { MdOutlineLocationOn, MdWorkOutline } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import UseModal from "../components/UseModal";

const Jobs = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const run = () => {
      console.log(user);
      if (!user.isLoggedin) {
        navigate("/");
      }
    };
    run();
    // return () => {};
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: user.skills }),
        }).then((res) => res.json());
        console.log(response);
        setJobs(response);
        if (!!response.message) {
          throw new Error(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error : " + error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, []);
  const handleShow = () => {
    setError((prev) => !prev);
  };
  return (
    <>
      <h1 className="text-center">Recommended Job Profiles</h1>
      {!!error && (
        <UseModal
          show={!!error}
          handleShow={handleShow}
          title="Alert"
          body={error.message}
          buttonName="Understood"
          buttonHandle={handleShow}
        />
      )}
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
          <div className="row">
            {jobs.map((job, index) => (
              <>
                <div className="col-lg-4 col-md-6 my-2">
                  <Card className="h-100 shadow">
                    <Card.Header>{job.title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{job.company}</Card.Title>
                      <Card.Text>
                        <span className="d-block py-1">
                          <MdWorkOutline /> {job.experience}
                        </span>
                        <span className="d-block py-1">
                          <BiRupee /> {job.salary}
                        </span>
                        <span className="d-block py-1">
                          <MdOutlineLocationOn /> {job.location}
                        </span>
                        <span className="d-block py-1">{job.skill}</span>
                      </Card.Text>
                    </Card.Body>
                    <div className="d-flex justify-content-end p-3">
                      <a
                        className="btn btn-primary"
                        href={job.link}
                        target="_blank"
                      >
                        Apply
                      </a>
                    </div>
                  </Card>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
