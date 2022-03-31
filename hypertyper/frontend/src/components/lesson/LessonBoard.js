import React from "react";
import { LessonWord } from ".";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: left;
  overflow: hidden;
`;

const LessonBoard = ({ lessonText, exerciceText, currentIndex }) => {
  // show 12 chars cuz I like 12
  const numberOfCharsToShow = 12;
  const lessonTextArr = lessonText.split("").map((char, index) => ({
    index,
    char,
  }));

  return (
    <Container>
      {lessonTextArr

        .slice(
          currentIndex > numberOfCharsToShow
            ? currentIndex - numberOfCharsToShow
            : 0,
          lessonTextArr.length
        )
        .map((lessonKey) => (
          <LessonWord
            key={lessonKey.index}
            word={{
              text: lessonKey.char,
              index: lessonKey.index,
              typed: Boolean(exerciceText.split("")[lessonKey.index]),
              correct:
                exerciceText.split("")[lessonKey.index] ===
                lessonTextArr[lessonKey.index]["char"],
              current: lessonKey.index === currentIndex,
            }}
          />
        ))}
    </Container>
  );
};

export default LessonBoard;
