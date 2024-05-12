const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,

  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user:req.user._id,
  })

  res.status(201).json({
    success:true,
    message:"Order Created Successfully"
  })
});

// Get Single Order  -- admin
exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{
  const order = await Order.findById(req.params.id).populate("user","name email");
  
  if(!order){
    return next(new ErrorHandler("Order not found with this id ",404));
  }
  res.status(200).json({
    success:true,
    order
  })
})


// Get loggedIn user Orders   --user
exports.myOrders = catchAsyncErrors(async (req,res,next)=>{
  const orders = await Order.find({user:req.user._id});

  if(!orders){
    return next(new ErrorHandler("Order not found with this id ",404));
  }
  res.status(200).json({
    success:true,
    orders
  })
})