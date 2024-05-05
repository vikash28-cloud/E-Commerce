const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avtar: {
            public_id: "this is a smple id",
            url: "ProfilePicUrl",
        }
    })
    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
})

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// forgot passowrd    getting reset password token on user mail using nodemailer
exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not Found",401));
    }

    // Get reset Password Token
    const resetToken = user.getResetPasswordToken();  //from user model
    await user.save({validateBeforeSave:false});  //save restToken in user

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it `;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }

})

// Reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{ 
    // we generated reset password token in previous function 
    // now we can access this token using req.params , and find the user using this token in database

    // create token hash 
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)   //create a route //:token like id
    .digest("hex");

    // now look hashed token in user db
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been Expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res)
})  


// get user details after login
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id); //when user logged in 
    res.status(200).json({
        success:true,
        user
    })
})


// update password after login
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("password");

    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid current password", 401));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 401));
    }

    user.password  = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
})

// update user Profile except password
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,

    }
    // we wil add cloudinary later
    const user = await User.findByIdAndUpdate(
        req.user.id, 
        newUserData,
        {
            new:true,
            runValidators:true,
            userFindAndModify: false
        }
    );

   res.status(200).json({
    success:true,
    message:"Profile Updated Successfully"
   })
})

// get all users

exports.getAllUsers = catchAsyncErrors(async (req,res,next)=>{
        const users = await User.find();

        res.status(200).json({
            success:true,
            users,
        })
})


//  Get single user (Admin)

exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user,
    })
})
