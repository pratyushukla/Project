import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DisplayProjects = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Card
      bg="white"
      // text="primary"
      className="mx-auto text-left my-3 p-3 shadow h-100"
      // style={{ backgroundColor: "#fefae0" }}
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
        {user.projects.map((element, index) => {
          return (
            <>
              <Card.Title className="text-limit">
                Title: {user.projects[index].title}
              </Card.Title>
              <Card.Text>
                Date: {user.projects[index].date}
                <br />
                Description: {user.projects[index].description}
              </Card.Text>
            </>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default DisplayProjects;
