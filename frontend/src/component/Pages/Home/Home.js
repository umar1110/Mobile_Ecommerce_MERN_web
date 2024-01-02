import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProduct } from "../../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import {useAlert} from 'react-alert'
import "./home.css";
import Loader from "../../Loader/Loader.js";



function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products,  } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    window.scroll(0,0)
    if (error) {
      alert.error(error.response.data.error); 
     dispatch(clearErrors())
    } 
   
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  window.addEventListener("contextmenu",(e)=>{e.preventDefault()})

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <div className="banner relative bg-gradient-to-r ">
        <p className="font-[300] text-[1.4vmax] "> Welcome to CellCave </p>
        <h1 className="m-[5vmax]  text-[2.5vmax] font-[Roboto] font-[500] ">
          FIND YOUR DREAM MOBILES HERE
        </h1>
        <a href="#container">
          <button className="scroll-btn mb-[5vmax] bg-white text-black border-2 px-[1vmax] py-[0.5vmax] border-black flex justify-center items-center duration-400 hover:bg-[rgb(255,255,255,0)] hover:text-white ">
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="home-heading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
