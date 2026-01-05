import React, { useState, useEffect } from "react";
import "./AdminUserChanges.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";

const AdminUserChanges = ({ onBack }) => {
  const { adminData } = useAppContext();
  const { showError } = useError();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingAdmins, setExistingAdmins] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const allUsers = Object.values(adminData?.allUserDetailsObj || {});

  // Get users who are not already admins
  const availableUsers = allUsers.filter(
    (user) => !existingAdmins.some((admin) => admin.userID === user.userID)
  );

  useEffect(() => {
    fetchExistingAdmins();
  }, []);

  const fetchExistingAdmins = async () => {
    try {
      setLoading(true);
      const response = await apiPost(ADMIN_ENDPOINTS.GET_EXISTING_ADMIN, {});
      if (response.success) {
        // Map admin IDs to user objects
        const adminIds = response.data.adminUserIDs || [];
        const admins = allUsers.filter((user) =>
          adminIds.includes(user.userID)
        );
        setExistingAdmins(admins);
      } else {
        showError("Failed to fetch admins: " + response.message);
      }
    } catch (error) {
      showError("Error fetching admins: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAdmin = async (userID) => {
    if (window.confirm("Are you sure you want to remove admin privilege?")) {
      try {
        setSubmitting(true);
        const response = await apiPost(ADMIN_ENDPOINTS.REMOVE_ADMIN, {
          userID: userID,
        });

        if (response.success) {
          setExistingAdmins((prev) =>
            prev.filter((admin) => admin.userID !== userID)
          );
          showError("Admin privilege removed successfully");
        } else {
          showError("Failed to remove admin: " + response.message);
        }
      } catch (error) {
        showError("Error removing admin: " + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleSelectUser = (userID) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userID)) {
        return prev.filter((id) => id !== userID);
      } else {
        return [...prev, userID];
      }
    });
  };

  const handleAddAdmins = async () => {
    if (selectedUsers.length === 0) {
      showError("Please select at least one user");
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiPost(ADMIN_ENDPOINTS.ADD_ADMINS, {
        userIDs: selectedUsers,
      });

      if (response.success) {
        // Add newly selected users to existing admins
        const newAdmins = allUsers.filter((user) =>
          selectedUsers.includes(user.userID)
        );
        setExistingAdmins((prev) => [...prev, ...newAdmins]);
        setSelectedUsers([]);
        setShowAddModal(false);
        showError("Admin privileges assigned successfully");
      } else {
        showError("Failed to add admins: " + response.message);
      }
    } catch (error) {
      showError("Error adding admins: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getUserName = (user) => {
    return user.name || user.firstName + " " + user.lastName || "N/A";
  };

  return (
    <div className="admin-user-changes">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>Admin User Changes</h2>
        <button
          className="add-admin-btn"
          onClick={() => setShowAddModal(true)}
          disabled={loading || availableUsers.length === 0}
        >
          + Add Admin
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading admin users...</p>
        </div>
      ) : (
        <>
          <div className="admins-section">
            <h3>Current Admins ({existingAdmins.length})</h3>
            {existingAdmins.length > 0 ? (
              <div className="admins-list">
                {existingAdmins.map((admin) => (
                  <div key={admin.userID} className="admin-item">
                    <div className="admin-info">
                      <h4 className="admin-name">{getUserName(admin)}</h4>
                      <p className="admin-id">{admin.userID}</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveAdmin(admin.userID)}
                      disabled={submitting}
                      title="Remove admin privilege"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-admins">
                <p>No admins assigned yet</p>
              </div>
            )}
          </div>

          {/* Add Admin Modal */}
          {showAddModal && (
            <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Assign Admin Privilege</h3>
                  <button
                    className="modal-close"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedUsers([]);
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div className="modal-body">
                  {availableUsers.length > 0 ? (
                    <div className="users-select">
                      <p className="select-label">
                        Select users to assign admin privilege:
                      </p>
                      <div className="users-checkboxes">
                        {availableUsers.map((user) => (
                          <label key={user.userID} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.userID)}
                              onChange={() => handleSelectUser(user.userID)}
                              disabled={submitting}
                            />
                            <div className="checkbox-label-content">
                              <span className="user-name">
                                {getUserName(user)}
                              </span>
                              <span className="user-id">{user.userID}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-available">All users are already admins</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedUsers([]);
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddAdmins}
                    disabled={submitting || selectedUsers.length === 0}
                  >
                    {submitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUserChanges;
