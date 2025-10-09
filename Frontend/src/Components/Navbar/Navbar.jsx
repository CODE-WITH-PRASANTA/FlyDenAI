import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // ✅ React Router
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

  // ✅ Updated Menu Items with proper routing
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about", sub: [
      { name: "About Us", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Our Team", path: "/team/member" },
      { name: "Team Details", path: "/team/details" },
    ]},
    {
  name: "Visa",
  path: "/visa/overview",
  sub: [
    { name: "All Visa Overview", path: "/visa/overview" },
    { name: "Tourist Visa", path: "/TouristVisa" },
    { name: "Student Visa", path: "/ComingSoon" },
    { name: "Business Visa", path: "/ComingSoon" },
    { name: "Work Visa", path: "/ComingSoon" },
    { name: "Family Visa", path: "/ComingSoon" },
    { name: "Transit Visa", path: "/ComingSoon" },
    { name: "Permanent Residency Visa", path: "/ComingSoon" },
    { name: "Immigration & PR Services", path: "/ComingSoon" },
    { name: "Free Visa Enquiry", path: "/ComingSoon" },
  ],
},
    { name: "Country", path: "/ComingSoon", sub: [
      { name: "France", path: "/ComingSoon" },
      { name: "Australia", path: "/ComingSoon" },
      { name: "India", path: "/ComingSoon" },
    ]},
    { name: "Our Partners", path: "/ComingSoon" },
    { name: "Program Type", path: "/ComingSoon", sub: [
      { name: "Study Abroad", path: "/ComingSoon" },
      { name: "Teach Abroad", path: "/ComingSoon" },
      { name: "Intern Abroad", path: "/ComingSoon" },
    ]},
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
    { name: "Get a Quote", path: "/ComingSoon" },
  ];

  return (
    <>
      {/* ===== Top Bar ===== */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-content">
            <div className="topbar-left">
              <a href="tel:12345615523" className="topbar-item">📞 <span>123 4561 5523</span></a>
              <a href="mailto:info@IIInternship.co" className="topbar-item">✉ <span>info@IIInternship.co</span></a>
            </div>
            <div className="topbar-right">
              <Link to="/login" className="topbar-login">🔑 Login / Register</Link>
              <Link to="/apply" className="topbar-cta">🚀 Apply Now</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <header className={`Nav-navbar-wrapper ${showNavbar ? "show" : "hide"}`}>
        <nav className="Nav-navbar">
          <div className="Nav-container Nav-navbar-inner">
            <div className="Nav-logo-wrapper">
              <Link to="/" className="Nav-logo"><img src={logo} alt="EduBlink" /></Link>
            </div>
            <button className="Nav-toggler" onClick={() => setMobileMenuOpen(true)}>☰</button>

            <ul className="Nav-menu">
              {menuItems.map((item, i) => (
                <li className="Nav-item dropdown" key={i}>
                  {item.name === "Get a Quote" ? (
                    <Link className="Nav-donate-btn" to={item.path}>{item.name}</Link>
                  ) : (
                    <>
                      <Link className="Nav-link" to={item.path}>{item.name}</Link>
                      {item.sub && (
                        <ul className="Nav-dropdown">
                          {item.sub.map((sub, idx) => (
                            <li key={idx}><Link to={sub.path}>{sub.name}</Link></li>
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
                    // ✅ Fix: Direct route for normal links (like Contact Us, Blog, Home, etc.)
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
    </>
  );
};

export default Navbar;
