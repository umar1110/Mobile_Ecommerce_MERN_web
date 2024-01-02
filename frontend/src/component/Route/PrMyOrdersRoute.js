import React from "react";
import MyOrders from "../Order/MyOrders.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function PrMyOrdersRoute() {
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
        <Route path="/" element={<MyOrders/>} />
      </Routes>
    );
  }
}

export default PrMyOrdersRoute;
