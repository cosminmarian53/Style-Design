/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importing Icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { createContext } from "react";

export const DarkModeContext = createContext();
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
          <a
            className={`navbar-brand ${darkMode ? "text-white" : "text-dark"}`}
            href="#"
          >
            {isNavCollapsed ? (
              <img
                src={
                  darkMode ? "/src/assets/sd2-white.png" : "/src/assets/sd2.png"
                }
                alt="Logo"
                className="navbar-brand img-fluid"
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
            ) : (
              <span style={{ letterSpacing: "0.2rem" }}>
                <b>STYLE</b> Design
              </span>
            )}
          </a>
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
              >
                <Link
                  className={`nav-link mx-2 active ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  to="/" // Replace "/home" with the actual route to the Home component
                >
                  ACASĂ
                </Link>
              </li>
              <li
                className={`nav-item nav-btn ${
                  darkMode ? "dark-mode-underline" : ""
                }`}
              >
                <Link
                  className={`nav-link mx-2 ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  to="/products"
                >
                  PRODUSE
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
              <li
                className={`nav-item mx-2 ${
                  darkMode ? "text-white" : "text-dark"
                }`}
              >
                <a>
                  <ShoppingCartOutlinedIcon fontSize="medium" />
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
