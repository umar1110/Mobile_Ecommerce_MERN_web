import React from "react";
import UserList from "../admin/UserList.js";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrAdUsers() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading == false) {
    if (isAuthenticated === false) {
      return (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      );
    }

    if (user.role !== "admin") {
      return (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<UserList/>} />
      </Routes>
    );
  }


}

export default PrAdUsers;
