import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../api/users";

export default function Header(){
    const nav = useNavigate();
    const {setUser,user,setLoggedIn,loggedIn} = useAuth();
    const loc = useLocation();

    async function handleLogout(){
        console.log('user test: ',user)
        await logout();
        setUser({username:'Guest'});
        setLoggedIn(false);
        nav('/');
    }

    return(
        <header>
            { loggedIn === true
            ?
            <div>
                <button onClick={()=>nav('/')}>Home</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            :
            <div>
                <div>{
                    (loc.pathname !== '/login' && loc.pathname !=='/register')
                    ?
                    <div>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                    :
                    <div/>
                    }
                </div>
                <button onClick={()=>nav('/')}>Home</button>
            </div>
            }
        </header>
    )
}