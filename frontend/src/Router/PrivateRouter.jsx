import React from "react";
import { Navigate, Routes, useNavigate } from "react-router-dom";
import { getData } from "../Component/utils/localStorage";

function PrivateRouter({ children }) {
  //   const navigate = useNavigate();
  let token = getData("token");
  if (token == null) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRouter;
