import React from "react";
import "./CountriesSection.css";

import c1 from "../../assets/01.webp";
import c2 from "../../assets/02.webp";
import c3 from "../../assets/03.webp";
import c4 from "../../assets/04.webp";
import c5 from "../../assets/05.webp";
import c6 from "../../assets/06.webp";
import c7 from "../../assets/07.webp";
import c8 from "../../assets/08.webp";




const countries = [
  { name: "France", image: c1 },
  { name: "England", image: c2 },
  { name: "New Zealand", image: c3 },
  { name: "Italy", image: c4 },
  { name: "Russia", image: c5 },
  { name: "India", image: c6 },
  { name: "United Kingdom", image: c7 },
  { name: "Australia", image: c8 },
];

const CountriesSection = () => {
  return (
    <section className="countries-section">
      <p className="countries-subtitle">COUNTRIES WE OFFER</p>
      <h2 className="countries-title">
        Immigration & visa services following <span>Countries</span>
      </h2>
      <div className="countries-grid">
        {countries.map((country, index) => (
          <div className="country-card" key={index}>
            <div
              className="country-image"
              style={{ backgroundImage: `url(${country.image})` }}
            ></div>
            <h3 className="country-name">{country.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountriesSection;
