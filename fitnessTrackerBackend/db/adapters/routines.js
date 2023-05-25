const client = require("../client");

async function createRoutine({creator_id,is_public,name,goal}){
    try {
        const { rows: [routine]} = await client.query(`
            INSERT INTO routines(creator_id,is_public,name,goal)
            VALUES($1,$2,$3,$4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,[creator_id,is_public,name,goal]);
        return routine;
    } catch (error) {
        console.error('Error creating routines');
        throw error;
    }
}

async function getRoutineById(routineId){
    try {
        const {rows:[routine]} = await client.query(`
            SELECT *
            FROM routines
            WHERE id = $1
        `,[routineId]);
        if(!routine){
            throw{
                name:"RouteNotFoundError",
                message:"Could not find routine with that routineId"
            };
        }
        const {rows:activities} = await client.query(`
            SELECT activities.*
            FROM activities
            JOIN routine_activities ON activities.id=routine_activities.activity_id
            WHERE routine_activities.routine_id=$1
        `,[routineId]);
        routine.activities = activities;

        return routine;
    } catch (error) {
        console.error('Error getting routines by Id');
        throw error;
    }
}

module.exports = {createRoutine,getRoutineById};