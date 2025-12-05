import React from "react";
import "./Dummyticketvisa.css";

// background image
const bgImageUrl = "../../assets/af-img.webp";

// step images
import searchImg from "../../assets/cf-img.webp";
import selectImg from "../../assets/df-img.webp";
import confirmImg from "../../assets/ef-img.webp";
import downloadImg from "../../assets/ff-img.webp";

const steps = [
  {
    id: 1,
    img: searchImg,
    title: ["SEARCH FOR", "FLIGHT / HOTEL"],
    description:
      "Enter your travel details and let FlyDenAi instantly fetch the best dummy flight or hotel options for visa purposes.",
  },
  {
    id: 2,
    img: selectImg,
    title: ["CHOOSE YOUR", "ITINERARY"],
    description:
      "Review flight or hotel options and pick the travel itinerary that best fits your visa requirements.",
  },
  {
    id: 3,
    img: confirmImg,
    title: ["CONFIRM YOUR", "BOOKING"],
    description:
      "Fill in basic traveler information and proceed with secure payment to generate your visa-ready booking document.",
  },
  {
    id: 4,
    img: downloadImg,
    title: ["DOWNLOAD YOUR", "VISA DOCUMENT"],
    description:
      "Your dummy flight ticket or hotel booking PDF will be instantly ready to download and submit to the embassy.",
  },
];

const Dummyticketvisa = () => {
  return (
    <section
      className="visa-bg"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className="visa-container">

        <h2 className="visa-heading">
          With <span className="brand">FlyDenAi</span>, getting a dummy flight or hotel booking 
          for your visa is <span className="highlight">EASIER than ever!</span>
        </h2>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.id}>
              <img src={step.img} alt={step.title[1]} className="step-img" />

              <h3 className="step-title">
                <span>{step.title[0]}</span>
                <span>{step.title[1]}</span>
              </h3>

              <div className="divider" />

              <p className="step-text">{step.description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Dummyticketvisa;
