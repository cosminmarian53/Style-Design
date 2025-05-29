/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importing Icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import icon from "../assets/icon.png";
// Navbar Component
function Navbar({ darkMode, toggleDarkMode }) {
  // Navbar Collapse
  const [isNavCollapsed, setIsNavCollapsed] = useState(window.innerWidth < 992);
  useEffect(() => {
    const handleResize = () => {
      setIsNavCollapsed(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light p-3  ${
          darkMode ? "dark-mode-bg" : "light-mode-bg"
        }`}
      >
        <div className="container-fluid">
          <Link
            className={`navbar-brand ${darkMode ? "text-white" : "text-dark"}`}
            to="/"
          >
            {isNavCollapsed ? (
              <img
                src={icon}
                alt="Logo"
                className="navbar-brand img-fluid"
                style={{
                  width: "3rem",
                  height: "4rem",
                }}
              />
            ) : (
              <span style={{ letterSpacing: "0.2rem" }}>
                <b
                  style={{
                    background: darkMode
                      ? "linear-gradient(90deg, #FFD700, #FFA500, #FFC107)"
                      : "inherit",
                    WebkitBackgroundClip: darkMode ? "text" : "unset",
                    WebkitTextFillColor: darkMode ? "transparent" : "inherit",
                  }}
                >
                  AZTEK
                </b>
              </span>
            )}
          </Link>
          <button
            className={`navbar-toggler ${darkMode ? "dark-mode-toggler" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li
                className={`nav-item nav-btn ${
                  darkMode ? "dark-mode-underline" : ""
                }`}
                style={{
                  background: darkMode
                    ? "linear-gradient(90deg, #FFD700, #FFA500, #FFC107)"
                    : "inherit",
                  WebkitBackgroundClip: darkMode ? "text" : "unset",
                  WebkitTextFillColor: darkMode ? "transparent" : "inherit",
                }}
              >
                <Link
                  className={`nav-link mx-2 active ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  to="/" // Replace "/home" with the actual route to the Home component
                >
                  HOME
                </Link>
              </li>
              <li
                className={`nav-item nav-btn ${
                  darkMode ? "dark-mode-underline" : ""
                }`}
                style={{
                  background: darkMode
                    ? "linear-gradient(90deg, #FFD700, #FFA500, #FFC107)"
                    : "inherit",
                  WebkitBackgroundClip: darkMode ? "text" : "unset",
                  WebkitTextFillColor: darkMode ? "transparent" : "inherit",
                }}
              >
                <Link
                  className={`nav-link mx-2 ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  to="/products"
                >
                  PRODUCTS
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto d-lg-inline-flex">
              <li
                className={`nav-item mx-2 ${
                  darkMode ? "text-white" : "text-dark"
                }`}
                onClick={toggleDarkMode}
              >
                <a>
                  {darkMode ? (
                    <LightModeIcon
                      fontSize="medium"
                      style={{
                        transition: "opacity 0.5s",
                      }}
                    />
                  ) : (
                    <DarkModeOutlinedIcon
                      fontSize="medium"
                      style={{
                        transition: "opacity 0.5s",
                      }}
                    />
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
