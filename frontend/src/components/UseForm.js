import React from "react";
import { Form, Button } from "react-bootstrap";

const UseForm = ({ title, inputs, buttonName, handleSubmit }) => {
  return (
    <div className="m-3">
      <h2 className="text-center">{title}</h2>
      <Form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <Form.Group className="mb-3" controlId={input[0]} key={input[0]}>
            <Form.Label>{input[0]}</Form.Label>
            {input[1] === "textarea" ? (
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={`Enter ${input[0]}`}
                required
              />
            ) : (
              <Form.Control
                type={input[1]}
                placeholder={`Enter ${input[0]}`}
                required
              />
            )}
            {/* <Form.Text className="text-muted">
              We'll never share your details with anyone else.
            </Form.Text> */}
          </Form.Group>
        ))}

        <Button variant="primary" type="submit">
          {buttonName}
        </Button>
      </Form>
    </div>
  );
};

export default UseForm;
