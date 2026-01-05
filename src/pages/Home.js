import React, { useState } from "react";
import BookDetails from "../components/BookDetails";
import "./Home.css";
import { useAppContext } from "../contexts";
import { formatDateToDDMMYYYY } from "../utils";

const Home = () => {
  const [showBookDetails, setShowBookDetails] = useState(false);

  const { isApplicationLoaded, userData } = useAppContext();

  // const [userData] = useState({
  //   name: "Jimish Shravat",
  //   mobile: "9876543210",
  //   principal: { count: 3, amount: 5000 },
  //   loan: { count: 3, amount: 50000 },
  //   settlement: 0,
  //   lastTransaction: {
  //     date: "16-12-2025",
  //     principal: 500,
  //     loanEMI: 1000,
  //     interest: 500,
  //   },
  // });

  // Function to determine settlement color class
  const getSettlementColorClass = (amount) => {
    if (amount > 0) return "settlement-positive";
    if (amount < 0) return "settlement-negative";
    return "settlement-neutral";
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
      <BookDetails onBack={handleBackFromBookDetails} userData={userData} />
    );
  }

  if (isApplicationLoaded) {
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
            <div className="user-avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "100%", height: "100%" }}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="user-details">
              <h2 className="user-name">{userData.userDetails.name}</h2>
              <p className="user-mobile">+91 {userData.userDetails.mobile}</p>
            </div>
          </div>
          <button className="book-button" onClick={handleBookDetailsClick}>
            Book Details
          </button>
        </section>

        {/* Summary Cards Section */}
        <section className="summary-section">
          <h3 className="section-title">Account Summary</h3>
          <div className="summary-cards-grid">
            {/* Principal Card */}
            <div className="summary-card principal-card">
              <div className="card-header">
                <span className="card-label">Principal</span>
                <span className="card-count">
                  ({userData.totalBooksIssued})
                </span>
              </div>
              <div className="card-amount">
                ₹{userData.totalPrincipleAmount}
              </div>
            </div>

            {/* Loan Card */}
            <div className="summary-card loan-card">
              <div className="card-header">
                <span className="card-label">Loan</span>
                <span className="card-count">
                  ({userData.totalBooksIssued})
                </span>
              </div>
              <div className="card-amount">₹{userData.totalLoanAmount}</div>
            </div>

            {/* Settlement Card */}
            <div
              className={`summary-card settlement-card ${getSettlementColorClass(
                userData.totalSettlementAmount
              )}`}
            >
              <div className="card-header">
                <span className="card-label">Settlement</span>
              </div>
              <div className="card-amount">
                ₹{userData.totalSettlementAmount}
              </div>
            </div>
          </div>
        </section>

        {/* Last Transaction Section */}
        <section className="last-transaction-section">
          <h3 className="section-title">Last Transaction</h3>
          <div className="transaction-date-badge">
            Date: {formatDateToDDMMYYYY(userData.lastTransactionDate)}
          </div>
          <div className="transaction-details">
            {Object.entries(userData.lastTransactionDetails).map(
              ([key, value]) => {
                if (value === 0) return null; // Skip zero amount entries
                return (
                  <div className="transaction-item">
                    <span className="transaction-label">{key}</span>
                    <span className="transaction-amount">₹{value}</span>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Home;
