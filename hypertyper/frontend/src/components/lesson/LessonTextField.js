import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useTheme } from "../../hooks";

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
    const theme = useTheme();
    const [active, setActive] = useState(false);

    const onSelect = (e) => {
      setActive(true);
    };

    useEffect(() => {
      if (disabled) setActive(false);
    }, [disabled]);

    return (
      <Form.Group className="ml-1" controlId="formBasicPassword">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          style={{
            whiteSpace: "pre-line",
            background: active
              ? `linear-gradient(90deg, ${theme.palette.primary.light}, white)`
              : "white",
            color: active ? theme.palette.primary.dark : "black",
          }}
          placeholder={placeholder}
          onChange={onChange}
          onSelect={onSelect}
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
