import React from "react";
import { useTranslation } from "react-i18next";
import Row from "react-bootstrap/Row";

const ExerciceResult = ({ exercice }) => {
  const { t } = useTranslation();
  const { wpm, seconds, mistakes, nb_words, accuracy } = exercice;
  return (
    <>
      <Row>
        {t(`lesson.wpm_display`, {
          wpm: wpm || nb_words,
        })}{" "}
      </Row>
      <Row>
        {t(`lesson.seconds_display`, {
          seconds,
        })}{" "}
      </Row>
      <Row>
        {t(`lesson.mistakes_display`, {
          nbr_mistakes: mistakes.length,
          percent: Math.round((mistakes.length / nb_words) * 100),
        })}
      </Row>
      <Row>
        {t(`lesson.accuracy_display`, {
          accuracy,
        })}{" "}
      </Row>
    </>
  );
};

ExerciceResult.defaultProps = {
  exercice: {},
};

export default ExerciceResult;
