const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName : 'dishes'
        });
        console.log("Connection Succesfull");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;