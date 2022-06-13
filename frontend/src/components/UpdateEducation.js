import { Button, Card } from "react-bootstrap";
import UseForm from "./UseForm";

const UpdateEducation = ({ updateUser, setUpdateUser, onSubmit }) => {
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

  const removeEducation = () => {
    let newEd = updateUser.education;
    newEd.pop();
    setUpdateUser((prev) => {
      return {
        ...prev,
        education: [...newEd],
      };
    });
  };
  return (
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
          <Button variant="success" type="submit" onClick={() => onSubmit()}>
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
  );
};

export default UpdateEducation;
