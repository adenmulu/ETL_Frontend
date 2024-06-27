import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state is null, set this upon user login

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
