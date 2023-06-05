import { useState } from "react";
import { registerUser } from "../api/users";
import {Link, useNavigate} from 'react-router-dom';

export default function RegisterForm(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const nav = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const result = await registerUser(username, password);
            console.log('Result on registering submission: ', result);
            nav('/');
        } catch (error) {
            console.log('Error on registering submission: ',error);
        }
        console.log({username,password});
    }

    return(
        <div>
            <h1>Registering a new user</h1>
            <h3>Enter new user's information</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='username' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
                    <input type='text' name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button>Submit</button>
                <Link to='/'>Return to Login Page</Link>
            </form>
            
        </div>
    );
}
