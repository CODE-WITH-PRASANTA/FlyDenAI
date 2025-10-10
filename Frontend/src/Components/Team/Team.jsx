import React from "react";
import "./Team.css";
import ts2 from "../../assets/ts2.webp";
import ts3 from "../../assets/ts3.webp";
import ts4 from "../../assets/ts4.webp";
import ts5 from "../../assets/ts5.webp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const teamMembers = [
  { name: "Sakshi Jambekar", role: "Senior Visa Officer", experience: "2 Years", img: ts2 },
  { name: "Airaf Shaikh", role: "Senior Visa Officer", experience: "2 Years", img: ts3 },
  { name: "Purva Sawant", role: "Senior Visa Officer", experience: "3 Years", img: ts4 },
  { name: "Pranil Shinde", role: "Senior Holiday Expert", experience: "3 Years", img: ts5 },
];

const Team = () => {
  return (
    <div className="team-section">
      <h2>Meet Our Amazing Team</h2>

      <div className="carousel-container">
        <div className="carousel">
          {[...teamMembers, ...teamMembers].map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-card">
                <div className="card-header">
                  <img src={member.img} alt={member.name} />
                  <div className="role-tag">{member.role}</div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button left">
          <FaArrowLeft />
        </button>
        <button className="nav-button right">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Team;
