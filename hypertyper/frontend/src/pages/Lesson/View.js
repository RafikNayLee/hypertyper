import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import LevelBadge from "../../components/common/LevelBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRedoAlt,
  faArrowRight,
  faHistory,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../components/layout/BreadCrumbs";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { KeyBoard } from "../../components/keyboard";
import Hands from "../../components/keyboard/Hands";

import styled from "styled-components";
import Loading from "../../components/common/Loading";

import {
  LessonTextField,
  LessonBoard,
  LessonHistory,
  LessonExerciceResultModal,
  Hints,
} from "../../components/lesson";
import { useMediaQuery, useNextKey, useTimer } from "../../hooks";
import { ErrorAlert, ButtonWithTooltip } from "../../components/common";
import Completed from "../../components/lesson/Completed";

const R = require("ramda");

const CenteredSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px darkgray;
`;
const getMistakes = ({ text = "", lessonText = "" }) => {
  const textList = text.split(" ");
  const lessonTextList = lessonText.split(" ");
  return textList.reduce((total, char, i) => {
    if (lessonTextList[i] !== char) {
      return [...total, char];
    } else {
      return total;
    }
  }, []);
};
const getAccuracy = ({ text = "", lessonText = "" }) => {
  const nb_words_lengh = lessonText.split(" ").length;
  return Math.round(
    ((nb_words_lengh - getMistakes({ text, lessonText }).length) /
      nb_words_lengh) *
      100
  );
};

const getWPM = ({ text = "", seconds = 0 }) => {
  const words = text.split(" ");
  return Math.round(words.length / seconds / 60);
};

const View = ({
  lesson,
  loading,
  error,
  lessonText,
  postExerciceClick,
  postExerciceLoading,
  high_score,
  lessonId,
  sectionId,
  courseId,
  lastUpdate,
  setLastUpdate,
  score,
  setScore,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [showHistory, setShowHistory] = useState(false);
  const { seconds, toggle, reset, isActive } = useTimer();
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [nextChar, setNextChar] = useState("");
  const [nextKeyLeft, nextKeyRight] = useNextKey(nextChar);

  const inputRef = React.createRef();

  const mistakes = getMistakes({
    text,
    lessonText,
  });
  const accuracy = getAccuracy({
    text,
    lessonText,
  });
  const wpm = getWPM({
    text,
    seconds,
  });
  const completed = Boolean(R.prop("completed_exercices", lesson));
  const nextLesson = R.prop("next_lesson", lesson);
  const endOfSequence = R.pathEq(["length"], currentIndex + 1)(lessonText);
  const progress = (text.split("").length / lessonText.split("").length) * 100;

  useEffect(() => {
    if (isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const resetExercice = () => {
    setCurrentIndex(-1);
    setNextChar("");
    setText("");
    reset();
  };

  useEffect(() => {
    if (lessonId && resetExercice) {
      setScore(0);
      resetExercice();
      setLastUpdate(new Date().getTime());
    }
  }, [lessonId]);

  const resetClick = (e) => {
    resetExercice();
  };

  const startTypingClick = (e) => {
    resetExercice();
    setCurrentIndex(0);
    setNextChar(lessonText[0]);
    toggle();
  };

  const showHistoryClick = (e) => {
    setShowHistory(true);
  };
  const hideHistoryClick = (e) => {
    setShowHistory(false);
  };

  const navigateToNextLesson = (e) =>
    navigate(`/course/${courseId}/section/${sectionId}/lesson/${nextLesson}`);

  const onChange = (e) => {
    const value = e.target.value;
    setText(value.replace(/(?:\r\n|\r|\n)/g, "\r"));
    const chars = value.split("");
    const charsLength = chars.length;
    setCurrentIndex(charsLength);
    setNextChar(lessonText[charsLength]);

    if (endOfSequence) {
      setScore(seconds);
      reset();
    }
  };

  const loadingMarkup = <Loading />;
  const errorMarkup = <ErrorAlert />;
  const actionButton = isActive ? (
    <ButtonWithTooltip
      variant="warning"
      onClick={resetClick}
      tooltipText={t("lesson.reset")}
    >
      <FontAwesomeIcon icon={faRedoAlt} />
    </ButtonWithTooltip>
  ) : (
    <ButtonWithTooltip
      variant="success"
      onClick={startTypingClick}
      tooltipText={t("lesson.start")}
    >
      <FontAwesomeIcon icon={faPlay} />
    </ButtonWithTooltip>
  );

  const nextLessonButton = (
    <ButtonWithTooltip
      onClick={navigateToNextLesson}
      tooltipText={t("lesson.next")}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </ButtonWithTooltip>
  );

  if (loading) {
    return loadingMarkup;
  }
  if (error) {
    return errorMarkup;
  }

  return lesson ? (
    <div>
      <BreadCrumbs
        lessonId={lessonId}
        lessonName={lesson.name}
        lessonBadge={<LevelBadge code={lesson.level_code} />}
        sectionId={sectionId}
        sectionName={lesson.section_name}
        courseId={courseId}
        courseName={lesson.course_name}
      />

      {isDesktop ? (
        <>
          <Row>
            <Col sm={8}>
              <KeyBoard
                nextKeyRight={nextKeyRight}
                nextKeyLeft={nextKeyLeft}
                // button={actionButton}
              />
            </Col>
            <Col>
              <Hands nextKeyRight={nextKeyRight} nextKeyLeft={nextKeyLeft} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Divider />
            </Col>
          </Row>

          <Row>
            <Col sm={5}>
              <Hints nextKey={nextKeyLeft} />
            </Col>
            <Col sm={2}></Col>
            <Col sm={5}>
              <Hints nextKey={nextKeyRight} />
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Alert variant={"warning"}>
                  {" "}
                  <FontAwesomeIcon icon={faDesktop} /> {t("better-on-desktop")}
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Card
        className="mb-1"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        <Card.Header>
          <Row className="justify-content-between">
            <Col>
              <Row>
                {completed && (
                  <Col>
                    <Completed high_score={high_score} />
                  </Col>
                )}
                <Col>
                  <ButtonWithTooltip
                    variant="primary"
                    onClick={showHistoryClick}
                    tooltipText={t("lesson.history")}
                  >
                    <FontAwesomeIcon icon={faHistory} />
                  </ButtonWithTooltip>
                </Col>
              </Row>
            </Col>

            <Col xs="6">
              {isActive && (
                <Row>
                  <Col>
                    <span>
                      {t("lesson.seconds_display", {
                        seconds,
                      })}
                    </span>
                  </Col>

                  <Col>
                    <span
                      style={{
                        color:
                          accuracy >= lesson.min_accuracy ? "green" : "red",
                      }}
                    >
                      {t("lesson.accuracy_display", {
                        accuracy,
                      })}
                    </span>
                  </Col>

                  <Col>
                    <span
                      style={{
                        color: wpm >= lesson.min_wpm ? "green" : "red",
                      }}
                    >
                      {t("lesson.wpm_display", {
                        wpm,
                      })}
                    </span>
                  </Col>
                </Row>
              )}
            </Col>
            <Col>
              <Row>
                <Col>{actionButton}</Col>
                {nextLesson && <Col>{nextLessonButton}</Col>}
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <LessonBoard
            lessonText={lessonText}
            exerciceText={text}
            currentIndex={currentIndex}
          />

          <LessonTextField
            ref={inputRef}
            disabled={!isActive}
            name="text"
            label=""
            placeholder={""}
            onChange={onChange}
            value={text}
          />
          {Boolean(progress) && (
            <ProgressBar striped variant="success" now={progress} />
          )}
        </Card.Body>
      </Card>

      {Boolean(score) && (
        <LessonExerciceResultModal
          score={score}
          lesson={lesson}
          postExerciceClick={postExerciceClick(text)}
          loading={postExerciceLoading}
          accuracy={accuracy}
          nb_words={text.split(" ").length}
          mistakes={mistakes}
          wpm={getWPM({
            text,
            seconds: score,
          })}
        />
      )}
      {showHistory && (
        <LessonHistory
          lastUpdate={lastUpdate}
          setLastUpdate={setLastUpdate}
          handleClose={hideHistoryClick}
          show={showHistory}
        />
      )}
    </div>
  ) : (
    loadingMarkup
  );
};

export default View;
