const client = require("../client");

async function createActivity({name,description}){
    try {
        const {rows:[activity]} = await client.query(`
            INSERT INTO activities(name,description)
            VALUES($1,$2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,[name,description]);
        return activity;
    } catch (error) {
        console.error('Error creating activities');
        throw error;
    }
}

async function getActivityById(activityId){
    try {
        const{rows:[activity]} = await client.query(`
            SELECT name,description
            FROM activities
            WHERE id=$1;
        `,[activityId]);
        return activity;
    } catch (error) {
        console.error('Error getting activity by Id');
        throw error;
    }
}

async function getAllActivities(){
    try {
        const{rows} = await client.query(`
            SELECT id, name, description
            FROM activities;
        `);
        return rows;
    } catch (error) {
        console.error('Error getting all activities');
        throw error;
    }
}

async function updateActivity(activityId,name,description){
    const setString = Object.keys({name,description}).map((key,index)=>`"${key}"=$${index+1}`).join(', ');
    if (setString.length === 0){
        return;
    }

    try {
        const {rows:[activity]} = await client.query(`
        UPDATE activities
        SET ${setString}
        WHERE id=${activityId}
        RETURNING *;
        `,Object.values({name,description}));
        return activity;
    } catch (error) {
        console.error('Error updating activity');
        throw error;
    }
}

module.exports = {createActivity,getActivityById,getAllActivities,updateActivity};