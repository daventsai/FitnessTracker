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

module.exports={addActivityToRoutine}