import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/home" className="logo-link">
            <h1>Mitra Mandad</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            <li><Link to="/home" className="nav-link">Home</Link></li>
            <li><Link to="/home/users" className="nav-link">Users</Link></li>
            <li><Link to="/home/transactions" className="nav-link">Transactions</Link></li>
            <li><Link to="/home/reports" className="nav-link">Reports</Link></li>
            <li><Link to="/login" className="nav-link nav-link-login">Login</Link></li>
            <li><Link to="/login" className="nav-link nav-link-login">Logout</Link></li>
          </ul>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button 
          className="hamburger"
          onClick={toggleDrawer}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-line ${isDrawerOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isDrawerOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isDrawerOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <nav className="nav-mobile">
          <ul className="nav-list-mobile">
            <li><Link to="/home" className="nav-link-mobile" onClick={closeDrawer}>Home</Link></li>
            <li><Link to="/home/profile" className="nav-link-mobile" onClick={closeDrawer}>Profile</Link></li>
            <li><Link to="/home/users" className="nav-link-mobile" onClick={closeDrawer}>Users</Link></li>
            <li><Link to="/home/transactions" className="nav-link-mobile" onClick={closeDrawer}>Transactions</Link></li>
            <li><Link to="/home/reports" className="nav-link-mobile" onClick={closeDrawer}>Reports</Link></li>
            <li className="divider"></li>
            <li><Link to="/login" className="nav-link-mobile" onClick={closeDrawer}>Login</Link></li>
            <li><Link to="/login" className="nav-link-mobile" onClick={closeDrawer}>Logout</Link></li>
          </ul>
        </nav>
      </div>

      {/* Overlay for drawer */}
      {isDrawerOpen && <div className="drawer-overlay" onClick={closeDrawer}></div>}
    </header>
  );
};

export default Header;
