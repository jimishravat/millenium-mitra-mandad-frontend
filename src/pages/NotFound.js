import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({ title = "Page Not Found", message = "Sorry, the page you're looking for doesn't exist or has been moved.", errorCode = "404" }) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">{errorCode}</h1>
        <h2>{title}</h2>
        <p>{message}</p>
        <Link to="/home" className="back-button">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
