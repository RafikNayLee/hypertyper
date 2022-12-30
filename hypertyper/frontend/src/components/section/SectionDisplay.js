import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import Completed from "../lesson/Completed";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SectionDisplay = ({ section }) => {
  const { t } = useTranslation();
  return (
    <>
      {section.lessons
        .sort((a, b) => a.order_n - b.order_n)
        .map((lesson) => (
          <Link
            key={`lesson-${lesson.id}`}
            className="list-group-item list-group-item-action"
            to={`/course/${section.course}/section/${section.id}/lesson/${lesson.id}`}
          >
            <Row className="flex-space-between">
              <Col xs="11">{`${t("lesson.title")} : ${lesson.name} `}</Col>
              <Col xs="1">
                {Boolean(lesson.completed_exercices) && <Completed />}
              </Col>
            </Row>
          </Link>
        ))}
    </>
  );
};

export default SectionDisplay;
