import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

function AdminAccess() {
  const { adminUser } = useContext(GlobalContext);

  return adminUser ? <Outlet /> : <Navigate to="/dashboard/home" />;
}

export default AdminAccess;
