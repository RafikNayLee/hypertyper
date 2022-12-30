import React, { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../hooks";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const R = require("ramda");
const getNumberLessons = (course) =>
  course.sections.reduce(
    (totalLessons, curSection) => totalLessons + curSection.lessons.length,
    0
  );

const getCompletedLessons = (course) =>
  course.sections.reduce(
    (totalLessons, curSection) => [
      ...totalLessons,
      ...curSection.lessons.filter((l) => l.completed_exercices > 0),
    ],
    []
  );

const CourseCard = ({ course }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  });

  const navigateToCourse = (e) => navigate(`/course/${course.id}`);

  const number_lessons = getNumberLessons(course);
  const number_completed_lessons = getCompletedLessons(course).length;

  const completion_rate = Math.ceil(
    (number_completed_lessons / number_lessons) * 100
  );
  return (
    <Collapse in={show}>
      <div
        style={{
          width: "250px",
          boxShadow: theme.mixins.cardShadow,
        }}
      >
        <Card>
          <Card.Header>
            {course.name}{" "}
            {number_completed_lessons > 0 && (
              <Badge bg="success">{`${completion_rate}%`}</Badge>
            )}
          </Card.Header>
          <Card.Body>
            <Card.Text
              style={{
                fontSize: "0.8em",
              }}
            >
              {Boolean(number_completed_lessons) &&
                `${t("course.number_completed_lessons", {
                  number_lessons,
                  number_completed_lessons,
                })} `}
              {!Boolean(number_completed_lessons) &&
                `${t("course.number_lessons", {
                  number_lessons,
                })} `}
            </Card.Text>
            <Button
              onClick={navigateToCourse}
              variant={
                Boolean(number_completed_lessons) ? "success" : "secondary"
              }
            >
              {t(
                Boolean(number_completed_lessons)
                  ? "course.resume"
                  : "course.start"
              )}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Collapse>
  );
};

export default CourseCard;
