import React, { createContext, useContext, useState } from "react";

// Create a User context
const UserContext = createContext();

// Create a UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, user is not logged in

  // setUser is the function you would call after a successful login operation

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook for easy access to the user context
export const useUser = () => useContext(UserContext);
