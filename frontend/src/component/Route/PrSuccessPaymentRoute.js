import React from "react";
import OrderSuccess from "../Cart/OrderSuccess.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function PrSuccessPaymentRoute() {

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
          <Route path="/" element={<OrderSuccess/>} />
        </Routes>
      );
    }
  
}

export default PrSuccessPaymentRoute;
