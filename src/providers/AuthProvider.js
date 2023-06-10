import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(['session_id']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookies.session_id) {
      setIsAuthenticated(true);
    }
  }, [cookies]);


  const logIn = () => {
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
