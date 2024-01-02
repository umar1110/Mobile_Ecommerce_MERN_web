import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route,Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component,  }) => {
  const { loading, isAuthenticated,user } = useSelector((state) => state.user);


  if (loading == false) {
    if (isAuthenticated === false) {
      return (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      );
    }
    if(isAdmin===true && user.role !== "admin"){
      <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
    </Routes>
    }


    return (
      <Routes>
        <Route path="/" element={<Component/>} />
      </Routes>
    );
  }
};

export default ProtectedRoute;