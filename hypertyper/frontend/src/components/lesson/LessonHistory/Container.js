import React from "react";
import { useTranslation } from "react-i18next";
import { useGetExercices } from "../../../hooks";
import { useParams } from "react-router-dom";
import Exercice from "./Exercice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import Loading from "../../common/Loading";
import ErrorAlert from "../../common/ErrorAlert";

const R = require("ramda");
const Container = ({ lastUpdate, setLastUpdate, handleClose, show }) => {
  const { t } = useTranslation();
  const { lessonId } = useParams();
  const exercicesFilters = `?lesson=${lessonId}`;
  const { data, loading, error } = useGetExercices(
    exercicesFilters,
    lastUpdate
  );
  if (!show) return <></>;

  let markup = null;

  if (loading) {
    markup = <Loading />;
  } else if (error) {
    markup = <ErrorAlert />;
  } else if (data && data.length) {
    markup = (
      <Accordion defaultActiveKey="0">
        {data.map((exercice, index) => (
          <Accordion.Item eventKey={index} key={exercice.id}>
            <Accordion.Header>{exercice.pub_date}</Accordion.Header>
            <Accordion.Body>
              <Exercice exercice={exercice} setLastUpdate={setLastUpdate} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }

  return (
    <Modal show={show && Boolean(R.prop("length", data))} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>History</Modal.Title>
      </Modal.Header>
      <Modal.Body>{markup}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Container;
