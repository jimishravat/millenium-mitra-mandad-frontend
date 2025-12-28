import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import ErrorModal from './components/ErrorModal';
import { ErrorProvider, AppProvider } from './contexts';
import Home from './pages/Home';
import Users from './pages/Users';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      <ErrorModal />
      {!isLoginPage && <Header />}
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/users" element={<Users />} />
            <Route path="/home/transactions" element={<Transactions />} />
            <Route path="/home/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      )}
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <ErrorProvider>
        <Router>
          <AppContent />
        </Router>
      </ErrorProvider>
    </AppProvider>
  );
}

export default App;
