import React from 'react';
import './CountriesWeOffer.css';

function CountriesWeOffer() {
  const countries = [
    { name: 'Turkey', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/23px-Flag_of_Turkey.svg.png', time: '2-3 weeks' },
    { name: 'France', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png', time: '3-4 weeks' },
    { name: 'Australia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia.svg/23px-Flag_of_Australia.svg.png', time: '4-6 weeks' },
    { name: 'United States', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/23px-Flag_of_the_United_States.svg.png', time: '6-8 weeks' },
    { name: 'India', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png', time: '2-3 weeks' },
    { name: 'Dubai', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/23px-Flag_of_the_United_Arab_Emirates.svg.png', time: '3-4 weeks' },
  ];

  return (
    <div className="countriesweoffer">
      {/* Section Main Header */}
      <div className="countriesweoffer-main-header">Countries We Offer</div>

      {/* Section Sub Header */}
      <h2 className="countriesweoffer-header">Countries We Support For Immigration</h2>

      {/* Cards Grid */}
      <div className="countriesweoffer-grid">
        {countries.map((country, index) => (
          <div key={index} className="countriesweoffer-card">
            <div className="flag-container">
              <img src={country.flag} alt={`${country.name} flag`} />
            </div>
            <div className="countriesweoffer-info">
              <h3>{country.name}</h3>
              <p>Average time to resolve: <span>{country.time}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountriesWeOffer;
