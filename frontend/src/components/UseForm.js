import React from "react";
import { Form, Button } from "react-bootstrap";

const UseForm = ({
  title,
  inputs,
  buttonName,
  onValueChange,
  handleSubmit,
}) => {
  return (
    <div className="m-3">
      <h2 className="text-center">{title}</h2>
      <Form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <Form.Group className="mb-3" controlId={input.id} key={index}>
            <Form.Label>{input.name}</Form.Label>
            {input.type === "textarea" && (
              <Form.Control
                as="textarea"
                rows={3}
                value={input.value}
                placeholder={`Enter ${input.name}`}
                onChange={onValueChange || null}
      
              />
            )}
            {input.type === "password" && (
              <Form.Control
                type={input.type}
                placeholder={`Enter ${input.name}`}
                required
              />
            )}
            {input.type !== "password" && input.type !== "textarea" && (
              <Form.Control
                type={input.type}
                placeholder={`Enter ${input.name}`}
                value={input.value}
                onChange={onValueChange}
                required
              />
            )}
            {/* <Form.Text className="text-muted">
              We'll never share your details with anyone else.
            </Form.Text> */}
          </Form.Group>
        ))}

        {buttonName && (
          <Button variant="success" type="submit">
            {buttonName}
          </Button>
        )}
      </Form>
    </div>
  );
};

export default UseForm;
