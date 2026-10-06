import React, { useEffect, useState } from "react";
import "./CountriesSection.css";
import axios from "axios";
import BASE_URL from "../../Api";

const CountriesSection = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH COUNTRIES
  // =====================================================

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/countries`
        );

        setCountries(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching countries:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (logoUrl) => {
    if (!logoUrl) {
      return "";
    }

    const base = BASE_URL.replace("/api", "");

    if (
      logoUrl.startsWith("http://") ||
      logoUrl.startsWith("https://") ||
      logoUrl.startsWith("blob:")
    ) {
      return logoUrl;
    }

    if (logoUrl.startsWith("/uploads/")) {
      return `${base}${logoUrl}`;
    }

    if (logoUrl.startsWith("uploads/")) {
      return `${base}/${logoUrl}`;
    }

    return `${base}/uploads/${logoUrl}`;
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <section className="countries-section">

        <div className="countries-loading">

          <div className="countries-spinner"></div>

          <h3>
            Exploring Destinations...
          </h3>

          <p>
            Loading countries and destinations
          </p>

        </div>

      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="countries-section">

      {/* =================================================
          BACKGROUND DECORATIONS
          ================================================= */}

      <div className="countries-bg-circle countries-bg-circle-one"></div>

      <div className="countries-bg-circle countries-bg-circle-two"></div>

      <div className="countries-bg-dot countries-bg-dot-one"></div>

      <div className="countries-bg-dot countries-bg-dot-two"></div>


      {/* =================================================
          HEADER
          ================================================= */}

      <div className="countries-header">

        {/* SUBTITLE */}

        <div className="countries-subtitle">

          <span className="countries-subtitle-line"></span>

          <span>
            COUNTRIES WE OFFER
          </span>

          <span className="countries-subtitle-line"></span>

        </div>


        {/* TITLE */}

        <h2 className="countries-title">

          Immigration & Visa Services

          <br />

          Across{" "}

          <span>
            Global Destinations
          </span>

        </h2>


        {/* DECORATION */}

        <div className="countries-title-decoration">

          <span></span>

          <span></span>

          <span></span>

        </div>


        {/* DESCRIPTION */}

        <p className="countries-description">

          Explore the destinations where we provide
          professional immigration, visa assistance,
          study abroad, and international travel
          solutions.

        </p>

      </div>


      {/* =================================================
          COUNTRY GRID
          ================================================= */}

      <div className="countries-grid">

        {countries.length > 0 ? (

          countries.map((country) => (

            <article
              className="country-card"
              key={country._id}
            >

              {/* IMAGE */}

              <div className="country-image-wrapper">

                <div
                  className="country-image"
                  style={{
                    backgroundImage: `url(${getImageUrl(
                      country.logoUrl
                    )})`,
                  }}
                ></div>

                {/* OVERLAY */}

                <div className="country-overlay"></div>


                {/* COUNTRY ICON */}

                <div className="country-icon">
                  ✈
                </div>


                {/* COUNTRY CONTENT */}

                <div className="country-card-content">

                  <span className="country-label">
                    Visa Destination
                  </span>

                  <h3 className="country-name">

                    {country.countryName}

                    {country.placeName && (
                      <>
                        <span className="country-separator">
                          —
                        </span>

                        {country.placeName}
                      </>
                    )}

                  </h3>

                  <div className="country-card-line">
                    <span></span>
                  </div>

                </div>


                {/* ARROW */}

                <div className="country-arrow">
                  →
                </div>

              </div>

            </article>

          ))

        ) : (

          /* =================================================
             EMPTY STATE
             ================================================= */

          <div className="countries-empty">

            <div className="countries-empty-icon">
              🌍
            </div>

            <h3>
              No Countries Available
            </h3>

            <p>
              Country information will appear here
              once destinations are added.
            </p>

          </div>

        )}

      </div>


      {/* =================================================
          BOTTOM INFORMATION
          ================================================= */}

      {countries.length > 0 && (
        <div className="countries-bottom">

          <div className="countries-bottom-icon">
            ✓
          </div>

          <div className="countries-bottom-content">

            <strong>
              Your International Journey Starts Here
            </strong>

            <span>
              Get expert guidance for your preferred
              destination.
            </span>

          </div>

        </div>
      )}

    </section>
  );
};

export default CountriesSection;