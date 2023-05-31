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
        const {is_public,name,goal} = req.body;
        const routine = await createRoutine({creator_id:req.user.id,is_public,name,goal});
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
        const {routineId} = req.params;
        const userId = req.user.id;
        const routine = await getRoutineById(routineId);
        const creatorId = routine.creator_id;
        console.log('routineObj',await getRoutineById(routineId));
        console.log('user id: '+ userId + ' | creatorId: ' + creatorId);
        if (userId === creatorId){
            const deletedRoutine = await destroyRoutine(routineId);
            res.send({
                message: 'Deleting routine successful',
                deletedRoutine
            })
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