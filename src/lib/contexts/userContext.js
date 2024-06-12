import { createContext, useState } from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    address,
    setAddress,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
