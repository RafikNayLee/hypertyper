import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useGetLesson, usePostExercice, useGetHighScoreWPM } from "../../hooks";
import { AuthContext } from "../../context/auth";
import View from "./View";

const sanitizeLessonText = (text) => {
  return text
    .split("")
    .filter((r) => r !== "\n")
    .join("");
};

const Lesson = () => {
  const { user, getTokenOptions } = useContext(AuthContext);
  const [lastUpdate, setLastUpdate] = useState(0);

  const [score, setScore] = useState(0);

  const [lessonText, setLessonText] = useState("");

  const { lessonId, sectionId, courseId } = useParams();
  const { data, loading, error } = useGetLesson(lessonId, lastUpdate);
  const { high_score } = useGetHighScoreWPM(lessonId, lastUpdate);
  const { mutate: postExercice, loading: postExerciceLoading } =
    usePostExercice();

  const postExerciceClick = (text) => (e) => {
    const success_callback = (data) => {
      setScore(0);
      setLastUpdate(new Date().getTime());
    };
    postExercice({
      config: {
        ...getTokenOptions(),
      },
      options: {
        text,
        seconds: score,
        lesson: lessonId,
        user: user.id,
      },
      success_callback,
    });
  };

  useEffect(() => {
    if (data && data.text) {
      setLessonText(sanitizeLessonText(data.text));
    }
  }, [data]);

  return (
    <View
      lesson={data}
      loading={loading}
      error={error}
      lessonText={lessonText}
      postExerciceClick={postExerciceClick}
      postExerciceLoading={postExerciceLoading}
      high_score={high_score}
      lessonId={lessonId}
      sectionId={sectionId}
      courseId={courseId}
      lastUpdate={lastUpdate}
      setLastUpdate={setLastUpdate}
      score={score}
      setScore={setScore}
    />
  );
};

export default Lesson;
