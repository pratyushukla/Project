import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DisplaySkills = ({ user }) => {
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
          SKILLS
          <Button variant="light" onClick={() => navigate("/update/skills")}>
            <FaEdit />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {/* <Card.Title className="text-limit">{user.skills}</Card.Title> */}
        <Card.Text>
          {user.skills.split(",").map((el) => {
            return (
              <>
                <Button variant="secondary" className="m-2" disabled>
                  {el}
                </Button>
              </>
            );
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DisplaySkills;
