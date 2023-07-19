import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default PrivateRoute;
