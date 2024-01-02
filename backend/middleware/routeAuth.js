const ErrorHandler = require("../utils/errorhandler");
const catchAsyncFuncError = require("./catchAsyncFuncError");
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
exports.isAuthenticatedUser = catchAsyncFuncError(async (req, res, next) => {
    
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this sourse", 401))
    }

    const decodedDataID = jwt.verify(token, process.env.JWT_SECRET);   // as we created jwt by id in model of user , and store it in cookie when user login or register so that when we access this token we will find the id on which we jwt.sign

    try{

        req.user = await User.findById(decodedDataID.id)
    }
    catch(err){
        next(new ErrorHandler("User Not Exists , As per in ccokies chnaged"),401)
        // ***************** remove the cookie info from message *************
    }

    next()

})

exports.authorizeRole = (role)=>{
    return (req,res,next)=>{

        // role is by default set to = admin 
        // now we will check is in req.user , admin exists or not ?
        //  We setted this req.user in isAuthenticatedUser middleware ....up
        if(!(role === req.user.role)){
           return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`));
        }
       

        next();

    }
}