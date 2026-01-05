import React, { useState, useEffect } from "react";
import "./AddEditUser.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";

const AddEditUser = ({ onBack, user = null }) => {
  const { showError } = useError();
  const { setAdminData } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});

  const isEditMode = user !== null;
  const pageTitle = isEditMode ? "Edit User" : "Add New User";

  useEffect(() => {
    if (isEditMode && user) {
      setFormData({
        name: user.name || "",
        mobile: user.mobile || "",
      });
    }
  }, [user, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Mobile number must be 10 digits";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        // Edit user
        const response = await apiPost(ADMIN_ENDPOINTS.UPDATE_USER, {
          userID: user.userID,
          ...formData,
        });

        if (response.success) {
          // Update adminData with edited user
          setAdminData((prevState) => ({
            ...prevState,
            allUserDetailsObj: {
              ...prevState.allUserDetailsObj,
              [user.userID]: {
                ...prevState.allUserDetailsObj[user.userID],
                ...formData,
              },
            },
          }));
          showError("User updated successfully");
          onBack();
        } else {
          showError("Failed to update user: " + response.message);
        }
      } else {
        // Add new user
        const response = await apiPost(ADMIN_ENDPOINTS.CREATE_USER, formData);

        if (response.success) {
          // Add new user to adminData
          setAdminData((prevState) => ({
            ...prevState,
            allUserDetailsObj: {
              ...prevState.allUserDetailsObj,
              [response.data.userID]: {
                userID: response.data.userID,
                ...formData,
                booksIssued: [],
              },
            },
          }));
          showError("User added successfully");
          onBack();
        } else {
          showError("Failed to add user: " + response.message);
        }
      }
    } catch (error) {
      showError("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-edit-user">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>{pageTitle}</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              className={`form-input ${errors.name ? "error" : ""}`}
              disabled={loading}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className={`form-input ${errors.mobile ? "error" : ""}`}
              disabled={loading}
            />
            {errors.mobile && (
              <span className="error-message">{errors.mobile}</span>
            )}
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
              {loading ? "Processing..." : isEditMode ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUser;
