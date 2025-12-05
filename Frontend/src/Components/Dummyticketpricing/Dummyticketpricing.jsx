// PricingPlans.jsx
import React, { useEffect, useState } from "react";
import "./Dummyticketpricing.css";

import pricingBg from "../../assets/jf-img.webp";
import flightImg from "../../assets/kf-img.webp";
import hotelImg from "../../assets/lf-img.webp";
import insuranceImg from "../../assets/mf-img.webp";

import BASE_URL from "../../Api"; // example: http://localhost:6003/api

const Dummyticketpricing = () => {
  const [ticketPrice, setTicketPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch price from backend
  const fetchPrice = async () => {
    try {
      const response = await fetch(`${BASE_URL}/price`);
      const data = await response.json();

      if (data.success && data.data.ticketPrice) {
        setTicketPrice(data.data.ticketPrice);
      } else {
        setTicketPrice("499"); // fallback price
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      setTicketPrice("499"); // fallback price
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  // Static plan content (except price)
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
        "Fast Delivery within 10–30 minutes by FlyDenAI Travel Experts.",
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
        "Same-Day Delivery within 10–30 minutes by FlyDenAI.",
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
        "FlyDenAI provides expert assistance for the best insurance plan.",
        "Covers Medical Emergencies, Accidents, Trip Delay & more.",
        "Perfect for Schengen Visa, Europe Travel, USA Travel & International Trips.",
      ],
    },
  ];

  // Smooth scroll to top
  const scrollToTop = () => {
    const scrollTarget =
      window.document.documentElement || window.document.body;
    scrollTarget.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="pricing"
      style={{ backgroundImage: `url(${pricingBg})` }}
    >
      <div className="pricing__container">
        <h2 className="pricing__heading">
          FlyDenAI Visa Services – Pricing & Document Plans
        </h2>

        <p className="pricing__subheading">
          Visa-Friendly • Embassy Approved • Fast & Reliable FlyDenAI Services
        </p>

        {loading && (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            Loading Pricing...
          </p>
        )}

        <div className="pricing__grid">
          {!loading &&
            plans.map((plan) => (
              <article className="plan-card" key={plan.id}>
                <h3 className="plan-card__title">{plan.title}</h3>

                <div className="plan-card__image-wrap">
                  <img
                    src={plan.img}
                    alt={plan.title}
                    className="plan-card__image"
                  />
                </div>

                <div className="plan-card__price-block">
                  <span className="plan-card__price">{plan.price}</span>
                  <span className="plan-card__per">{plan.subLabel}</span>

                  {plan.extraLabel && (
                    <span className="plan-card__extra">{plan.extraLabel}</span>
                  )}
                </div>

                <div className="plan-card__divider" />

                <ul className="plan-card__features">
                  {plan.features.map((feature, idx) => (
                    <li className="plan-card__feature" key={idx}>
                      {feature}
                      {idx !== plan.features.length - 1 && (
                        <div className="plan-card__inner-divider" />
                      )}
                    </li>
                  ))}
                </ul>

                <button className="plan-card__btn" onClick={scrollToTop}>
                  Get Started
                </button>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Dummyticketpricing;
