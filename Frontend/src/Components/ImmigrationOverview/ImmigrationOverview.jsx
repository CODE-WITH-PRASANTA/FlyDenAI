import React from 'react';
import './ImmigrationOverview.css';

const stats = [
  { icon: '🧾', label: 'Visa Approval', value: '5k+' },
  { icon: '🏃‍♂️', label: 'Visa Consultation', value: '38k+' },
  { icon: '📊', label: 'Visa Categories', value: '25+' },
  { icon: '👥', label: 'Consultants', value: '80+' },
];

const countries = [
  {
    name: 'Australia',
    flag: 'https://flagcdn.com/w40/au.png',
    description: 'Your path to quality education and better opportunities.',
  },
  {
    name: 'Germany',
    flag: 'https://flagcdn.com/w40/de.png',
    description: 'Explore Europe’s best universities and work options.',
  },
  {
    name: 'Dubai',
    flag: 'https://flagcdn.com/w40/ae.png',
    description: 'Achieve your dreams with a growing business hub.',
  },
  {
    name: 'USA',
    flag: 'https://flagcdn.com/w40/us.png',
    description: 'Experience world-class education and diverse culture.',
  },
  {
    name: 'Australia',
    flag: 'https://flagcdn.com/w40/au.png',
    description: 'Your path to quality education and better opportunities.',
  },
  {
    name: 'Germany',
    flag: 'https://flagcdn.com/w40/de.png',
    description: 'Explore Europe’s best universities and work options.',
  },
  {
    name: 'Dubai',
    flag: 'https://flagcdn.com/w40/ae.png',
    description: 'Achieve your dreams with a growing business hub.',
  },
  {
    name: 'USA',
    flag: 'https://flagcdn.com/w40/us.png',
    description: 'Experience world-class education and diverse culture.',
  },
];

const ImmigrationOverview = () => {
  return (
    <section className="immigrationoverview-section">
      
      {/* === TOP STATS BAR === */}
      <div className="immigrationoverview-statsbar">
        {stats.map((item, index) => (
          <div key={index} className="immigrationoverview-statitem">
            <div className="immigrationoverview-staticon">{item.icon}</div>
            <div className="immigrationoverview-statvalue">{item.value}</div>
            <div className="immigrationoverview-statlabel">{item.label}</div>
          </div>
        ))}
      </div>

      {/* === COUNTRY SECTION === */}
      <div className="immigrationoverview-countrysection">
        <p className="immigrationoverview-subtitle">Choose Country</p>
        <h2 className="immigrationoverview-heading">
          Immigration — Choose Your Dream Destination
        </h2>

        <div className="immigrationoverview-countrygrid">
          {countries.map((country, index) => (
            <div key={index} className="immigrationoverview-countrycard">
              <div className="immigrationoverview-cardheader">
                <div className="immigrationoverview-countryinfo">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="immigrationoverview-flag"
                  />
                  <span className="immigrationoverview-countryname">
                    {country.name}
                  </span>
                </div>
                <div className="immigrationoverview-arrow">➜</div>
              </div>
              <p className="immigrationoverview-description">
                {country.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImmigrationOverview;
