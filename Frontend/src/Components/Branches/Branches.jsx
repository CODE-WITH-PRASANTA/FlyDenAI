import React from 'react';
import './Branches.css';
import br1 from '../../assets/br1.webp';
import br2 from '../../assets/br2.webp';
import br3 from '../../assets/br3.webp';

const branches = [
  {
    name: 'New York Hospital',
    address: 'Peachtree St Atlanta, USA',
    phone: '+123 456 7890',
    email: 'supportrt@example.com',
    image: br1,
  },
  {
    name: 'Atlanta Hospital',
    address: 'Peachtree St Atlanta, USA',
    phone: '+123 456 7890',
    email: 'supportrt@example.com',
    image: br2,
  },
  {
    name: 'San Fransisco Hospital',
    address: 'Peachtree St Atlanta, USA',
    phone: '+123 456 7890',
    email: 'supportrt@example.com',
    image: br3,
  },
];

export default function Branches() {
  return (
    <div className="branches-container">
      <h1 className="branches-heading">
        20+ Across worldwide <span className="highlight">Branches</span>
      </h1>
      <div className="branches-grid">
        {branches.map((branch, index) => (
          <div className="branch-card" key={index}>
            <div className="branch-image">
              <img src={branch.image} alt={branch.name} />
            </div>
            <div className="branch-info">
              <h2>{branch.name}</h2>
              <p><strong>Address:</strong> {branch.address}</p>
              <p><strong>Contact Number:</strong> {branch.phone}</p>
              <p><strong>Email Us:</strong> <a href={`mailto:${branch.email}`}>{branch.email}</a></p>
              <a href="#" className="view-directions">View Directions</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
