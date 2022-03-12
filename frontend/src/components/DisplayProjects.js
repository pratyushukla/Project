import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DisplayProjects = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Card
      bg="white"
      // text="primary"
      className="mx-auto text-left my-2 p-3"
      // style={{ width: "40rem" }}
    >
      <Card.Header>
        <div className="d-flex justify-content-between">
          PERSONAL PROJECTS
          <Button variant="light" onClick={() => navigate("/update/projects")}>
            <FaEdit />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="text-limit">
          Title: {user.projects[0].title}
        </Card.Title>
        <Card.Text>
          Date: {user.projects[0].date}
          <br />
          Description: {user.projects[0].description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DisplayProjects;
