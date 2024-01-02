import React from 'react'
import ConfirmOrder from '../Cart/ConfirmOrder.js'
import { Navigate,Route,Routes } from 'react-router-dom'
import { useSelector } from "react-redux";

function PrConfirmOrderRoute() {


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
          <Route path="/" element={<ConfirmOrder/>} />
        </Routes>
      );
    }
}

export default PrConfirmOrderRoute;