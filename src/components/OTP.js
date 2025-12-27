import React, { useRef, useState, useEffect } from 'react';
import './OTP.css';

const OTP = ({ onSubmit, mobileNumber, onBack, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Focus on first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, '');

    if (numericValue.length > 1) {
      return; // Prevent multiple digit input
    }

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus to next input if digit is entered
    if (numericValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to focus previous input
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // If current box is empty, go to previous
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index] !== '') {
        // If current box has value, just clear it (default behavior)
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        e.preventDefault();
      }
    }

    // Handle arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numericData = pastedData.replace(/[^0-9]/g, '').slice(0, 4);

    const newOtp = numericData.split('').concat(Array(4).fill('')).slice(0, 4);
    setOtp(newOtp);

    // Focus on last filled box or next empty
    setTimeout(() => {
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === '');
      const focusIndex = nextEmptyIndex === -1 ? 3 : Math.max(0, nextEmptyIndex - 1);
      inputRefs.current[focusIndex]?.focus();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 4) {
      alert('Please enter a 4-digit OTP');
      return;
    }

    onSubmit(otpValue);
  };

  return (
    <div className="otp-container">
      <div className="otp-header">
        <button
          type="button"
          className="otp-back-button"
          onClick={onBack}
          disabled={loading}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h2 className="otp-title">Verify OTP</h2>
        <div className="otp-spacer"></div>
      </div>

      <div className="otp-content">
        <p className="otp-description">
          Enter the 4-digit OTP sent to <span className="otp-mobile">+91 {mobileNumber}</span>
        </p>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-boxes">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="otp-box"
                disabled={loading}
                placeholder="0"
              />
            ))}
          </div>

          <button
            type="submit"
            className="otp-submit-button"
            disabled={loading || otp.join('').length !== 4}
          >
            <span className="button-text">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </span>
          </button>

          {/* <p className="otp-resend">
            Didn't receive code?{' '}
            <button
              type="button"
              className="otp-resend-button"
              disabled={loading}
            >
              Resend
            </button>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default OTP;
