import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RecommendedJobs from "./RecommendedJobs";

const DisplayJobs = ({ user }) => {
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
          RECOMMENDED JOB PROFILES
          {/* <Button
                    variant="light"
                    onClick={() => navigate("/update/skills")}
                  >
                    <FaEdit />
                  </Button> */}
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="text-limit"></Card.Title>
        <Card.Text>
          <RecommendedJobs user={user} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DisplayJobs;
