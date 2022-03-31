import useGetHttp from "./useGetHttp";

const useGetCourses = useGetHttp("/api/courses/");

export default useGetCourses;
