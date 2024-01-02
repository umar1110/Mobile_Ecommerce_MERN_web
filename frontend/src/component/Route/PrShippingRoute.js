import React from 'react'
import Shipping from '../Cart/Shipping.js'
import { Navigate,Route,Routes } from 'react-router-dom';
import { useSelector } from "react-redux";


function PassUpdateRoute() {


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
          <Route path="/" element={<Shipping/>} />
        </Routes>
      );
    }
}

export default PassUpdateRoute