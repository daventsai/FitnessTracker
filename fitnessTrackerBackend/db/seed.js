const client = require("./client");
const{
    users,
    activities,
    routines,
    routine_activities,
} = require("./seedData");

async function dropTables(){
    //Drops all tables, ORDER MATTERS
}

async function createTables(){
    //Define the table
}

async function populateTables(){
    //Seed tables w/ dummy data from seedData.js
}

async function rebuildDB(){
    client.connect();
    try {
        await dropTables();
        await createTables();
        await populateTables();
    } catch (error) {
        console.error("rebuildDB Error: ", error)
    }
    finally{
        client.end();
    }
}

rebuildDB();