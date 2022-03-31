import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

PrivateRoute.defaultProps = {
  auth: false,
};
export default PrivateRoute;
