require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 3000;

const app = express();

const client = require("./db/client");
client.connect();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use (cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, './client', 'dist')))

//routes
app.use("/api",require("./routes"));

//error handler
app.use((err,req,res,next)=>{
    res.send({
        message: err.message,
        name: err.name,
        stack:err.stack,
    });
});

//serve app
app.listen(PORT,()=>{
    console.log(`App listening on PORT ${PORT}`);
});