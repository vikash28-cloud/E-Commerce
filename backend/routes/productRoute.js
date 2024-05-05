const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/Auth");

const router = express.Router();

router.route("/products").get( getAllProducts)

// admin routes
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole("admin"),createProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRole("admin"),updateProduct)
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRole("admin"),deleteProduct)

router.route("/product/:id").get(isAuthenticatedUser, authorizeRole("admin"),getProductDetails)

module.exports = router