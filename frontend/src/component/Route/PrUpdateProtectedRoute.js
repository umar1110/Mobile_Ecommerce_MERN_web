import React from "react";
import UpdateProfile from "../User/UpdateProfile.js";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrUpdateProtectedRoute() {
    const { loading, isAuthenticated } = useSelector((state) => state.user);


    if (loading == false) {
      if (isAuthenticated === false) {
        return (
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
          </Routes>
        );
      }
  
  
      return (
        <Routes>
          <Route path="/" element={<UpdateProfile/>} />
        </Routes>
      );
    }
}

export default PrUpdateProtectedRoute;
