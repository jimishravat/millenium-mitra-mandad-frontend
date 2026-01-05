import React, { useState, useMemo } from "react";
import "./MapBookToUser.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";

const MapBookToUser = ({ onBack }) => {
  const { adminData, setAdminData } = useAppContext();
  const { showError } = useError();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showBookModal, setShowBookModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const allUsers = Object.values(adminData?.allUserDetailsObj || {});
  const allBooks = Object.values(adminData?.allBooksDetails || {});

  // Search results based on userName, userID, or bookID
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const users = allUsers.filter(
      (user) =>
        (user.name || "").toLowerCase().includes(query) ||
        (user.userID || "").toLowerCase().includes(query)
    );

    const books = allBooks.filter(
      (book) => (book.bookID || "").toLowerCase().includes(query)
    );

    return { users, books };
  }, [searchQuery, allUsers, allBooks]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Initialize selected books with user's existing books
    const selectedBookArray = user.booksIssued ? (user.booksIssued || []) : [];
    setSelectedBooks(selectedBookArray);
  };

  const handleAddBook = (bookID) => {
    if (!selectedBooks.includes(bookID)) {
      setSelectedBooks((prev) => [...prev, bookID]);
    }
  };

  const handleRemoveBook = (bookID) => {
    setSelectedBooks((prev) => prev.filter((id) => id !== bookID));
  };

  const getAvailableBooks = () => {
    return allBooks.filter((book) => !selectedBooks.includes(book._id));
  };

  const getBookName = (bookID) => {
    const book = allBooks.find((b) => b._id === bookID);
    return book ? book.bookName : "Unknown Book";
  };

  const getBookLoanAmount = (bookID) => {
    const book = allBooks.find((b) => b._id === bookID);
    return book ? book.loanAmount : "N/A";
  };
  const getBookPrincipalAmount = (bookID) => {
    const book = allBooks.find((b) => b._id === bookID);
    return book ? book.currentPrincipalAmount : "N/A";
  }
  const getBookID = (bookID) => {
    const book = allBooks.find((b) => b._id === bookID);
    return book ? book.bookID : "N/A";
  }

  const getUserName = (user) => {
    return user.name || user.firstName + " " + user.lastName || "N/A";
  };

  const handleSave = async () => {
    if (!selectedUser) {
      showError("Please select a user");
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiPost(ADMIN_ENDPOINTS.MAP_BOOK_TO_USER, {
        userID: selectedUser.userID,
        bookIDs: selectedBooks,
      });

      if (response.success) {
        showError("Books mapped successfully");
        setSelectedUser(null);
        setSelectedBooks([]);
        setSearchQuery("");
      } else {
        showError("Failed to map books: " + response.message);
      }
    } catch (error) {
      showError("Error mapping books: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="map-book-to-user">
      <div className="page-header-map">
        <button className="back-button-map" onClick={onBack}>
          ← Back
        </button>
        <h2>Map Book to User</h2>
      </div>

      <div className="search-section">
        <input
          type="text"
          className="search-input-map"
          placeholder="Search by user name, user ID, or book ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <span className="search-info">
            {searchResults.users.length} user(s), {searchResults.books.length}{" "}
            book(s) found
          </span>
        )}
      </div>

      {searchQuery && searchResults.users.length === 0 && searchResults.books.length === 0 && (
        <div className="no-results">
          <p>No users or books found matching your search</p>
        </div>
      )}

      <div className="content-wrapper">
        {/* Search Results */}
        {searchQuery && (searchResults.users.length > 0 || searchResults.books.length > 0) && (
          <div className="search-results">
            {/* Users Section */}
            {searchResults.users.length > 0 && (
              <div className="results-section">
                <h3>Users</h3>
                <div className="users-results">
                  {searchResults.users.map((user) => (
                    <button
                      key={user.userID}
                      className={`user-result-item ${
                        selectedUser?.userID === user.userID ? "active" : ""
                      }`}
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="result-info">
                        <p className="result-name">{getUserName(user)}</p>
                        <p className="result-id">{user.userID}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Books Section */}
            {searchResults.books.length > 0 && (
              <div className="results-section">
                <h3>Books</h3>
                <div className="books-results">
                  {searchResults.books.map((book) => (
                    <div key={book.bookID} className="book-result-item">
                      <div className="result-info">
                        <p className="result-name">{book.bookName}</p>
                        <p className="result-id">{book.bookID}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Details and Book Mapping */}
        {selectedUser && (
          <div className="user-details-section">
            <div className="user-card-map">
              <h3>User Details</h3>
              <div className="user-info-map">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{getUserName(selectedUser)}</span>
                </div>
                <div className="info-row">
                  <span className="label">User ID:</span>
                  <span className="value mono">{selectedUser.userID}</span>
                </div>
                <div className="info-row">
                  <span className="label">Mobile:</span>
                  <span className="value">{selectedUser.mobile || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="books-mapping-card">
              <div className="books-header">
                <h3>Mapped Books ({selectedBooks.length})</h3>
                <button
                  className="add-book-btn"
                  onClick={() => setShowBookModal(true)}
                  disabled={submitting || getAvailableBooks().length === 0}
                >
                  + Add Book
                </button>
              </div>

              <div className="mapped-books-list">
                {selectedBooks.length > 0 ? (
                  selectedBooks.map((bookID) => (
                    <div key={bookID} className="mapped-book-item">
                      <div className="book-details-map">
                        <p className="book-name">{getBookName(bookID)}</p>
                        <p className="book-id">{getBookID(bookID)}</p>
                        <p className="book-amount">
                          Loan Amount: {getBookLoanAmount(bookID)}
                        </p>
                        <p className="book-amount">
                          Principal Amount: {getBookPrincipalAmount(bookID)}
                        </p>
                      </div>
                      <button
                        className="remove-book-btn"
                        onClick={() => handleRemoveBook(bookID)}
                        disabled={submitting}
                        title="Remove book"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-books-mapped">No books mapped yet</p>
                )}
              </div>

              <div className="action-buttons">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setSelectedUser(null);
                    setSelectedBooks([]);
                  }}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  className="btn-save"
                  onClick={handleSave}
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedUser && searchQuery && (
          <div className="no-selection">
            <p>Select a user from the search results to map books</p>
          </div>
        )}

        {!searchQuery && (
          <div className="initial-state">
            <p>Start typing to search for users or books</p>
          </div>
        )}
      </div>

      {/* Book Selection Modal */}
      {showBookModal && (
        <div className="modal-overlay-map" onClick={() => setShowBookModal(false)}>
          <div className="modal-content-map" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-map">
              <h3>Select Books to Add</h3>
              <button
                className="modal-close-map"
                onClick={() => setShowBookModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-map">
              {getAvailableBooks().length > 0 ? (
                <div className="available-books">
                  {getAvailableBooks().map((book) => (
                    <div
                      key={book.bookID}
                      className="available-book-item"
                      onClick={() => handleAddBook(book.bookID)}
                    >
                      <div className="book-info-modal">
                        <h4 className="book-name-modal">{book.bookName}</h4>
                        <p className="book-id-modal">{book.bookID}</p>
                        <p className="book-amount-modal">
                          Amount: {book.currentPrincipalAmount}
                        </p>
                      </div>
                      <button className="add-btn-modal">+</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-available-books">
                  All books are already mapped to this user
                </p>
              )}
            </div>

            <div className="modal-footer-map">
              <button
                className="btn-close-modal"
                onClick={() => setShowBookModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapBookToUser;
