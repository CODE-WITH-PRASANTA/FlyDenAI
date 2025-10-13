import React from "react";
import "./VisaCategory.css";

// 🖼️ Import assets properly (replace with correct images if available)
import jobVisa from "../../assets/visacategory1.webp";
import businessVisa from "../../assets/visacategory1.webp";
import diplomaticVisa from "../../assets/visacategory1.webp";
import touristVisa from "../../assets/visacategory1.webp";
import studentVisa from "../../assets/visacategory1.webp";
import transitVisa from "../../assets/visacategory1.webp";
import immigrantVisa from "../../assets/visacategory1.webp";
import medicalVisa from "../../assets/visacategory1.webp";

const visaCategories = [
  {
    id: 1,
    title: "Job Visa",
    description:
      "Work legally abroad with the right visa. We help you secure your job permit with smooth documentation and faster processing.",
    image: jobVisa,
  },
  {
    id: 2,
    title: "Business Visa",
    description:
      "Expand your business globally with ease. Our experts guide you through every requirement for a hassle-free visa approval.",
    image: businessVisa,
  },
  {
    id: 3,
    title: "Diplomatic Visa",
    description:
      "Designed for government officials and diplomats traveling abroad for official purposes with top-level security clearance.",
    image: diplomaticVisa,
  },
  {
    id: 4,
    title: "Tourist Visa",
    description:
      "Explore dream destinations around the world with our quick and reliable tourist visa services.",
    image: touristVisa,
  },
  {
    id: 5,
    title: "Student Visa",
    description:
      "Study at top international universities. We assist with every step, from application to admission and visa approval.",
    image: studentVisa,
  },
  {
    id: 6,
    title: "Transit Visa",
    description:
      "Traveling through another country? Get your short-term transit visa quickly and continue your journey seamlessly.",
    image: transitVisa,
  },
  {
    id: 7,
    title: "Immigrant Visa",
    description:
      "Settle permanently in your dream country. We guide you through all documentation and eligibility requirements.",
    image: immigrantVisa,
  },
  {
    id: 8,
    title: "Medical Visa",
    description:
      "Get access to world-class medical care abroad. We make your travel for treatment smooth and stress-free.",
    image: medicalVisa,
  },
];

function VisaCategory() {
  return (
    <section className="visa-category-section">
      <div className="visa-category-header">
        <h2>
          Explore Our <span className="highlight">Visa Categories</span>
        </h2>
        <p>
          FlyDenAi helps you simplify your visa journey — whether you want to
          work, study, or explore abroad. Choose your category and get expert
          assistance every step of the way.
        </p>
      </div>

      <div className="visa-category-scroll">
        {visaCategories.map((category) => (
          <div key={category.id} className="visa-card">
            <img
              src={category.image}
              alt={category.title}
              className="visa-image"
            />
            <h3 className="visa-title">{category.title}</h3>
            <p className="visa-description">{category.description}</p>
            <button className="visa-btn">Learn More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VisaCategory;
