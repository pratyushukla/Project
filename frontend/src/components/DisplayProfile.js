import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DisplayProfile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Card
      bg="white"
      // text="primary"
      className="mx-auto text-left my-3 p-3 shadow"
      // style={{ backgroundColor: "#fefae0" }}
    >
      <Card.Header>
        <div className="d-flex justify-content-between">
          PROFILE
          <Button variant="light" onClick={() => navigate("/update/profile")}>
            <FaEdit />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="text-limit">
          Name: {user.profile.name}
        </Card.Title>
        <Card.Text>
          Email: {user.profile.email}
          <br />
          Phone: {user.profile.phone}
          <br />
          Address: {user.profile.address}
          <br />
          Description: {user.profile.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DisplayProfile;
