/**
 * API Endpoints Constants
 * Centralized location for all API endpoint definitions
 */

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER_SESSION: "/auth/user-session",
  VERIFY_PASSWORD: "/auth/verify-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

// User endpoints
export const USER_ENDPOINTS = {
  USERS_DETAILS: "/user/user-details",
  BOOK_DETAILS: "/user/book-details",
  BOOK_TRANSACTION_HISTORY: "/user/book-transaction-history",
};

export const ADMIN_ENDPOINTS = {
  GET_USERS: "/admin/get-users",
  GET_BOOKS: "/admin/get-books",
  GET_TRANSACTIONS: "/admin/get-transactions",
  GET_USER_BOOK_TRANSACTION_HISTORY: "/admin/get-user-book-transaction-history",
  UPDATE_CONFIG: "/admin/update-config",
  GET_CONFIG: "/admin/get-config",
  ADD_TRANSACTION: "/admin/add-transaction",
  ADD_LOAN_TRANSACTION: "/admin/add-loan-transaction",
  ADD_USER: "/admin/add-user",
  UPDATE_USER: "/admin/update-user",
  GET_EXISTING_ADMIN: "/admin/get-existing-admin-users",
};

// Health check
export const HEALTH_CHECK = "/health";
