import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { fetchRoutines,createRoutine,updateRoutine,deleteRoutine } from "../api/routines";
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
    const [deleted,setDeleted] = useState(false);
    const [editRoutineState,setEditRoutineState] = useState(false);
    const [tempEditName,setTempEditName] = useState('');
    const [tempIsPublic,setTempIsPublic]=useState(false);
    const [tempEditGoal,setTempEditGoal] = useState('');
    const [tempEditRoutineId,setTempEditRoutineId] = useState('');

    useEffect(()=>{
        async function getMyRoutines(){
            if (loggedIn === true){
                setRoutines(await fetchRoutines());
                if (submitted){
                    setSubmitted(false);
                }
                if (deleted){
                    setDeleted(false);
                }
            }
            else{
                nav('/');
            }
        }
        getMyRoutines();
    },[submitted,deleted])
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
    async function handleRoutineEditSubmit(e){
        e.preventDefault();
        try {
            const result = await updateRoutine(tempEditRoutineId,tempIsPublic,tempEditName,tempEditGoal);
            console.log(tempEditRoutineId,tempIsPublic,tempEditName,tempEditGoal)
            setSubmitted(true);
            console.log('updating routine result',result);
        } catch (error) {
            console.log('Error updating routine',error);
        }
    }

    async function deleteR(e){
        try {
            const result = await deleteRoutine(e.id);
            setDeleted(true);
            console.log('deleted routine result',result); 
        } catch (error) {
            console.log('Error deleting routine',error);
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
                                                <div>
                                                    <div>
                                                            <button onClick={()=>{setEditRoutineState(!editRoutineState),setTempEditName(routine.name),setTempEditGoal(routine.goal),setTempEditRoutineId(routine.id),setTempIsPublic(routine.is_public)}}>Edit Routine</button>
                                                            <button onClick={()=>deleteR(routine)}>Delete Routine</button>
                                                            <button>Add New Activity</button>
                                                    </div>
                                                    <h3>Name: {routine.name}</h3>
                                                    <p>Goal: {routine.goal}</p>
                                                    <p>Created By: {routine.creator_id}</p>
                                                    {routine.activities.map((activity)=>{
                                                        return(
                                                            <div>
                                                                <div style={{border: '1px dotted teal', margin: '2px'}}>
                                                                    <h5>Activity: {activity.name}</h5>
                                                                    <h6>Description: {activity.description}</h6>
                                                                    <h6>Duration:{activity.duration}</h6>
                                                                    <h6>Count: {activity.count}</h6>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
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
                            { editRoutineState !== true
                            ?
                            <div>
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
                            :
                            <div>
                                <div>
                                    <form onSubmit={handleRoutineEditSubmit}>
                                        <h2>Edit Routine</h2>
                                        <button>Submit</button>
                                        <p>By all accounts... this should work. idk why it isn't. Code looks all fine, looking
                                            at the terminal, idk why it thinks it's null. I console logged alll the values and it passes
                                            everything fine. Same with the backend, it should work since all the seeddata is correct.
                                            If you can tell me what's wrong or if it's like a niche error, that'd be great since I spent 4hrs
                                            trying to get this to work.
                                        </p>
                                        <p>Name: <input type='text' defaultValue={tempEditName} onChange={(e)=>setTempEditName(e.target.value)}/></p>
                                        <p>Goal: <input type='text' defaultValue={tempEditGoal} onChange={(e)=>setTempEditGoal(e.target.value)}/></p>
                                    </form>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}