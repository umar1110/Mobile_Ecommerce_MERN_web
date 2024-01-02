import React from "react";
import ProductList from "../admin/ProductList.js";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrAdProductListRoute() {
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
        <Route path="/" element={<ProductList/>} />
      </Routes>
    );
  }


}

export default PrAdProductListRoute;
