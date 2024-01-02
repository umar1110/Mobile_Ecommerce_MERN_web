import React, { useEffect } from "react";
import "./header.css";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Backdrop } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";

function UserOptions({ user }) {
  const {cartItems} = useSelector(state=>state.cart)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
        style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    // navigate(logout());
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  }

  return (
    <>
    <div id="speedDial-component">
      <Backdrop
        style={{
          color: "#fff",
          zIndex: 9,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        open={open}
      />
      <div className="fixed h-fit  bottom-6 right-4 z-10">
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          // onMouseEnter={() => {
          //   if (window.innerWidth > 1030) setOpen(open ? false : true);
          // }}
          // onMouseLeave={() => {
          //   if (window.innerWidth > 1030) setOpen(open ? false : true);
          // }}
          open={open}
          onClick={() => {
            setOpen(open ? false : true);
            console.log("accessing in u options");
          }}
          direction="up"
          icon={
            <img
              className="speedDialIcon w-[60px] h-[60px] rounded-[100%]   "
              src={`${user.avatar.url ? user.avatar.url : "/profilePic.png"}`}
            />
          }
        >
          {options.map((item) => {
            return (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen = {window.innerWidth<600?true:false}
              />
            );
          })}
        </SpeedDial>
      </div>
      </div>
    </>
  );
}

export default UserOptions;
