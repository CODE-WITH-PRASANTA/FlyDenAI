import React, { useEffect, useState } from "react";
import "./Dummyticketpricing.css";

import pricingBg from "../../assets/jf-img.webp";
import flightImg from "../../assets/kf-img.webp";
import hotelImg from "../../assets/lf-img.webp";
import insuranceImg from "../../assets/mf-img.webp";

import BASE_URL from "../../Api";

const Dummyticketpricing = () => {
  const [ticketPrice, setTicketPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH PRICE FROM BACKEND
  // ============================================================

  const fetchPrice = async () => {
    try {
      const response = await fetch(`${BASE_URL}/price`);
      const data = await response.json();

      if (data.success && data.data?.ticketPrice) {
        setTicketPrice(data.data.ticketPrice);
      } else {
        setTicketPrice("499");
      }
    } catch (error) {
      console.error("Error fetching Flyixo pricing:", error);
      setTicketPrice("499");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  // ============================================================
  // PRICING PLANS
  // ============================================================

  const plans = [
    {
      id: 1,
      title: "Flight Reservation for Visa (Dummy Ticket)",
      img: flightImg,
      price: ticketPrice ? `₹${ticketPrice}` : "₹499",
      subLabel: "Visa-Ready Flight Itinerary",
      extraLabel: "",
      features: [
        "Instant Dummy Ticket / Flight Reservation approved for all Visa Embassies.",
        "Fast Delivery within 10–30 minutes by Flyixo Travel Experts.",
        "Free Rescheduling — Update Date or Time Anytime.",
        "Available for One-way, Round-trip & Multi-City Visa Requirements.",
        "Perfect for Schengen Visa, USA Visa, Canada Visa, UK Visa & more.",
      ],
    },
    {
      id: 2,
      title: "Hotel Reservation for Visa (Embassy Approved)",
      img: hotelImg,
      price: ticketPrice ? `₹${ticketPrice}` : "₹499",
      subLabel: "Visa Hotel Booking Confirmation",
      extraLabel: "",
      features: [
        "Genuine Embassy-Accepted Hotel Reservation for Visa Interview.",
        "Same-Day Delivery within 10–30 minutes by Flyixo.",
        "Unlimited Free Modifications Anytime.",
        "Hotel Booking for Single & Multi-City Travel Plans.",
        "Ideal for Schengen Visa, Dubai Visa, Singapore Visa & International Travel.",
      ],
    },
    {
      id: 3,
      title: "Travel Insurance for Visa (Embassy Accepted)",
      img: insuranceImg,
      price: "After Deciding",
      subLabel: "Price Depends on Coverage Duration",
      extraLabel: "Fully Customizable",
      features: [
        "Visa-Compliant Travel Insurance accepted by all Embassies worldwide.",
        "Pricing varies based on Country, Travel Duration & Insurance Coverage.",
        "Flyixo provides expert assistance for the best insurance plan.",
        "Covers Medical Emergencies, Accidents, Trip Delay & more.",
        "Perfect for Schengen Visa, Europe Travel, USA Travel & International Trips.",
      ],
    },
  ];

  // ============================================================
  // SCROLL TO TOP
  // ============================================================

  const scrollToTop = () => {
    const scrollTarget =
      document.documentElement || document.body;

    scrollTarget.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // JSX
  // ============================================================

  return (
    <section
      className="flyixo-pricing"
      style={{
        backgroundImage: `url(${pricingBg})`,
      }}
    >
      {/* ======================================================
          BACKGROUND DECORATIONS
      ======================================================= */}

      <div className="flyixo-pricing__overlay"></div>

      <div className="flyixo-pricing__orb flyixo-pricing__orb--one"></div>
      <div className="flyixo-pricing__orb flyixo-pricing__orb--two"></div>
      <div className="flyixo-pricing__orb flyixo-pricing__orb--three"></div>

      <div className="flyixo-pricing__grid-bg"></div>

      <div className="flyixo-pricing__container">

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="flyixo-pricing__header">

          <div className="flyixo-pricing__badge">
            <span className="flyixo-pricing__badge-dot"></span>
            FLYIXO VISA DOCUMENT SERVICES
          </div>

          <h2 className="flyixo-pricing__heading">
            Flyixo Visa Services –{" "}
            <span>Pricing & Document Plans</span>
          </h2>

          <p className="flyixo-pricing__subheading">
            Visa-Friendly
            <b> • </b>
            Embassy Ready
            <b> • </b>
            Fast & Reliable Flyixo Services
          </p>

          <div className="flyixo-pricing__heading-line">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* ====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="flyixo-pricing__loading">

            <div className="flyixo-pricing__spinner"></div>

            <p>
              Loading Flyixo Pricing...
            </p>

          </div>
        )}

        {/* ====================================================
            PRICING GRID
        ===================================================== */}

        {!loading && (
          <div className="flyixo-pricing__grid">

            {plans.map((plan, index) => (
              <article
                className={`flyixo-plan-card flyixo-plan-card--${index + 1}`}
                key={plan.id}
              >

                {/* Card Number */}
                <div className="flyixo-plan-card__number">
                  {String(plan.id).padStart(2, "0")}
                </div>

                {/* Popular Label */}
                {plan.id === 1 && (
                  <div className="flyixo-plan-card__recommended">
                    MOST POPULAR
                  </div>
                )}

                {/* Top Accent */}
                <div className="flyixo-plan-card__accent"></div>

                {/* ==================================================
                    TITLE
                =================================================== */}

                <h3 className="flyixo-plan-card__title">
                  {plan.title}
                </h3>

                {/* ==================================================
                    IMAGE
                =================================================== */}

                <div className="flyixo-plan-card__image-wrap">

                  <div className="flyixo-plan-card__image-glow"></div>

                  <img
                    src={plan.img}
                    alt={plan.title}
                    className="flyixo-plan-card__image"
                  />

                </div>

                {/* ==================================================
                    PRICE
                =================================================== */}

                <div className="flyixo-plan-card__price-block">

                  <span className="flyixo-plan-card__price">
                    {plan.price}
                  </span>

                  <span className="flyixo-plan-card__per">
                    {plan.subLabel}
                  </span>

                  {plan.extraLabel && (
                    <span className="flyixo-plan-card__extra">
                      ✓ {plan.extraLabel}
                    </span>
                  )}

                </div>

                {/* Divider */}
                <div className="flyixo-plan-card__divider">
                  <span></span>
                </div>

                {/* ==================================================
                    FEATURES
                =================================================== */}

                <ul className="flyixo-plan-card__features">

                  {plan.features.map((feature, idx) => (
                    <li
                      className="flyixo-plan-card__feature"
                      key={idx}
                    >

                      <span className="flyixo-plan-card__check">
                        ✓
                      </span>

                      <span className="flyixo-plan-card__feature-text">
                        {feature}
                      </span>

                    </li>
                  ))}

                </ul>

                {/* ==================================================
                    BUTTON
                =================================================== */}

                <button
                  type="button"
                  className="flyixo-plan-card__btn"
                  onClick={scrollToTop}
                >
                  <span>Get Started</span>
                  <span className="flyixo-plan-card__btn-arrow">
                    →
                  </span>
                </button>

                {/* Card Footer */}
                <div className="flyixo-plan-card__footer">
                  <span>SECURE</span>
                  <i></i>
                  <span>RELIABLE</span>
                  <i></i>
                  <span>FLYIXO</span>
                </div>

                {/* Decorative Corner */}
                <span className="flyixo-plan-card__corner"></span>

              </article>
            ))}

          </div>
        )}

        {/* ====================================================
            BOTTOM TRUST
        ===================================================== */}

        {!loading && (
          <div className="flyixo-pricing__bottom">

            <span className="flyixo-pricing__bottom-line"></span>

            <div className="flyixo-pricing__bottom-content">

              <span className="flyixo-pricing__bottom-check">
                ✓
              </span>

              <p>
                Transparent Pricing
                <strong> • </strong>
                Fast Processing
                <strong> • </strong>
                Professional Support
                <strong> • </strong>
                <span>Flyixo</span>
              </p>

            </div>

            <span className="flyixo-pricing__bottom-line"></span>

          </div>
        )}

      </div>
    </section>
  );
};

export default Dummyticketpricing;