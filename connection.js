const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Disable strict query mode
const connctDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = {
    connctDB
}