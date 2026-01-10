import React, { useState } from "react";
import { useError } from "../contexts/ErrorContext";
import { apiPost, AUTH_ENDPOINTS } from "../utils";
import PasswordVerification from "../components/PasswordVerification";
import "./Login.css";
import ChangePassword from "../components/ChangePassword";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { showError } = useError();

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    // Only allow numeric characters and limit to 10 digits
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    setMobileNumber(numericValue);
  };

  const handlePasswordSubmit = async (password) => {
    setLoading(true);
    try {
      const response = await apiPost(AUTH_ENDPOINTS.LOGIN, {
        mobile: mobileNumber,
        password: password,
      });

      // // Success handling
      // console.log("Login successful:", response.data);
      // // TODO: Handle token storage and redirect to /home
      // alert("Login successful!"); // Temporary
      if(response.data.isDefaultPassword) {
        setShowPasswordVerification(false);
        setShowChangePassword(true);
        
      }else {
        window.location.href = "/home";
      }
    } catch (error) {
      showError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromPasswordVerification = () => {
    setShowPasswordVerification(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number
    if (!mobileNumber || mobileNumber.length !== 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Show password verification component without API call
    setShowPasswordVerification(true);
  };

  return (
    <>
      
      {showPasswordVerification ? (
        <PasswordVerification
          mobileNumber={mobileNumber}
          onSubmit={handlePasswordSubmit}
          onBack={handleBackFromPasswordVerification}
          loading={loading}
        />
      ) : 
      showChangePassword ? (
        <ChangePassword/>
      )
      :
      
      (
        <div className="login-container">
          <div className="login-header">
            <div className="app-logo">💰</div>
            <h1 className="app-title">Millenium Mitra Mandand</h1>
            <p className="app-tagline">Your own savings account</p>
          </div>

          <div className="login-content">
            <h2 className="welcome-text">Welcome Back</h2>
            <p className="login-description">
              Enter your mobile number to continue
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <div className="input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    placeholder="Enter 10 digit number"
                    maxLength="10"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                <span className="button-text">
                  {loading ? "Logging in..." : "Continue"}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
