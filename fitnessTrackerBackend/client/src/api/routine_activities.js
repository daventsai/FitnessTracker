export async function deleteRoutineActivity(id){
    try {
        const response = await fetch(`/api/routine_activities/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error deleting a routineActivity: ',error)
    }
}

export async function addActivity(routine_id,activity_id,count,duration){
    try {
        const response = await fetch(`/api/routine_activities/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                routine_id,
                activity_id,
                count,
                duration
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error creating a routineActivity: ',error)
    }
}