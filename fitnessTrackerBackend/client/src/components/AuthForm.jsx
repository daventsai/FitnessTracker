import { useState } from "react";
import { registerUser,loginUser } from "../api/users";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import useAuth from "../hooks/useAuth";

export default function AuthForm(){
    const {pathname} = useLocation();
    const nav = useNavigate();
    const {setLoggedIn,setUser} = useAuth();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        try {
            let result;
            if (pathname==='/register'){
                result = await registerUser(username, password);
                if (result.user){
                    nav('/login');
                }
                else{
                    console.log(result);
                    setError('Error creating a user: ' + result.message);
                }
            }
            else{
                result = await loginUser(username, password);
                if (result.user){
                    setLoggedIn(true);
                    setUser(result.user);
                    nav('/');
                }
                else{
                    setError('Error logging in: '+result.message);
                }
            }
        } catch (error) {
            console.log('Error on registering submission: ',error);
        }
    }

    return(
        <div>
            { pathname === '/register'
            ?
            <div>
                <h1>Registering a new user</h1>
                <h3>Enter new user's information</h3>
            </div>
            :
            <div>
                <h1>Log in</h1>
                <h3>Enter user's information</h3>
            </div>
            }
            <form onSubmit={handleSubmit}>
                    <div>
                        <input type='text' name='username' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
                        <input type='text' name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button>Submit</button>
                    {error?<p style={{color: "red"}}>{error}</p>:null}  
                    <Link to='/'>Return to Login Page</Link>
                </form>
        </div>
    );
}
