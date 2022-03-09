import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseForm from "../components/UseForm";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import UseModal from "../components/UseModal";

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
    console.log("test", updateUser);
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
        console.log("updating", response);
        setUser({
          ...response,
          isLoggedin: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const onValueChange = (evt) => {
    const value = evt.target.value;
    setUpdateUser({
      ...updateUser,
      [evt.target.id.toLowerCase()]: value,
    });
  };
  console.log(updateUser);

  const onProfileChange = (evt) => {
    const value = evt.target.value;
    console.log(value);
    setUpdateUser((prev) => {
      return {
        ...prev,
        profile: { ...prev.profile, [evt.target.id]: value },
      };
    });
  };

  const onEducationChange = (evt) => {
    const value = evt.target.value;
    const id = evt.target.id;
    const index = id.slice(-1);
    console.log(index);
    const newEd = updateUser.education;
    newEd[index] = { ...newEd[index], [evt.target.id.slice(0, -1)]: value };
    setUpdateUser((prev) => {
      return {
        ...prev,
        education: newEd,
      };
    });
  };
  const onProjectChange = (evt) => {
    const value = evt.target.value;
    const id = evt.target.id;
    const index = id.slice(-1);
    console.log(index);
    const newProj = updateUser.projects;
    newProj[index] = { ...newProj[index], [evt.target.id.slice(0, -1)]: value };
    setUpdateUser((prev) => {
      return {
        ...prev,
        projects: newProj,
      };
    });
  };

  const onSkillsChange = (evt) => {
    const value = evt.target.value;
    setUpdateUser((prev) => {
      return {
        ...prev,
        skills: value,
      };
    });
  };

  const addEducation = () => {
    setUpdateUser((prev) => {
      return {
        ...prev,
        education: [
          ...prev.education,
          {
            course: "",
            institution: "",
            year: "",
            marks: "",
          },
        ],
      };
    });
  };

  const addProject = () => {
    setUpdateUser((prev) => {
      return {
        ...prev,
        projects: [...prev.projects, { title: "", date: "", description: "" }],
      };
    });
  };

  const removeEducation = () => {
    let newEd = updateUser.education;
    newEd.pop();
    setUpdateUser((prev) => {
      return {
        ...prev,
        projetcs: [...newEd],
      };
    });
  };

  const removeProject = () => {
    let newProj = updateUser.projects;
    newProj.pop();
    setUpdateUser((prev) => {
      return {
        ...prev,
        projetcs: [...newProj],
      };
    });
  };

  const handleShow = () => {
    setError((prev) => !prev);
  };
  console.log(updateUser);
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
              <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                <UseForm
                  title="Personal Details"
                  inputs={[
                    {
                      name: "Name",
                      type: "text",
                      value: updateUser.profile.name,
                      id: "name",
                    },
                    {
                      name: "Email",
                      type: "email",
                      value: updateUser.profile.email,
                      id: "email",
                    },
                    {
                      name: "Phone",
                      type: "text",
                      value: updateUser.profile.phone,
                      id: "phone",
                    },
                    {
                      name: "Address",
                      type: "textarea",
                      value: updateUser.profile.address,
                      id: "address",
                    },
                    {
                      name: "Description",
                      type: "textarea",
                      value: updateUser.profile.description,
                      id: "description",
                    },
                  ]}
                  onValueChange={onProfileChange}
                  buttonName="Update"
                  handleSubmit={onSubmit}
                />
              </Card>
            )}
            {comp === "education" && (
              <>
                {updateUser.education.map((element, index) => {
                  return (
                    <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                      <UseForm
                        title={`Educational Details ${index + 1}`}
                        inputs={[
                          {
                            name: "Course Name",
                            type: "text",
                            value: updateUser.education[index].course,
                            id: `course${index}`,
                          },
                          {
                            name: "Institution",
                            type: "text",
                            value: updateUser.education[index].institution,
                            id: `institution${index}`,
                          },
                          {
                            name: "Academic Year",
                            type: "text",
                            value: updateUser.education[index].year,
                            id: `year${index}`,
                          },
                          {
                            name: "Percentage/CGPA",
                            type: "text",
                            value: updateUser.education[index].marks,
                            id: `marks${index}`,
                          },
                        ]}
                        onValueChange={onEducationChange}
                        buttonName={null}
                        handleSubmit={onSubmit}
                      />
                    </Card>
                  );
                })}
                <div className="d-flex justify-content-around">
                  <div>
                    <Button variant="danger" onClick={() => removeEducation()}>
                      Remove
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={() => onSubmit()}
                    >
                      Update
                    </Button>
                  </div>
                  <div>
                    <Button variant="warning" onClick={() => addEducation()}>
                      Add more
                    </Button>
                  </div>
                </div>
              </>
            )}
            {comp === "projects" && (
              <>
                {updateUser.projects.map((element, index) => {
                  return (
                    <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                      <UseForm
                        title={`Project Details ${index + 1}`}
                        inputs={[
                          {
                            name: "Title",
                            type: "text",
                            value: updateUser.projects[index].title,
                            id: `title${index}`,
                          },
                          {
                            name: "Date",
                            type: "date",
                            value: updateUser.projects[index].date,
                            id: `date${index}`,
                          },
                          {
                            name: "Description",
                            type: "text",
                            value: updateUser.projects[index].description,
                            id: `description${index}`,
                          },
                        ]}
                        onValueChange={onProjectChange}
                        buttonName={null}
                        handleSubmit={onSubmit}
                      />
                    </Card>
                  );
                })}
                <div className="d-flex justify-content-around">
                  <div>
                    <Button variant="danger" onClick={() => removeProject()}>
                      Remove
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={() => onSubmit()}
                    >
                      Update
                    </Button>
                  </div>
                  <div>
                    <Button variant="warning" onClick={() => addProject()}>
                      Add more
                    </Button>
                  </div>
                </div>
              </>
            )}
            {comp === "skills" && (
              <Card className="mx-auto my-5" style={{ width: "40rem" }}>
                <UseForm
                  title="Skills"
                  inputs={[
                    {
                      name: "Skills",
                      type: "text",
                      value: updateUser.skills,
                      id: "skills",
                    },
                  ]}
                  onValueChange={onSkillsChange}
                  buttonName="Update"
                  handleSubmit={onSubmit}
                />
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
