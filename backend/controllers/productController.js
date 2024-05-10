const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
//! create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//! get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;
  res.status(200).json({
    message: "route is working fine",
    products,
    productCount
  });
});

//! get specific product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//! update Product  --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  // console.log(product);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//! delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});


// ! Create Product Reveiw or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productID} = req.body; //destructring
    const review= {
      user: req.user._id,
      name:req.user.name,
      rating: Number(rating),
      comment,
    }

    const product = await Product.findById(productID);

    const isReviewed = product.reviews.find(rev=> rev.user.toString()===req.user._id.toString()); //rev is a variable
    // check if the same user update their review

    if(isReviewed){
      // already reviewed
      product.reviews.forEach((rev) => {
          if(rev.user.toString()===req.user._id.toString()){
            rev.rating = rating;
            rev.comment = comment
          }
      });
        
    }
    else{
      // first time review
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;

    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg+=rev.rating;
    });

    product.ratings = avg/(product.reviews.length);

    await product.save({validateBeforeSave:false});

    res.status(200).json({
      success:true,
      message:"Review Added Successfully"
    })

})

// ! Get All Reviews
exports.getProductsReviews = catchAsyncErrors(async (req,res,next)=>{
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

// ! Delete Product Review

exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString())

  let avg = 0;
    reviews.forEach((rev) => {
        avg+=rev.rating;
    });

  const ratings = avg/(reviews.length);
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews
    },
    {
      new:true,
      runValidators:true,
      useFindAndModify:false
    }
  );

  res.status(200).json({
    success:true,
    message:"Review Deleted Successfully"
  })
})

