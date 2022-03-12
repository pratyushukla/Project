import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import UseModal from "../components/UseModal";
import UpdateProfile from "../components/UpdateProfile";
import UpdateEducation from "../components/UpdateEducation";
import UpdateProjects from "../components/UpdateProjects";
import UpdateSkills from "../components/UpdateSkills";

const Update = () => {
  const [user, setUser] = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(async () => {
    if (!user.isLoggedin) {
      navigate("/");
    }
    return () => {};
  }, []);
  const { comp } = useParams();
  const onSubmit = async (event) => {
    if (event) event.preventDefault();
    setIsLoading(true);
    // console.log("test", updateUser);
    try {
      let response = await fetch(`http://localhost:5000/api/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
      }).then((res) => res.json());
      if (!!response.message) {
        throw new Error(response.message);
      } else {
        setIsLoading(false);
        // console.log("updating", response);
        setUser({
          ...response,
          isLoggedin: true,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleShow = () => {
    setError((prev) => !prev);
  };
  // console.log(updateUser);
  return (
    <>
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
          <div className="row">
            {comp === "profile" && (
              <UpdateProfile
                updateUser={updateUser}
                setUpdateUser={setUpdateUser}
                onSubmit={onSubmit}
              />
            )}
            {comp === "education" && (
              <UpdateEducation
                updateUser={updateUser}
                setUpdateUser={setUpdateUser}
                onSubmit={onSubmit}
              />
            )}
            {comp === "projects" && (
              <UpdateProjects
                updateUser={updateUser}
                setUpdateUser={setUpdateUser}
                onSubmit={onSubmit}
              />
            )}
            {comp === "skills" && (
              <UpdateSkills
                updateUser={updateUser}
                setUpdateUser={setUpdateUser}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
