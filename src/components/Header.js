import React, { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAppContext } from "../contexts";
import { AUTH_ENDPOINTS } from "../utils";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAdmin, setIsApplicationLoaded } = useAppContext();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${AUTH_ENDPOINTS.LOGOUT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    if(data.success){
      setIsApplicationLoaded(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/home" className="logo-link">
            <h1>Millenium Mitra Mandad</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            <li>
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/home/users" className="nav-link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/home/transactions" className="nav-link">
                Transactions
              </Link>
            </li>
            <li>
              <Link to="/home/reports" className="nav-link">
                Reports
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link nav-link-login">
                Login
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link nav-link-login">
                Logout
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        <div className="mobile-menu-actions">
          {isAdmin && (
            <button
              className="hamburger"
              onClick={toggleDrawer}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`hamburger-line ${isDrawerOpen ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isDrawerOpen ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isDrawerOpen ? "open" : ""}`}
              ></span>
            </button>
          )}
          <button
            className="logout-icon-button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <nav className="nav-mobile">
          <ul className="nav-list-mobile">
            <li>
              <Link
                to="/home"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/home/profile"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/home/users"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/home/transactions"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/home/reports"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Reports
              </Link>
            </li>
            <li className="divider"></li>
            <li>
              <Link
                to="/login"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="nav-link-mobile"
                onClick={closeDrawer}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for drawer */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={closeDrawer}></div>
      )}
    </header>
  );
};

export default Header;
