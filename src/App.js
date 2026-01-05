import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ErrorModal from "./components/ErrorModal";
import { ErrorProvider, AppProvider, useAppContext } from "./contexts";
import { ADMIN_ENDPOINTS, AUTH_ENDPOINTS, USER_ENDPOINTS } from "./utils";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Protected Route Component
function ProtectedRoute({ children, requiresAdmin = false }) {
  const { isApplicationLoaded, userData, isAdmin } = useAppContext();
  const location = useLocation();

  // If app is still loading, show loading message
  if (!isApplicationLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  // If user is not logged in (no userData), redirect to login
  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route requires admin and user is not admin, show Unauthorised page
  if (requiresAdmin && !isAdmin) {
    return (
      <NotFound
        title="Unauthorised"
        message="You don't have permission to access this page."
        errorCode="403"
      />
    );
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const {
    isApplicationLoaded,
    userData,
    setIsAdmin,
    adminData,
    setAdminData,
    setUserData,
    setIsApplicationLoaded,
  } = useAppContext();

  // Fetch user session on app load or when navigating to protected routes
  useEffect(() => {
    const fetchUserSession = async () => {
      if (isApplicationLoaded || isLoginPage) {
        return; // Skip if already loaded or on login page
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${AUTH_ENDPOINTS.USER_SESSION}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.success) {
          // User has a valid session
          if (data.data.isAdmin) {
            setIsAdmin(true);
          }
          // Fetch user details
          fetchUserDetails();
        } else {
          // No valid session, mark as loaded so user is redirected to login
          setIsApplicationLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        // Mark as loaded so user is redirected to login
        setIsApplicationLoaded(true);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${USER_ENDPOINTS.USERS_DETAILS}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        if (result.success) {
          setUserData(result.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsApplicationLoaded(true);
      }
    };

    fetchUserSession();
  }, []); // Only run on mount

  // If user is logged in, redirect away from login page
  if (isLoginPage && isApplicationLoaded && userData) {
    return <Navigate to="/home" replace />;
  }

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
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/users"
              element={
                <ProtectedRoute requiresAdmin={true}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/transactions"
              element={
                <ProtectedRoute requiresAdmin={true}>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/reports"
              element={
                <ProtectedRoute requiresAdmin={true}>
                  <Reports />
                </ProtectedRoute>
              }
            />
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
