import React, { useState } from "react";
import "./ViewAllBooks.css";
import { useAppContext, useError } from "../contexts";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";

const ViewAllBooks = ({ onBack, onEdit }) => {
  const { adminData, setAdminData } = useAppContext();
  const { showError } = useError();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const books = Object.values(adminData?.allBooksDetails || {});

  // Filter books based on search query (by book name or book ID)
  const filteredBooks = books.filter((book) =>
    (book.bookName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.bookID || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (book) => {
    if (onEdit) {
      onEdit(book);
    } else {
      console.log("Edit book:", book);
    }
  };

  const handleDelete = async (bookID) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setLoading(true);
        const response = await apiPost(ADMIN_ENDPOINTS.DELETE_BOOK, {
          bookID: bookID,
        });

        if (response.success) {
          // Remove book from adminData
          setAdminData((prevState) => {
            const updatedBooksObj = { ...prevState.allBooksDetails };
            delete updatedBooksObj[bookID];
            return {
              ...prevState,
              allBooksDetails: updatedBooksObj,
            };
          });
          showError("Book deleted successfully");
        } else {
          showError("Failed to delete book: " + response.message);
        }
      } catch (error) {
        showError("Error deleting book: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getBookName = (book) => {
    return book.bookName || book.name || "N/A";
  };

  const getLoanAmount = (book) => {
    return book.loanAmount || book.amount || "0";
  };

  const getAssociatedUsers = (book) => {
    if (!book.userID || book.userID.length === 0) {
      return "None";
    }
    return book.userID.join(", ");
  };

  const getAssociatedUserCount = (book) => {
    return book.userID ? book.userID.length : 0;
  };

  return (
    <div className="view-all-books">
      <div className="books-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>All Books</h2>
        <p className="books-count">Total Books: {books.length}</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <span className="search-result-count">
            Found {filteredBooks.length} book(s)
          </span>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <>
          {/* Table View for Desktop */}
          <div className="table-container">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Book Name</th>
                  <th>Loan Amount</th>
                  <th>Users Associated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.bookID} className="table-row">
                    <td className="cell-bookid">{book.bookID}</td>
                    <td className="cell-name">{getBookName(book)}</td>
                    <td className="cell-amount">{getLoanAmount(book)}</td>
                    <td className="cell-users">
                      <div className="users-list">
                        <span className="user-count">
                          {getAssociatedUserCount(book)}
                        </span>
                        <span className="user-ids" title={getAssociatedUsers(book)}>
                          {getAssociatedUsers(book)}
                        </span>
                      </div>
                    </td>
                    <td className="cell-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(book)}
                        title="Edit book"
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(book.bookID)}
                        disabled={loading}
                        title="Delete book"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="cards-container">
            {filteredBooks.map((book) => (
              <div key={book.bookID} className="book-card">
                <div className="card-header">
                  <h3 className="card-book-name">{getBookName(book)}</h3>
                  <p className="card-book-id">{book.bookID}</p>
                </div>

                <div className="card-body">
                  <div className="card-field">
                    <span className="card-label">Amount</span>
                    <span className="card-value amount-badge">
                      {getLoanAmount(book)}
                    </span>
                  </div>

                  <div className="card-field">
                    <span className="card-label">Users</span>
                    <span className="card-value user-badge">
                      {getAssociatedUserCount(book)}
                    </span>
                  </div>

                  <div className="card-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(book.bookID)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-books">
          <p>
            {searchQuery
              ? "No books found matching your search"
              : "No books found"}
          </p>
          <button className="back-button" onClick={onBack}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAllBooks;
