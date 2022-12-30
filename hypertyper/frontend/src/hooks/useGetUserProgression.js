import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const R = require("ramda");

const useGetUserProgression = (courseId, lastUpdate = 0) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(`/stats/user_progress`)();

  useEffect(() => {
    mutate({
      options: {
        params: {
          course: courseId,
        },
        ...getTokenOptions(),
      },
    });
  }, [lastUpdate]);

  return {
    data,
    loading,
    error,
    progression: R.pathOr(0, ["progression"], data),
  };
};

export default useGetUserProgression;
