import React from "react";
import "./BookTransactionDetails.css";

const BookTransactionDetails = ({ onBack, book, userData }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date("2025-01-16"));

  // Sample transaction data - structured by month with all three transaction types
  const [transactionsData] = React.useState({
    "2025-01": {
      regular: [
        {
          id: 1,
          label: "Regular Transaction",
          type: "regular",
          details: [
            { name: "Principal", amount: 2500 },
            { name: "Loan EMI", amount: 2100 },
            { name: "Interest", amount: 2500 },
            { name: "Penalty", amount: 2100 },
          ],
        },
      ],
      loan: [
        {
          id: 2,
          label: "Loan Transaction",
          type: "loan",
          details: [{ name: "Loan Taken", amount: 10000 }],
        },
      ],
      settlement: [
        {
          id: 3,
          label: "Settlement Transaction",
          type: "settlement",
          details: [{ name: "Settlement", amount: 250 }],
        },
      ],
    },
    "2024-12": {
      regular: [],
      loan: [
        {
          id: 1,
          label: "Loan Transaction",
          type: "loan",
          details: [{ name: "Loan Taken", amount: 10000 }],
        },
      ],
      settlement: [
        {
          id: 2,
          label: "Settlement Transaction",
          type: "settlement",
          details: [{ name: "Settlement", amount: -500 }],
        },
      ],
    },
    "2024-11": {
      regular: [],
      loan: [],
      settlement: [
        {
          id: 1,
          label: "Settlement Transaction",
          type: "settlement",
          details: [{ name: "Settlement", amount: 1250 }],
        },
      ],
    },
  });

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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

  const getMonthKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const monthKey = getMonthKey(currentDate);
  const monthData = transactionsData[monthKey] || { regular: [], loan: [], settlement: [] };
  
  // Flatten and filter out empty transaction arrays
  const currentTransactions = [
    ...monthData.regular,
    ...monthData.loan,
    ...monthData.settlement,
  ].filter(t => t && t.id);
  
  const displayDate = formatDate(currentDate);

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
            <span className="book-info-value">{book.bookNo}</span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Account Holder</span>
            <span className="book-info-value">{userData.name}</span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Mobile</span>
            <span className="book-info-value">+91 {userData.mobile}</span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Principal</span>
            <span className="book-info-value">
              ₹{book.principal.toLocaleString()}
            </span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Loan Amount</span>
            <span className="book-info-value">
              ₹{book.loan.toLocaleString()}
            </span>
          </div>

          <div className="book-info-item">
            <span className="book-info-label">Total Interest Paid</span>
            <span className="book-info-value">
              ₹
              {book.totalInterestPaid
                ? book.totalInterestPaid.toLocaleString()
                : "0"}
            </span>
          </div>
        </div>
        {/* Transactions Section */}
        <div className="transactions-section">
          {/* Date Navigation */}
          <div className="date-navigation">
            <button
              type="button"
              className="nav-button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              ←
            </button>
            <span className="current-date">{displayDate}</span>
            <button
              type="button"
              className="nav-button"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              →
            </button>
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
                            transaction.type === 'settlement' && detail.amount < 0 ? 'negative' : 'positive'
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
