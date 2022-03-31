import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const ErrorAlert = ({ errorText }) => {
  return (
    <Row className="mt-2">
      <Col>
        <Alert variant={"danger"}>{errorText}</Alert>
      </Col>
    </Row>
  );
};

export default ErrorAlert;
