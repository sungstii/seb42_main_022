import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface user {
  auth: boolean;
  children: ReactElement;
}
function Protected({ auth, children }: user) {
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
