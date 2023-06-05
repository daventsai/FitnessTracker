import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../api/users";

// Create the context
export const AuthContext = createContext();

// Create our Provider (wrapper component)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getMe() {
      const APIResponse = await fetchMe();

      if (APIResponse.data)
      {
        setUser(APIResponse.data);
      }
      else{
        setUser({username: "Guest"})
      }
    }
    getMe();
  }, []);

  const contextValue = {
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;