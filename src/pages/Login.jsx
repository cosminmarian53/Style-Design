import { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

const Login = () => {
  // Dark Mode
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Spring animation for a smooth fade-in and slide-up effect.
  const loginSpring = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 200, friction: 20 },
  });

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
            Login
          </h2>
          {/* add a warning and say its a page only for admin */}
          <p
            style={{
              color: "red",
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
            }}
          >
            ❗WARNING❗This page is for admin use only. Please do not share your
            credentials.
          </p>
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{
                color: "#fff",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "none",
                outline: "none",
              }}
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
            />
          </div>
          <div
            className="form-group"
            style={{ textAlign: "center", marginTop: "1.5rem" }}
          >
            <Link
              to="/"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFD700",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "5px",
                color: "#000",
                fontWeight: "bold",
                textTransform: "uppercase",
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
            </Link>
          </div>
        </animated.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
