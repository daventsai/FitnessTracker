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
    
}

module.exports = {createRoutine};