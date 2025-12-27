import React from 'react';
import './Users.css';

const Users = () => {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="users-container">
        <div className="section-card">
          <h2>User Management</h2>
          <p>Manage all your users and their permissions here.</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Inactive Users</span>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2>Quick Actions</h2>
          <button className="action-button">Add New User</button>
          <button className="action-button">Export Users</button>
          <button className="action-button">Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
