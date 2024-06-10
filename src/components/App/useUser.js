import { useState, createContext } from 'react';


export const UserContext = createContext();

export function useUser() {
  const getUser = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user
  };
  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const removeUser = () => {
    saveUser(null);
  };

  return {
    setUser: saveUser,
    user,
    removeUser
  }
}