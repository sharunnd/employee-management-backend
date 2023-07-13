const mongoose = require("mongoose")

const connectDB = async() =>{
    try {
        const connection = mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = {
    connectDB
}