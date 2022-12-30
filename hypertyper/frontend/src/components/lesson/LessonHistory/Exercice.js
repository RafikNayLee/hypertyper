import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteExercice } from "../../../hooks";
import ExerciceResult from "../ExerciceResult";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Exercice = ({ exercice, setLastUpdate }) => {
  const { t } = useTranslation();
  const { deleteExercice } = useDeleteExercice({
    id: exercice.id,
    setLastUpdate,
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>
          <ExerciceResult exercice={exercice} />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="danger" onClick={deleteExercice}>
          <FontAwesomeIcon icon={faTrash} /> {t("delete")}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Exercice;
