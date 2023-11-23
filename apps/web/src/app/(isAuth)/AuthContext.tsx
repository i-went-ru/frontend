import { createContext, useEffect, useState } from "react";
import { fetcher } from "../../utils/fetch";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [reset, setReset] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      getCurrentUser();
    }, [reset]);
  
    const getCurrentUser = async () => {
      try {
        const response = await fetcher("/auth/users/me/")
        setIsAuthenticated(true);
        setCurrentUser(response);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
      }
    };
  
    return (
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, currentUser, isLoading,setReset }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export {AuthContext, AuthProvider}
