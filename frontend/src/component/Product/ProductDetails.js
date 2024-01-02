import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction.js";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@material-ui/core";
import {Rating} from "@material-ui/lab"

import { NEW_REVIEW_RESET } from "../../constants/productConstans.js";

// **************************************************

function ProductDetails() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const alert = useAlert();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

 
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addItemsToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemsToCart(id, quantity));
      alert.success("Items have been added to Cart.");
    } else {
      alert.error("Product is Out of Stock");
    }
  };
  // console.log(options.value)
  // whenever pathname change , rerender

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    submitReviewToggle();
  };

  useEffect(() => {
    console.log("useeffect");
    window.scrollTo(0, 0);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      console.log(reviewError);
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, alert, id, success, reviewError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- CellCave`} />
          <div>
            <div className="ProductDetails mt-12 pd:flex-row flex flex-col">
              {/* Left Side */}
              <div className="Left-side flex flex-col justify-center items-center p-[2vmax] border-2 border-white   box-border">
                <Carousel className=" carousel object-cover   w-[100%] sms:w-[90%] sm:w-[60%]   pd:w-[20vmax] ">
                  {product.images &&
                    product.images.map((item, i) => {
                      return (
                        <img
                          className="CarouselImage w-full h-full"
                          key={item.url}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      );
                    })}
                </Carousel>
              </div>
              {/* Right Side  */}

              <div className="right-side items-center pd:items-start w-[100%]  border-2 border-white flex flex-col justify-evenly  p-[2vmax] box-border">
                {/* block 1 */}

                <div className="details-name-id">
                  <h2 className="product-name"> {product.name}</h2>
                  <p className="product-id ">Product # {product._id}</p>
                </div>
                {/* block 2 */}

                <div className="rating ">
                
                  <Rating {...options} />
                  <span className="reviews">
                    ({product.numberOfReviews} Reviews)
                  </span>
                </div>
                {/* block 3 */}

                <div className="details w-[70%]">
                  <h1 className="p-price">{`Rs. ${product.price}`}</h1>
                  <div className="cart-section">
                    <div className="add-remove-btn">
                      <button
                        className="edit-products-quantity-btn "
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        className="qt-input"
                        value={quantity}
                        readOnly
                        type="number"
                      />
                      <button
                        className="edit-products-quantity-btn"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={addItemsToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p className="stock-update">
                    <b
                      className={`stock-detail ${
                        product.stock < 1 ? "text-red-700" : "text-green-600"
                      } `}
                    >
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                {/* block 4 */}
                <div className="description">
                  Description : <p> {product.description}</p>
                </div>

                <button
                  onClick={submitReviewToggle}
                  className="submit-review-btn"
                >
                  Submit Review
                </button>
              </div>
            </div>

            {/*  For reviews */}
            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className="submitDialogTextArea"
                  cols={30}
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>

              <DialogActions>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={submitReviewToggle}
                >
                  Cancel
                </Button>
                <Button
                  onClick={reviewSubmitHandler}
                  variant="outlined"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="product-reviews">
                {product.reviews &&
                  product.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Review Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
