import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from 'react';
import Header from "./Header";

export default function Home(){
    const nav = useNavigate();
    const {user} = useAuth();

    return(
        <div>
            <Header/>
            <div>
            <h1>Welcome in {user.username}</h1>
                <h4>Do you even lift, bro?
                </h4>
            </div>
        </div>
    )
}
// 