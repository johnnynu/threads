import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Create a User context
const UserContext = createContext();

// Create a UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, user is not logged in
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // This listener is triggered when user login state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const simplifiedUser = {
          id: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL
        };
        setUser(simplifiedUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Once the user has been set, we're no longer loading
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook for easy access to the user context
export const useUser = () => useContext(UserContext);
