import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
