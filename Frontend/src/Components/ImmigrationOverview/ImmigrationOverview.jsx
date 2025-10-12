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
    description: 'We denounce righteous indignation beguiled demoralized',
  },
  {
    name: 'Germany',
    flag: 'https://flagcdn.com/w40/de.png',
    description: 'We denounce righteous indignation beguiled demoralized',
  },
  {
    name: 'Dubai',
    flag: 'https://flagcdn.com/w40/ae.png',
    description: 'We denounce righteous indignation beguiled demoralized',
  },
  {
    name: 'USA',
    flag: 'https://flagcdn.com/w40/us.png',
    description: 'We denounce righteous indignation beguiled demoralized',
  },
];

const ImmigrationOverview = () => {
  return (
    <section className="immigration-section">

      {/* Top Statistics */}
      <div className="stats-bar">
        {stats.map((item, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">{item.icon}</div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Country Selection */}
      <div className="country-section">
        <p className="country-subtitle">Choose Country</p>
        <h2 className="country-heading">Immigration Choose Your Country</h2>

        <div className="country-grid">
          {countries.map((country, index) => (
            <div key={index} className="country-card">
              <div className="card-header">
                <div className="country-info">
                  <img src={country.flag} alt={country.name} className="flag-icon" />
                  <span className="country-name">{country.name}</span>
                </div>
                <div className="card-arrow">➜</div>
              </div>
              <p className="country-description">{country.description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ImmigrationOverview;
