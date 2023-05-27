const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {createUser, getUserByUsername} = require('../db/adapters/users');

usersRouter.post('/register',async (req,res,next)=>{
    const {username, password} = req.body;
    try {
        const _user = await getUserByUsername(username);
        if (_user){
            next({
                name: 'UserExistsError',
                nessage: 'A user by that username already exists'
            });
        }
        const user = await createUser({username,password});

        //SOMETHING BROKEN HERE
        const token = jwt.sign({
            id: user.id, 
            username
            }, process.env.JWT_SECRET, {
            expiresIn: '2w'
        });
        res.send({
            message: 'You have registered successfully',
            token
        })
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;