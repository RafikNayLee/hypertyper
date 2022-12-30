import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const R = require("ramda");

const useGetNbExercices = (lessonId, lastUpdate = 0) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(`/stats/nb_exercices`)();

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
    nb_exercices: R.pathOr(0, ["nb_exercices"], data),
  };
};

export default useGetNbExercices;
