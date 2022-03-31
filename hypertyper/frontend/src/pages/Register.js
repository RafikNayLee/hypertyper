import React, { useState, useContext } from "react";
import TextField from "../components/form/TextField";
import { useRegisterHttp } from "../hooks";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

const R = require("ramda");

const Register = () => {
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
    <div>
      <h3>Register</h3>
      <div className="card mt-4">
        <div className="card-text p-2">
          <form>
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder={"Enter email"}
              help={"We'll never share your email with anyone else."}
              onChange={onChange}
              error={Boolean(R.path(["email"], error))}
              errorText={R.path(["email"], error)}
              value={values.email}
            />
            <TextField
              name="username"
              label="Username"
              placeholder={"Enter username"}
              help={"Mandatory field."}
              onChange={onChange}
              error={Boolean(R.path(["username", 0], error))}
              errorText={R.path(["username", 0], error)}
              value={values.username}
            />
            <TextField
              type={"password"}
              name="password"
              label="Password"
              placeholder={"Enter password"}
              help={"Mandatory field."}
              onChange={onChange}
              error={Boolean(R.path(["password", 0], error))}
              errorText={R.path(["password", 0], error)}
              value={values.password}
            />
            <TextField
              type={"password"}
              name="confirmPassword"
              label="Confirm Password"
              placeholder={"Confirm password"}
              help={"Mandatory field."}
              onChange={onChange}
              value={values.confirmPassword}
            />

            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
              Register
            </button>
            {non_field_errors && <ErrorAlert errorText={non_field_errors} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
