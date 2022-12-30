import React, { useContext } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import { AuthContext } from "../context/auth";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Course from "../pages/Course";
import Section from "../pages/Section";
import Lesson from "../pages/Lesson";
import Header from "./layout/Header";

import Container from "react-bootstrap/Container";

//Localization
import { I18nextProvider } from "react-i18next";
import i18n from "../localization/i18n";
import { useTheme } from "../hooks";

const App = () => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  return (
    <Router basename="/app/">
      <I18nextProvider i18n={i18n}>
        <div
          style={{
            background: `linear-gradient(90deg, ${theme.palette.gray.main}, ${theme.palette.gray.light})`,
            minHeight: "100vh",
          }}
        >
          <Header />

          <Container className="mt-2">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/course/:courseId"
                element={<PrivateRoute auth={auth} />}
              >
                <Route exact path="/course/:courseId" element={<Course />} />
              </Route>
              <Route
                exact
                path="/course/:courseId/section/:sectionId"
                element={<PrivateRoute auth={auth} />}
              >
                <Route
                  exact
                  path="/course/:courseId/section/:sectionId"
                  element={<Section />}
                />
              </Route>
              <Route
                exact
                path="/course/:courseId/section/:sectionId/lesson/:lessonId"
                element={<PrivateRoute auth={auth} />}
              >
                <Route
                  exact
                  path="/course/:courseId/section/:sectionId/lesson/:lessonId"
                  element={<Lesson />}
                />
              </Route>

              <Route exact path="/register" element={<Register />} />

              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Container>
        </div>
      </I18nextProvider>
    </Router>
  );
};

export default App;
