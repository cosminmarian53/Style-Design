import React, { useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "/public/css/navbar.css";
function Navbar() {

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <b>STYLE</b> Design
            </a>
            <button
              className="navbar-toggler"
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
                <li className="nav-item nav-btn">
                  <a
                    className="nav-link mx-2 active"
                    aria-current="page"
                    href="#"
                  >
                    Acasa
                  </a>
                </li>
                <li className="nav-item nav-btn">
                  <a className="nav-link mx-2" href="#">
                    Produse
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto d-lg-inline-flex">
                <li className="nav-item mx-2">
                  <DarkModeOutlinedIcon fontSize="medium" />
                </li>
                <li className="nav-item mx-2">
                  <ShoppingCartOutlinedIcon fontSize="medium" />
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  );
}
export default Navbar;
