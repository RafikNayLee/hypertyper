import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useGetCourses } from "../hooks";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import CourseCard from "../components/course/CourseCard";

import Loading from "../components/common/Loading";
import ErrorAlert from "../components/common/ErrorAlert";

import CoursesTitle from "../components/course/CoursesTitle";

const R = require("ramda");

const Home = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { getTokenOptions, isAuthenticated } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetCourses();

  useEffect(() => {
    if (isAuthenticated)
      mutate({
        options: {
          params: {
            locale: language,
          },
          ...getTokenOptions(),
        },
      });
  }, [isAuthenticated, language]);

  const loadingMarkup = <Loading />;
  if (loading) return loadingMarkup;
  if (error) return <ErrorAlert />;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const coursesMarkup =
    data && data.length ? (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          rowGap: "2px",
          columnGap: "10px",
        }}
      >
        {data.map((course, i) => (
          <CourseCard course={course} key={`course-${course.id}-accordion`} />
        ))}
      </div>
    ) : (
      <ErrorAlert errorText={t("course.no_data")} />
    );

  return (
    <div>
      <CoursesTitle />

      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {coursesMarkup}
      </div>
    </div>
  );
};

export default Home;
