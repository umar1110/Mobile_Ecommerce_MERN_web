import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <div className="productCard">

    <Link className="prodsuctCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan   font-[300] " >
          {" "}
          ({product.numberOfReviews} Reviews)
        </span>
      </div>
      <div className="product-price text-xl my-3">{`Rs. ${product.price}`}</div>
    </Link>
    </div>
  );
};

export default ProductCard;
