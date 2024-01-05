import "./App.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header.js";
import Home from "./component/Pages/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import { Helmet } from "react-helmet";
// import Search from './component/Product/Search.js'
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import AccProtectedRoute from "./component/Route/AccProtectedRoute";
import PrUpdateProtectedRoute from "./component/Route/PrUpdateProtectedRoute";
import PrConfirmOrderRoute from "./component/Route/PrConfirmOrderRoute.js";
import PassUpdateRoute from "./component/Route/PassUpdateRoute.js";
import PrShippingRoute from "./component/Route/PrShippingRoute.js";
import PrPaymentRoute from "./component/Route/PrPaymentRoute.js";
import PrSuccessPaymentRoute from "./component/Route/PrSuccessPaymentRoute.js";
import PrOrderDetailsRoute from "./component/Route/PrOrderDetailsRoute.js";
import PrAdDashboardRoute from "./component/Route/PrAdDashboardRoute.js";
import PrAdProductListRoute from "./component/Route/PrAdProductListRoute.js";
import PrAdNewProduct from "./component/Route/PrAdNewProduct.js";
import PrAdUpdateProduct from "./component/Route/PrAdUpdateProduct.js";
import PrAdOrders from "./component/Route/PrAdOrders.js";
import PrAdOrder from "./component/Route/PrAdOrder.js";
import PrAdUsers from "./component/Route/PrAdUsers.js";
import PrAdUser from "./component/Route/PrAdUser.js";
import PrAdReviews from "./component/Route/PrAdReviews.js";
import PageNotFound from "./component/Pages/PageNotFound/PageNotFound.js"
import PrMyOrdersRoute from "./component/Route/PrMyOrdersRoute.js";
import ForgotPassword from "./component/User/FotgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import axios from "axios";
import Contact from "./component/Pages/Contact/Contact.js";
import About from "./component/Pages/About/About.js";
// import ProtectedRoute from "./component/Route/ProtectedRoute.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }



  useEffect(() => {
  
     
     getStripeApiKey()
   
   
  
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Helmet title="CellCave" />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/login" Component={LoginSignUp} />
        {/* <Route exact path="/account" element={isAuthenticated?<Profile/>:<MoveToLogin/>} /> */}
        <Route exact path="/account" element={<AccProtectedRoute />} />
        <Route exact path="/password/update" element={<PassUpdateRoute />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<PrShippingRoute />} />

        <Route exact path="/order/confirm" element={<PrConfirmOrderRoute />} />

        <Route
          exact
          path="/process/payment"
          element={<PrPaymentRoute stripeApiKey={stripeApiKey} />}
        />

        <Route exact path="/success" element={<PrSuccessPaymentRoute />} />
        <Route exact path="/orders" element={<PrMyOrdersRoute />} />

        <Route exact path="/order/:id" element={<PrOrderDetailsRoute />} />
        {/* <Route path="/adm"element={<ProtectedRoute /> } /> */}
        {/* Admin Routes  */}

        <Route
          exact
          path={"/admin/dashboard"}
          element={<PrAdDashboardRoute />}
        />

        <Route
          exact
          path={"/admin/products"}
          element={<PrAdProductListRoute />}
        />

       

        <Route exact path={"/admin/product/"} element={<PrAdNewProduct />} />
        <Route exact path={"/admin/product/:id"} element={<PrAdUpdateProduct />} />
        <Route exact path={"/admin/orders"} element={<PrAdOrders />} />
        <Route exact path={"/admin/order/:id"} element={<PrAdOrder />} />
        <Route exact path={"/admin/users"} element={<PrAdUsers />} />
        <Route exact path={"/admin/user/:id"} element={<PrAdUser />} />
        <Route exact path={"/admin/reviews"} element={<PrAdReviews />} />


        <Route exact path={"*"} element={<PageNotFound />} />

      </Routes>
      {/* 
      <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        /> */}

      <Footer />
    </BrowserRouter>
  );
}

export default App;
