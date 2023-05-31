const activitiesRouter = require('express').Router();
const {createActivity,getAllActivities,updateActivity} = require('../db/adapters/activities');
const {getPublicRoutinesByActivity} = require('../db/adapters/routines');
const {authRequired} = require('./verify');

activitiesRouter.get('/',async(req,res,next)=>{
    try {
        const activities = await getAllActivities();
        res.send({
            message: "Getting All Activities is Successful",
            activities
        });
    } catch (error) {
        next(error);
    }
});

activitiesRouter.post('/',authRequired,async(req,res,next)=>{
    try {
        const {name,description} = req.body;
        const activity = await createActivity({name,description});
        res.send({
            message: "Posting Activity is Successful",
            activity
        })
    } catch (error) {
        next(error);
    }
});

activitiesRouter.patch('/:activityId',authRequired,async(req,res,next)=>{
    try {
        const {activityId} = req.params;
        const {name,description} = req.body;
        const activity = await updateActivity(activityId,name,description);
        res.send({
            message: "Updating Activity is Successful",
            activity
        });
    } catch (error) {
        next(error);
    }
});

activitiesRouter.get('/:activityId/routines',async(req,res,next)=>{
    try {
        const {activityId} = req.params;
        const routine = await getPublicRoutinesByActivity(activityId);
        res.send({
            message: "Getting Public Routines from the Activity is Successful",
            routine
        })
    } catch (error) {
        next(error);
    }
});

module.exports = activitiesRouter;