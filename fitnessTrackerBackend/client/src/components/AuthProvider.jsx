import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../api/users";

// Create the context
export const AuthContext = createContext();

// Create our Provider (wrapper component)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({username:"Guest"});
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const apiResponse = await fetchMe();
        if (apiResponse.loggedIn===true){
          setUser(apiResponse);
          setLoggedIn(true);
        }
        else{
          setUser({username:"Guest"});
          setLoggedIn(false);
        }
      } catch (error) {
        setUser({username:"Guest"});
        setLoggedIn(false);
      }
    }
    getMe();
  }, []);

  console.log('user',user);
  console.log('loggedIn',loggedIn)
  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;