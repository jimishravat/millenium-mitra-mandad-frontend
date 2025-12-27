import React from 'react';
import { useError } from '../contexts/ErrorContext';
import './ErrorModal.css';

const ErrorModal = () => {
  const { error, clearError } = useError();

  if (!error) {
    return null;
  }

  const errorMessage = error.message || 'Something went wrong. Please try again later.';

  return (
    <>
      {/* Overlay */}
      <div className="error-modal-overlay" onClick={clearError}></div>

      {/* Modal */}
      <div className="error-modal">
        <div className="error-modal-content">
          {/* Header with icon */}
          <div className="error-modal-header">
            <div className="error-icon">⚠️</div>
            <h2 className="error-modal-title">Error</h2>
          </div>

          {/* Message */}
          <div className="error-modal-body">
            <p className="error-message">{errorMessage}</p>
          </div>

          {/* Footer with close button */}
          <div className="error-modal-footer">
            <button 
              className="error-modal-button"
              onClick={clearError}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
