import React from "react";
import "./TeamSection.css";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import i1 from "../../assets/col-bgimage-12.jpg"; // Replace with your image path

const TEAM = [
  {
    name: "Alex Sam Martin",
    role: "Director",
    img: i1,
    socials: [
      { icon: <FaFacebookF />, link: "https://facebook.com" },
      { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
      { icon: <FaTwitter />, link: "https://twitter.com" }
    ]
  },
  {
    name: "David Coper",
    role: "Officer",
    img: i1,
    socials: [
      { icon: <FaFacebookF />, link: "https://facebook.com" },
      { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
      { icon: <FaTwitter />, link: "https://twitter.com" }
    ],
    active: true
  },
  {
    name: "Melika Fonals",
    role: "Agent",
    img: i1,
    socials: [
      { icon: <FaFacebookF />, link: "https://facebook.com" },
      { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
      { icon: <FaTwitter />, link: "https://twitter.com" }
    ]
  },
  {
    name: "Sophia Arthur",
    role: "Migration Agent",
    img: i1,
    socials: [
      { icon: <FaFacebookF />, link: "https://facebook.com" },
      { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
      { icon: <FaTwitter />, link: "https://twitter.com" }
    ]
  }
];

export default function TeamSection() {
  return (
    <div className="team-container">
      <h1>
        For the immigration, choose <span>Team Member!</span>
      </h1>
      <p>
        We believe in delivering exceptional services with a team dedicated to excellence. Our experts combine skills, knowledge, and passion to ensure your journey is seamless and successful.
      </p>
      <div className="team-list">
        {TEAM.map(({ img, name, role, socials, active }) => (
          <div className={`team-card${active ? " active" : ""}`} key={name}>
            <img src={img} className="team-avatar" alt={name} />
            <div className="team-info">
              <div className="team-name">{name}</div>
              <div className="team-role">{role}</div>
              <div className="team-icons">
                {socials.map(({ icon, link }, idx) => (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="icon-box"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
