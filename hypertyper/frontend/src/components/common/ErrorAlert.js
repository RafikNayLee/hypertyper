import React from "react";
import { useTranslation } from "react-i18next";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const ErrorAlert = ({ errorText }) => {
  const { t } = useTranslation();
  return (
    <Row className="mt-2">
      <Col>
        <Alert variant={"danger"}>{errorText || t("error")}</Alert>
      </Col>
    </Row>
  );
};

export default ErrorAlert;
