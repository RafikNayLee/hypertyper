import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ExerciceResult from "./ExerciceResult";
const LessonExerciceResultModal = ({
  score,
  lesson,
  loading,
  postExerciceClick,
  accuracy,
  mistakes,
  nb_words,
  wpm,
}) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
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
        <Modal.Title>{t("lesson.result")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExerciceResult
          exercice={{
            seconds: score,
            wpm: parseInt(`${lesson.nb_words / score / 60}`),
            accuracy,
            mistakes,
            nb_words,
            wpm,
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("close")}
        </Button>
        <Button variant="success" onClick={postExerciceClick}>
          {loading && <Spinner animation="border" role="status" size="sm" />}
          <FontAwesomeIcon icon={faSave} /> {t("lesson.save_result")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LessonExerciceResultModal;
