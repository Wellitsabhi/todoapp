const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRouter = require('./routes/appRouter')
const connectDB = require('./config/db')
require('dotenv').config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Endpoints
app.use('/', appRouter)

// Set the port from environment variables or fallback to 5000
const PORT = process.env.PORT;
// Port
app.listen(PORT, ()=> {
    console.log("server is running on ", PORT);
})
