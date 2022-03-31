import React, { useReducer, createContext } from "react";

const AUTH_TOKEN_KEY = "token";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

const AuthContext = createContext({
  user: null,
  loading: false,
  isAuthenticated: false,
  login: (userData) => {},
  logout: () => {},
  setLoading: (loading) => {},
  getToken: () => {},
  getTokenOptions: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  function getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  function getTokenOptions() {
    const token = getToken();
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      options.headers["Authorization"] = `Token ${token}`;
    }
    return options;
  }
  function login(userData) {
    if (userData.token) localStorage.setItem(AUTH_TOKEN_KEY, userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch({
      type: "LOGOUT",
    });
  }

  function setLoading(loading) {
    dispatch({
      type: "LOADING",
      payload: loading,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        isAuthenticated: state.isAuthenticated,
        setLoading,
        getToken,
        getTokenOptions,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
