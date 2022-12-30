import React, { useState, useContext } from "react";
import { useLoginHttp } from "../hooks";
import { AuthContext } from "../context/auth";
import { Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "../components/form/TextField";

import Spinner from "react-bootstrap/Spinner";

import { ErrorAlert, AvatarCard } from "../components/common";

const R = require("ramda");

const Login = (props) => {
  const { t } = useTranslation();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { data, loading, error, mutate } = useLoginHttp();
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
        paddingTop: 80,
        position: "relative",
      }}
    >
      <AvatarCard>
        <form
          onSubmit={onSubmit}
          style={{
            position: "relative",
          }}
        >
          <TextField
            name="username"
            label={t("login.username.label")}
            placeholder={t("login.username.placeholder")}
            help={t("login.username.help")}
            onChange={onChange}
            value={values.username}
            error={Boolean(R.path(["username", 0], error))}
            errorText={R.path(["username", 0], error)}
          />
          <TextField
            type={"password"}
            name="password"
            label={t("login.password.label")}
            placeholder={t("login.password.placeholder")}
            help={t("login.password.help")}
            onChange={onChange}
            error={Boolean(R.path(["password", 0], error))}
            errorText={R.path(["password", 0], error)}
            value={values.password}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/register">{t("login.create_new_account")}</Link>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
              {t("login.title")}
            </button>
          </div>

          {non_field_errors && <ErrorAlert errorText={non_field_errors} />}
        </form>
      </AvatarCard>
    </div>
  );
};

export default Login;
