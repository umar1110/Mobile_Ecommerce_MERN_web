import React from "react";
import Payment from "../Cart/Payment.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

function PrPaymentRoute({ stripeApiKey }) {


  const { loading, isAuthenticated } = useSelector((state) => state.user);


  if (loading == false) {
    if (isAuthenticated === false) {
      return (
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
        </Elements>
      );
    }


    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
      <Routes>
        <Route path="/" element={<Payment  />} />
      </Routes>
      </Elements>
    );
  }


}

export default PrPaymentRoute;
