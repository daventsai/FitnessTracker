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