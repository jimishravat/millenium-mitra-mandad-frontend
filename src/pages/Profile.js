import React, { useState } from "react";
import "./Profile.css";
import { useAppContext } from "../contexts";

const Profile = () => {
  const { userData } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: userData?.userDetails?.name || "",
    mobile: userData?.userDetails?.mobile || "",
    email: userData?.userDetails?.email || "",
  });

  const [configs, setConfigs] = useState({
    notificationsEnabled: true,
    emailAlerts: true,
    autoSettlement: false,
    monthlyReports: true,
    darkMode: false,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // TODO: Call API to update user details
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfigToggle = (configKey) => {
    setConfigs((prev) => ({
      ...prev,
      [configKey]: !prev[configKey],
    }));
    // TODO: Call API to update config
  };

  return (
    <div className="profile-page">
      <h1>Profile & Settings</h1>

      <div className="profile-container">
        {/* User Information Card */}
        <div className="section-card">
          <h2>User Information</h2>
          <div className="user-info-grid">
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{editedData.name}</p>
              )}
            </div>

            <div className="info-item">
              <label>Mobile Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="mobile"
                  value={editedData.mobile}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>+91 {editedData.mobile}</p>
              )}
            </div>

            <div className="info-item">
              <label>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{editedData.email || "Not provided"}</p>
              )}
            </div>

            <div className="info-item">
              <label>Member Since</label>
              <p>January 2025</p>
            </div>
          </div>

          <div className="button-group">
            {isEditing ? (
              <>
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Admin Configurations */}
        <div className="section-card">
          <h2>Admin Configurations</h2>
          <div className="config-list">
            <div className="config-item">
              <div className="config-info">
                <h3>Notifications</h3>
                <p>Receive in-app notifications for important updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={configs.notificationsEnabled}
                  onChange={() => handleConfigToggle("notificationsEnabled")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="config-item">
              <div className="config-info">
                <h3>Email Alerts</h3>
                <p>Receive email notifications for transactions and updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={configs.emailAlerts}
                  onChange={() => handleConfigToggle("emailAlerts")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="config-item">
              <div className="config-info">
                <h3>Auto Settlement</h3>
                <p>Automatically settle transactions on due date</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={configs.autoSettlement}
                  onChange={() => handleConfigToggle("autoSettlement")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="config-item">
              <div className="config-info">
                <h3>Monthly Reports</h3>
                <p>Receive monthly summary reports via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={configs.monthlyReports}
                  onChange={() => handleConfigToggle("monthlyReports")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="config-item">
              <div className="config-info">
                <h3>Dark Mode</h3>
                <p>Enable dark mode for better visibility in low light</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={configs.darkMode}
                  onChange={() => handleConfigToggle("darkMode")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="section-card">
          <h2>Security</h2>
          <div className="security-options">
            <div className="security-item">
              <div>
                <h3>Change Password</h3>
                <p>Update your password regularly to keep your account secure</p>
              </div>
              <button className="btn btn-secondary">Change Password</button>
            </div>

            <div className="security-item">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="btn btn-secondary">Enable 2FA</button>
            </div>

            <div className="security-item">
              <div>
                <h3>Active Sessions</h3>
                <p>Manage your active login sessions across devices</p>
              </div>
              <button className="btn btn-secondary">View Sessions</button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="section-card danger-zone">
          <h2>Danger Zone</h2>
          <div className="danger-item">
            <div>
              <h3>Deactivate Account</h3>
              <p>
                Temporarily disable your account. You can reactivate it anytime.
              </p>
            </div>
            <button className="btn btn-danger">Deactivate Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
