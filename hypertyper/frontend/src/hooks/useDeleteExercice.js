import { useContext } from "react";
import { AuthContext } from "../context/auth";
import useHttp from "./useHttp";

const useDeleteExercice = ({ id, setLastUpdate }) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate } = useHttp("delete")(`/api/exercices/${id}/`)();

  const success_callback = (data) => {
    setLastUpdate(new Date().getTime());
  };

  const deleteExercice = () => {
    return mutate({
      options: getTokenOptions(),
      success_callback,
    });
  };
  return {
    deleteExercice,
  };
};

export default useDeleteExercice;
