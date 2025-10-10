import React, { useState } from "react";
import "./VisitUsSection.css";

const VisitUsSection = () => {
  const [activeTab, setActiveTab] = useState("Asia");

  const continents = ["Asia", "Europe", "North America", "South America", "Australia", "Africa", "Gulf"];

  const data = {
    Asia: [
      { title: "CENTRAL ASIA", countries: ["Tajikistan", "Uzbekistan", "Kazakhstan", "Turkmenistan", "Kyrgyzstan"] },
      { title: "EAST ASIA", countries: ["China", "North Korea", "South Korea", "Japan", "Hong Kong", "Taiwan"] },
      { title: "SOUTH ASIA", countries: ["Sri Lanka", "Bangladesh", "Afghanistan", "Pakistan", "Bhutan", "Nepal", "The Maldives"] },
      { title: "SOUTHEAST ASIA", countries: ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Timor Lester", "Vietnam", "Christmas Island", "Cocos Islands"] },
      { title: "WESTERN ASIA", countries: ["Georgia", "Armenia", "Azerbaijan", "Turkey", "Cyprus"] },
    ],
    Europe: [
      { title: "WESTERN EUROPE", countries: ["France", "Germany", "Belgium", "Netherlands", "Luxembourg", "Monaco"] },
      { title: "EASTERN EUROPE", countries: ["Poland", "Czech Republic", "Slovakia", "Hungary", "Ukraine", "Romania", "Bulgaria"] },
      { title: "NORTHERN EUROPE", countries: ["Denmark", "Sweden", "Norway", "Finland", "Iceland", "Estonia", "Latvia", "Lithuania"] },
      { title: "SOUTHERN EUROPE", countries: ["Italy", "Spain", "Portugal", "Greece", "Croatia", "Slovenia", "Malta", "Cyprus"] },
    ],
    "North America": [
      { title: "NORTH AMERICA", countries: ["USA", "Canada", "Mexico", "Greenland", "Bermuda"] },
    ],
    "South America": [
      { title: "SOUTH AMERICA", countries: ["Brazil", "Argentina", "Chile", "Peru", "Colombia", "Venezuela", "Ecuador", "Bolivia"] },
    ],
    Australia: [
      { title: "AUSTRALIA & OCEANIA", countries: ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Samoa", "Tonga"] },
    ],
    Africa: [
      { title: "NORTH AFRICA", countries: ["Egypt", "Morocco", "Tunisia", "Algeria", "Libya"] },
      { title: "SUB-SAHARAN AFRICA", countries: ["South Africa", "Kenya", "Nigeria", "Ghana", "Uganda"] },
    ],
    Gulf: [
      { title: "GULF COUNTRIES", countries: ["United Arab Emirates", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman"] },
    ],
  };

  return (
    <section className="visitussection-section">
      <div className="visitussection-header">
        <h2>Visit Us</h2>
      </div>

      {/* LOCATION CARDS */}
      <div className="visitussection-cards">
        <div className="visitussection-card">
          <h3>Mumbai</h3>
          <p>
            Akbartravels.com, <br />
            1st floor, 62, Janjikar Street, <br />
            Near Crawford Market, <br />
            Mumbai - 400 003 Maharashtra.
          </p>
          <a href="#" className="visitussection-maplink">View on google maps</a>
        </div>

        <div className="visitussection-card">
          <h3>Delhi</h3>
          <p>
            Akbartravels.com, <br />
            Plot No-17, 1st Floor, Pusa Road, <br />
            Opposite City Hospital, <br />
            Metro Pillar No 93-94, Karol Bagh, <br />
            New Delhi - 110005.
          </p>
          <a href="#" className="visitussection-maplink">View on google maps</a>
        </div>

        <div className="visitussection-card">
          <h3>Chennai</h3>
          <p>
            Akbartravels.com, <br />
            142, 1st Floor, Continental Chambers, <br />
            Nungambakkam High Road, <br />
            Nungambakkam, <br />
            Chennai - 600 034. Tamil Nadu.
          </p>
          <a href="#" className="visitussection-maplink">View on google maps</a>
        </div>
      </div>

      {/* CONTINENT TABS */}
      <div className="visitussection-tabs">
        {continents.map((continent) => (
          <button
            key={continent}
            className={continent === activeTab ? "visitussection-tab active" : "visitussection-tab"}
            onClick={() => setActiveTab(continent)}
          >
            {continent}
          </button>
        ))}
      </div>

      {/* REGION LIST */}
      <div className="visitussection-regionlist">
        {data[activeTab]?.map((region) => (
          <div key={region.title} className="visitussection-region">
            <h4>{region.title}</h4>
            <p>{region.countries.join("  |  ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisitUsSection;
