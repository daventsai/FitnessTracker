export async function fetchPublicRoutines(){
    try{
        const response = await fetch('/api/routines/public',{
            headers:{
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log('Error getting public routines: ', error)
    }
}

export async function fetchRoutines(){
    try {
        const response = await fetch('/api/routines',{
            headers:{
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error getting my routines: ', error)
    }
}

export async function createRoutine(is_public,name,goal){
    try {
        const response = await fetch('/api/routines',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_public,
                name,
                goal
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error creating activities: ', error)
    }
}