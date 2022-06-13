import { Button, Card } from "react-bootstrap";
import UseForm from "./UseForm";

const UpdateProjects = ({ updateUser, setUpdateUser, onSubmit }) => {
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

  const addProject = () => {
    setUpdateUser((prev) => {
      return {
        ...prev,
        projects: [...prev.projects, { title: "", date: "", description: "" }],
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

  return (
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
                  type: "month",
                  value: updateUser.projects[index].date,
                  id: `date${index}`,
                },
                {
                  name: "Description",
                  type: "textarea",
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
          <Button variant="success" type="submit" onClick={() => onSubmit()}>
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
  );
};

export default UpdateProjects;
