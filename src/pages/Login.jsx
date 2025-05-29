import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSpring, animated } from "react-spring";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

const Login = ({ onLoginSuccess }) => { // Accept onLoginSuccess prop
  const [darkMode, setDarkMode] = useState(true); // Assuming Navbar needs this
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying login errors
  const navigate = useNavigate(); // Hook for navigation

  const loginSpring = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 200, friction: 20 },
  });

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/admin/login", { // Your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Username:", username); // Log the username for debugging
      console.log("Response data:", data); // Log the response data for debugging
      console.log("Response status:", response.status); // Log the response status for debugging
      console.log("Password: ", password); // Log the password for debugging
      if (response.ok) {
        // Login successful
        console.log("Login successful:", data);
        if (data.token) {
          localStorage.setItem("adminToken", data.token); // Store the token
          onLoginSuccess(); // Call the callback to update App's state
          navigate("/admin"); // Navigate to admin dashboard
        } else {
          setError("Login successful, but no token received.");
        }
      } else {
        // Login failed
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login API error:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className="login-container"
        style={{
          backgroundImage:
            "url(https://www.themissingbean.co.uk/cdn/shop/files/organic-coffee-beans.jpg?v=1690550801&width=3840)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <animated.div
          style={{
            ...loginSpring,
            background: "rgba(0, 0, 0, 0.65)",
            padding: "2.5rem",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2
            className="login-title"
            style={{
              color: "#FFD700",
              marginBottom: "1.5rem",
              textAlign: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            Admin Login
          </h2>
          <p
            style={{
              color: "red",
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
            }}
          >
            ❗WARNING❗This page is for admin use only.
          </p>
          {error && (
            <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
              {error}
            </p>
          )}
          <form onSubmit={handleLogin}> {/* Use form element with onSubmit */}
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="username" // Changed from email
                style={{
                  color: "#fff",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Username
              </label>
              <input
                type="text" // Changed from email
                id="username" // Changed from email
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                }}
                autoComplete="username"
              />
            </div>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="password"
                style={{
                  color: "#fff",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                }}
                autoComplete="current-password"
              />
            </div>
            <div
              className="form-group"
              style={{ textAlign: "center", marginTop: "1.5rem" }}
            >
              <button // Changed from Link to button
                type="submit" // Set button type to submit
                className="btn btn-primary"
                style={{
                  backgroundColor: "#FFD700",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "5px",
                  color: "#000",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Login
              </button>
            </div>
          </form>
        </animated.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;