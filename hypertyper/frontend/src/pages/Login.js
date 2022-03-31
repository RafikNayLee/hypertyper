import React, { useState, useContext } from "react";
import { useLoginHttp } from "../hooks";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

import TextField from "../components/form/TextField";

import Spinner from "react-bootstrap/Spinner";
import ErrorAlert from "../components/common/ErrorAlert";

const R = require("ramda");

const Login = (props) => {
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
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          label="Username"
          placeholder={"Enter username"}
          help={"Mandatory field."}
          onChange={onChange}
          value={values.username}
          error={Boolean(R.path(["password"], error))}
          errorText={R.path(["password"], error)}
        />
        <TextField
          type={"password"}
          name="password"
          label="Password"
          placeholder={"Enter password"}
          help={"Mandatory field."}
          onChange={onChange}
          error={Boolean(R.path(["password"], error))}
          errorText={R.path(["password"], error)}
          value={values.password}
        />
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          {loading && <Spinner animation="border" role="status" size="sm" />}
          Login
        </button>
        {non_field_errors && <ErrorAlert errorText={non_field_errors} />}
      </form>
    </div>
  );
};

export default Login;
