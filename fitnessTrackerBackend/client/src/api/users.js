export async function registerUser(username,password){
    try {
        const response = await fetch(`/api/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error registering user: ', error);
    }
}

export async function loginUser(username,password){
    try {
        const response = await fetch(`/api/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const  result= await response.json();
        return result;
    } catch (error) {
        console.log('Error logging in to user: ', error)
    }
}

export async function fetchMe() {
    try {
        const response = await fetch(`/api/users/me`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const result  = await response.json();
        return result;
    } catch (error) {
        console.log('Error getting user: ', error)
    }
}

export async function fetchUser(creator_id) {
    try {
        const response = await fetch(`/api/users/id/${creator_id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const result  = await response.json();
        return result;
    } catch (error) {
        console.log('Error getting user: ', error)
    }
}

export async function fetchUserRoutines(username){
    try {
        const response = await fetch(`/api/users/${username}/routines`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result= await response.json();
        return result;
    } catch (error) {
        console.log('Error getting routines from user: ', error)
    }
}

export async function logout(){
    const response = await fetch("/api/users/logout");
    const result = await response.json();

    return result;
}