const Order = require('../Models/orderModel');
const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncFuncError = require('../middleware/catchAsyncFuncError');


// Create new Order
exports.newOrder = catchAsyncFuncError(async (req, res, next) => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id,

    })


    res.status(200).json({
        success: true,
        order
    })
})


// getsingle order details
exports.getSingleOrder = catchAsyncFuncError(async (req, res, next) => {
   
    const order = await Order.findById(req.params.id).populate("user", "name email");


    // populate means , user me jo id ha us ko lay ja kr User ki collection me wo document find kro us id sy or uska name or email do 
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })

});

// get logged in user Orders
exports.myOrders = catchAsyncFuncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });



    res.status(200).json({
        success: true,
        orders
    })

});

//Get all orders ---> Admin
exports.getAllOrders = catchAsyncFuncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })



    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

});

//update order status ---> Admin
exports.updateOrder = catchAsyncFuncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found", 400))
    }
    if (order.orderStatus === "delivered") {
        return next(new ErrorHandler("You have already delivered this product", 400))
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (or) => {
            await updateStock(or.product, or.quantity)
        })

        
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "delivered") {

        order.deliveredAt = Date.now()
    }
    await order.save({ validateBeforeSave: false })


    res.status(200).json({
        success: true,


    })

});


async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock -= quantity;

    await product.save({ validateBeforeSave: false })
}


//Delete  orders ---> Admin
exports.deleteOrder = catchAsyncFuncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 400))
    }
    await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,


    })

});