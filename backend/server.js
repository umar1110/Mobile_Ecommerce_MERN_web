const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' })
const app = require('./app')
const cloudinary = require("cloudinary");
// const port = process.env.PORT || 4000;

// Handling uncaught Exception ......if we try concole.log(youtube)  and variable not exists 

// define on Up Always
process.on("uncaughtException",(err)=>{ 
    console.log(`Error: ${err.message}`);
    console.log('Got an Uncaught Exception .')
    process.exit(1)
    
})

// connecting to cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET 
  });

  
// Connecting database
const connectDatabase = require('./config/database')
connectDatabase();

const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)

})


// Unhandled Promise Rejection
// For if the mongo db link is not true and failed to connect not using .catch because it should not be handeled and server should close 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the server due to Unhandled Promise Rejection ')

    server.close(() => {
        process.exit(1)
    })
})