//In this file, we are going to make mongoDB connection
const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        //getting mongodb URL from env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb is connected successfully");
    }catch(error){
        console.log('Error in connecting to MongoDB: ', error);
    }
}

//export this file to use in server.js
module.exports = connectDB;