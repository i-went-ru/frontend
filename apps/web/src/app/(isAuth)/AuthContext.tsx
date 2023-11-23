import { createContext, useEffect, useState } from "react";
import { fetcher } from "../../utils/fetch";
// import { User } from "../hooks/useUser";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      getCurrentUser();
    }, []);
  
    const getCurrentUser = async () => {
      try {
        const response = await fetcher("/auth/users/me/")
        setIsAuthenticated(true);
        setCurrentUser(response);
      } catch (error) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
  
    return (
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, currentUser }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export {AuthContext, AuthProvider}
