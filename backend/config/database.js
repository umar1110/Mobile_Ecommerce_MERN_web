const mongoose = require('mongoose');
const connectDatabase = () => {
    
    mongoose.connect(process.env.DB_URI,{  useNewUrlParser: true, 
        useUnifiedTopology: true})
        .then((data) => console.log(`Database Connected with server ${data.connection.host}!`))  
}

module.exports = connectDatabase;



//  connecting to the database and than we will connect it from our server.js because server.js is the starting file 