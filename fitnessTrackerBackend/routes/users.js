const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {createUser, getUserByUsername, getUser} = require('../db/adapters/users');
const e = require('express');

usersRouter.post('/register',async (req,res,next)=>{
    const {username, password} = req.body;
    try {
        const _user = await getUserByUsername(username);
        if (_user){
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }
        const user = await createUser({username,password});
        const token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn: '2w'});
        res.send({
            message: 'Register Successful',
            user,
            token})
    } catch (error) {
        next(error);
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
            res.send({
                message: 'Login Successful',
                user,
                token});
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
})

module.exports = usersRouter;