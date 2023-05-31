const router = require("express").Router();

router.get("/health", (req,res,next)=>{
    try {
        res.send("API is poggers");
    } catch (error) {
        next(error);
    }
});

//need to hook up other routers, ex: router.use('/users', require('./users'))
router.use('/users',require('./users'));
router.use('/routines',require('./routines'));
router.use('/activities',require('./activities'));
router.use('/routine_activities',require('./routine_activities'));

module.exports = router;