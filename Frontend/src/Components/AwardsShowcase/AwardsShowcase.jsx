import React from "react";
import logo2024 from "../../assets/logo1.webp";
import logo2023 from "../../assets/logo2.webp";
import logoCommunity2023 from "../../assets/logo3.webp";
import logo2022a from "../../assets/logo4.webp";
import logo2022b from "../../assets/logo5.webp";
import logoCommunity2022 from "../../assets/logo6.webp";

import "./AwardsShowcase.css";

const awards = [
  {
    img: logo2024,
    year: "2024",
    text: "WINNER",
    alt: "2024 Top Rated Provider Intern Abroad",
  },
  {
    img: logo2023,
    year: "2023",
    text: "WINNER",
    alt: "2023 Top Rated Provider Intern Abroad",
  },
  {
    img: logoCommunity2023,
    year: "2023",
    text: "WINNER",
    alt: "2023 Community Choice Awards Intern Provider",
  },
  {
    img: logo2022a,
    year: "2022",
    text: "WINNER",
    alt: "2022 Top Rated Organization Internships Abroad",
  },
  {
    img: logo2022b,
    year: "2022",
    text: "WINNER",
    alt: "2022 Top Online Program Internships Abroad",
  },
  {
    img: logoCommunity2022,
    year: "2022",
    text: "WINNER",
    alt: "2022 Community Choice Awards Intern Provider",
  },
];

const AwardsShowcase = () => {
  return (
    <section className="awards-container">
      {awards.map(({ img, year, text, alt }, index) => (
        <div key={index} className="award-item">
          <img src={img} alt={alt} className="award-image" />
          <div className="award-text">
            <span className="award-year">{year}</span>
            <span className="award-winner">{text}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AwardsShowcase;
