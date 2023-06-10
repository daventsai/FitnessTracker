import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { fetchRoutines,createRoutine } from "../api/routines";
import Header from "./Header";

export default function MyRoutines(){
    const nav = useNavigate();
    const{loggedIn,user} = useAuth();
    const[routines,setRoutines] = useState([]);
    const [routineName,setRoutineName] = useState('');
    const [isPublic,setIsPublic] = useState(false);
    const [name,setName] = useState('');
    const [goal,setGoal] = useState('');
    const [submitted,setSubmitted] = useState(false);
    useEffect(()=>{
        async function getMyRoutines(){
            if (loggedIn === true){
                setRoutines(await fetchRoutines());
                if (submitted){
                    setSubmitted(false);
                }
            }
            else{
                nav('/');
            }
        }
        getMyRoutines();
    },[submitted])
    let routineDisplay;
    if (routines.routines){
        routineDisplay = routineName.length ? routines.routines.filter((r)=>(r.creator_id===user.id && r.name.toLowerCase().includes(routineName.toLowerCase()))) : routines.routines.filter((r)=>(r.creator_id===user.id));
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const result = await createRoutine(isPublic,name,goal);
            setName('');
            setGoal('');
            setIsPublic(false);
            const x = document.getElementsByClassName("isPublic");
            for(let i=0; i<x.length; i++) {
                x[i].checked = false;
                }   
            setSubmitted(true);
            console.log('create routine result',result);
        } catch (error) {
            console.log('Error on creating a routine',error);
        }
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
                    <div className='myRoutines'>
                        <div className='routines'>
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
                                            <div style={{border: '3px solid white', margin: '5px'}}>
                                                <h3>Name: {routine.name}</h3>
                                                <p>Goal: {routine.goal}</p>
                                                <p>Created By: {routine.creator_id}</p>
                                                {routine.activities.map((activity)=>{
                                                    return(
                                                        <div style={{border: '1px dotted teal', margin: '2px'}}>
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
                        <div style={{border:'3px solid white',margin:'5px'}}>
                            <h2>Create new Routine</h2>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <p><input type='text' name='name' placeholder='routine name' value={name} onChange={(e)=>setName(e.target.value)}/></p>
                                    <p><input type='text' name='goal' placeholder='goal' value={goal} onChange={(e)=>setGoal(e.target.value)}/></p>
                                    <p>Public?<input type='checkbox' className='isPublic' name='isPublic' onChange={(e)=>setIsPublic(e.target.checked?true:false)}/></p>
                                    <button>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}