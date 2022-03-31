import React from "react";
import Form from "react-bootstrap/Form";
const TextField = ({
  name,
  type,
  label,
  placeholder,
  help,
  value,
  onChange,
  error,
  errorText,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
      />
      <small id={`area-label-${name}`} className="form-text text-error">
        {errorText || help}
      </small>
    </Form.Group>
  );
};

TextField.defaultProps = {
  type: "text",
};

export default TextField;
