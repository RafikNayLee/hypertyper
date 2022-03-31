import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
const LessonExerciceResultModel = ({ score, lesson, postExerciceClick }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (score) {
      handleShow();
    } else {
      handleClose();
    }
  }, [score]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>{`Score : ${score}`}</Col>
        </Row>
        <Row>
          <Col> {`WPM : ${parseInt(`${lesson.nb_words / score / 60}`)}`}</Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={postExerciceClick}>
          <FontAwesomeIcon icon={faSave} /> Save Results
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LessonExerciceResultModel;
