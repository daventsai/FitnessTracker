const routinesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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

module.exports = routinesRouter;