/**
 * App Context
 * Provides global app state management for the entire application
 * Handles user data, loading states, and other app-wide information
 */

import React, { createContext, useState, useCallback, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);
  const [adminData, setAdminData] = useState({
    allUserDetails: {},
    allBooksDetails: {},
    allTransactionsDetails: {},
  });

  const contextValue = {
    // States
    isAdmin,
    userData,
    isApplicationLoaded,

    // Setters
    setIsAdmin,
    setUserData,
    setIsApplicationLoaded,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

/**
 * Custom hook to use app context
 * @throws {Error} If used outside of AppProvider
 */
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export default AppContext;
