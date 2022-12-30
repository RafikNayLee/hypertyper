import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../components/common/ErrorAlert";
import Loading from "../components/common/Loading";
import CourseDisplay from "../components/course/CourseDisplay";
import BreadCrumbs from "../components/layout/BreadCrumbs";
import {
  useGetCourse,
  useGetExercices,
  useChartDimensions,
  useTheme,
  useGetUserProgression,
} from "../hooks";

import ProgressBar from "react-bootstrap/ProgressBar";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import * as d3 from "d3";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";

const R = require("ramda");

const loadingMarkup = <Loading />;

const Course = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { courseId } = useParams();
  const { data, loading: courseLoading, error } = useGetCourse(courseId);
  const { data: exercicesData, loading: exerciceLoading } = useGetExercices();
  const { data: userProgressionData } = useGetUserProgression(courseId);
  const loading = exerciceLoading || courseLoading;
  const dimensions = useChartDimensions();

  const exercicesDataFilteredByCourseId = R.filter(
    R.propEq("course_id", courseId)
  )(exercicesData || []);

  const exercicesDataFilteredByLocale = R.filter(R.propEq("locale", language))(
    exercicesDataFilteredByCourseId || []
  );

  const xAccessor = R.pipe(
    R.prop("pub_date"),
    (s) => (s ? s.substring(0, 10) : ""),
    d3.timeParse("%Y-%m-%d")
  );

  if (loading) return loadingMarkup;
  if (error) return <ErrorAlert />;
  if (data)
    return (
      <div>
        <BreadCrumbs
          lessonId={null}
          lessonName={null}
          sectionId={null}
          sectionName={null}
          courseId={courseId}
          courseName={data.name}
        />
        <div className="mb-1">
          {Boolean(userProgressionData) && (
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip
                  id={`${R.prop("progression", userProgressionData)}%`}
                >{`${R.prop("progression", userProgressionData)}%`}</Tooltip>
              }
            >
              <ProgressBar
                striped
                variant="success"
                now={R.prop("progression", userProgressionData)}
                label={`${R.prop("progression", userProgressionData)}%`}
              />
            </OverlayTrigger>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            columnGap: 10,
          }}
        >
          <div
            key={`${data.name}-bar-chart`}
            style={{
              display: "inline-block",
              marginBottom: 50,
              padding: 5,
              boxShadow: theme.mixins.cardShadow,
              background: "white",
            }}
          >
            <BarChart
              data={R.pipe(
                R.sort((a, b) => a.wpm > b.wpm),
                R.take(5)
              )(exercicesDataFilteredByCourseId)}
              dimensions={{
                ...dimensions,
                margin: {
                  ...dimensions.margin,
                  bottom: 70,
                },
              }}
              xAccessor={(d) => `${d.lesson_name}`}
              yAccessor={R.prop("wpm")}
              xTitle={`${data.name}`}
              yTitle={"Wpm"}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              marginBottom: 50,
              padding: 5,
              boxShadow: theme.mixins.cardShadow,
              background: "white",
            }}
          >
            <LineChart
              data={exercicesDataFilteredByLocale}
              dimensions={dimensions}
              xAccessor={xAccessor}
              yAccessor={R.prop("wpm")}
              xTitle={"Time"}
              yTitle={"Wpm"}
            />
          </div>
        </div>

        <CourseDisplay course={data} />
      </div>
    );
  else return loadingMarkup;
};

export default Course;
