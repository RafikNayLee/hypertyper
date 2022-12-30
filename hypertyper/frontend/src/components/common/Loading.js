import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = ({ text }) => {
  const { t } = useTranslation();
  return (
    <LoadingDiv>
      <Spinner animation="grow" role="status" variant="primary"></Spinner>
      <div className="ml-2">{text || t("loading")}</div>
    </LoadingDiv>
  );
};

export default Loading;
