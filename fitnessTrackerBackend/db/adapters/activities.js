const client = require("../client");
const { routine_activities } = require("../seedData");

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

module.exports = {createActivity};