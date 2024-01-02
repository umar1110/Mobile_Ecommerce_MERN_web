import React,{ useEffect } from "react";

import Sidebar from "./Sidebar.js";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {Chart,registerables} from "chart.js"
import "./dashboard.css";
import { useSelector,useDispatch } from "react-redux";
import { getAdminProduct,clearErrors } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
function Dashboard() {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const {orders}  = useSelector((state)=>state.allOrders)
  const { users } = useSelector((state) => state.allUsers);



  let outOfStock =0;

  products && products.forEach((item) => {
    if(item.stock === 0){
      outOfStock++;
    }
  });

  useEffect(() => {
    window.scroll(0,0)

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    dispatch(getAdminProduct());
    dispatch(getAllOrders)
    dispatch(getAllUsers)
  }, [dispatch, error]);

let totalAmount =0;
orders&&orders.forEach((or)=>{
  totalAmount+=or.totalAmount;
})

  const lineState = {
    labels: ["Initial Amount", "Amount Earned","Eeeee"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        borderColor: "tomato",
        backgroundColor: "transparent",
        hoverBorderColor: "rgb(197, 72, 49)",
        data: [0, 5000],
      },
    ],
  };


  const doughnutState = {
    labels: ["Out of Stock", "InStock",],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length-outOfStock],
      },
    ],
  };
  Chart.register(...registerables);

useEffect(() => {
  
 
  dispatch(getAdminProduct());
  dispatch(getAllOrders());
  dispatch(getAllUsers());
 
}, [dispatch])

  return (
    <div className="mt-24 dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount ? totalAmount:0}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length?products.length:0}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length?orders.length:0}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users&&users.length?users.length:0}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState}  />
        </div>
        <div className="doughnutChart ">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
