import React, { useState, useContext } from "react";
import TextField from "../components/form/TextField";
import { useRegisterHttp } from "../hooks";
import { AuthContext } from "../context/auth";
import { Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import { AvatarCard } from "../components/common";
import { Col, Row } from "react-bootstrap";

const R = require("ramda");

const Register = () => {
  const { t } = useTranslation();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const { mutate, data, error, loading } = useRegisterHttp();
  const non_field_errors = R.path(["non_field_errors", 0], error);

  const success_callback = (data) => {
    login({
      token: data.token,
      ...data.user,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    mutate({
      options: {
        ...values,
      },
      success_callback,
    });
  };
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        position: "relative",
        paddingTop: 80,
      }}
    >
      <AvatarCard>
        <form>
          <Row>
            <Col sm="4">
              <TextField
                name="username"
                label={t("register.username.label")}
                placeholder={t("register.username.placeholder")}
                help={t("register.username.help")}
                onChange={onChange}
                error={Boolean(R.path(["username", 0], error))}
                errorText={R.path(["username", 0], error)}
                value={values.username}
              />
            </Col>
            <Col sm="8">
              <TextField
                type="email"
                name="email"
                label={t("register.email.label")}
                placeholder={t("register.email.placeholder")}
                help={t("register.email.help")}
                onChange={onChange}
                error={Boolean(R.path(["email", 0], error))}
                errorText={R.path(["email", 0], error)}
                value={values.email}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <TextField
                type={"password"}
                name="password"
                label={t("register.password.label")}
                placeholder={t("register.password.placeholder")}
                help={t("register.password.help")}
                onChange={onChange}
                error={Boolean(R.path(["password", 0], error))}
                errorText={R.path(["password", 0], error)}
                value={values.password}
              />
            </Col>

            <Col sm="6">
              <TextField
                type={"password"}
                name="confirmPassword"
                label={t("register.confirmPassword.label")}
                placeholder={t("register.confirmPassword.placeholder")}
                help={t("register.confirmPassword.help")}
                onChange={onChange}
                error={Boolean(R.path(["confirmPassword", 0], error))}
                errorText={R.path(["confirmPassword", 0], error)}
                value={values.confirmPassword}
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/login">{t("register.already_have_account")}</Link>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
              {t("register.title")}
            </button>
          </div>

          {non_field_errors && <ErrorAlert errorText={non_field_errors} />}
        </form>
      </AvatarCard>
    </div>
  );
};

export default Register;
