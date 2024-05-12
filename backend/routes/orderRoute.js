const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRole } = require("../middleware/Auth");
const { newOrder, getSingleOrder, myOrders } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,authorizeRole("admin"),getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser,myOrders); 

module.exports = router