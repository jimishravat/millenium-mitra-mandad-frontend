/**
 * API Client Helper Function
 * Centralized function for making all API requests with default configuration
 * 
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {string} url - API endpoint URL
 * @param {object} body - Request body (optional, required for POST, PUT, PATCH)
 * @returns {Promise<object>} JSON formatted response from server
 * @throws {Error} If the API request fails or response is not OK
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

/**
 * Default configuration for all API requests
 */
const DEFAULT_CONFIG = {
  credentials: 'include', // Allows cookies to be sent with requests
  // sameSite : "none",
  // secure : true,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Makes an API request with default configuration
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {object} body - Request body
 * @returns {Promise<object>} Parsed JSON response
 */
export const apiCall = async (method, endpoint, body = null) => {
  try {
    // Construct full URL
    const fullUrl = `${API_BASE_URL}${endpoint}`;

    // Build request configuration
    const config = {
      ...DEFAULT_CONFIG,
      method,
    };

    // Add body for methods that support it
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(body);
    }

    // Make the API request
    const response = await fetch(fullUrl, config);

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      // Try to parse error response
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { 
          success: false,
          message: response.statusText,
          data: null 
        };
      }

      const error = new Error(
        errorData.message || `API Error: ${response.status} ${response.statusText}`
      );
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // Parse JSON response
    const data = await response.json();

    // Check if the response has the expected structure with success flag
    if (data && typeof data.success === 'boolean') {
      // If success is false, throw an error with the message
      if (!data.success) {
        const error = new Error(data.message || 'API request failed');
        error.success = false;
        error.message = data.message;
        error.data = data.data;
        throw error;
      }
      // Return only the data if success is true
      return data;
    }

    // Return response as-is if it doesn't have success field
    return data;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
};

/**
 * GET request helper
 * @param {string} endpoint - API endpoint
 * @returns {Promise<object>} JSON response
 */
export const apiGet = (endpoint) => {
  return apiCall('GET', endpoint);
};

/**
 * POST request helper
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body
 * @returns {Promise<object>} JSON response
 */
export const apiPost = (endpoint, body) => {
  return apiCall('POST', endpoint, body);
};

/**
 * PUT request helper
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body
 * @returns {Promise<object>} JSON response
 */
export const apiPut = (endpoint, body) => {
  return apiCall('PUT', endpoint, body);
};

/**
 * PATCH request helper
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body
 * @returns {Promise<object>} JSON response
 */
export const apiPatch = (endpoint, body) => {
  return apiCall('PATCH', endpoint, body);
};

/**
 * DELETE request helper
 * @param {string} endpoint - API endpoint
 * @returns {Promise<object>} JSON response
 */
export const apiDelete = (endpoint) => {
  return apiCall('DELETE', endpoint);
};

export default apiCall;
