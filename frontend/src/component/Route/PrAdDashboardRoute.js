import React from "react";
import Dashboard from "../admin/Dashboard.js";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrAdDashboardRoute() {
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
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    );
  }

  // return (
  //   <>

  //     <Routes>
  //       {(!loading) && isAuthenticated && (user.role === "admin")? (
  //         <Route path="/" element={<Dashboard />} />
  //       ) : (
  //         <Route path="*" element={<Navigate to={"/login"} />} />
  //       )}
  //     </Routes>
  //   </>
  // );
}

export default PrAdDashboardRoute;
