import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteExercice } from "../../../hooks";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Exercice = ({ exercice, setLastUpdate }) => {
  const { deleteExercice } = useDeleteExercice({
    id: exercice.id,
    setLastUpdate,
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>{`WPM : ${exercice.wpm}`} </Card.Text>
        <Card.Text>{`Seconds : ${exercice.seconds}`} </Card.Text>
        <Card.Text>
          {`Mistakes : ${exercice.mistakes.length} (${Math.round(
            (exercice.mistakes.length / exercice.nb_words) * 100
          )}%)`}{" "}
        </Card.Text>

        <Button variant="danger" onClick={deleteExercice}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Exercice;
