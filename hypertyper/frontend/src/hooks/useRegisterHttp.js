import usePostHttp from "./usePostHttp";

const useRegisterHttp = usePostHttp("/api/auth/register");

export default useRegisterHttp;
