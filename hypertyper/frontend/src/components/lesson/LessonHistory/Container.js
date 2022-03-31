import React from "react";
import { useGetExercices } from "../../../hooks";
import { useParams } from "react-router-dom";
import Exercice from "./Exercice";

import Accordion from "react-bootstrap/Accordion";
const Container = ({ lastUpdate, setLastUpdate }) => {
  const { lessonId } = useParams();
  const exercicesFilters = `?lesson=${lessonId}`;
  const { data, loading, error } = useGetExercices(
    exercicesFilters,
    lastUpdate
  );
  const loadingMarkup = <h5>Loading ...</h5>;
  const errorMarkup = <h5>Error ...</h5>;

  if (error) return errorMarkup;
  if (loading) return loadingMarkup;
  if (data) {
    if (data.length < 1) return null;
    return (
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
  } else return loadingMarkup;
};

export default Container;
