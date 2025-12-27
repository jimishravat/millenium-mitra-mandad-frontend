/**
 * Error Context
 * Provides global error state management for displaying error modals
 */

import React, { createContext, useState, useCallback } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = useCallback((message, data = null) => {
    setError({
      message,
      data,
      id: Date.now(), // Unique ID for re-renders
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * Custom hook to use error context
 */
export const useError = () => {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};

export default ErrorContext;
