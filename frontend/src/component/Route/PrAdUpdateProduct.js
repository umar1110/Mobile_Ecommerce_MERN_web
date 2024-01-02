import React from "react";
import UpdateProduct from "../admin/UpdateProduct.js";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrAdUpdateProduct() {
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
        <Route path="/" element={<UpdateProduct/>} />
      </Routes>
    );
  }


}

export default PrAdUpdateProduct;
