import React, { useState } from "react";
import "./ViewAllUsers.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";

const ViewAllUsers = ({ onBack, onEdit }) => {
  const { adminData, setAdminData } = useAppContext();
  const { showError } = useError();
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const users = Object.values(adminData?.allUserDetailsObj || {});

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user) => {
    if (onEdit) {
      onEdit(user);
    } else {
      setEditingUser(user);
      console.log("Edit user:", user);
    }
  };

  const handleDelete = async (userID) => {
    // TODO
  };

  const getUserName = (user) => {
    return user.name || user.firstName + " " + user.lastName || "N/A";
  };

  const getBookCount = (user) => {
    return user.booksIssued ? user.booksIssued.length : 0;
  };

  return (
    <div className="view-all-users">
      <div className="users-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        {/* <h2>All Users</h2> */}
        {/* <p className="user-count">Total Users: {users.length}</p> */}
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <span className="search-result-count">
            Found {filteredUsers.length} user(s)
          </span>
        )}
      </div>

      {filteredUsers.length > 0 ? (
        <>
          {/* Table View for Desktop */}
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Number of Books</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.userID} className="table-row">
                    <td className="cell-userid">{user.userID}</td>
                    <td className="cell-name">{getUserName(user)}</td>
                    <td className="cell-books">
                      <span className="book-badge">{getBookCount(user)}</span>
                    </td>
                    <td className="cell-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(user)}
                        title="Edit user"
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(user.userID)}
                        disabled={loading}
                        title="Delete user"
                      >
                        Delete
                      </button>
                      <button
                        className="action-btn reset-password-btn "
                        onClick={() => handleDelete(user.userID)}
                        disabled={loading}
                        title="Delete user"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="cards-container">
            {filteredUsers.map((user) => (
              <div key={user.userID} className="user-card">
                <div className="card-header">
                  <h3 className="card-user-name">{getUserName(user)}</h3>
                  <p className="card-user-id">{user.userID}</p>
                </div>

                <div className="card-body">
                  <div className="card-field">
                    <span className="card-label">Books</span>
                    <span className="card-value book-badge">
                      {getBookCount(user)}
                    </span>
                  </div>

                  <div className="card-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(user.userID)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                     <button
                        className="action-btn reset-password-btn"
                        onClick={() => handleDelete(user.userID)}
                        disabled={loading}
                        title="Reset Password"
                      >
                        Reset Password
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-users">
          <p>
            {searchQuery
              ? "No users found matching your search"
              : "No users found"}
          </p>
          <button className="back-button" onClick={onBack}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAllUsers;
