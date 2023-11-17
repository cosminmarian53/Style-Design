import React, { useState, useEffect } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import "/public/css/navbar.css";
function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light p-3 ${
          darkMode ? "dark-mode-bg" : "light-mode-bg"
        }`}
      >
        <div className="container-fluid">
          <a
            className={`navbar-brand ${darkMode ? "text-white" : "text-dark"}`}
            href="#"
          >
            <b>STYLE</b> Design
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
                <a
                  className={`nav-link mx-2 active ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  aria-current="page"
                  href="#"
                >
                  Acasa
                </a>
              </li>
              <li
                className={`nav-item nav-btn ${
                  darkMode ? "dark-mode-underline" : ""
                }`}
              >
                <a
                  className={`nav-link mx-2 ${
                    darkMode ? "text-white" : "text-dark"
                  }`}
                  href="#"
                >
                  Produse
                </a>
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
                  {" "}
                  <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
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
