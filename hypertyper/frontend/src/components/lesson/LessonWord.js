import React from "react";
import styled from "styled-components";

const Word = styled.span`
  font-size: ${({ current }) => (current ? "1.2rem" : "1.2rem")};
  color: ${({ correct, typed }) =>
    correct ? "green" : typed ? "red" : "gray"};
  margin-right: ${({ text }) => (text === " " ? "5px" : "0px")};
  text-decoration: ${({ current }) => (current ? "underline" : "none")};
  text-decoration-thickness: 5px;
  text-decoration-color: darkgray;
`;

const getTextValue = (text) => {
  if (text === "\r") {
    return "↵";
  } else return text;
};

const LessonWord = ({ word: { text, index, typed, correct, current } }) => {
  return (
    <Word typed={typed} correct={correct} text={text} current={current}>
      {getTextValue(text)}
    </Word>
  );
};

export default LessonWord;
