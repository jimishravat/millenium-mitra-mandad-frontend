import React, { useState } from 'react';
import './TransactionDetail.css';

const TransactionDetail = ({ transaction, onBack }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(transaction);

  const handleEditChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    });
  };

  const handleSave = () => {
    // TODO: Save to backend
    console.log('Saving transaction:', editData);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      // TODO: Delete from backend
      console.log('Deleting transaction:', transaction.id);
      onBack();
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setEditData(transaction);
    setIsEditMode(false);
  };

  const displayData = isEditMode ? editData : transaction;

  return (
    <div className="transaction-detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Transactions
          </button>
          <h1>Transaction Details</h1>
          <div className="transaction-id">ID: {displayData.id}</div>
        </div>

        <div className="detail-content">
          <div className="detail-card">
            <div className="detail-section">
              <h2>Basic Information</h2>
              <div className="detail-grid">
                <div className="detail-field">
                  <label>Transaction Type</label>
                  {isEditMode ? (
                    <select 
                      value={displayData.type} 
                      onChange={(e) => handleEditChange('type', e.target.value)}
                      className="detail-input"
                    >
                      <option>LOAN</option>
                      <option>SETTLEMENT</option>
                      <option>REGULAR</option>
                    </select>
                  ) : (
                    <div className="detail-value">
                      <span className="detail-badge" style={{
                        background: displayData.type === 'LOAN' ? 'linear-gradient(135deg, rgba(123, 104, 238, 0.15), rgba(123, 104, 238, 0.05))' : 
                                    displayData.type === 'SETTLEMENT' ? 'linear-gradient(135deg, rgba(218, 112, 214, 0.15), rgba(218, 112, 214, 0.05))' :
                                    'linear-gradient(135deg, rgba(32, 178, 170, 0.15), rgba(32, 178, 170, 0.05))',
                        color: displayData.type === 'LOAN' ? '#5a4fa3' : 
                               displayData.type === 'SETTLEMENT' ? '#a34a8a' : '#1a7d72',
                        border: displayData.type === 'LOAN' ? '1px solid rgba(123, 104, 238, 0.3)' :
                                displayData.type === 'SETTLEMENT' ? '1px solid rgba(218, 112, 214, 0.3)' :
                                '1px solid rgba(32, 178, 170, 0.3)'
                      }}>
                        {displayData.type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="detail-field">
                  <label>Book ID</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.bookId}
                      onChange={(e) => handleEditChange('bookId', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.bookId}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Amount Details</h2>
              <div className="detail-grid">
                <div className="detail-field">
                  <label>Principal Amount</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.principal}
                      onChange={(e) => handleEditChange('principal', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.principal}</div>
                  )}
                </div>

                <div className="detail-field">
                  <label>Loan EMI</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.emi}
                      onChange={(e) => handleEditChange('emi', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.emi}</div>
                  )}
                </div>

                {displayData.loanAmount !== '—' && (
                  <div className="detail-field">
                    <label>Loan Amount</label>
                    {isEditMode ? (
                      <input 
                        type="text" 
                        value={displayData.loanAmount}
                        onChange={(e) => handleEditChange('loanAmount', e.target.value)}
                        className="detail-input"
                      />
                    ) : (
                      <div className="detail-value">{displayData.loanAmount}</div>
                    )}
                  </div>
                )}

                {displayData.settlement !== '—' && (
                  <div className="detail-field">
                    <label>Settlement Amount</label>
                    {isEditMode ? (
                      <input 
                        type="text" 
                        value={displayData.settlement}
                        onChange={(e) => handleEditChange('settlement', e.target.value)}
                        className="detail-input"
                      />
                    ) : (
                      <div className="detail-value">{displayData.settlement}</div>
                    )}
                  </div>
                )}

                <div className="detail-field">
                  <label>Loan Interest</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.interest}
                      onChange={(e) => handleEditChange('interest', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.interest}</div>
                  )}
                </div>

                <div className="detail-field">
                  <label>Total Amount</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.total}
                      onChange={(e) => handleEditChange('total', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.total}</div>
                  )}
                </div>

                <div className="detail-field">
                  <label>Amount Returned</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.returned}
                      onChange={(e) => handleEditChange('returned', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.returned}</div>
                  )}
                </div>

                <div className="detail-field">
                  <label>Penalty Amount</label>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={displayData.penalty}
                      onChange={(e) => handleEditChange('penalty', e.target.value)}
                      className="detail-input"
                    />
                  ) : (
                    <div className="detail-value">{displayData.penalty}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            {!isEditMode ? (
              <>
                <button className="action-button edit-button" onClick={handleEdit}>
                  ✎ Edit
                </button>
                <button className="action-button delete-button" onClick={handleDelete}>
                  🗑 Delete
                </button>
              </>
            ) : (
              <>
                <button className="action-button save-button" onClick={handleSave}>
                  ✓ Save
                </button>
                <button className="action-button cancel-button" onClick={handleCancel}>
                  ✕ Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
