import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AuthContext = createContext();

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>
      <button onClick={() => setIsAuthenticated(true)}>Login</button>
    </div>
  );
}

function DashboardPage() {
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Protected Page</p>
      <button onClick={() => setIsAuthenticated(false)}>Logout</button>
    </div>
  );
}

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