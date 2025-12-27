/**
 * API Endpoints Constants
 * Centralized location for all API endpoint definitions
 */

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  USER_SESSION: '/auth/user-session',
  VERIFY_PASSWORD: '/auth/verify-password',
  CHANGE_PASSWORD: '/auth/change-password',
};

// User endpoints
export const USER_ENDPOINTS = {
 USERS_DETAILS : '/user-details',
 BOOK_DETAILS : '/book-details',
 BOOK_TRANSACTION_HISTORY : '/book-transaction-history',
};

export const ADMIN_ENDPOINTS = {
    GET_USERS: '/admin/get-users',
    GET_BOOKS: '/admin/get-books',
    GET_USER_BOOK_TRANSACTION_HISTORY: '/admin/get-user-book-transaction-history',
    CONFIG: '/admin/config',
    ADD_TRANSACTION: '/admin/add-transaction',
    ADD_LOAN_TRANSACTION: '/admin/add-loan-transaction',
    ADD_USER: '/admin/add-user',
    UPDATE_USER: '/admin/update-user',
}



// Health check
export const HEALTH_CHECK = '/health';
