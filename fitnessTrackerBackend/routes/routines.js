const routinesRouter = require('express').Router();
const {getAllRoutines,createRoutine,destroyRoutine,getRoutineById,updateRoutine} = require('../db/adapters/routines');

const {authRequired} = require('./verify');

routinesRouter.get('/',async(req,res,next)=>{
    try {
        const routines = await getAllRoutines();
        res.send({
            message: 'Getting Routines and Their Activities is Successful',
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

routinesRouter.patch('/:routineId',authRequired,async(req,res,next)=>{
    try {
        const {routineId} = req.params;
        const {is_public,name,goal} = req.body;
        const routine = await getRoutineById(routineId);
        if (req.user.id === routine.creator_id){
            const updatedRoutine = await updateRoutine(routineId,is_public,name,goal);
            res.send({
                message: 'Updating Routine Successful',
                updatedRoutine
            })
        }
        else{
            next({
                name: 'IdMatchError',
                message: 'User Id does not match the Creator Id'
            });
        }
    } catch (error) {
        next(error);
    }
});

routinesRouter.delete('/:routineId',authRequired,async(req,res,next)=>{
    try {
        const {routineId} = req.params; 
        const routine = await getRoutineById(routineId);
        if (req.user.id === routine.creator_id){
            const deletedRoutine = await destroyRoutine(routineId);
            res.send({
                message: 'Deleting Routine Successful',
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