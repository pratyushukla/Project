import { Button, Card } from "react-bootstrap";
import UseForm from "./UseForm";

const UpdateSkills = ({ updateUser, setUpdateUser, onSubmit }) => {
  const onSkillsChange = (evt) => {
    const value = evt.target.value;
    setUpdateUser((prev) => {
      return {
        ...prev,
        skills: value,
      };
    });
  };

  return (
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
  );
};

export default UpdateSkills;
