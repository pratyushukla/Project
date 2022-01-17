import React, { createContext, useState } from "react";

export const UserContext = createContext();

const initialState = {
  isLoggedin: false,
};

export const MyContext = ({ children }) => {
  const [user, setUser] = useState(initialState);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
