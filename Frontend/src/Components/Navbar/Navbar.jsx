import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import "./Navbar.css";

import logo from "../../assets/logo-main.png";

const Navbar = () => {
  // =====================================================
  // MOBILE MENU
  // =====================================================

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileDropdownOpen, setMobileDropdownOpen] =
    useState(null);

  // =====================================================
  // TOPBAR STATE
  // =====================================================

  const [topbarVisible, setTopbarVisible] =
    useState(true);

  // =====================================================
  // MENU REF
  // =====================================================

  const menuRef = useRef(null);

  // =====================================================
  // SCROLL
  // =====================================================

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setTopbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setTopbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setTopbarVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // =====================================================
  // OUTSIDE CLICK
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);

        setMobileDropdownOpen(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [mobileMenuOpen]);

  // =====================================================
  // BODY SCROLL
  // =====================================================

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // =====================================================
  // ESCAPE
  // =====================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);

        setMobileDropdownOpen(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // =====================================================
  // DROPDOWN
  // =====================================================

  const toggleDropdown = (index) => {
    setMobileDropdownOpen((previous) =>
      previous === index ? null : index
    );
  };

  // =====================================================
  // CLOSE MOBILE
  // =====================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);

    setMobileDropdownOpen(null);
  };

  // =====================================================
  // SAME MENU DATA
  // =====================================================

  const menuItems = [
    {
      name: "Home",
      path: "/home",
    },

    {
      name: "About Us",
      path: "/about",
      sub: [
        {
          name: "About Us",
          path: "/about",
        },
        {
          name: "Services",
          path: "/services",
        },
        {
          name: "Our Team",
          path: "/team/member",
        },
      ],
    },

    {
      name: "Visa",
      path: "/visa/overview",
      sub: [
        {
          name: "All Visa Overview",
          path: "/visa/overview",
        },
        {
          name: "Free Visa Enquiry",
          path: "/FreeVisaQuotes",
        },
      ],
    },

    {
      name: "Country",
      path: "/AllCountry",
    },

    {
      name: "Dummy Ticket",
      path: "/DummyTicket",
    },

    {
      name: "Program Type",
      path: "/StudyAbroad",
      sub: [
        {
          name: "Study Abroad",
          path: "/StudyAbroad",
        },
      ],
    },

    {
      name: "Blog",
      path: "/blog",
    },

    {
      name: "Contact Us",
      path: "/contact",
    },

    {
      name: "Get a Quote",
      path: "/GetaQuotes",
    },
  ];

  return (
    <>
      {/* =================================================
          NAVBAR
          ================================================= */}

      <header
        className={`Nav-navbar-wrapper ${
          topbarVisible
            ? "Nav-topbar-visible"
            : "Nav-topbar-hidden"
        }`}
      >
        <nav className="Nav-navbar">
          <div className="Nav-container Nav-navbar-inner">

            {/* =================================================
                LOGO
                ================================================= */}

            <div className="Nav-logo-wrapper">
              <Link
                to="/"
                className="Nav-logo"
                onClick={closeMobileMenu}
              >
                <img
                  src={logo}
                  alt="EduBlink"
                />
              </Link>
            </div>

            {/* =================================================
                MOBILE TOGGLER
                ================================================= */}

            <button
              type="button"
              className="Nav-toggler"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen(true)
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* =================================================
                DESKTOP MENU
                ================================================= */}

            <ul className="Nav-menu">
              {menuItems.map((item, i) => (
                <li
                  className={`Nav-item ${
                    item.sub ? "dropdown" : ""
                  }`}
                  key={i}
                >
                  {item.name === "Get a Quote" ? (
                    <Link
                      className="Nav-donate-btn"
                      to={item.path}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <Link
                        className="Nav-link"
                        to={item.path}
                      >
                        {item.name}
                      </Link>

                      {item.sub && (
                        <ul className="Nav-dropdown">
                          {item.sub.map(
                            (sub, idx) => (
                              <li key={idx}>
                                <Link
                                  to={sub.path}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* =================================================
            MOBILE MENU
            ================================================= */}

        <div
          className={`Nav-mobile-menu ${
            mobileMenuOpen ? "open" : ""
          } ${
            topbarVisible
              ? "mobile-topbar-visible"
              : "mobile-topbar-hidden"
          }`}
        >
          <div
            className="Nav-mobile-wrapper"
            ref={menuRef}
          >
            {/* =================================================
                MOBILE HEADER
                ================================================= */}

            <div className="Nav-mobile-top">
              <div className="Nav-mobile-logo">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                >
                  <img
                    src={logo}
                    alt="EduBlink"
                  />
                </Link>
              </div>

              <button
                type="button"
                className="Nav-close"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
              >
                ✕
              </button>
            </div>

            {/* =================================================
                MOBILE MENU
                ================================================= */}

            <ul className="Nav-mobile-list">
              {menuItems.map((item, i) => (
                <li key={i}>

                  {item.name === "Get a Quote" ? (
                    <Link
                      to={item.path}
                      className="Nav-mobile-donate-btn"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ) : item.sub ? (
                    <>
                      <button
                        type="button"
                        className="mobile-link mobile-dropdown-button"
                        onClick={() =>
                          toggleDropdown(i)
                        }
                      >
                        <span>
                          {item.name}
                        </span>

                        <span
                          className={`nav-arrow ${
                            mobileDropdownOpen ===
                            i
                              ? "rotate"
                              : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      <ul
                        className={`mobile-dropdown ${
                          mobileDropdownOpen === i
                            ? "open"
                            : ""
                        }`}
                      >
                        {item.sub.map(
                          (sub, idx) => (
                            <li key={idx}>
                              <Link
                                to={sub.path}
                                onClick={
                                  closeMobileMenu
                                }
                              >
                                {sub.name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="mobile-link"
                      onClick={closeMobileMenu}
                    >
                      <span>
                        {item.name}
                      </span>
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