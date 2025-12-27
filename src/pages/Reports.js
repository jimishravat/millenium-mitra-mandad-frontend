import React from 'react';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <div className="reports-container">
        <div className="report-card">
          <h2>Financial Summary</h2>
          <div className="report-content">
            <div className="chart-placeholder">
              <p>📊 Financial Summary Chart</p>
            </div>
            <button className="report-button">View Details</button>
          </div>
        </div>

        <div className="report-card">
          <h2>Monthly Overview</h2>
          <div className="report-content">
            <div className="chart-placeholder">
              <p>📈 Monthly Overview Chart</p>
            </div>
            <button className="report-button">Download Report</button>
          </div>
        </div>

        <div className="report-card">
          <h2>User Activity</h2>
          <div className="report-content">
            <div className="chart-placeholder">
              <p>👥 User Activity Chart</p>
            </div>
            <button className="report-button">View Activity</button>
          </div>
        </div>

        <div className="report-card">
          <h2>Transaction Breakdown</h2>
          <div className="report-content">
            <div className="chart-placeholder">
              <p>💰 Transaction Breakdown</p>
            </div>
            <button className="report-button">Export Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
