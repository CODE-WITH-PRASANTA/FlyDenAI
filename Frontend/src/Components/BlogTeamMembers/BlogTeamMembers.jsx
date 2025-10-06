import React from 'react';
import './BlogTeamMembers.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import pp from "../../assets/pp.webp";
import pp2 from "../../assets/pp2.webp";
import pp3 from "../../assets/pp3.webp";
import pp4 from "../../assets/pp4.webp";

const teamMembers = [
  { name: 'Devid Miller', role: 'Consultant', image: pp },
  { name: 'Ritu Ratia', role: 'Consultant', image: pp2 },
  { name: 'Shikhon Islam', role: 'Consultant', image: pp3 },
  { name: 'Sonsil Macron', role: 'Consultant', image: pp4 },
];

const BlogTeamMembers = () => {
  return (
    <section className="blogteammembers-section">
      <h2 className="team-header">Our Expert Team</h2>
      <div className="blogteammembers">
        {teamMembers.map((member, index) => (
          <div key={index} className="blogteammember">
            <div className="member-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogTeamMembers;
