import { useEffect } from "react";
import useGetHttp from "./useGetHttp";

const useGetSection = (id) => {
  const { mutate, data, loading, error } = useGetHttp(`/api/sections/${id}/`)();
  useEffect(() => {
    mutate({
      options: {},
    });
  }, [id]);

  return { data, loading, error };
};

export default useGetSection;
