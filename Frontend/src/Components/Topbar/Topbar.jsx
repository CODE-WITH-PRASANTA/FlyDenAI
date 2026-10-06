import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Api";
import "./Topbar.css";
import CheckStatus from "../CheckStatus/CheckStatus";

const Topbar = () => {
  const [contactInfo, setContactInfo] = useState(null);

  const [showTopbar, setShowTopbar] = useState(true);

  const [openStatusPopup, setOpenStatusPopup] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contacts`);

        if (
          response.data &&
          response.data.success &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setContactInfo(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  /*
   * =====================================================
   * TOPBAR HIDE / SHOW ON SCROLL
   * =====================================================
   */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowTopbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowTopbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowTopbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          TOPBAR
          ===================================================== */}

      <div
        className={`topbar ${
          showTopbar
            ? "topbar-visible"
            : "topbar-hidden"
        }`}
      >
        <div className="topbar-container">
          <div className="topbar-content">

            {/* =================================================
                LEFT SIDE
                ================================================= */}

            <div className="topbar-left">
              {contactInfo ? (
                <>
                  {/* PHONE */}

                  {contactInfo.phone && (
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="topbar-item topbar-phone-item"
                    >
                      <span className="topbar-icon">
                        📞
                      </span>

                      <span className="topbar-country-code">
                        +91
                      </span>

                      <span className="topbar-phone">
                        {contactInfo.phone}
                      </span>
                    </a>
                  )}

                  {/* EMAIL */}

                  {contactInfo.email && (
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="topbar-item topbar-email-item"
                    >
                      <span className="topbar-icon">
                        ✉
                      </span>

                      <span className="topbar-email">
                        {contactInfo.email}
                      </span>
                    </a>
                  )}
                </>
              ) : (
                <p className="topbar-loading">
                  Loading contact...
                </p>
              )}
            </div>

            {/* =================================================
                CHECK STATUS
                ================================================= */}

            <div className="topbar-right">
              <button
                type="button"
                className="topbar-login"
                onClick={() =>
                  setOpenStatusPopup(true)
                }
              >
                <span className="topbar-status-icon">
                  📄
                </span>

                <span className="topbar-status-text">
                  Check Your Status
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          CHECK STATUS POPUP
          ===================================================== */}

      {openStatusPopup && (
        <CheckStatus
          onClose={() =>
            setOpenStatusPopup(false)
          }
        />
      )}
    </>
  );
};

export default Topbar;