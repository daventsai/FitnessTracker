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
            WHERE id = $1;
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
            WHERE routine_activities.routine_id=$1;
        `,[routineId]);
        routine.activities = activities;

        return routine;
    } catch (error) {
        console.error('Error getting routines by Id');
        throw error;
    }
}

async function getRoutinesWithoutActivities(){
    try {
        const {rows:routine} = await client.query(`
            SELECT *
            FROM routines
        `);
        return routine;
    } catch (error) {
        console.error('Error getting all routines without activities');
        throw error;
    }
}

async function getAllRoutines(){
    try {
        const {rows:routine} = await client.query(`
        SELECT
            routines.id as id,
            routines.creator_id as creator_id,
            routines.is_public as is_public,
            routines.name as name,
            routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
            )
        ) END AS activities
        FROM routines
        LEFT JOIN routine_activities ON routines.id = routine_activities.routine_id
        LEFT JOIN activities ON routine_activities.activity_id = activities.id
        GROUP BY routines.id, routine_activities.routine_id;
        `);

        return routine;
    } catch (error) {
        console.error('Error getting all routines with activities');
        throw error;
    }
}

async function getAllPublicRoutines(){
    try {
        const {rows:routine} = await client.query(`
        SELECT
            routines.id as id,
            routines.creator_id as creator_id,
            routines.is_public as is_public,
            routines.name as name,
            routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
            )
        ) END AS activities
        FROM routines
        LEFT JOIN routine_activities ON routines.id = routine_activities.routine_id
        LEFT JOIN activities ON routine_activities.activity_id = activities.id
        WHERE routines.is_public = true
        GROUP BY routines.id, routine_activities.routine_id;
        `);

        return routine;
    } catch (error) {
        console.error('Error getting all public routines');
        throw error;
    }
}

async function getAllRoutinesByUser(username){
    try {
        const {rows:routine} = await client.query(`
        SELECT
            routines.id as id,
            routines.creator_id as creator_id,
            routines.is_public as is_public,
            routines.name as name,
            routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
            )
        ) END AS activities
        FROM routines
        LEFT JOIN routine_activities ON routines.id = routine_activities.routine_id
        LEFT JOIN activities ON routine_activities.activity_id = activities.id
        LEFT JOIN users ON routines.creator_id = users.id
        WHERE users.username = $1
        GROUP BY routines.id, routine_activities.routine_id;
        `,[username]);

        return routine;
    } catch (error) {
        console.error('Error getting all public routines');
        throw error;
    }
}

async function getPublicRoutinesByUser(username){
    try {
        const {rows:routine} = await client.query(`
        SELECT
            routines.id as id,
            routines.creator_id as creator_id,
            routines.is_public as is_public,
            routines.name as name,
            routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
            )
        ) END AS activities
        FROM routines
        LEFT JOIN routine_activities ON routines.id = routine_activities.routine_id
        LEFT JOIN activities ON routine_activities.activity_id = activities.id
        LEFT JOIN users ON routines.creator_id = users.id
        WHERE users.username = $1 AND routines.is_public = true
        GROUP BY routines.id, routine_activities.routine_id;
        `,[username]);

        return routine;
    } catch (error) {
        console.error('Error getting all public routines by username');
        throw error;
    }
}

async function getPublicRoutinesByActivity(activityId){
    try {
        const {rows:routine} = await client.query(`
        SELECT
            routines.id as id,
            routines.creator_id as creator_id,
            routines.is_public as is_public,
            routines.name as name,
            routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
            )
        ) END AS activities
        FROM routines
        LEFT JOIN routine_activities ON routines.id = routine_activities.routine_id
        LEFT JOIN activities ON routine_activities.activity_id = activities.id
        WHERE activities.id= $1 AND routines.is_public = true
        GROUP BY routines.id, routine_activities.routine_id;
        `,[activityId]);

        return routine;
    } catch (error) {
        console.error('Error getting all public routines by activity');
        throw error;
    }
}

async function updateRoutine(routineId, is_public, name, goal){
    const setString = Object.keys({is_public,name,goal}).map((key,index)=>`"${key}"=$${index+1}`).join(', ');
    if (setString.length === 0){
        return;
    }
    try {
        const {rows:[routine]} = await client.query(`
            UPDATE routines
            SET ${setString}
            WHERE id=${routineId}
            RETURNING *;
        `,Object.values({is_public,name,goal}));
        return routine;
    } catch (error) {
        console.error('Error updating routines');
        throw error;
    }
}

async function destroyRoutine(routine_id){
    try {
        await client.query(`
            DELETE
            FROM routine_activities
            WHERE routine_activities.routine_id IN
                (SELECT id
                FROM routines
                WHERE id = $1);
        `,[routine_id]);
        
        await client.query(`
            DELETE
            FROM routines
            WHERE routines.id = $1;
        `,[routine_id]);
    } catch (error) {
        console.error('Error destroying routines and related activities');
        throw error;
    }
    
}

module.exports = {createRoutine,getRoutineById,getRoutinesWithoutActivities,getAllRoutines, getAllPublicRoutines,getAllRoutinesByUser,
    getPublicRoutinesByUser,getPublicRoutinesByActivity,updateRoutine,destroyRoutine};