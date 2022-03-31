import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";
const useGetExercices = (filters = "", lastUpdate = 0) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(
    `/api/exercices/${filters}`
  )();
  useEffect(() => {
    mutate({
      options: getTokenOptions(),
    });
  }, [lastUpdate]);

  return { data, loading, error };
};

export default useGetExercices;
