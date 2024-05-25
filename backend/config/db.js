const mongoose = require("mongoose");

const connectDB = async() =>{

    const DB_URI = `mongodb+srv://wellitsabhi-aicert:wellitsabhi-aicert@cluster0.ogbnebp.mongodb.net/aicert?retryWrites=true&w=majority&appName=Cluster0`
    
    try{
        const connectionInstance = await mongoose.connect(DB_URI)
        console.log(`\nMONGO DB CONNECTED !!`);

    }catch(err){
        console.log(`MONGODB CONNECTION ERROR: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;