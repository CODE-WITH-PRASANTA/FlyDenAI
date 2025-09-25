import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/Logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const menuRef = useRef();
  const lastScrollY = useRef(0);

  // Detect scroll for Navbar only
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false); // hide when scrolling down
      } else {
        setShowNavbar(true); // show when scrolling up
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
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

  // ✅ Updated Menu Items
  const menuItems = [
    { name: "Home" },
    { name: "About Us", sub: ["About Us", "Services 1", "Services 2", "Our Team"] },
    { name: "Visa", sub: ["Job Visa", "Business Visa", "Worker Visa", "Student Visa", "Free Visa Enquery"] },
    { name: "Country", sub: ["France", "Australia", "India"] },
    { name: "Our Partners" },
    { name: "Program Type", sub: ["Study Abroad", "Teach Abroad", "Intern Abroad"] },
    { name: "Blog" },
    { name: "Contact Us" },
    { name: "Get a Quote" }, // Replaced Donate
  ];

  return (
    <>
      {/* ===== Top Bar (Always Visible) ===== */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-content">
            <div className="topbar-left">
              <a href="tel:12345615523" className="topbar-item">📞 <span>123 4561 5523</span></a>
              <a href="mailto:info@IIInternship.co" className="topbar-item">✉ <span>info@IIInternship.co</span></a>
            </div>
            <div className="topbar-right">
              <a href="#" className="topbar-login">🔑 Login / Register</a>
              <a href="#" className="topbar-cta">🚀 Apply Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Navbar (Hide/Show on Scroll) ===== */}
      <header className={`Nav-navbar-wrapper ${showNavbar ? "show" : "hide"}`}>
        <nav className="Nav-navbar">
          <div className="Nav-container Nav-navbar-inner">
            <div className="Nav-logo-wrapper">
              <a href="#" className="Nav-logo"><img src={logo} alt="EduBlink" /></a>
            </div>
            <button className="Nav-toggler" onClick={() => setMobileMenuOpen(true)}>☰</button>

            <ul className="Nav-menu">
              {menuItems.map((item, i) => (
                <li className="Nav-item dropdown" key={i}>
                  {item.name === "Get a Quote" ? (
                    <a className="Nav-donate-btn" href="#">{item.name}</a>
                  ) : (
                    <>
                      <a className="Nav-link" href="#">{item.name}</a>
                      {item.sub && (
                        <ul className="Nav-dropdown">
                          {item.sub.map((sub, idx) => (
                            <li key={idx}><a href="#">{sub}</a></li>
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
        <div className={`Nav-mobile-menu ${mobileMenuOpen ? "open" : ""}`} ref={menuRef}>
          <div className="Nav-mobile-wrapper">
            <div className="Nav-mobile-top">
              <div className="Nav-mobile-logo"><img src={logo} alt="EduBlink" /></div>
              <button className="Nav-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
            </div>
            <ul className="Nav-mobile-list">
              {menuItems.map((item, i) => (
                <li key={i}>
                  {item.name === "Get a Quote" ? (
                    <a
                      href="#"
                      className="Nav-mobile-donate-btn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <>
                      <div
                        className="mobile-link"
                        onClick={() => toggleDropdown(i)}
                      >
                        {item.name} {item.sub && <span className="arrow">{mobileDropdownOpen === i ? "▲" : "▼"}</span>}
                      </div>
                      {item.sub && (
                        <ul className={`mobile-dropdown ${mobileDropdownOpen === i ? "open" : ""}`}>
                          {item.sub.map((sub, idx) => (
                            <li key={idx}><a href="#" onClick={() => setMobileMenuOpen(false)}>{sub}</a></li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
