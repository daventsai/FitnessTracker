import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { fetchRoutines } from "../api/routines";
import Header from "./Header";

export default function MyRoutines(){
    const nav = useNavigate();
    const{loggedIn,user} = useAuth();
    const[routines,setRoutines] = useState([]);
    const [routineName,setRoutineName] = useState('');
    useEffect(()=>{
        async function getMyRoutines(){
            if (loggedIn === true){
                setRoutines(await fetchRoutines());
            }
            else{
                nav('/');
            }
        }
        getMyRoutines();
    },[])
    let routineDisplay;
    if (routines.routines){
        routineDisplay = routineName.length ? routines.routines.filter((r)=>(r.creator_id===user.id && r.name.toLowerCase().includes(routineName.toLowerCase()))) : routines.routines.filter((r)=>(r.creator_id===user.id));
    }

    return(
        <div>
            {
                loggedIn===false
                ?
                <div>Not authorized</div>
                :
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
                                                <div style={{border: '1px dotted teal', margin: '3px'}}>
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
            }
        </div>
    );
}