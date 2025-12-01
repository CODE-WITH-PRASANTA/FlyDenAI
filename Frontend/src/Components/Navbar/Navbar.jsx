// Updated Navbar.js with CheckStatus Popup Integrated
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Logo.png";
import BASE_URL from "../../Api";
import axios from "axios";
import CheckStatus from "../CheckStatus/CheckStatus"; // ✅ Import Popup

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [contactInfo, setContactInfo] = useState(null);

  const [openStatusPopup, setOpenStatusPopup] = useState(false); // ✅ STATUS POPUP STATE

  const menuRef = useRef();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contacts`);
        if (response.data.success && response.data.data.length > 0) {
          setContactInfo(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);
  };

  const menuItems = [
    { name: "Home", path: "/home" },
    {
      name: "About Us",
      path: "/about",
      sub: [
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Our Team", path: "/team/member" },
      ],
    },
    {
      name: "Visa",
      path: "/visa/overview",
      sub: [
        { name: "All Visa Overview", path: "/visa/overview" },
        { name: "Free Visa Enquiry", path: "/FreeVisaQuotes" },
      ],
    },
    { name: "Country", path: "/AllCountry" },
    // { name: "Dummy Ticket", path: "/DummyTicket" },
    {
      name: "Program Type",
      path: "/StudyAbroad",
      sub: [{ name: "Study Abroad", path: "/StudyAbroad" }],
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
    { name: "Get a Quote", path: "/GetaQuotes" },
  ];

  return (
    <>
      {/* ===== Top Bar ===== */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-content">
            <div className="topbar-left">
              {contactInfo ? (
                <>
                  <a href={`tel:${contactInfo.phone}`} className="topbar-item">
                    📞+91 <span>{contactInfo.phone}</span>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="topbar-item"
                  >
                    ✉ <span>{contactInfo.email}</span>
                  </a>
                </>
              ) : (
                <p>Loading contact...</p>
              )}
            </div>

            <div className="topbar-right">
              {/* ✅ OPEN CHECK STATUS POPUP */}
              <button
                className="topbar-login"
                onClick={() => setOpenStatusPopup(true)}
              >
                📄 Check Your Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <header className={`Nav-navbar-wrapper ${showNavbar ? "show" : "hide"}`}>
        <nav className="Nav-navbar">
          <div className="Nav-container Nav-navbar-inner">
            <div className="Nav-logo-wrapper">
              <Link to="/" className="Nav-logo">
                <img src={logo} alt="EduBlink" />
              </Link>
            </div>

            <button
              className="Nav-toggler"
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>

            <ul className="Nav-menu">
              {menuItems.map((item, i) => (
                <li className="Nav-item dropdown" key={i}>
                  {item.name === "Get a Quote" ? (
                    <Link className="Nav-donate-btn" to={item.path}>
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <Link className="Nav-link" to={item.path}>
                        {item.name}
                      </Link>
                      {item.sub && (
                        <ul className="Nav-dropdown">
                          {item.sub.map((sub, idx) => (
                            <li key={idx}>
                              <Link to={sub.path}>{sub.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ===== Mobile Menu ===== */}
        <div
          className={`Nav-mobile-menu ${mobileMenuOpen ? "open" : ""}`}
          ref={menuRef}
        >
          <div className="Nav-mobile-wrapper">
            <div className="Nav-mobile-top">
              <div className="Nav-mobile-logo">
                <img src={logo} alt="EduBlink" />
              </div>
              <button
                className="Nav-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <ul className="Nav-mobile-list">
              {menuItems.map((item, i) => (
                <li key={i}>
                  {item.name === "Get a Quote" ? (
                    <Link
                      to={item.path}
                      className="Nav-mobile-donate-btn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : item.sub ? (
                    <>
                      <div
                        className="mobile-link"
                        onClick={() => toggleDropdown(i)}
                      >
                        {item.name}{" "}
                        <span className="nav-arrow">
                          {mobileDropdownOpen === i ? "▲" : "▼"}
                        </span>
                      </div>

                      <ul
                        className={`mobile-dropdown ${
                          mobileDropdownOpen === i ? "open" : ""
                        }`}
                      >
                        {item.sub.map((sub, idx) => (
                          <li key={idx}>
                            <Link
                              to={sub.path}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="mobile-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* ✅ RENDER CHECK STATUS POPUP HERE */}
      {openStatusPopup && (
        <CheckStatus onClose={() => setOpenStatusPopup(false)} />
      )}
    </>
  );
};

export default Navbar;
