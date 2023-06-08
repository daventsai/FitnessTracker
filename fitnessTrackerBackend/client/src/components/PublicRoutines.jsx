import { useEffect, useState } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import {fetchPublicRoutines} from "../api/routines"

export default function PublicRoutines(){
    const [routineName,setRoutineName] = useState('');

    const[routines,setRoutines] = useState([]);
    useEffect(()=>{
        async function getPublicRoutines(){
            setRoutines(await fetchPublicRoutines());
        }
        getPublicRoutines();
    },[]);

    const routineDisplay = routineName.length ? routines.routines.filter((r)=>r.name.toLowerCase().includes(routineName.toLowerCase())) : routines.routines;

    return(
        <div>
            <Header/>
            <div className='search'>
                <p>Search for a routine: </p>
                <input type='text' onChange={(e)=>setRoutineName(e.target.value)}/>
            </div>
            <div>
                {
                    typeof routines.routines !== 'undefined'
                    ?
                        <div>
                            {routineDisplay.map((routine)=>{
                                return(
                                    <div style={{border: '3px solid white', margin: '15px'}}>
                                        <h3>{routine.name}</h3>
                                        <p>{routine.goal}</p>
                                    </div>
                                )
                            })}
                        </div>
                    :
                        <div/>
                }
                
            </div>
        </div>
    );
}
