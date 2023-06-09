import { useEffect, useState } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import {fetchPublicRoutines} from "../api/routines"
import { fetchUser } from "../api/users";

export default function PublicRoutines(){
    const [routineName,setRoutineName] = useState('');
    //const [username,setUsername] = useState('');
    const[routines,setRoutines] = useState([]);
    useEffect(()=>{
        async function getPublicRoutines(){
            setRoutines(await fetchPublicRoutines());
            // ------------ MY ATTEMPTS AT GETTING THE USERNAME ONTO THE ROUTINES, BUT IT DID NOT WORK ----------
            // if(routines)
            //     for (let i=0;i<routines.routines.length;i++){
            //         setRoutines({...routines,user:setUsername(await fetchUser(routines.routines[i].creator_id))});
            //     }
        }
        getPublicRoutines();
    },[]);


    const routineDisplay = routineName.length ? routines.routines.filter((r)=>r.name.toLowerCase().includes(routineName.toLowerCase())) : routines.routines;
    console.log(routineDisplay);


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
                                    <div style={{border: '3px solid white', margin: '10px'}}>
                                        <h3>Name: {routine.name}</h3>
                                        <p>Goal: {routine.goal}</p>
                                        <p>Created By: {routine.creator_id}</p>
                                        {routine.activities.map((activity)=>{
                                            return(
                                                <div style={{border: '1px dotted white', margin: '3px'}}>
                                                    <h5>Activity: {activity.name}</h5>
                                                    <h6>Description: {activity.description}</h6>
                                                    <h6>Duration:{activity.duration}</h6>
                                                    <h6>Count: {activity.count}</h6>
                                                </div>
                                            )
                                        })}
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
