const express = require('express');
const app = express();

// define routes
const authRoute = require('./routes/authRoutes');
const biodataRoute = require('./routes/biodataRoutes');
const templateRoute = require('./routes/templateRoutes');

// load configuration of env file
require('dotenv').config();

const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

// define port
const PORT = process.env.PORT || 5000;

// connect to db
dbConnect();

// middlewares
// add body parser
app.use(express.json());
app.use(cookieParser());  //cookie-parser
app.use(
    cors({
        origin:"http://localhost:3000",   // to fulfill frontend request
        credentials:true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

// connnect to cloudinary
cloudinaryConnect();

//import route and mount with '/api/v1'
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/biodata', biodataRoute);
app.use('/api/v1/template', templateRoute);

// default route
app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

// activate server
app.listen(PORT, () => {
    console.log(`App listen at port ${PORT} successfully`)
})