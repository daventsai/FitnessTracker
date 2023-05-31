const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {createUser, getUserByUsername, getUser} = require('../db/adapters/users');
const {getPublicRoutinesByUser} = require('../db/adapters/routines');

const {authRequired} = require('./verify');

usersRouter.post('/register',async (req,res,next)=>{
    const {username, password} = req.body;
    if (password.length < 8){
        next({
            name: "PasswordError",
            message: "Please supply a password that's over 8 characters"
        });
    }
    else{
        try {
            const _user = await getUserByUsername(username);
            if (_user){
                next({
                    name: 'UserExistsError',
                    message: 'A user by that username already exists'
                });
            }
            const user = await createUser({username,password});
            res.send({
                message: 'Register Successful',
                user
            });
        } catch (error) {
            next(error);
        }
    }
    
});

usersRouter.post('/login',async (req,res,next)=>{
    const {username, password} = req.body;
    if (!username || !password) {
        next({
          name: "MissingCredentialsError",
          message: "Please supply both a username and password"
        });
      }
    else{
        try{
            const _user = await getUserByUsername(username);
            if (!_user){
                next({
                    name: 'UserDoesNotExistError',
                    message: 'A user by that username does not exist'
                });
            }
            const user = await getUser({username,password});
            if (user){
                const token = jwt.sign( user, process.env.JWT_SECRET,{expiresIn: '2w'});
                res.cookie("token", token,{
                    sameSite: 'strict',
                    httpOnly: true,
                    signed: true,
                })
                res.send({
                    message: 'Login Successful',
                    user
                });
            }
            else{
                next({
                   name: 'IncorrectCredentialsError',
                   message: 'Username or password is incorrect' 
                });
            }
        } catch (error) {
            next(error);
        }
    } 
});

usersRouter.get('/me', authRequired,async(req,res,next)=>{
    try {
        const user = await getUserByUsername(req.user.username);
        res.send({
            message: 'Getting the user data is successful',
            user
        });
    } catch (error) {
        next(error);
    }
});

usersRouter.get('/:username/routines',async(req,res,next)=>{
    const { username } = req.params;
    try {
        const routine = await getPublicRoutinesByUser(username);
        res.send({
            message: `Getting ${username}'s public routines is successful`,
            routine
        });
    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;