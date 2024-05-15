const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModels")
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

// Get Single Order  
exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{
  const order = await Order.findById(req.params.id).populate("user","email name")
  
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


// Get All Orders  --Admin
exports.GetAllOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find();

  let totalAmount = 0;
  let count=0;
  orders.forEach((order)=>{
    totalAmount += order.totalPrice;
    count++;
  })

  res.status(200).json({
    success:true,
    Total_orders:count,
    Total_order_Amount:totalAmount,
    orders
  })
})


// Update Order Status  --Admin
exports.updateOrder = catchAsyncErrors(async(res,req,next)=>{
  const order = await Order.findById(req.params.id);

  if(order.orderStatus==="Delivered"){
    return next(new ErrorHandler("You have Already delivered this order",400))
  }

  order.orderItems.forEach(async(order)=>{
    await updateStock(order.product,order.quantity);
  }); 

  order.orderStatus = req.body.status

  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();
  }

  await order.save({validateBeforSave:false});

  res.status(200).json({
    success:true,
    
  })

})

async function updateStock(id,quantity){
 const product = await Product.findById(id);

 if(!product){
  return next(new ErrorHandler("product not found with this order",400))
 }

 product.Stock -= quantity; 
 product.save();
}


// Delete Order  --Admin

exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler("Order not found with this id ",404));
  }

  await order.deleteOne();

  res.status(200).json({
    success:true,
    message:"Order Deleted Successfully"
  })
})