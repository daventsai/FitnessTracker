const client = require("../client");

async function addActivityToRoutine({routine_id,activity_id,count,duration}){
    try {
        const {rows:[routine_activity]} = await client.query(`
            INSERT INTO routine_activities(routine_id,activity_id,count,duration)
            VALUES($1,$2,$3,$4)
            RETURNING *;
        `,[routine_id,activity_id,count,duration]);
        return routine_activity;
    } catch (error) {
        console.error('Error creating routine_activities');
        throw error;
    }
}

async function getRoutineActivityById(routineActivityId){
    try {
        const {rows:[routine_activity]} = await client.query(`
            SELECT *
            FROM routine_activities
            WHERE id=$1;
        `,[routineActivityId]);
        return routine_activity;
    } catch (error) {
        console.error('Error getting routine_activities by id');
        throw error;
    }
}

async function updateRoutineActivity(routineActivityId,count,duration){
    try {
    const setString = Object.keys({count,duration}).map((key,index)=>`"${key}"=$${index+1}`).join(', ');
    if (setString.length===0){
        return;
    }
    const {rows:[routine_activity]} = await client.query(`
        UPDATE routine_activities
        SET ${setString}
        WHERE id=${routineActivityId}
        RETURNING *;
    `,Object.values({count,duration}));
    return routine_activity;
    } catch (error) {
        console.error('Error updating routine_activities');
        throw error;
    }
}

async function getRoutineActivitiesByRoutine(routineId){
    try {
        const {rows:routine_activity} = await client.query(`
            SELECT *
            FROM routine_activities
            WHERE routine_id = $1
        `,[routineId]);
        return routine_activity;
    } catch (error) {
        console.error('Error getting routine_activities by routine');
        throw error;
    }
}

async function destroyRoutineActivity(routineActivityId){
    try {
        await client.query(`
            DELETE
            FROM routine_activities
            WHERE id=$1
        `,[routineActivityId]);
    } catch (error) {
        console.error('Error destroying routine_activities by id');
        throw error;
    }
}

module.exports={addActivityToRoutine,getRoutineActivityById,updateRoutineActivity,getRoutineActivitiesByRoutine,destroyRoutineActivity}