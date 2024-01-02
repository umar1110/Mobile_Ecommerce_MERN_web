const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/routeAuth');

const router = express.Router();
router.use(express.json())
router.route('/products').get( getAllProducts)
router.route("/admin/products").get(isAuthenticatedUser,authorizeRole("admin"),getAdminProducts)
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRole("admin"), createProduct)
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRole("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route('/product/:id').get(getSingleProduct);

router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReview)
// isAuthenticatedUser  => will only tells , is user login or not 


module.exports = router;