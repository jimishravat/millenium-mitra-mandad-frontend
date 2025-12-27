import React, { useState } from "react";
import "./AddTransaction.css";

const AddTransaction = ({ onBack }) => {
  const [bookId, setBookId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [bookDetails, setBookDetails] = useState(null);
  const [lastTransaction, setLastTransaction] = useState(null);
  const [multiplier, setMultiplier] = useState("1x");
  const [transactionType, setTransactionType] = useState("REGULAR");
  const [formData, setFormData] = useState({});

  // Mock data for book details
  const mockBooks = {
    "#BK001": {
      name: "John Doe",
      phone: "98765 43210",
      address: "Mumbai, Maharashtra",
      lastTransaction: { date: "Nov 2025", amount: "₹5,000.00" },
    },
    "#BK002": {
      name: "Jane Smith",
      phone: "98765 43211",
      address: "Bangalore, Karnataka",
      lastTransaction: { date: "Oct 2025", amount: "₹4,000.00" },
    },
    "#BK003": {
      name: "Mike Johnson",
      phone: "98765 43212",
      address: "Delhi, NCR",
      lastTransaction: { date: "Sep 2025", amount: "₹2,500.00" },
    },
    "#BK004": {
      name: "Sarah Williams",
      phone: "98765 43213",
      address: "Pune, Maharashtra",
      lastTransaction: { date: "Aug 2025", amount: "₹3,500.00" },
    },
    "#BK005": {
      name: "Robert Brown",
      phone: "98765 43214",
      address: "Chennai, Tamil Nadu",
      lastTransaction: { date: "Jul 2025", amount: "₹1,500.00" },
    },
  };

  const handleSearchBook = () => {
    const id = searchInput.toUpperCase();

    if (!id) {
      alert("Please enter a Book ID");
      return;
    }

    if (id && mockBooks[id]) {
      setBookId(id);
      setBookDetails(mockBooks[id]);
      setLastTransaction(mockBooks[id].lastTransaction);
    } else {
      alert(
        "Book ID not found. Available: #BK001, #BK002, #BK003, #BK004, #BK005"
      );
      setBookDetails(null);
      setLastTransaction(null);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchBook();
    }
  };

  const handleFormInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
    setFormData({});
  };

  const handleSave = () => {
    if (!bookId || !bookDetails) {
      alert("Please enter a valid Book ID");
      return;
    }

    const transactionData = {
      bookId,
      transactionType,
      multiplier,
      ...formData,
    };

    console.log("Saving transaction:", transactionData);
    alert("Transaction saved successfully!");
    onBack();
  };

  return (
    <div className="add-transaction-page">
      <div className="add-transaction-container">
        <div className="add-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Transactions
          </button>
          <h1>Add New Transaction</h1>
        </div>

        <div className="add-content">
          {/* Step 1: Book ID Input */}
          <div className="add-card book-id-card">
            <div className="book-id-section">
              <input
                id="bookId"
                type="text"
                placeholder="Enter Book ID (e.g., #BK001)"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                className="form-input book-id-input"
              />
              <button className="search-button" onClick={handleSearchBook}>
                🔍 Search
              </button>
            </div>
          </div>

          {/* Step 2: Book Details */}
          {bookDetails && (
            <div className="add-card">
              <h2 className="step-title">Book Details</h2>
              <div className="details-list">
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">{bookDetails.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Last Transaction */}
          {lastTransaction && (
            <div className="add-card">
              <h2 className="step-title">Last Transaction</h2>
              <div className="transaction-list">
                <div className="transaction-row">
                  <span className="transaction-label">Date</span>
                  <span className="transaction-value">
                    {lastTransaction.date}
                  </span>
                </div>
                <div className="transaction-row">
                  <span className="transaction-label">Amount</span>
                  <span className="transaction-value">
                    {lastTransaction.amount}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Multiplier Selection */}
          {bookDetails && (
            <div className="add-card">
              <h2 className="step-title">Amount Multiplier</h2>
              <div className="multiplier-section">
                <label>Select Multiplier (Default: 1x)</label>
                <div className="multiplier-buttons">
                  {["1x", "2x", "3x", "4x", "5x"].map((m) => (
                    <button
                      key={m}
                      className={`multiplier-btn ${
                        multiplier === m ? "active" : ""
                      }`}
                      onClick={() => setMultiplier(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Transaction Form */}
          {bookDetails && (
            <div className="add-card">
              <h2 className="step-title">Transaction Details</h2>
              <div className="form-group">
                <label htmlFor="transactionType">Transaction Type</label>
                <select
                  id="transactionType"
                  value={transactionType}
                  onChange={handleTransactionTypeChange}
                  className="form-input"
                >
                  <option value="REGULAR">Regular</option>
                  <option value="LOAN">Loan</option>
                  <option value="SETTLEMENT">Settlement</option>
                </select>
              </div>

              {/* Regular Transaction Fields */}
              {transactionType === "REGULAR" && (
                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="principal">Principal Amount</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="principal"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.principal || ""}
                        onChange={(e) =>
                          handleFormInputChange("principal", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emi">Loan EMI</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="emi"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.emi || ""}
                        onChange={(e) =>
                          handleFormInputChange("emi", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="interest">Loan Interest</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="interest"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.interest || ""}
                        onChange={(e) =>
                          handleFormInputChange("interest", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="returned">Amount Return</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="returned"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.returned || ""}
                        onChange={(e) =>
                          handleFormInputChange("returned", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="penalty">Penalty</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="penalty"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.penalty || ""}
                        onChange={(e) =>
                          handleFormInputChange("penalty", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Loan Transaction Fields */}
              {transactionType === "LOAN" && (
                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="loanAmount">Loan Amount</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="loanAmount"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.loanAmount || ""}
                        onChange={(e) =>
                          handleFormInputChange("loanAmount", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Settlement Transaction Fields */}
              {transactionType === "SETTLEMENT" && (
                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="settlementType">Settlement Type</label>
                    <select
                      id="settlementType"
                      value={formData.settlementType || "TO_USER"}
                      onChange={(e) =>
                        handleFormInputChange("settlementType", e.target.value)
                      }
                      className="form-input"
                    >
                      <option value="TO_USER">To User</option>
                      <option value="FROM_USER">From User</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="settlementAmount">Settlement Amount</label>
                    <div className="input-with-prefix">
                      <span className="currency-symbol">₹</span>
                      <input
                        id="settlementAmount"
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={formData.settlementAmount || ""}
                        onChange={(e) =>
                          handleFormInputChange(
                            "settlementAmount",
                            e.target.value
                          )
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Save Button */}
          {bookDetails && (
            <div className="add-card action-card">
              <button className="save-button" onClick={handleSave}>
                ✓ Save Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
