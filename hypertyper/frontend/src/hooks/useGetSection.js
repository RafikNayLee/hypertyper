import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const useGetSection = (id) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(`/api/sections/${id}/`)();
  useEffect(() => {
    mutate({
      options: getTokenOptions(),
    });
  }, [id]);

  return { data, loading, error };
};

export default useGetSection;
