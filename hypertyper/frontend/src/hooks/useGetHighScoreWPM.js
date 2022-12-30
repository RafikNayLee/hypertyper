import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const R = require("ramda");

const useGetHighScoreWPM = (lessonId, lastUpdate = 0) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(
    `/stats/high_score_wpm`
  )();

  useEffect(() => {
    mutate({
      options: {
        params: {
          lesson: lessonId,
        },
        ...getTokenOptions(),
      },
    });
  }, [lastUpdate]);

  return {
    data,
    loading,
    error,
    high_score: R.pathOr(0, ["high_score"], data),
  };
};

export default useGetHighScoreWPM;
