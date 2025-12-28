import React, { useState } from "react";
import { useError } from "../contexts/ErrorContext";
import { apiPost, AUTH_ENDPOINTS } from "../utils";
import "./ChangePassword.css";

const ChangePassword = ({ onSuccess, loading: parentLoading, onBack }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const { showError } = useError();

  const isDisabled = parentLoading || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword) {
      showError("Please enter your old password");
      return;
    }

    if (!newPassword) {
      showError("Please enter your new password");
      return;
    }

    if (!verifyPassword) {
      showError("Please verify your new password");
      return;
    }

    if (newPassword.length < 6) {
      showError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== verifyPassword) {
      showError("New passwords do not match");
      return;
    }

    if (oldPassword === newPassword) {
      showError("New password must be different from old password");
      return;
    }

    setLoading(true);

    try {
      const response = await apiPost(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
        oldPassword,
        newPassword,
        verifyPassword,
      });

      console.log("Password changed successfully:", response.data);

      // Reset form
      setOldPassword("");
      setNewPassword("");
      setVerifyPassword("");

      // Call success callback
      if (response.success) {
        window.location.href = "/home";
      } else {
        onBack();
      }
    } catch (error) {
      showError(
        error.message || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-header">
        {onBack && (
          <button
            type="button"
            className="change-password-back-button"
            onClick={onBack}
            disabled={isDisabled}
            aria-label="Go back"
          >
            ← Back
          </button>
        )}
        <h2 className="change-password-title">Change Password</h2>
        <div className="change-password-spacer"></div>
      </div>

      <div className="change-password-content">
        <p className="change-password-description">
          Update your password to keep your account secure
        </p>

        <form onSubmit={handleSubmit} className="change-password-form">
          {/* Old Password Field */}
          <div className="change-password-form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <div className="change-password-input-wrapper">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                disabled={isDisabled}
                className="change-password-input"
              />
              <button
                type="button"
                className="change-password-toggle-button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                disabled={isDisabled}
                aria-label="Toggle password visibility"
              >
                {showOldPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="change-password-form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="change-password-input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                disabled={isDisabled}
                className="change-password-input"
              />
              <button
                type="button"
                className="change-password-toggle-button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isDisabled}
                aria-label="Toggle password visibility"
              >
                {showNewPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Verify New Password Field */}
          <div className="change-password-form-group">
            <label htmlFor="verifyPassword">Verify New Password</label>
            <div className="change-password-input-wrapper">
              <input
                type={showVerifyPassword ? "text" : "password"}
                id="verifyPassword"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="Re-enter your new password"
                disabled={isDisabled}
                className="change-password-input"
              />
              <button
                type="button"
                className="change-password-toggle-button"
                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                disabled={isDisabled}
                aria-label="Toggle password visibility"
              >
                {showVerifyPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="change-password-submit-button"
            disabled={isDisabled}
          >
            <span className="button-text">
              {loading ? "Changing Password..." : "Change Password"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
