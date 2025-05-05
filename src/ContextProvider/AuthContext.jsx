import React from 'react';
import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = userData => {
    console.log('User data:', userData);
    setUser({name: "admin", email: "v@gmail.com"}); // Assuming userData contains name and email
    setIsLoggedIn(true);
    setToken(userData.token); // Assuming userData contains a token
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, user, login, logout, token}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
