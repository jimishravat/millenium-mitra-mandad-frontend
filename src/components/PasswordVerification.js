import React, { useState } from 'react';
import './PasswordVerification.css';

const PasswordVerification = ({ onSubmit, mobileNumber, onBack, loading }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || password.length === 0) {
      alert('Please enter your password');
      return;
    }

    onSubmit(password);
  };

  return (
    <div className="password-verification-container">
      <div className="password-header">
        <button
          type="button"
          className="password-back-button"
          onClick={onBack}
          disabled={loading}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h2 className="password-title">Enter Password</h2>
        <div className="password-spacer"></div>
      </div>

      <div className="password-content">
        <p className="password-description">
          Enter your password for <span className="password-mobile">+91 {mobileNumber}</span>
        </p>

        <form onSubmit={handleSubmit} className="password-form">
          <div className="password-form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                disabled={loading}
                className="password-input"
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
                disabled={loading}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="password-submit-button"
            disabled={loading || !password}
          >
            <span className="button-text">
              {loading ? 'Verifying...' : 'Verify'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordVerification;
