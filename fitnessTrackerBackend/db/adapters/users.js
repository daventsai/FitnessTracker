const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function createUser({username,password}){
    try {
        const hashedPassword = await bcrypt.hash(password.toString(),SALT_ROUNDS);
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

async function getUserByUsername(username){
    try {
        const {rows:[user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1
        `,[username]);
        if (!user){
            throw{
                name:'UserNotFoundError',
                message:'A user with that username does not exist'
            }
        }
        return user;
    } catch (error) {
        console.error('Error getting username');
        throw error;
    }
}

async function getUser({username,password}){
    try {
        const user = await getUserByUsername(username);
        const validPassword = await bcrypt.compare(password.toString(),user.password)
        return validPassword;
    } catch (error) {
        console.error('Error getting user');
        throw error;
    }
}

module.exports = {createUser,getUserByUsername,getUser};