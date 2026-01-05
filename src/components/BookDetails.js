import React, { useEffect, useState } from "react";
import "./BookDetails.css";
import BookTransactionDetails from "./BookTransactionDetails";
import { USER_ENDPOINTS } from "../utils";
import { useAppContext } from "../contexts";

const BookDetails = ({ onBack, userData }) => {
  const { bookData, setBookData } = useAppContext();
  const [isBooksFetched, setIsBooksFetched] = useState(false);
  // Sample books data - can be replaced with API call

  // Here i want a API call to fetch books data for the user
  useEffect(() => {
    // Example API call
    fetchBooksForUser();
  }, []);

  // Function to simulate fetching books for a user
  const fetchBooksForUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${USER_ENDPOINTS.BOOK_DETAILS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        setBookData(result.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsBooksFetched(true);
    }
  };
  // Replace with actual API call

  const [expandedBookId, setExpandedBookId] = React.useState(null);
  const [selectedBook, setSelectedBook] = React.useState(null);

  const handleViewMore = (bookId) => {
    const book = bookData.find((b) => b.bookID === bookId);
    setSelectedBook(book);
  };

  const handleBackFromTransactions = () => {
    setSelectedBook(null);
  };

  // If a book is selected, show transaction details
  if (selectedBook) {
    return (
      <BookTransactionDetails
        onBack={handleBackFromTransactions}
        book={selectedBook}
        userData={userData}
      />
    );
  }

  if (!isBooksFetched) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="book-details-container">
      {/* Header */}
      <div className="book-details-header">
        <button
          type="button"
          className="book-details-back-button"
          onClick={onBack}
          aria-label="Go back to home"
        >
          Back to Home
        </button>
        <h1 className="book-details-title">User Books Details</h1>
        <div className="book-details-spacer"></div>
      </div>

      {/* Content */}
      <div className="book-details-content">
        {/* User Info Section */}
        <div className="book-details-user-section">
          <div className="book-details-user-content">
            <div className="book-details-user-avatar">
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
            <div className="book-details-user-info">
              <h2 className="book-details-user-name">
                {userData.userDetails.name}
              </h2>
              <p className="book-details-user-mobile">
                +91 {userData.userDetails.mobile}
              </p>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-list">
          {bookData.map((book) => (
            <div key={book.bookID} className="book-card">
              <div className="book-card-header">
                <div>
                  <span className="book-no-label">Book No</span>
                  <span className="book-no-value">{book.bookID}</span>
                </div>
                <button
                  type="button"
                  className="book-card-header-button"
                  onClick={() => handleViewMore(book.bookID)}
                  title="View transaction details"
                >
                  Details
                </button>
              </div>

              <div className="book-card-item">
                <span className="book-card-label">Book Name</span>
                <span className="book-card-value">{book.bookName}</span>
              </div>

              <div className="book-card-item">
                <span className="book-card-label">Principal</span>
                <span className="book-card-value">
                  ₹{book.currentPrincipalAmount.toLocaleString()}
                </span>
              </div>
              {book.loanAmount > 0 && (
                <div className="book-card-item">
                  <span className="book-card-label">Loan</span>
                  <span className="book-card-value">
                    ₹{book.loanAmount.toLocaleString()}
                  </span>
                </div>
              )}
              {book.settlementAmount > 0 && (
                <div className="book-card-item">
                  <span className="book-card-label">Settlement</span>
                  <span className="book-card-value">
                    ₹{book.settlementAmount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
