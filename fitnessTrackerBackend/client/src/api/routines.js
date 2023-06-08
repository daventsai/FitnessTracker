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
        console.log('Error getting routines: ', error)
    }
}