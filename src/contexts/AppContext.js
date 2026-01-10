/**
 * App Context
 * Provides global app state management for the entire application
 * Handles user data, loading states, and other app-wide information
 */

import React, { createContext, useState, useCallback, useEffect } from "react";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";
import { useError } from "./ErrorContext";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);
  const [adminData, setAdminData] = useState({
    allUserDetails: {},
    allBooksDetails: {},
    allTransactionsDetails: [],
    adminConfig: {},
  });
  const [state, setState] = useState({
    totalUsers: 0,
    totalUserBooks: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchAllBooks();
      fetchTransaction();
      fetchAdminConfig();
    }
  }, [isAdmin]);
  const fetchTransaction = async () => {
    try {
      const currentDate = new Date();
      const payload = {
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      };
      // const payload = {
      //   month: 12,
      //   year: 2025,
      // };

      const result = await apiPost(ADMIN_ENDPOINTS.GET_TRANSACTIONS, payload);

      if (result.success) {
        setAdminData((preState) => ({
          ...preState,
          allTransactionsDetails: result.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiPost(ADMIN_ENDPOINTS.GET_USERS, {});
      if (response.success) {
        // Handle the fetched users data
        let userObj = {};
        let totalBooks = 0;
        response.data.forEach((user) => {
          userObj[user.userID] = user;
          totalBooks += user.booksIssued ? user.booksIssued.length : 0;
        });
        let totalUsers = Object.keys(userObj).length;
        setState({
          totalUsers: totalUsers,
        });
        setAdminData((preState) => ({
          ...preState,
          allUserDetailsObj: userObj,
        }));
      } else {
        console.error("Failed to fetch users: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching users: " + error.message);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await apiPost(ADMIN_ENDPOINTS.GET_BOOKS, {});
      if (response.success) {
        // Handle the fetched users data
        let bookObj = {};
        response.data.forEach((book) => {
          bookObj[book.bookID] = book;
        });
        setAdminData((preState) => ({
          ...preState,
          allBooksDetails: bookObj,
        }));
        setState((prevState) => ({
          ...prevState,
          totalUserBooks: response.data.length,
        }));
      } else {
        console.error("Failed to fetch users: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching users: " + error.message);
    }
  };

  const fetchAdminConfig = async () => {
    try {
      const response = await apiPost(ADMIN_ENDPOINTS.GET_CONFIG, {});
      if (response.success) {
        // Handle the fetched users data
  
        setAdminData((preState) => ({
          ...preState,
          adminConfig: response.data,
        }));
      } else {
        console.error("Failed to fetch users: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching users: " + error.message);
    }
  };

  const contextValue = {
    // States
    isAdmin,
    userData,
    bookData,
    isApplicationLoaded,
    transactionsData,
    adminData,
    // Setters
    setIsAdmin,
    setAdminData,
    setTransactionsData,
    setBookData,
    setUserData,
    setIsApplicationLoaded,
    state,
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
