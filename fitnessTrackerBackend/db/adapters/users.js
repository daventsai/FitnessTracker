const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function createUser({username,password}){
    try {
        const hashedPassword = await bcrypt.hash(password.toString(),SALT_ROUNDS);
        console.log("hashedPassword being set: ", hashedPassword);
        const {rows: [user]} = await client.query(`
            INSERT INTO users(username,password)
            VALUES($1,$2)
            ON CONFLICT (username) DO NOTHING
            RETURNING username;
            `,[username,hashedPassword]);
        return user;
    } catch (error) {
        console.error('Error creating users');
        throw error;
    }
}

async function getUser({username,password}){

}

module.exports = {createUser};