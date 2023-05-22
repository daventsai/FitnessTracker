const router = require("express").Router();

router.get("/health", (req,res,next)=>{
    try {
        res.send("API is Health");
    } catch (error) {
        next(error);
    }
});

//need to hook up other routers, ex: router.use('/users', require('./users'))

module.exports = router;