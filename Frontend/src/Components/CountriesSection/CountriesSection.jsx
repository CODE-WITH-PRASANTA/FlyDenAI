import React, { useState, useEffect } from "react";
import "./CountriesSection.css";
import axios from "axios";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

const CountriesSection = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // ✅ Fix double '/uploads' issue
  const getImageUrl = (logoUrl) => {
    const base = BASE_URL.replace("/api", ""); // e.g. http://localhost:5000
    if (logoUrl.startsWith("/uploads/")) {
      return `${base}${logoUrl}`;
    } else if (logoUrl.startsWith("uploads/")) {
      return `${base}/${logoUrl}`;
    } else {
      return `${base}/uploads/${logoUrl}`;
    }
  };

  return (
    <section className="countries-section">
      <p className="countries-subtitle">COUNTRIES WE OFFER</p>
      <h2 className="countries-title">
        Immigration & visa services following <span>Countries</span>
      </h2>

      <div className="countries-grid">
        {countries.map((country) => (
          <div className="country-card" key={country._id}>
            <div
              className="country-image"
              style={{
                backgroundImage: `url(${getImageUrl(country.logoUrl)})`,
              }}
            ></div>
            <h3 className="country-name">
              {country.countryName} – {country.placeName}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountriesSection;
