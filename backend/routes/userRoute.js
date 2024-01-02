const express = require('express');
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/routeAuth');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/logout").get(logout);
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser).put(isAuthenticatedUser, authorizeRole("admin"),updateUserRole).delete(isAuthenticatedUser, authorizeRole("admin"),deleteUser);


module.exports = router; 