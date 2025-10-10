// PopularDestinations.js
import React from 'react';
import './PopularDestinations.css';
import i1 from "../../assets/01.webp";
import i2 from "../../assets/02.webp";
import i3 from "../../assets/03.webp";
import i4 from "../../assets/04.webp";
import i5 from "../../assets/05.webp";
import i6 from "../../assets/06.webp";


const destinations = [
  { name: 'Dubai', continent: 'Asia', price: '₹ 2,499/-', image:i6  },
  { name: 'Malaysia', continent: 'Asia', price: '₹ 1,999/-', image: i2 },
  { name: 'Singapore', continent: 'Asia', price: '₹ 1,900/-', image: i3 },
  { name: 'Srilanka', continent: 'Asia', price: '₹ 1999/-', image: i4 },
  { name: 'Thailand', continent: 'Asia', price: '₹ 1,999/-', image: i5 },
  { name: 'Australia', continent: 'Australia', price: '₹ 9,999/-', image: i1 },
];

const PopularDestinations = () => {
  return (
    <div className="popular-destinations">
      <h2>Popular Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((destination, index) => (
          <div key={index} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <div className="price-tag">STARTING<br />{destination.price}<br />ONLY</div>
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>{destination.continent}</p>
              <p>Processing Time : 2 Days</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;