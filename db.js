const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async() =>{
    try {
        const connection =await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = {
    connectDB
}