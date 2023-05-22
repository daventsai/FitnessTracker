require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());

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