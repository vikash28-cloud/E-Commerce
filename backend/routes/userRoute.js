const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/Auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgetPassword").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

// user have to logged in for these routes
router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

// admin authorize role
router.route("/admin/users").get(isAuthenticatedUser,authorizeRole("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRole("admin"),getSingleUser)
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRole("admin"),updateUserRole)
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRole("admin"),deleteUser);


module.exports = router;