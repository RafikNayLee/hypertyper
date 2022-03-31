import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  LessonTextField,
  LessonBoard,
  LessonHistory,
  LessonExerciceResultModel,
  Hints,
} from "../components/lesson";
import { useGetLesson, useNextKey, usePostExercice, useTimer } from "../hooks";
import { AuthContext } from "../context/auth";
import LevelBadge from "../components/common/LevelBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../components/layout/BreadCrumbs";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { KeyBoard } from "../components/keyboard";
import Hands from "../components/keyboard/Hands";

import styled from "styled-components";
import Loading from "../components/common/Loading";

const R = require("ramda");

const sanitizeLessonText = (text) => {
  return text
    .split("")
    .filter((r) => r !== "\n")
    .join("");
};

const CenteredSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px darkgray;
`;

const Lesson = () => {
  const { user, getTokenOptions } = useContext(AuthContext);
  const [lastUpdate, setLastUpdate] = useState(0);
  const { seconds, toggle, reset, isActive } = useTimer();
  const [score, setScore] = useState(0);
  const [lessonText, setLessonText] = useState("");
  const [text, setText] = useState("");
  const [lastChar, setLastChar] = useState("");
  const [nextChar, setNextChar] = useState("");
  const [nextKeyLeft, nextKeyRight] = useNextKey(nextChar);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { lessonId, sectionId, courseId } = useParams();
  const { data, loading, error } = useGetLesson(lessonId);

  const { mutate: postExercice } = usePostExercice();
  const inputRef = React.createRef();
  const endOfSequence = R.pathEq(["length"], currentIndex + 1)(lessonText);
  const progress = data
    ? (text.split("").length / lessonText.split("").length) * 100
    : 0;

  const postExerciceClick = (e) => {
    const success_callback = (data) => {
      setScore(0);
      setLastUpdate(new Date().getTime());
    };
    postExercice({
      config: {
        ...getTokenOptions(),
      },
      options: {
        text,
        seconds: score,
        lesson: lessonId,
        user: user.id,
      },
      success_callback,
    });
  };
  const startTypingClick = (e) => {
    setCurrentIndex(0);
    setNextChar(lessonText[0]);
    setText("");
    toggle();
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (data && data.text) {
      setLessonText(sanitizeLessonText(data.text));
    }
  }, [data]);

  const onChange = (e) => {
    const value = e.target.value;
    setText(value.replace(/(?:\r\n|\r|\n)/g, "\r"));
    const chars = value.split("");
    const charsLength = chars.length;
    setLastChar(chars[chars.length - 1]);
    setCurrentIndex(charsLength);
    setNextChar(data ? lessonText[charsLength] : "");

    if (endOfSequence) {
      setScore(seconds);
      reset();
    }
  };

  const loadingMarkup = <Loading text="Loading Lesson ..." />;
  const errorMarkup = <h3>An error occured</h3>;
  if (loading) {
    return loadingMarkup;
  }
  if (error) {
    return errorMarkup;
  }
  if (data) {
    return (
      <div>
        <BreadCrumbs
          lessonId={lessonId}
          lessonName={data.name}
          lessonBadge={<LevelBadge code={data.level_code} />}
          sectionId={sectionId}
          sectionName={data.section_name}
          courseId={courseId}
          courseName={data.course_name}
        />
        <Row>
          <Col sm={8}>
            <KeyBoard nextKeyRight={nextKeyRight} nextKeyLeft={nextKeyLeft} />
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
          <Col sm={2}>
            <CenteredSpan>
              <Button
                variant="success"
                onClick={startTypingClick}
                disabled={isActive || endOfSequence}
              >
                <FontAwesomeIcon icon={faFileText} />{" "}
                {isActive ? seconds : "Start Typing"}
              </Button>
            </CenteredSpan>
          </Col>
          <Col sm={5}>
            <Hints nextKey={nextKeyRight} />
          </Col>
        </Row>

        <Card
          className="mb-1"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
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
          <LessonExerciceResultModel
            score={score}
            lesson={data}
            postExerciceClick={postExerciceClick}
          />
        )}

        {/* <LessonHistory lastUpdate={lastUpdate} setLastUpdate={setLastUpdate} /> */}
      </div>
    );
  } else {
    return loadingMarkup;
  }
};

export default Lesson;
