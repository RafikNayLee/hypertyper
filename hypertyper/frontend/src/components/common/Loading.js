import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Loading = ({ text }) => {
  return (
    <Row>
      <Col>
        <Spinner animation="grow" role="status"></Spinner>
      </Col>
      <Col>
        <span>{text}</span>
      </Col>
    </Row>
  );
};

export default Loading;
