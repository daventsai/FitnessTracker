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
        const {token} = req.signedCookies;
        const {is_public,name,goal} = req.body;
        const parsedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const userId = parsedToken.id;
        console.log("parsedToken info: ", userId);

        //-----------------NOT SAVING CREATOR_ID----------------------------
        const routine = await createRoutine({userId,is_public,name,goal});
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
        const {routine_id} = req.body;
        const parsedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const userId = parsedToken.id;
        const creatorId = await getRoutineById(routine_id).creator_id;
        console.log('user id: '+ userId + ' | creatorId: ' + creatorId);
        if (userId === creatorId){
            await destroyRoutine(routine_id);
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