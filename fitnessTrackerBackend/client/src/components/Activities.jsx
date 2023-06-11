import { useEffect, useState } from "react";
import { createActivity, fetchActivities } from "../api/activities";
import Header from "./Header";
import useAuth from "../hooks/useAuth"

export default function Activities(){
    const [activityName,setActivityName] = useState('');
    const[activities,setActivities] = useState([]);
    const{loggedIn} = useAuth();
    const [name,setName]=useState('');
    const[description,setDescription]=useState('');
    const [error,setError]=useState(null);
    const [submitted,setSubmitted]=useState(false);

    useEffect(()=>{
        async function getActivities(){
            setActivities(await fetchActivities());
            if (submitted){
                setSubmitted(false);
            }
        }
        getActivities();
    },[submitted])

    const activityDisplay = activityName.length ? activities.activities.filter((r)=>r.name.toLowerCase().includes(activityName.toLowerCase())) : activities.activities;

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const result = await createActivity(name,description);
            console.log('result of creating an activity',result);
            if (result.activity){
                setError(null);
                setSubmitted(true);
            }
            else{
                setError('Error creating post due to a duplicate name');
            }
        }
        catch(error){
            console.log('Error on submitting activity: ',error);
        }
        
    }

    return(
        <div>
            <Header/>
            <div className="myRoutines">
                <div className='routines'>
                    <div className='search'>
                        <p>Search for an Activity: </p>
                        <input type='text' onChange={(e)=>setActivityName(e.target.value)}/>
                    </div>
                    <div>
                        {
                            typeof activities.activities !== 'undefined'
                            ?
                                <div>
                                    {activityDisplay.map((activity)=>{
                                        return(
                                            <div style={{border: '3px solid white', margin: '10px'}}>
                                                <h3>Name: {activity.name}</h3>
                                                <p>Description: {activity.description}</p>
                                                <p>Id: {activity.id}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            :
                                <div/>
                        }
                    </div>
                </div>
                <div>
                    {loggedIn
                    ?
                        <div style={{border:'3px solid skyblue',margin:'5px'}}>
                            <h2>Create an Activity</h2>
                            <form onSubmit={handleSubmit}>
                                <p>Name: <input type='text' name='name' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/></p>
                                <p>Description: <input type='text' name='description' placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
                                <button>Submit</button>
                                {error?<p style={{color: "red"}}>{error}</p>:null}  
                            </form>
                        </div>
                    :
                        <div/>
                    }
                </div>
            </div>
        </div>
    )
}