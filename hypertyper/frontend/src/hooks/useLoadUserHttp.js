import { useContext } from "react";
import usePostHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const useLoadUserHttp = () => {
  const { login, getToken, getTokenOptions } = useContext(AuthContext);
  const { mutate, data, error, loading } = usePostHttp("/api/auth/user")();

  const token = getToken();

  const success_callback = (data) => {
    login({
      token,
      ...data,
    });
  };
  const options = getTokenOptions();

  const mutate_with_options = () => {
    mutate({
      options,
      success_callback,
    });
  };
  return {
    mutate: mutate_with_options,
    data,
    error,
    loading,
    token,
  };
};

export default useLoadUserHttp;
