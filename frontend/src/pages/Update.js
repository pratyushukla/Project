import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";

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
  const onSubmit = () => {};
  const onValueChange = (evt) => {
    const value = evt.target.value;
    setUpdateUser({
      ...updateUser,
      [evt.target.id.toLowerCase()]: value,
    });
  };
  const addEducation = () => {};
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
          <div className="row">
            {comp === "profile" && (
              <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                <UseForm
                  title="Personal Details"
                  inputs={[
                    { name: "Name", type: "text", value: updateUser.name },
                    { name: "Email", type: "email", value: updateUser.email },
                    { name: "Phone", type: "text", value: updateUser.phone },
                    { name: "Address", type: "textarea", value: "" },
                    { name: "Description", type: "textarea", value: "" },
                  ]}
                  onValueChange={onValueChange}
                  buttonName="Update"
                  handleSubmit={onSubmit}
                />
              </Card>
            )}
            {comp === "projects" && (
              <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                <UseForm
                  title="Personal Projects"
                  inputs={[
                    { name: "Title", type: "text", value: "" },
                    { name: "Date", type: "date", value: "" },
                    { name: "Description", type: "text", value: "" },
                  ]}
                  onValueChange={onValueChange}
                  buttonName="Update"
                  handleSubmit={onSubmit}
                />
              </Card>
            )}
            {comp === "education" && (
              <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                <UseForm
                  title="Educational Details"
                  inputs={[
                    { name: "Course Name", type: "text", value: "" },
                    { name: "Institution", type: "text", value: "" },
                    { name: "Academic Year", type: "text", value: "" },
                    { name: "Percentage/CGPA", type: "text", value: "" },
                  ]}
                  onValueChange={onValueChange}
                  buttonName="Update"
                  handleSubmit={onSubmit}
                />
                <Button onClick={() => addEducation()}>Add more</Button>
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
