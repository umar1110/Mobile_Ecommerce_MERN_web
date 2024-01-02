import React from "react";
import OrderDetails from "../Order/OrderDetails";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function PrOrderDetailsRoute() {
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
        <Route path="/" element={<OrderDetails/>} />
      </Routes>
    );
  }
}

export default PrOrderDetailsRoute;
