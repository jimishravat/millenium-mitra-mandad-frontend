import React from 'react';
import './Main.css';

const Main = ({ children }) => {
  return (
    <main className="main-content">
      <div className="main-container">
        {children}
      </div>
    </main>
  );
};

export default Main;
