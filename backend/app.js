const express = require('express')
const app = express() 
const cookieParser = require('cookie-parser')
const fileUpload= require("express-fileupload")
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' })

// const bodyparder = require('body-parser')
// app.use(bodyParser.urlencoded({extended : true}))       old version

// app.use(express.json())    // becauase we need large amount send and limit is not set

app.use(cookieParser())
// app.use(express.urlencoded({extended: true}));
app.use(fileUpload())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
const errorMiddleware = require("./middleware/error")





// Route importing 
const productRoute = require("./routes/productRoute");
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute')
const paymentRoute = require("./routes/paymentRoute")
// const bodyParser = require('body-parser')

// use routes

app.use('/api/v1',productRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)
app.use("/api/v1",paymentRoute)



// middleware for errors
app.use(errorMiddleware)
app.use((err, req, res, next) => {
  
    res.status(err.statusCode || 500).json({
      success: false,
      error : {
          message: err.message,
          status:err.statusCode,
      }
    });
  });
  

  // For Hosting 

  const path = require("path")
app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
;

  
  module.exports = app;