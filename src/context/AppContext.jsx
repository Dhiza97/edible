"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Logged out successfully!");
        setUser(null);
        console.log("User after logout:", user);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, logout }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
