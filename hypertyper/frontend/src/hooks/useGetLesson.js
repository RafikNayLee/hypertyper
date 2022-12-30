import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const useGetLesson = (id, lastUpdate = 0) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(`/api/lessons/${id}/`)();
  useEffect(() => {
    mutate({
      options: getTokenOptions(),
    });
  }, [lastUpdate]);

  return { data, loading, error };
};

export default useGetLesson;
