import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Admin from "./pages/Admin"; // Import the Admin page

// ProtectedRoute component
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // Initialize isLoggedIn state from localStorage to persist login across refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Optional: Add a handleLogout function here if you want to manage it globally
  // const handleLogout = () => {
  //   localStorage.removeItem("adminToken");
  //   setIsLoggedIn(false);
  //   // No need to navigate here if Admin page handles its own redirect on logout
  // };

  // Effect to check token validity on app load (optional, more advanced)
  // For simplicity, we're just checking if the token exists.
  // A more robust solution would verify the token with the backend.
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      // You could add a check here to see if the token is still valid
      // For example, by making a request to a protected backend route.
      // If invalid, call handleLogout().
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="products" element={<Products />} />
        <Route
          path="login"
          element={isLoggedIn ? <Navigate to="/admin" /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Admin />
            </ProtectedRoute>
          }
        />
        {/* You might want a catch-all route or a 404 page later */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;