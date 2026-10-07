import React, { useState } from "react";
import "./TopUniversitiesStudyAbroad.css";

// University Logos
import ul1 from "../../assets/ul1.webp";
import ul2 from "../../assets/ul2.webp";
import ul3 from "../../assets/ul3.webp";
import ul4 from "../../assets/ul4.webp";
import ul5 from "../../assets/ul5.webp";
import ul6 from "../../assets/ul6.webp";

// Flag Images
import ukFlag from "../../assets/ukFlag.webp";
import usaFlag from "../../assets/usaFlag.webp";
import germanyFlag from "../../assets/germanyFlag.webp";
import canadaFlag from "../../assets/canadaFlag.webp";
import dubaiFlag from "../../assets/dubaiFlag.webp";

const countries = [
  {
    name: "United Kingdom",
    flag: ukFlag,
  },
  {
    name: "USA",
    flag: usaFlag,
  },
  {
    name: "Germany",
    flag: germanyFlag,
  },
  {
    name: "Canada",
    flag: canadaFlag,
  },
  {
    name: "Dubai",
    flag: dubaiFlag,
  },
];

const universitiesData = {
  "United Kingdom": [
    {
      logo: ul1,
      name: "University of Birmingham",
      location: "Birmingham, UK",
      courses: "497+ Courses",
    },
    {
      logo: ul2,
      name: "Queen Mary University",
      location: "London, UK",
      courses: "519+ Courses",
    },
    {
      logo: ul3,
      name: "University of Essex",
      location: "Colchester, UK",
      courses: "450+ Courses",
    },
    {
      logo: ul4,
      name: "Coventry University",
      location: "Coventry, UK",
      courses: "503+ Courses",
    },
    {
      logo: ul5,
      name: "Nottingham Trent University",
      location: "Nottingham, UK",
      courses: "335+ Courses",
    },
    {
      logo: ul6,
      name: "University of East London",
      location: "London, UK",
      courses: "373+ Courses",
    },
  ],

  USA: [
    {
      logo: ul1,
      name: "Harvard University",
      location: "Cambridge, USA",
      courses: "650+ Courses",
    },
    {
      logo: ul2,
      name: "Stanford University",
      location: "California, USA",
      courses: "700+ Courses",
    },
    {
      logo: ul3,
      name: "MIT",
      location: "Massachusetts, USA",
      courses: "600+ Courses",
    },
    {
      logo: ul1,
      name: "Columbia University",
      location: "New York, USA",
      courses: "580+ Courses",
    },
    {
      logo: ul2,
      name: "Yale University",
      location: "Connecticut, USA",
      courses: "540+ Courses",
    },
    {
      logo: ul3,
      name: "University of Chicago",
      location: "Chicago, USA",
      courses: "520+ Courses",
    },
  ],

  Germany: [
    {
      logo: ul1,
      name: "TU Munich",
      location: "Munich, Germany",
      courses: "400+ Courses",
    },
    {
      logo: ul2,
      name: "Humboldt University",
      location: "Berlin, Germany",
      courses: "350+ Courses",
    },
    {
      logo: ul4,
      name: "RWTH Aachen",
      location: "Aachen, Germany",
      courses: "390+ Courses",
    },
    {
      logo: ul5,
      name: "University of Stuttgart",
      location: "Stuttgart, Germany",
      courses: "410+ Courses",
    },
    {
      logo: ul6,
      name: "Heidelberg University",
      location: "Heidelberg, Germany",
      courses: "430+ Courses",
    },
    {
      logo: ul1,
      name: "Free University of Berlin",
      location: "Berlin, Germany",
      courses: "370+ Courses",
    },
  ],

  Canada: [
    {
      logo: ul1,
      name: "University of Toronto",
      location: "Toronto, Canada",
      courses: "480+ Courses",
    },
    {
      logo: ul2,
      name: "UBC",
      location: "Vancouver, Canada",
      courses: "460+ Courses",
    },
    {
      logo: ul2,
      name: "McGill University",
      location: "Montreal, Canada",
      courses: "440+ Courses",
    },
    {
      logo: ul3,
      name: "University of Alberta",
      location: "Edmonton, Canada",
      courses: "410+ Courses",
    },
    {
      logo: ul4,
      name: "University of Ottawa",
      location: "Ottawa, Canada",
      courses: "430+ Courses",
    },
    {
      logo: ul5,
      name: "Simon Fraser University",
      location: "Burnaby, Canada",
      courses: "400+ Courses",
    },
  ],

  Dubai: [
    {
      logo: ul1,
      name: "University of Dubai",
      location: "Dubai, UAE",
      courses: "300+ Courses",
    },
    {
      logo: ul1,
      name: "AUD",
      location: "Dubai, UAE",
      courses: "320+ Courses",
    },
    {
      logo: ul2,
      name: "Heriot-Watt University",
      location: "Dubai Campus",
      courses: "280+ Courses",
    },
    {
      logo: ul3,
      name: "Middlesex University",
      location: "Dubai, UAE",
      courses: "290+ Courses",
    },
    {
      logo: ul4,
      name: "Murdoch University",
      location: "Dubai, UAE",
      courses: "310+ Courses",
    },
    {
      logo: ul5,
      name: "Manipal Academy",
      location: "Dubai, UAE",
      courses: "295+ Courses",
    },
  ],
};

const TopUniversitiesStudyAbroad = () => {
  const [selectedCountry, setSelectedCountry] =
    useState("United Kingdom");

  const selectedUniversities =
    universitiesData[selectedCountry] || [];

  return (
    <section className="flyixo-universities-section">

      {/* Background Decorations */}
      <div className="flyixo-universities-bg flyixo-universities-bg-one"></div>

      <div className="flyixo-universities-bg flyixo-universities-bg-two"></div>

      <div className="flyixo-universities-grid-pattern"></div>

      <div className="flyixo-universities-container">

        {/* Header */}
        <div className="flyixo-universities-header">

          <div className="flyixo-universities-eyebrow">
            <span className="flyixo-universities-line"></span>

            <span>FLYIXO STUDY ABROAD</span>

            <span className="flyixo-universities-line"></span>
          </div>

          <h2 className="flyixo-universities-heading">
            Top Universities to{" "}
            <span>Study Abroad</span>
          </h2>

          <p className="flyixo-universities-description">
            Explore leading universities and discover study
            opportunities across some of the world's most popular
            education destinations with Flyixo.
          </p>

        </div>

        {/* Country Navigation */}
        <div className="flyixo-countries-wrapper">

          <div
            className="flyixo-countries-nav"
            role="tablist"
            aria-label="Study abroad destinations"
          >

            {countries.map((country) => (
              <button
                key={country.name}
                type="button"
                role="tab"
                aria-selected={
                  selectedCountry === country.name
                }
                className={`flyixo-country-btn ${
                  selectedCountry === country.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCountry(country.name)
                }
              >

                <span className="flyixo-country-flag-wrapper">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="flyixo-flag-icon"
                  />
                </span>

                <span className="flyixo-country-name">
                  {country.name}
                </span>

                <span className="flyixo-country-arrow">
                  →
                </span>

              </button>
            ))}

          </div>

        </div>

        {/* Selected Country Label */}
        <div className="flyixo-selected-country">

          <div className="flyixo-selected-country-dot"></div>

          <span>
            Universities in
          </span>

          <strong>
            {selectedCountry}
          </strong>

          <span className="flyixo-selected-count">
            {selectedUniversities.length} Universities
          </span>

        </div>

        {/* Universities */}
        <div
          className="flyixo-universities-grid"
          key={selectedCountry}
        >

          {selectedUniversities.map((uni, idx) => (
            <article
              key={`${selectedCountry}-${idx}`}
              className="flyixo-university-card"
            >

              {/* Card Number */}
              <span className="flyixo-university-number">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Top Accent */}
              <span className="flyixo-university-accent"></span>

              {/* Logo */}
              <div className="flyixo-university-logo-wrapper">

                <div className="flyixo-university-logo-glow"></div>

                <div className="flyixo-university-logo-box">

                  <img
                    src={uni.logo}
                    alt={`${uni.name} logo`}
                    className="flyixo-university-logo"
                  />

                </div>

              </div>

              {/* Information */}
              <div className="flyixo-university-info">

                <h3>
                  {uni.name}
                </h3>

                <p className="flyixo-university-location">
                  <span className="flyixo-location-icon">
                    ●
                  </span>

                  {uni.location}
                </p>

              </div>

              {/* Course Badge */}
              <div className="flyixo-courses-tag">
                <span className="flyixo-courses-icon">
                  ✦
                </span>

                <span>
                  {uni.courses}
                </span>
              </div>

              {/* Bottom */}
              <div className="flyixo-university-footer">

                <span>
                  Study With Flyixo
                </span>

                <span className="flyixo-university-arrow">
                  →
                </span>

              </div>

              {/* Decorative Corner */}
              <span className="flyixo-university-corner"></span>

            </article>
          ))}

        </div>

        {/* Bottom Trust */}
        <div className="flyixo-universities-bottom">

          <span className="flyixo-bottom-line"></span>

          <p>
            Your global education journey starts with{" "}
            <strong>Flyixo.</strong>
          </p>

          <span className="flyixo-bottom-line"></span>

        </div>

      </div>
    </section>
  );
};

export default TopUniversitiesStudyAbroad;