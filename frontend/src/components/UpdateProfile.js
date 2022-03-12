import { Card } from "react-bootstrap";
import UseForm from "./UseForm";

const UpdateProfile = ({ updateUser, setUpdateUser, onSubmit }) => {
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
  return (
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
  );
};

export default UpdateProfile;
