import usePostHttp from "./usePostHttp";

const useLoginHttp = usePostHttp("/api/auth/login");

export default useLoginHttp;
