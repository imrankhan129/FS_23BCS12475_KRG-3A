import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Context
const AuthContext = createContext(null);

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Login Page Component
function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Login Page</h1>
      <p>Authentication Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
      <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
      {isAuthenticated && <p>Redirecting to dashboard...</p>}
    </div>
  );
}

// Dashboard Page Component
function DashboardPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
      <p>You are authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <button onClick={() => setIsAuthenticated(false)}>
        Logout (Test Redirect)
      </button>
    </div>
  );
}

// Main App with Routes
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}