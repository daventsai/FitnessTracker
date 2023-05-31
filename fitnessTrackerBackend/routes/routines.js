const routinesRouter = require('express').Router();
const {getAllRoutines,createRoutine} = require('../db/adapters/routines');

const {authRequired} = require('./verify');

routinesRouter.get('/',async(req,res,next)=>{
    try {
        const routines = await getAllRoutines();
        res.send({
            message: 'Getting routines and their activities is successful',
            routines
        });
    } catch (error) {
        next(error);
    }
});

routinesRouter.post('/',authRequired,async(req,res,next)=>{
    try {
        const {token} = req.signedCookies;
        const {is_public,name,goal} = req.body;
        const parsedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const userId = parsedToken.id;
        const routine = await createRoutine({userId,is_public,name,goal});
        res.send({
            message: 'Posting Routine Successful',
            routine
        })
        
    } catch (error) {
        next(error);
    }
})

module.exports = routinesRouter;