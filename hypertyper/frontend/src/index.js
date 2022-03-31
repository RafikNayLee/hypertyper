import React from "react";
import App from "./components/App";
import ReactDom from "react-dom";
import { AuthProvider } from "./context/auth";
ReactDom.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("app")
);
