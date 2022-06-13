import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DisplayEducation = ({ user }) => {
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
          EDUCATION DETAILS
          <Button variant="light" onClick={() => navigate("/update/education")}>
            <FaEdit />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {user.education.map((element, index) => {
          return (
            <>
              <Card.Title className="text-limit">
                Course Name: {user.education[index].course}
              </Card.Title>
              <Card.Text>
                Institution: {user.education[index].institution}
                <br />
                Academic Year: {user.education[index].year}
                <br />
                Percentage/CGPA: {user.education[index].marks}
              </Card.Text>
            </>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default DisplayEducation;
