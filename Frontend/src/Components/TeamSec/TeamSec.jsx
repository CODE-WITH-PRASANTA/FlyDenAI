import React from "react";
import { FaEnvelope, FaShareAlt } from "react-icons/fa";
import "./TeamSec.css";
import director from "../../assets/director.webp";
import ts2 from "../../assets/ts2.webp";
import ts3 from "../../assets/ts3.webp";
import ts4 from "../../assets/ts4.webp";
import ts5 from "../../assets/ts5.webp";
import ts6 from "../../assets/ts6.webp";
import ts7 from "../../assets/ts7.webp";
import ts8 from "../../assets/ts8.webp";



const teamMembers = [
  { name: "Alex Sam Martin", role: "Director", img: director, active: false },
  { name: "David Coper", role: "Officer", img: ts2, active: true },
  { name: "Melika Fonals", role: "ts", img: ts3, active: false },
  { name: "Sophia Arthur", role: "Migration ts", img: ts4, active: false },
  { name: "Natalia Zox", role: "Officer", img: ts5, active: false },
  { name: "Annia Konikova", role: "ts", img: ts6, active: false },
  { name: "Lumber Jackman", role: "Officer", img: ts7, active: false },
  { name: "Danny Coorsh", role: "ts", img: ts8, active: false },
];

const TeamSec = () => {
  return (
    <section className="teamsec-section">
      <div className="teamsec-container">
        <div className="teamsec-grid">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`teamsec-card ${member.active ? "active" : ""}`}
            >
              <div className="teamsec-img">
                <img src={member.img} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>

              {/* Side Icons */}
              <div className="teamsec-icons">
                <span className="teamsec-icon"><FaEnvelope /></span>
                <span className="teamsec-divider"></span>
                <span className="teamsec-icon"><FaShareAlt /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSec;
