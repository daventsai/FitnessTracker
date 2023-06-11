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
        console.log('Error getting my routines: ',error)
    }
}