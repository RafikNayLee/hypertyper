import React from "react";
import Form from "react-bootstrap/Form";

const LessonTextField = React.forwardRef(
  (
    {
      name,
      label,
      placeholder,
      help,
      value,
      onChange,
      error,
      errorText,
      disabled,
    },
    ref
  ) => {
    return (
      <Form.Group className="ml-1" controlId="formBasicPassword">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          style={{
            whiteSpace: "pre-line",
          }}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          ref={ref}
          type="text"
          disabled={disabled}
          autoComplete="off"
          as="textarea"
          rows={3}
        />
        <small id={`area-label-${name}`} className="form-text text-error">
          {errorText || help}
        </small>
      </Form.Group>
    );
  }
);

export default LessonTextField;
