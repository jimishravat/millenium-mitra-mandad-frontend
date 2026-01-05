import React, { useState, useEffect } from "react";
import "./AddEditBook.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";

const AddEditBook = ({ onBack, book = null }) => {
  const { adminData, showError: showContextError } = useAppContext();
  const { showError } = useError();
  const [loading, setLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [formData, setFormData] = useState({
    bookName: "",
    bookID: "",
    currentPrincipalAmount: "",
    userIDs: [],
  });
  const [errors, setErrors] = useState({});

  const isEditMode = book !== null;
  const pageTitle = isEditMode ? "Edit Book" : "Add New Book";
  const allUsers = Object.values(adminData?.allUserDetailsObj || {});

  useEffect(() => {
    if (isEditMode && book) {
      setFormData({
        bookName: book.bookName || "",
        bookID: book.bookID || "",
        currentPrincipalAmount: book.currentPrincipalAmount || "",
        userIDs: book.userID || [],
      });
    }
  }, [book, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bookName.trim()) {
      newErrors.bookName = "Book name is required";
    }

    if (!formData.bookID.trim()) {
      newErrors.bookID = "Book ID is required";
    }

    if (!formData.currentPrincipalAmount || parseFloat(formData.currentPrincipalAmount) <= 0) {
      newErrors.currentPrincipalAmount = "Principal amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddUser = (userID) => {
    if (!formData.userIDs.includes(userID)) {
      setFormData((prev) => ({
        ...prev,
        userIDs: [...prev.userIDs, userID],
      }));
    }
  };

  const handleRemoveUser = (userID) => {
    setFormData((prev) => ({
      ...prev,
      userIDs: prev.userIDs.filter((id) => id !== userID),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        bookName: formData.bookName,
        bookID: formData.bookID,
        currentPrincipalAmount: parseFloat(formData.currentPrincipalAmount),
        userID: formData.userIDs,
      };

      if (isEditMode) {
        // Edit book
        const response = await apiPost(ADMIN_ENDPOINTS.UPDATE_BOOK, {
          ...payload,
          bookID: book.bookID,
        });

        if (response.success) {
          showError("Book updated successfully");
          onBack();
        } else {
          showError("Failed to update book: " + response.message);
        }
      } else {
        // Add new book
        const response = await apiPost(ADMIN_ENDPOINTS.CREATE_BOOK, payload);

        if (response.success) {
          showError("Book added successfully");
          onBack();
        } else {
          showError("Failed to add book: " + response.message);
        }
      }
    } catch (error) {
      showError("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (user) => {
    return user.name || user.firstName + " " + user.lastName || "N/A";
  };

  const getAvailableUsers = () => {
    return allUsers.filter((user) => !formData.userIDs.includes(user.userID));
  };

  const getSelectedUsers = () => {
    return allUsers.filter((user) => formData.userIDs.includes(user.userID));
  };

  return (
    <div className="add-edit-book">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>{pageTitle}</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="bookName" className="form-label">
              Book Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="Enter book name"
              className={`form-input ${errors.bookName ? "error" : ""}`}
              disabled={loading}
            />
            {errors.bookName && (
              <span className="error-message">{errors.bookName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bookID" className="form-label">
              Book ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="bookID"
              name="bookID"
              value={formData.bookID}
              onChange={handleChange}
              placeholder="Enter book ID"
              className={`form-input ${errors.bookID ? "error" : ""}`}
              disabled={loading || isEditMode}
              title={isEditMode ? "Book ID cannot be changed" : ""}
            />
            {errors.bookID && (
              <span className="error-message">{errors.bookID}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="currentPrincipalAmount" className="form-label">
              Principal Amount <span className="required">*</span>
            </label>
            <input
              type="number"
              id="currentPrincipalAmount"
              name="currentPrincipalAmount"
              value={formData.currentPrincipalAmount}
              onChange={handleChange}
              placeholder="Enter principal amount"
              className={`form-input ${
                errors.currentPrincipalAmount ? "error" : ""
              }`}
              disabled={loading}
              step="0.01"
              min="0"
            />
            {errors.currentPrincipalAmount && (
              <span className="error-message">
                {errors.currentPrincipalAmount}
              </span>
            )}
          </div>

          {/* Selected Users */}
          <div className="form-group">
            <label className="form-label">
              Associated Users <span className="badge">{formData.userIDs.length}</span>
            </label>
            <div className="selected-users">
              {getSelectedUsers().length > 0 ? (
                getSelectedUsers().map((user) => (
                  <div key={user.userID} className="user-tag">
                    <div className="tag-content">
                      <span className="tag-name">{getUserName(user)}</span>
                      <span className="tag-id">{user.userID}</span>
                    </div>
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={() => handleRemoveUser(user.userID)}
                      title="Remove user"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-users-selected">No users selected</p>
              )}
            </div>
            <button
              type="button"
              className="add-users-btn"
              onClick={() => setShowUserModal(true)}
              disabled={loading || getAvailableUsers().length === 0}
            >
              + Add Users
            </button>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBack}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Processing..." : isEditMode ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>

      {/* User Selection Modal */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Users</h3>
              <button
                className="modal-close"
                onClick={() => setShowUserModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {getAvailableUsers().length > 0 ? (
                <div className="users-list">
                  {getAvailableUsers().map((user) => (
                    <div
                      key={user.userID}
                      className="user-option"
                      onClick={() => handleAddUser(user.userID)}
                    >
                      <div className="user-info">
                        <h4 className="user-name">{getUserName(user)}</h4>
                        <p className="user-id">{user.userID}</p>
                      </div>
                      <button className="add-btn">+</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-available">
                  All users are already associated with this book
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowUserModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEditBook;
