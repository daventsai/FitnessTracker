export async function fetchActivities(){
    try{
        const response = await fetch('api/activities',{
            headers:{
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log('Error getting my activity: ',error)
    }
}

export async function createActivity(name,description){
    try {
        const response = await fetch('api/activities',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error creating an activity: ',error)
    }
}