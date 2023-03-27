import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteModel {
  auth: boolean;
  children: ReactElement;
}
function Protected({ auth, children }: AuthRouteModel) {
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
