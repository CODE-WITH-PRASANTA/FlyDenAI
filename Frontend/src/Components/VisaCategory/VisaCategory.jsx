import React from "react";
import "./VisaCategory.css";

// Import your assets
import visa1 from "../../assets/visacategory1.webp";
import visa2 from "../../assets/visacategory2.webp";
import visa3 from "../../assets/visacategory3.webp";
import visa4 from "../../assets/visacategory2.webp";
import visa5 from "../../assets/visacategory2.webp";
import visa6 from "../../assets/visacategory2.webp";
import visa7 from "../../assets/visacategory2.webp";
import visa8 from "../../assets/visacategory2.webp";

const visaCategories = [
  {
    id: 1,
    title: "Job Visa",
    description:
      "Visa that grants the holder authorization to accept work employment in a foreign country.",
    image: visa1,
    color: "job-visa",
  },
  {
    id: 2,
    title: "Business Visa",
    description:
      "For entrepreneurs and business professionals looking to expand globally.",
    image: visa2,
    color: "business-visa",
  },
  {
    id: 3,
    title: "Diplomatic Visa",
    description:
      "For government officials and diplomats traveling abroad on official business.",
    image: visa3,
    color: "diplomatic-visa",
  },
  {
    id: 4,
    title: "Tourist Visa",
    description:
      "For individuals who wish to explore, travel, or spend leisure time in another country.",
    image: visa4,
    color: "tourist-visa",
  },
  {
    id: 5,
    title: "Student Visa",
    description:
      "For students pursuing academic programs or professional courses abroad.",
    image: visa5,
    color: "student-visa",
  },
  {
    id: 6,
    title: "Transit Visa",
    description:
      "Short-term visa for travelers passing through a country en route to their final destination.",
    image: visa6,
    color: "transit-visa",
  },
  {
    id: 7,
    title: "Immigrant Visa",
    description:
      "For individuals who wish to permanently settle in a foreign country.",
    image: visa7,
    color: "immigrant-visa",
  },
  {
    id: 8,
    title: "Medical Visa",
    description:
      "For patients traveling abroad to receive specialized healthcare and treatment.",
    image: visa8,
    color: "medical-visa",
  },
];

function VisaCategory() {
  return (
    <div className="visa-category-container">
      {/* Header Section */}
      <div className="visa-category-header">
        <h1>
          We provide experts great{" "}
          <span className="highlight">Visa Categories</span>
        </h1>
      </div>

      {/* Cards Section */}
      <div className="visa-category-cards">
        {visaCategories.map((category) => (
          <div
            key={category.id}
            className={`visa-category-card ${category.color}`}
          >
            <div className="visa-image-wrapper">
              <img
                src={category.image}
                alt={category.title}
                className="visa-image"
              />
            </div>
            <div className="visa-category-card-content">
              <h2 className="visa-title">{category.title}</h2>
              <p className="visa-description">{category.description}</p>
              <button className="explore-more-btn">Explore More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisaCategory;
