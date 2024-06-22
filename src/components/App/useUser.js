import { useState, createContext } from "react";

export const UserContext = createContext();

export function useUser() {
  const getUser = () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      return user;
    } catch (e) {
      console.log("Error getting user from localStorage", e);
    }
    return null;
  };
  const [user, setUser] = useState(getUser());

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const removeUser = () => {
    saveUser(null);
  };

  return {
    setUser: saveUser,
    user,
    removeUser,
  };
}
