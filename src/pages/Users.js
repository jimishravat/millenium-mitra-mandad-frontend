import React, { useEffect, useState } from "react";
import "./Users.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";
import ViewAllUsers from "../components/ViewAllUsers";
import AddEditUser from "../components/AddEditUser";
import AdminUserChanges from "../components/AdminUserChanges";
import ViewAllBooks from "../components/ViewAllBooks";
import AddEditBook from "../components/AddEditBook";
import MapBookToUser from "../components/MapBookToUser";

const Users = () => {
  const { showError } = useError();
  const { state } = useAppContext();
  // const [state, setState] = useState({
  //   totalUsers: 0,
  //   totalUserBooks: 0,
  // });
  const [view, setView] = useState("dashboard"); // "dashboard", "viewAll", "addEdit", "adminChanges", "viewAllBooks", "addEditBooks", "mapBookToUser"
  const [editingUser, setEditingUser] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  // useEffect(() => {
  //   // API call to fetch all the users.

  //   fetchUsers();
  //   fetchAllBooks();
  // }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await apiPost(ADMIN_ENDPOINTS.GET_USERS, {});
  //     if (response.success) {
  //       // Handle the fetched users data
  //       let userObj = {};
  //       let totalBooks = 0;
  //       response.data.forEach((user) => {
  //         userObj[user.userID] = user;
  //         totalBooks += user.booksIssued ? user.booksIssued.length : 0;
  //       });
  //       let totalUsers = Object.keys(userObj).length;
  //       setState({
  //         totalUsers: totalUsers,
  //       });
  //       setAdminData((preState) => ({
  //         ...preState,
  //         allUserDetailsObj: userObj,
  //       }));
  //     } else {
  //       showError("Failed to fetch users: " + response.message);
  //     }
  //   } catch (error) {
  //     showError("Error fetching users: " + error.message);
  //   }
  // };

  // const fetchAllBooks = async () => {
  //   try {
  //     const response = await apiPost(ADMIN_ENDPOINTS.GET_BOOKS, {});
  //     if (response.success) {
  //       // Handle the fetched users data
  //       let bookObj = {};
  //       response.data.forEach((book) => {
  //         bookObj[book.bookID] = book;
  //       });
  //       setAdminData((preState) => ({
  //         ...preState,
  //         allBooksDetails: bookObj,
  //       }));
  //       setState((prevState) => ({
  //         ...prevState,
  //         totalUserBooks: response.data.length,
  //       }));
  //     } else {
  //       showError("Failed to fetch users: " + response.message);
  //     }
  //   } catch (error) {
  //     showError("Error fetching users: " + error.message);
  //   }
  // };

  if (view === "viewAll") {
    return (
      <ViewAllUsers
        onBack={() => setView("dashboard")}
        onEdit={(user) => {
          setEditingUser(user);
          setView("addEdit");
        }}
      />
    );
  }

  if (view === "addEdit") {
    return (
      <AddEditUser
        user={editingUser}
        onBack={() => {
          setEditingUser(null);
          setView("dashboard");
        }}
      />
    );
  }

  if (view === "adminChanges") {
    return <AdminUserChanges onBack={() => setView("dashboard")} />;
  }

  if (view === "viewAllBooks") {
    return (
      <ViewAllBooks
        onBack={() => setView("dashboard")}
        onEdit={(book) => {
          setEditingBook(book);
          setView("addEditBooks");
        }}
      />
    );
  }

  if (view === "addEditBooks") {
    return (
      <AddEditBook
        book={editingBook}
        onBack={() => {
          setEditingBook(null);
          setView("dashboard");
        }}
      />
    );
  }

  if (view === "mapBookToUser") {
    return <MapBookToUser onBack={() => setView("dashboard")} />;
  }

  return (
    <div className="users-page">
      <div className="users-container">
        <div className="section-card">
          <h2>User Management</h2>
          <p>Manage all your users and their permissions here.</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{state.totalUsers}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{state.totalUserBooks}</span>
              <span className="stat-label">Total Users Books</span>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2>User Actions</h2>
          <button className="action-button" onClick={() => setView("viewAll")}>
            View All Users
          </button>
          <button
            className="action-button"
            onClick={() => {
              setEditingUser(null);
              setView("addEdit");
            }}
          >
            Add New User
          </button>
          <button
            className="action-button"
            onClick={() => setView("adminChanges")}
          >
            Admin User Changes
          </button>
        </div>
        <div className="section-card">
          <h2>Book Actions</h2>
          <button
            className="action-button"
            onClick={() => setView("viewAllBooks")}
          >
            View All Books
          </button>
          <button
            className="action-button"
            onClick={() => {
              setEditingBook(null);
              setView("addEditBooks");
            }}
          >
            Add New Book
          </button>
          <button
            className="action-button"
            onClick={() => setView("mapBookToUser")}
          >
            Map Book to User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
