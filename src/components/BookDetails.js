import React from 'react';
import './BookDetails.css';
import BookTransactionDetails from './BookTransactionDetails';

const BookDetails = ({ onBack, userData }) => {
  // Sample books data - can be replaced with API call
  const [books] = React.useState([
    {
      id: 1,
      bookNo: '05',
      bookName: userData.name,
      principal: 5000,
      loan: 50000,
    },
    {
      id: 2,
      bookNo: '06',
      bookName: userData.name,
      principal: 3000,
      loan: 40000,
    },
    {
      id: 3,
      bookNo: '07',
      bookName: userData.name,
      principal: 2000,
      loan: 35000,
    },
  ]);

  const [expandedBookId, setExpandedBookId] = React.useState(null);
  const [selectedBook, setSelectedBook] = React.useState(null);

  const handleViewMore = (bookId) => {
    const book = books.find(b => b.id === bookId);
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
          ← Back
        </button>
        <h1 className="book-details-title">Books</h1>
        <div className="book-details-spacer"></div>
      </div>

      {/* Content */}
      <div className="book-details-content">
        {/* User Info Section */}
        <div className="book-details-user-section">
          <div className="book-details-user-avatar">👤</div>
          <div className="book-details-user-info">
            <h2 className="book-details-user-name">{userData.name}</h2>
            <p className="book-details-user-mobile">+91 {userData.mobile}</p>
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-card-header">
                <span className="book-no-label">Book No</span>
                <span className="book-no-value">{book.bookNo}</span>
              </div>

              <div className="book-card-item">
                <span className="book-card-label">Book Name</span>
                <span className="book-card-value">{book.bookName}</span>
              </div>

              <div className="book-card-item">
                <span className="book-card-label">Principal</span>
                <span className="book-card-value">₹{book.principal.toLocaleString()}</span>
              </div>

              <div className="book-card-item">
                <span className="book-card-label">Loan</span>
                <span className="book-card-value">₹{book.loan.toLocaleString()}</span>
              </div>

              <button
                type="button"
                className="book-card-view-more"
                onClick={() => handleViewMore(book.id)}
              >
                {expandedBookId === book.id ? 'Show Less' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
