import React, { Fragment, useEffect, useRef } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstans";
import Loader from "../Loader/Loader";
const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataGridRef = useRef();
  const alert = useAlert();
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.product);
  const { error, products } = useSelector((state) => state.products);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  document.querySelectorAll(".MuiTablePagination-toolbar button").forEach((e) =>
    e.addEventListener("click", () => {
      window.scroll(0, 0);
    })
  );

  const location= useLocation();

  useEffect(() => {
    document.querySelector("#speedDial-component").classList.add("hidden");
   

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");

      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());

    return () => {
      document.querySelector("#speedDial-component").classList.remove("hidden");
    };
  }, [dispatch, alert, error, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {

        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard mt-16">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>

              <DataGrid
              ref={dataGridRef}
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ProductList;
