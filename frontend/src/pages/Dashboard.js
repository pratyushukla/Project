import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import DisplayProfile from "../components/DisplayProfile";
import DisplayEducation from "../components/DisplayEducation";
import DisplayProjects from "../components/DisplayProjects";
import DisplaySkills from "../components/DisplaySkills";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
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
          <h2 className="text-center p-3">Welcome {user.profile.name}</h2>
          <div style={{ width: "70%", margin: "auto" }}>
            <DisplayProfile user={user} />
            <DisplayEducation user={user} />
            <DisplayProjects user={user} />
            <DisplaySkills user={user} />
            {/* <DisplayJobs user={user} /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
