import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../Loader/Loader";
import ProductCard from "../Pages/Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData'

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 2500000]);
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(25000000);

  const categories = ["Iphone", "Vivo", "Huawei", "Oneplus", "Infinix","Samsung"];
  const {
    loading,
    products,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Perform your desired action with minPrice and maxPrice
    setPrice([minPrice, maxPrice]);
  };
  const { keyword } = useParams();

  // const keyword = searchParams.get("keyword")
  useEffect(() => {
    window.scroll(0, 0);
    if (error) {
      alert.error(error.response.data.error);
      dispatch(clearErrors())
    }

    dispatch(
      getProduct(
        keyword ? keyword : "",
        currentPage,
        price,
        category ? category : ""
      )
    );
  }, [dispatch, keyword, currentPage, price, category,alert,error]);

  const count = filteredProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData title={"Products--CellCave"}/>
          <div className="mt-16 bg-gray-50">
            <div className="categories-bar flex-col md:flex-row justify-between flex items-center w-[100vw] max-w-full bg-teal-100 py-3 space-y-4 md:space-y-0 ">
              <div className="categories ml-3 font-mono ">
                <label
                  htmlFor="Categories-select"
                  className="text-lg font-semibold mr-3"
                >
                  Cetogories:
                </label>
                <select
                  value={category}
                  id="category"
                  onChange={handleCategoryChange}
                  name="Categories-select"
                  className="border-none p-2 w-fit "
                >
                  <option value="">All</option>
                  {categories.map((cat, i) => {
                    return (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="price-filter flex justify-center items-center space-x-3 mr-3 font-mono text-xl">
                <h2 className="text-lg font-semibold hidden md:static mr-3 ">
                  PRICE FILTER:
                </h2>
                <form
                  className="flex justify-center items-center space-x-3"
                  onSubmit={handlePriceSubmit}
                >
                  <div className="min  space-x-2">
                    <label htmlFor="min-price">MIN</label>
                    <input
                      className="w-[10vmax]  text-center p-[0.3vmax] border-2 border-gray-400"
                      type="number"
                      id="min-price"
                      value={minPrice}
                      onChange={(e) => setminPrice(e.target.value)}
                    />
                  </div>
                  <div className="max space-x-2">
                    <label htmlFor="max-price">MAX</label>
                    <input
                      className="w-[10vmax] text-center p-[0.3vmax] border-2 border-gray-400"
                      type="number"
                      id="max-price"
                      value={maxPrice}
                      onChange={(e) => setmaxPrice(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-black text-white py-2 px-4  border-none outline-none rounded-md ml-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className="products-box">
              <h2 className="productsHeading">PRODUCTS</h2>
              <div className="products">
                {products &&
                  products.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                  })}
              </div>
            </div>

            {/* Pagination */}
            {resultPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
