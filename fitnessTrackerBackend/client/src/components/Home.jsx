import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from 'react';

export default function Home(){
    const nav = useNavigate();
    const {user} = useAuth();

    return(
        <div>
            <div>
                <h1>Welcome in {user.username}</h1>
                <h4>Do you even lift, bro?
                </h4>
            </div>
        </div>
    )
}