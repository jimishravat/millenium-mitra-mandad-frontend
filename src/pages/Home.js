import React, { useState } from 'react';
import BookDetails from '../components/BookDetails';
import './Home.css';

const Home = () => {
  const [showBookDetails, setShowBookDetails] = useState(false);

  const [userData] = useState({
    name: 'Jimish Shravat',
    mobile: '9876543210',
    principal: { count: 3, amount: 5000 },
    loan: { count: 3, amount: 50000 },
    settlement: 0,
    lastTransaction: {
      date: '16-12-2025',
      principal: 500,
      loanEMI: 1000,
      interest: 500,
    },
  });

  // Function to determine settlement color class
  const getSettlementColorClass = (amount) => {
    if (amount > 0) return 'settlement-positive';
    if (amount < 0) return 'settlement-negative';
    return 'settlement-neutral';
  };

  // Handle book details button click
  const handleBookDetailsClick = () => {
    setShowBookDetails(true);
  };

  // Handle back from book details
  const handleBackFromBookDetails = () => {
    setShowBookDetails(false);
  };

  // Show BookDetails component if user clicked on it
  if (showBookDetails) {
    return (
      <BookDetails 
        onBack={handleBackFromBookDetails} 
        userData={userData}
      />
    );
  }

  return (
    <div className="home">
      {/* Greeting Section */}
      {/* <section className="greeting-section">
        <h1 className="greeting-text">Hello, {userData.name.split(' ')[0]}!</h1>
        <p className="greeting-subtitle">Here's your account overview</p>
      </section> */}

      {/* User Profile Card */}
      <section className="user-profile-card">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <h2 className="user-name">{userData.name}</h2>
            <p className="user-mobile">+91 {userData.mobile}</p>
          </div>
        </div>
        <button className="book-button" onClick={handleBookDetailsClick}>Book Details</button>
      </section>

      {/* Summary Cards Section */}
      <section className="summary-section">
        <h3 className="section-title">Account Summary</h3>
        <div className="summary-cards-grid">
          {/* Principal Card */}
          <div className="summary-card principal-card">
            <div className="card-header">
              <span className="card-label">Principal</span>
              <span className="card-count">({userData.principal.count})</span>
            </div>
            <div className="card-amount">₹{userData.principal.amount.toLocaleString()}</div>
          </div>

          {/* Loan Card */}
          <div className="summary-card loan-card">
            <div className="card-header">
              <span className="card-label">Loan</span>
              <span className="card-count">({userData.loan.count})</span>
            </div>
            <div className="card-amount">₹{userData.loan.amount.toLocaleString()}</div>
          </div>

          {/* Settlement Card */}
          <div className={`summary-card settlement-card ${getSettlementColorClass(userData.settlement)}`}>
            <div className="card-header">
              <span className="card-label">Settlement</span>
            </div>
            <div className="card-amount">₹{userData.settlement}</div>
          </div>
        </div>
      </section>

      {/* Last Transaction Section */}
      <section className="last-transaction-section">
        <h3 className="section-title">Last Transaction</h3>
        <div className="transaction-date-badge">
          Date: {userData.lastTransaction.date}
        </div>
        <div className="transaction-details">
          <div className="transaction-item">
            <span className="transaction-label">Principal</span>
            <span className="transaction-amount">₹{userData.lastTransaction.principal}</span>
          </div>
          <div className="transaction-item">
            <span className="transaction-label">Loan EMI</span>
            <span className="transaction-amount">₹{userData.lastTransaction.loanEMI}</span>
          </div>
          <div className="transaction-item">
            <span className="transaction-label">Interest</span>
            <span className="transaction-amount">₹{userData.lastTransaction.interest}</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <button className="action-button primary-action">View All Transactions</button>
        <button className="action-button secondary-action">Generate Report</button>
      </section>
    </div>
  );
};

export default Home;
