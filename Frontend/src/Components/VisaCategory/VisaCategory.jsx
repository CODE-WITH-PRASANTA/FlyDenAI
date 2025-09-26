import React from "react";
import "./VisaCategory.css";
import visa1 from "../../assets/visacategory1.webp";
import visa2 from "../../assets/visacategory2.webp";
import visa3 from "../../assets/visacategory3.webp"

const visaCategories = [
  {
    id: 1,
    title: "Job Visa",
    description:
      "Visa that grants the holder authorization to accept work employment in a foreign country...",
    image: visa1,
    color: "job",
  },
  {
    id: 2,
    title: "Business Visa",
    description:
      "For entrepreneurs and business professionals looking to expand globally.",
    image: visa2,
    color: "business",
  },
  {
    id: 3,
    title: "Diplomatic Visa",
    description:
      "For government officials and diplomats traveling abroad on official business.",
    image:visa3,
    color: "diplomatic",
  },
];

function VisaCategory() {
  return (
    <div className="visa-category-container">
      <div className="visa-category-header">
        <h1>
          We provide experts great{" "}
          <span className="highlight">Visa Categories</span>
        </h1>
      </div>

      <div className="visa-category-cards">
        {visaCategories.map((category) => (
          <div
            key={category.id}
            className={`visa-category-card ${category.color}`}
          >
            <div className="visa-image-wrapper">
              <img src={category.image} alt={category.title} />
            </div>
            <div className="visa-category-card-content">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <button className="explore-more-btn">Explore More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisaCategory;
