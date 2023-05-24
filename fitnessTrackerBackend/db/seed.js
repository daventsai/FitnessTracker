const client = require("./client");
const{
    users,
    activities,
    routines,
    routine_activities,
} = require("./seedData");

async function dropTables(){
    //Drops all tables, ORDER MATTERS
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS routine_activities;
            DROP TABLE IF EXISTS activities;
            DROP TABLE IF EXISTS routines;
            DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropping tables");
    } catch (error) {
        console.error("Error dropping tables");
        throw error;
    }
}

async function createTables(){
    //Define the table
    try {
        console.log("Starting to create tables...");
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
            );
            CREATE TABLE routines(
                id SERIAL PRIMARY KEY,
                creator_id INTEGER REFERENCES users(id),
                is_public BOOLEAN DEFAULT false,
                name varchar(255) UNIQUE NOT NULL,
                goal varchar(255) NOT NULL
            );
            CREATE TABLE activities(
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                description varchar(255) NOT NULL
            );
            CREATE TABLE routine_activities(
                id SERIAL PRIMARY KEY,
                routine_id INTEGER REFERENCES routines(id),
                activity_id INTEGER REFERENCES activities(id),
                count INTEGER,
                duration INTEGER
            );
        `);
        console.log("Finished creating tables");
    } catch (error) {
        console.error("Error creating tables");
        throw error;
    }

}

async function populateTables(){
    //Seed tables w/ dummy data from seedData.js
    try{
        console.log("Starting to populate tables...");

        console.log("Finished populating tables");
    }
    catch(error){
        console.error("Error populating tables");
        throw error;
    }
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