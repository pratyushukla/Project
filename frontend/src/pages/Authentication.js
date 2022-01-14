import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import UseModal from "../components/UseModal";
import { UserContext } from "../UserContext";

const Authentication = () => {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user.isLoggedin) {
      navigate("/dashboard");
    }
    return () => {};
  }, [user]);
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let newStudent = {
        email: event.target[0].value,
        password: event.target[1].value,
      };
      // console.log(newStudent);
      let response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      }).then((res) => res.json());
      console.log(response);
      if (!!response.message) {
        console.log(response);
        throw new Error(response.message);
      } else {
        console.log("setIsLoading");
        setIsLoading(false);
        console.log("setUser");
        setUser({
          isLoggedin: true,
          userid: response._id,
          name: response.name,
          email: response.email,
        });
      }
    } catch (error) {
      console.log("setIsLoading");
      setIsLoading(false);
      setError(error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let newUser = {
        name: event.target[0].value,
        phone: event.target[1].value,
        email: event.target[2].value,
        password: event.target[3].value,
      };
      // console.log(newStudent);
      let response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then((res) => res.json());
      console.log(response);
      if (!!response.message) {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const handleShow = () => {
    setError((prev) => !prev);
  };

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
      ) : loginMode ? (
        <Card className="mx-auto my-5" style={{ width: "40rem" }}>
          <UseForm
            title="Login"
            inputs={[
              ["Email", "email"],
              ["Password", "password"],
            ]}
            buttonName="Login"
            handleSubmit={handleLogin}
          />
          <Button variant="info" onClick={() => setLoginMode(false)}>
            Switch to signup mode
          </Button>
        </Card>
      ) : (
        <Card className="mx-auto my-5" style={{ width: "40rem" }}>
          <UseForm
            title="Signup"
            inputs={[
              ["Name", "text"],
              ["Phone", "text"],
              ["Email", "email"],
              ["Password", "password"],
            ]}
            buttonName="Signup"
            handleSubmit={handleSignup}
          />
          <Button variant="info" onClick={() => setLoginMode(true)}>
            Switch to login mode
          </Button>
        </Card>
      )}
    </>
  );
};

export default Authentication;
