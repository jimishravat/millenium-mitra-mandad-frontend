import React, { useEffect, useState } from "react";
import "./Transactions.css";
import TransactionDetail from "../components/TransactionDetail";
import AddTransaction from "../components/AddTransaction";
import { ADMIN_ENDPOINTS, apiPost } from "../utils";
import { useAppContext, useError } from "../contexts";

const Transactions = () => {
  const { showError } = useError();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const { adminData } = useAppContext();

  // useEffect(() => {
  //   // Example API call
  //   fetchTransaction();
  //   fetchAllBooks();
  // }, []);
  // const fetchAllBooks = async () => {
  //   try {
  //     const response = await apiPost(ADMIN_ENDPOINTS.GET_BOOKS, {});
  //     if (response.success) {
  //       // Handle the fetched users data
  //       let bookObj = {};
  //       response.data.forEach((book) => {
  //         bookObj[book.bookID] = book;
  //       });
  //       setAdminData((preState) => ({
  //         ...preState,
  //         allBooksDetails: bookObj,
  //       }));
  //       // setState((prevState) => ({
  //       //   ...prevState,
  //       //   totalUserBooks: response.data.length,
  //       // }));
  //     } else {
  //       showError("Failed to fetch users: " + response.message);
  //     }
  //   } catch (error) {
  //     showError("Error fetching users: " + error.message);
  //   }
  // };
  // const fetchTransaction = async () => {
  //   try {
  //     const currentDate = new Date();
  //     // const payload = {
  //     //   month: currentDate.getMonth() + 1,
  //     //   year: currentDate.getFullYear(),
  //     // };
  //     const payload = {
  //       month: 12,
  //       year: 2025,
  //     };

  //     const result = await apiPost(ADMIN_ENDPOINTS.GET_TRANSACTIONS, payload);

  //     if (result.success) {
  //       setAdminData((preState) => ({
  //         ...preState,
  //         allTransactionsDetails: result.data,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  const transactions = [
    {
      id: "TXN001",
      bookId: "#BK001",
      type: "LOAN",
      principal: "₹5,000.00",
      emi: "₹500.00",
      loanAmount: "₹5,000.00",
      settlement: "—",
      interest: "₹250.00",
      total: "₹5,250.00",
      returned: "₹2,500.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN002",
      bookId: "#BK002",
      type: "SETTLEMENT",
      principal: "₹4,000.00",
      emi: "₹400.00",
      loanAmount: "—",
      settlement: "₹4,500.00",
      interest: "₹200.00",
      total: "₹4,700.00",
      returned: "₹4,700.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN003",
      bookId: "#BK002",
      type: "SETTLEMENT",
      principal: "₹4,000.00",
      emi: "₹400.00",
      loanAmount: "—",
      settlement: "₹4,500.00",
      interest: "₹200.00",
      total: "₹4,700.00",
      returned: "₹4,700.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN004",
      bookId: "#BK002",
      type: "SETTLEMENT",
      principal: "₹4,000.00",
      emi: "₹400.00",
      loanAmount: "—",
      settlement: "₹4,500.00",
      interest: "₹200.00",
      total: "₹4,700.00",
      returned: "₹4,700.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN005",
      bookId: "#BK002",
      type: "SETTLEMENT",
      principal: "₹4,000.00",
      emi: "₹400.00",
      loanAmount: "—",
      settlement: "₹4,500.00",
      interest: "₹200.00",
      total: "₹4,700.00",
      returned: "₹4,700.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN006",
      bookId: "#BK002",
      type: "SETTLEMENT",
      principal: "₹4,000.00",
      emi: "₹400.00",
      loanAmount: "—",
      settlement: "₹4,500.00",
      interest: "₹200.00",
      total: "₹4,700.00",
      returned: "₹4,700.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN007",
      bookId: "#BK003",
      type: "REGULAR",
      principal: "₹2,000.00",
      emi: "₹200.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹100.00",
      total: "₹2,100.00",
      returned: "₹1,200.00",
      penalty: "₹50.00",
    },
    {
      id: "TXN008",
      bookId: "#BK004",
      type: "LOAN",
      principal: "₹3,500.00",
      emi: "₹350.00",
      loanAmount: "₹3,500.00",
      settlement: "—",
      interest: "₹175.00",
      total: "₹3,675.00",
      returned: "₹1,800.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN009",
      bookId: "#BK005",
      type: "REGULAR",
      principal: "₹1,500.00",
      emi: "₹150.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹75.00",
      total: "₹1,575.00",
      returned: "₹800.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN010",
      bookId: "#BK005",
      type: "REGULAR",
      principal: "₹1,500.00",
      emi: "₹150.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹75.00",
      total: "₹1,575.00",
      returned: "₹800.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN011",
      bookId: "#BK005",
      type: "REGULAR",
      principal: "₹1,500.00",
      emi: "₹150.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹75.00",
      total: "₹1,575.00",
      returned: "₹800.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN012",
      bookId: "#BK005",
      type: "REGULAR",
      principal: "₹1,500.00",
      emi: "₹150.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹75.00",
      total: "₹1,575.00",
      returned: "₹800.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN013",
      bookId: "#BK005",
      type: "REGULAR",
      principal: "₹1,500.00",
      emi: "₹150.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹75.00",
      total: "₹1,575.00",
      returned: "₹800.00",
      penalty: "₹0.00",
    },
    {
      id: "TXN014",
      bookId: "#BK005",
      type: "REGULAR",
      principal: "₹1,500.00",
      emi: "₹150.00",
      loanAmount: "—",
      settlement: "—",
      interest: "₹75.00",
      total: "₹1,575.00",
      returned: "₹800.00",
      penalty: "₹0.00",
    },
  ];

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBack = () => {
    setSelectedTransaction(null);
  };

  const handleAddTransaction = () => {
    setShowAddTransaction(true);
  };

  const handleBackFromAdd = () => {
    setShowAddTransaction(false);
  };

  if (selectedTransaction) {
    return (
      <TransactionDetail
        transaction={selectedTransaction}
        onBack={handleBack}
      />
    );
  }

  if (showAddTransaction) {
    return <AddTransaction onBack={handleBackFromAdd} />;
  }

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <div className="transactions-container">
        <div className="section-card">
          <h2>Transaction Summary</h2>
          <div className="summary-grid">
            <div className="summary-item summary-item-1">
              <span className="label">Transactions This Month</span>
              <span className="abbreviation">TTM</span>
              <span className="value">0</span>
            </div>
            <div className="summary-item summary-item-2">
              <span className="label">Amount This Month</span>
              <span className="abbreviation">ATM</span>
              <span className="value">₹0.00</span>
            </div>
            <div className="summary-item summary-item-3">
              <span className="label">Total Loan Given</span>
              <span className="abbreviation">TLG</span>
              <span className="value">₹0.00</span>
            </div>
            <div className="summary-item summary-item-4">
              <span className="label">Total Amount With Us</span>
              <span className="abbreviation">TAWU</span>
              <span className="value">₹0.00</span>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2>Transactions</h2>
          <div className="action-section">
            <button
              className="filter-button add-transaction-btn"
              onClick={handleAddTransaction}
            >
              Add Transaction
            </button>
          </div>
          <div className="filter-section">
            <select className="filter-select">
              <option>All Months</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <select className="filter-select">
              <option>All Types</option>
              <option>LOAN</option>
              <option>SETTLEMENT</option>
              <option>REGULAR</option>
            </select>
          </div>
          <div className="filter-section">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search by Book ID..."
                className="filter-input book-id-input"
              />
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Book ID</th>
                  <th>Principal Amount</th>
                  <th>Loan EMI</th>
                  <th>Loan Amount</th>
                  <th>Settlement Amount</th>
                  <th>Loan Interest</th>
                  <th>Total Amount</th>
                  <th>Amount Return</th>
                  <th>Penalty Amount</th>
                </tr>
              </thead>
              <tbody>
                {adminData.allTransactionsDetails.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => handleRowClick(transaction)}
                    className="clickable-row"
                  >
                    <td>
                      <span
                        className="type-badge"
                        style={{
                          background:
                            transaction.transactionType === "LOAN"
                              ? "linear-gradient(135deg, rgba(123, 104, 238, 0.15), rgba(123, 104, 238, 0.05))"
                              : transaction.type === "SETTLEMENT"
                              ? "linear-gradient(135deg, rgba(218, 112, 214, 0.15), rgba(218, 112, 214, 0.05))"
                              : "linear-gradient(135deg, rgba(32, 178, 170, 0.15), rgba(32, 178, 170, 0.05))",
                          color:
                            transaction.transactionType === "LOAN"
                              ? "#5a4fa3"
                              : transaction.transactionType === "SETTLEMENT"
                              ? "#a34a8a"
                              : "#1a7d72",
                          border:
                            transaction.transactionType === "LOAN"
                              ? "1px solid rgba(123, 104, 238, 0.3)"
                              : transaction.type === "SETTLEMENT"
                              ? "1px solid rgba(218, 112, 214, 0.3)"
                              : "1px solid rgba(32, 178, 170, 0.3)",
                        }}
                      >
                        {transaction.transactionType}
                      </span>
                    </td>
                    <td>{transaction.bookID}</td>
                    <td>{transaction.principalAmount}</td>
                    <td>{transaction.loanEMI}</td>
                    <td>{transaction.loanAmount}</td>
                    <td>{transaction.settlementAmount}</td>
                    <td>{transaction.loanInterestAmount}</td>
                    <td>{transaction.totalAmount}</td>
                    <td>{transaction.amountReturned}</td>
                    <td>{transaction.penaltyAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
