const catchAsyncFuncError = require('../middleware/catchAsyncFuncError');

const stripe = require("stripe")(process.env.STRIPE_SECTRET_KEY);

exports.processPayment = catchAsyncFuncError(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
  
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  });
  
  exports.sendStripeApiKey = catchAsyncFuncError(async (req, res, next) => {

    console.log(process.env.STRIPE_API_KEY)
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });