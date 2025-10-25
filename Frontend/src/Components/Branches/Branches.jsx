import React from 'react';
import './Branches.css';
import br1 from '../../assets/br1.webp';
import br2 from '../../assets/br2.webp';
import br3 from '../../assets/br3.webp';

const branches = [
  {
    name: 'Lucknow Branch',
    address: '2nd Floor, HCL Tower, 17 Ashok Marg, Hazratganj, Lucknow, Uttar Pradesh 226001',
    phone: '+91 522 123 4567',
    email: 'lucknow@flydenai.com',
    image: br1,
  },
  {
    name: 'Noida Branch',
    address: 'Unit 305, Sector 18, Noida, Gautam Buddha Nagar, Uttar Pradesh 201301',
    phone: '+91 120 765 4321',
    email: 'noida@flydenai.com',
    image: br2,
  },
  {
    name: 'Kanpur Branch',
    address: '3rd Floor, Ratan Plaza, Mall Road, Kanpur, Uttar Pradesh 208001',
    phone: '+91 512 987 6543',
    email: 'kanpur@flydenai.com',
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
