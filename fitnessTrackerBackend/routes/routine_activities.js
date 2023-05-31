const routineActivitiesRouter = require('express').Router();
const {addActivityToRoutine} = require('../db/adapters/routine_activities');
const {getRoutineById} = require('../db/adapters/routines');
const {authRequired} = require('./verify');

routineActivitiesRouter.post('/',async(req,res,next)=>{
    try {
        const {routine_id,activity_id,count,duration} = req.body;
        const routine = await getRoutineById(routine_id);
        let duplicate = false;
        if (routine.activities.length>0){
            for ( let i=0;i<routine.activities.length;i++){
                console.log("r: ",routine.activities[i])
                console.log("r2: ",routine)
                if (routine_id === routine.id && activity_id === routine.activities[i].id){
                    duplicate = true;
                    break;
                }
            }
        }
        if (duplicate === false){
            const routineActivity = await addActivityToRoutine({routine_id,activity_id,count,duration});
            res.send({
                message: "Posting Activity Routine is Successful",
                routineActivity
            })
        }
        else{
            next({
                name: 'DuplicateroutineActivityError',
                message: 'Routine Id and Activity Id pair already matches in the system' 
             });
        }

    } catch (error) {
        next(error);
    }
});

module.exports = routineActivitiesRouter;