import React, { useState, useEffect } from "react";
import "./BookTransactionDetails.css";
import { USER_ENDPOINTS } from "../utils";
import { useAppContext } from "../contexts";

const BookTransactionDetails = ({ onBack, book, userData }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date("2025-01-16"));
  const { setTransactionsData, transactionsData } = useAppContext();
  const [isBookTransactionFetched, setIsBookTransactionFetched] =
    useState(false);
  useEffect(() => {
    fetchTransactionsForBook();
  }, []);
  const fetchTransactionsForBook = async () => {
    // Implement API call to fetch transactions for the book
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${USER_ENDPOINTS.BOOK_TRANSACTION_HISTORY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ bookID: book.bookID }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setTransactionsData(result.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsBookTransactionFetched(true);
    }
  };

  useEffect(() => {
 
  }, [transactionsData]);

  // Sample transaction data - structured by month with all three transaction types
  /**
   * "data": {
        "2025": {
            "DEC": [
                {
                    "_id": "69498d1ac7174c815857ecc4",
                    "transactionType": "REGULAR",
                    "isDeleted": false,
                    "userID": [
                        "10060",
                        "10061"
                    ],
                    "bookID": "B060",
                    "principalAmount": 500,
                    "isLoanTaken": false,
                    "loanAmount": 0,
                    "loanInterestAmount": 0,
                    "loanEMI": 0,
                    "totalAmount": 500,
                    "amountReturned": 0,
                    "returnedAmountDescription": "",
                    "penaltyAmount": 0,
                    "settlementAmount": 0,
                    "transactionBy": "00000",
                    "createdAt": "2025-12-15T18:38:50.000Z",
                    "updatedAt": "2025-12-15T18:38:50.000Z",
                    "__v": 0
                }
            ]
        }
    },
   */
  // const [transactionsData1] = React.useState({
  //   "JAN-2026": {
  //     regular: [
  //       {
  //         id: 1,
  //         label: "Regular Transaction",
  //         type: "regular",
  //         details: [
  //           { name: "Principal", amount: 2500 },
  //           { name: "Loan EMI", amount: 2100 },
  //           { name: "Interest", amount: 2500 },
  //           { name: "Penalty", amount: 2100 },
  //         ],
  //       },
  //     ],
  //     loan: [
  //       {
  //         id: 2,
  //         label: "Loan Transaction",
  //         type: "loan",
  //         details: [{ name: "Loan Taken", amount: 10000 }],
  //       },
  //     ],
  //     settlement: [
  //       {
  //         id: 3,
  //         label: "Settlement Transaction",
  //         type: "settlement",
  //         details: [{ name: "Settlement", amount: 250 }],
  //       },
  //     ],
  //   },
  //   "DEC-2025": {
  //     regular: [],
  //     loan: [
  //       {
  //         id: 1,
  //         label: "Loan Transaction",
  //         type: "loan",
  //         details: [{ name: "Loan Taken", amount: 10000 }],
  //       },
  //     ],
  //     settlement: [
  //       {
  //         id: 2,
  //         label: "Settlement Transaction",
  //         type: "settlement",
  //         details: [{ name: "Settlement", amount: -500 }],
  //       },
  //     ],
  //   },
  //   "NOV-2025": {
  //     regular: [],
  //     loan: [],
  //     settlement: [
  //       {
  //         id: 1,
  //         label: "Settlement Transaction",
  //         type: "settlement",
  //         details: [{ name: "Settlement", amount: 1250 }],
  //       },
  //     ],
  //   },
  // });

  // Transform API transaction data to display format
  const transformTransactionData = (data) => {
    const transformed = {};

    if (!data || typeof data !== "object") {
      return transformed;
    }

    // Iterate through years
    Object.keys(data).forEach((year) => {
      const yearData = data[year];
      if (typeof yearData !== "object") return;

      // Iterate through months
      Object.keys(yearData).forEach((month) => {
        const monthTransactions = yearData[month];
        if (!Array.isArray(monthTransactions)) return;

        // Use month and year directly as they come from API
        const monthKey = `${month}-${year}`;
        if (!transformed[monthKey]) {
          transformed[monthKey] = {
            regular: [],
            loan: [],
            settlement: [],
            year: year,
            month: month,
          };
        }

        // Group transactions by type
        monthTransactions.forEach((transaction, index) => {
          if (transaction.isDeleted) return;

          const type = transaction.transactionType?.toLowerCase() || "regular";
          let details = [];

          if (type === "regular") {
            if (transaction.principalAmount > 0) {
              details.push({
                name: "Principal",
                amount: transaction.principalAmount,
              });
            }
            if (transaction.loanEMI > 0) {
              details.push({ name: "Loan EMI", amount: transaction.loanEMI });
            }
            if (transaction.loanInterestAmount > 0) {
              details.push({
                name: "Interest",
                amount: transaction.loanInterestAmount,
              });
            }
            if (transaction.penaltyAmount > 0) {
              details.push({
                name: "Penalty",
                amount: transaction.penaltyAmount,
              });
            }
          } else if (type === "loan") {
            if (transaction.loanAmount > 0) {
              details.push({ name: "Loan Taken", amount: transaction.loanAmount });
            }
          } else if (type === "settlement") {
            if (transaction.settlementAmount !== 0) {
              details.push({
                name: "Settlement",
                amount: transaction.settlementAmount,
              });
            }
          }

          if (details.length > 0) {
            transformed[monthKey][type].push({
              id: transaction._id || index,
              label: `${type.charAt(0).toUpperCase() + type.slice(1)} Transaction`,
              type: type,
              details: details,
              date: transaction.createdAt,
            });
          }
        });
      });
    });

    return transformed;
  };

  // Get available months from data
  const getAvailableMonths = (transformedData) => {
    const months = Object.keys(transformedData).sort((a, b) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");
      
      // Convert month names to numbers for sorting
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const monthNumA = monthNames.indexOf(monthA);
      const monthNumB = monthNames.indexOf(monthB);
      
      const dateA = new Date(yearA, monthNumA);
      const dateB = new Date(yearB, monthNumB);
      return dateB - dateA; // Reverse order for latest first
    });
    return months;
  };

  // Get current month data
  const [selectedMonthKey, setSelectedMonthKey] = React.useState(null);
  const allTransformedData = transactionsData ? transformTransactionData(transactionsData) : [];
  const availableMonths = getAvailableMonths(allTransformedData);
  
  // Set initial month on first load
  React.useEffect(() => {
    if (availableMonths.length > 0 && !selectedMonthKey) {
      const currentMonthKey = getCurrentMonthKey();
      const mostRecentMonth = getMostRecentAvailableMonth(availableMonths, currentMonthKey);
      setSelectedMonthKey(mostRecentMonth);
    }
  }, [availableMonths, selectedMonthKey]);

  const handlePrevMonth = () => {
    const currentIndex = availableMonths.indexOf(selectedMonthKey);
    if (currentIndex < availableMonths.length - 1) {
      setSelectedMonthKey(availableMonths[currentIndex + 1]);
    }
  };

  const handleNextMonth = () => {
    const currentIndex = availableMonths.indexOf(selectedMonthKey);
    if (currentIndex > 0) {
      setSelectedMonthKey(availableMonths[currentIndex - 1]);
    }
  };

  // Determine if arrows should be shown
  const currentMonthIndex = availableMonths.indexOf(selectedMonthKey);
  const canGoPrevious = currentMonthIndex < availableMonths.length - 1; // Has a month after current
  const canGoNext = currentMonthIndex > 0; // Has a month before current

  const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${suffix(day)} ${month} ${year}`;
  };

  const formatDisplayDate = (monthKey) => {
    if (!monthKey) return "";
    const [month, year] = monthKey.split("-");
    return `${month} ${year}`;
  };

  // Get current month in API format (e.g., "JAN-2026")
  const getCurrentMonthKey = () => {
    const now = new Date();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${month}-${year}`;
  };

  // Get the most recent month data up to current month
  const getMostRecentAvailableMonth = (availableMonths, currentMonthKey) => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const [currentMonth, currentYear] = currentMonthKey.split("-");
    const currentMonthNum = monthNames.indexOf(currentMonth);
    const currentYearNum = parseInt(currentYear);
    
    // Find the most recent month that is <= current date
    for (let monthKey of availableMonths) {
      const [month, year] = monthKey.split("-");
      const monthNum = monthNames.indexOf(month);
      const yearNum = parseInt(year);
      
      // If month is from earlier year or same year but earlier month
      if (yearNum < currentYearNum || (yearNum === currentYearNum && monthNum <= currentMonthNum)) {
        return monthKey;
      }
    }
    
    return null;
  };

  const getMonthKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const monthData = selectedMonthKey && allTransformedData[selectedMonthKey] ? allTransformedData[selectedMonthKey] : {
    regular: [],
    loan: [],
    settlement: [],
  };

  // Flatten and filter out empty transaction arrays
  const currentTransactions = [
    ...monthData.regular,
    ...monthData.loan,
    ...monthData.settlement,
  ].filter((t) => t && t.id);

  const displayDate = formatDisplayDate(selectedMonthKey);
  
  if(!isBookTransactionFetched){
    return <div>Loading...</div>;
  }

  // Show NO DATA message if no selected month (no data found for current or previous month)
  if (!selectedMonthKey) {
    return (
      <div className="book-transaction-container">
        <div className="book-transaction-header">
          <button
            type="button"
            className="book-transaction-back-button"
            onClick={onBack}
            aria-label="Go back"
          >
            ← Back
          </button>
          <h1 className="book-transaction-title">Book Details</h1>
          <div className="book-transaction-spacer"></div>
        </div>
        <div className="book-transaction-content">
          <div style={{ textAlign: 'center', padding: '3rem 2rem', color: '#7f8c8d' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>NO DATA FOUND</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-transaction-container">
      {/* Header */}
      <div className="book-transaction-header">
        <button
          type="button"
          className="book-transaction-back-button"
          onClick={onBack}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="book-transaction-title">Book Details</h1>
        <div className="book-transaction-spacer"></div>
      </div>

      {/* Content */}
      <div className="book-transaction-content">
        {/* Book Info Card */}
        <div className="book-info-card">
          <div className="book-info-header">
            <span className="book-info-label">Book No</span>
            <span className="book-info-value">{book.bookID}</span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Account Holder</span>
            <span className="book-info-value">{userData.userDetails.name}</span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Mobile</span>
            <span className="book-info-value">
              +91 {userData.userDetails.mobile}
            </span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Principal</span>
            <span className="book-info-value">
              ₹{book.currentPrincipalAmount.toLocaleString()}
            </span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Loan Amount</span>
            <span className="book-info-value">
              ₹{book.loanAmount.toLocaleString()}
            </span>
          </div>

          {/* <div className="book-info-item">
            <span className="book-info-label">Total Interest Paid</span>
            <span className="book-info-value">
              ₹
              {book.totalInterestPaid
                ? book.totalInterestPaid.toLocaleString()
                : "0"}
            </span>
          </div> */}
        </div>
        {/* Transactions Section */}
        <div className="transactions-section">
          {/* Date Navigation */}
          <div className="date-navigation">
            {canGoPrevious && (
              <button
                type="button"
                className="nav-button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
              >
                ←
              </button>
            )}
            <span className="current-date">{displayDate}</span>
            {canGoNext && (
              <button
                type="button"
                className="nav-button"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                →
              </button>
            )}
          </div>

          {/* Transactions Cards */}
          {currentTransactions.length > 0 ? (
            <div className="transactions-cards">
              {currentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="transaction-card">
                  <div className="transaction-header">
                    <h3 className="transaction-label">{transaction.label}</h3>
                  </div>
                  <div className="transaction-details">
                    {transaction.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="detail-item">
                        <span className="detail-name">{detail.name}</span>
                        <span
                          className={`detail-amount ${
                            transaction.type === "settlement" &&
                            detail.amount < 0
                              ? "negative"
                              : "positive"
                          }`}
                        >
                          ₹{detail.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-transactions">
              <p>No transactions for {displayDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTransactionDetails;
