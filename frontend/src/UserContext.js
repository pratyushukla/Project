import React, { createContext, useState } from "react";

export const UserContext = createContext();

const initialState = {
  auth: {
    email: "",
    password: "",
  },
  profile: {
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  },
  education: [{ course: "", institution: "", year: "", marks: "" }],
  projects: [{ title: "", date: "", description: "" }],
  skills: "",
  experience: [],
  achivements: [],
  certificates: [],
  languages: [],
  interest: [],
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
