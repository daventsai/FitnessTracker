const BASE_URL = 'localhost:3000/api/';

export async function registerUser(username,password){
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        const result = await response.json();
        console.log('Registering user result: ', result);
        return result;
    } catch (error) {
        console.log('Error registering user: ', error);
    }
}

export async function loginUser(username,password){
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password
              }
            })
          });
          const result = await response.json();
          console.log('Logging in user result: ', result);
          return result;
    } catch (error) {
        console.log('Error logging in to user: ', error)
    }
}

export async function fetchMe() {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        console.log("Result of fetchMe: ", result);
        return result;
    } catch (error) {
        console.log('Error getting user: ', error)
    }
}

export async function fetchUserRoutines(username){
    try {
        const response = await fetch(`${BASE_URL}/${username}/routines`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Result of fetchUserRoutines: ", result);
        return result;
    } catch (error) {
        console.log('Error getting routines from user: ', error)
    }
}