import React from "react";
import "./Dummyticketvisa.css";

// ✅ Import background image
import bgImage from "../../assets/af-img.webp";

// ✅ Import step illustrations/icons
import searchImg from "../../assets/cf-img.webp";
import selectImg from "../../assets/df-img.webp";
import confirmImg from "../../assets/ef-img.webp";
import downloadImg from "../../assets/ff-img.webp";

const steps = [
  {
    id: 1,
    img: searchImg,
    title: ["SEARCH FOR", "FLIGHT/HOTEL"],
    description:
      "Provide details and run the flight or hotel search query to pull out available results.",
  },
  {
    id: 2,
    img: selectImg,
    title: ["SELECT", "FLIGHT/HOTEL"],
    description:
      "View available flight or hotel details and select the most relevant travel itinerary.",
  },
  {
    id: 3,
    img: confirmImg,
    title: ["CONFIRM YOUR", "FLIGHT/HOTEL BOOKING"],
    description:
      "Enter traveler/guest information and make the payment to confirm your booking.",
  },
  {
    id: 4,
    img: downloadImg,
    title: ["DOWNLOAD", "YOUR BOOKING"],
    description:
      "Your flight or hotel booking confirmation receipt is available for download or print.",
  },
];

const Dummyticketvisa = () => {
  return (
    <section
      className="visa-bg"
      style={{ backgroundImage: `url(${bgImage})` }} // ✅ imported background
    >
      <div className="visa-container">
        <h2 className="visa-heading">
          With <span className="brand">TripCafe</span>, getting a flight or hotel ticket
          for your visa is as <span className="highlight">EASY as 1–2–3!</span>
        </h2>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.id}>
              <img src={step.img} alt={step.title[1]} className="step-img" />

              <h3 className="step-title">
                <span>{step.title[0]}</span>
                <span>{step.title[1]}</span>
              </h3>

              <div className="divider" />

              <p className="step-text">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dummyticketvisa;
