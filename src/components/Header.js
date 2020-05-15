import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "../assets/marvel-logo.png";
const axios = require("axios");

const Header = () => {
  /*  const history = useHistory(); */

  return (
    <header>
      {/* HEADER BLOCK 1 : LOGO + ASIDE ------------------------------*/}
      <div>
        <nav className="container">
          <aside>USER NAME</aside>
          {/* Logo */}
          <div className="logo">
            <img
              alt="Logo"
              src={Logo}
              style={{
                height: "50px",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* bouton Home*/}
          <aside>
            <div className="Linkdiv">
              <Link className="Link" style={{ textDecoration: "none" }} to="/">
                HomePage
              </Link>
            </div>
          </aside>
        </nav>
      </div>
      {/* HEADER BLOCK 2 : MENU -----------------------------------------*/}
      <menu className="container">
        <div>
          <div>
            <div className="Linkdiv">
              <Link className="Link" style={{ textDecoration: "none" }} to="/">
                CHARACTERS
              </Link>
            </div>
            <div className="Linkdiv">
              <Link
                className="Link"
                style={{ textDecoration: "none" }}
                to="/comics"
              >
                COMICS
              </Link>
            </div>
            <div className="Linkdiv">
              <Link
                className="Link"
                style={{ textDecoration: "none" }}
                to="/favorits"
              >
                FAVORITS
              </Link>
            </div>
          </div>
        </div>
      </menu>
    </header>
  );
};

export default Header;
