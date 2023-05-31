const routinesRouter = require('express').Router();
const {getAllRoutines,createRoutine,destroyRoutine,getRoutineById} = require('../db/adapters/routines');

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
        const {creator_id,is_public,name,goal} = req.body;
        const routine = await createRoutine({creator_id,is_public,name,goal});
        console.log("routine: ", routine);
        res.send({
            message: 'Posting Routine Successful',
            routine
        });
        
    } catch (error) {
        next(error);
    }
});

routinesRouter.delete('/:routineId',authRequired,async(req,res,next)=>{
    try {
        const {token} = req.signedCookies;
        const {routineId} = req.params;
        const parsedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const userId = parsedToken.id;
        const routine = await getRoutineById(routineId);
        const creatorId = routine.creator_id;
        console.log('routineObj',await getRoutineById(routineId));
        console.log('user id: '+ userId + ' | creatorId: ' + creatorId);
        if (userId === creatorId){
            await destroyRoutine(routineId);
        }
        else{
            next({
                name: 'IdMatchError',
                message: 'User Id does not match the Creator Id'
            })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = routinesRouter;