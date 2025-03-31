import React, { createContext, useState } from "react";
import { User } from "../../app/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    loadUserFromStorage();
  }, []);

  React.useEffect(() => {
    if (user) {
      saveUserToStorage(user);
    }
  }, [user]);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user data: ", error);
    }
  };

  const saveUserToStorage = async (userData) => {
    try {
      await AsyncStorage.setItem("@user_data", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  const login = (userData) => {
    saveUserToStorage(userData);
    setUser(userData);
  };

  const logout = () => {
    AsyncStorage.removeItem("@user_data");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
