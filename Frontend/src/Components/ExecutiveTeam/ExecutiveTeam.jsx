import React from "react";
import "./ExecutiveTeam.css";
import { Facebook, Twitter, Linkedin } from "lucide-react";

// Replace with your actual image paths
import member1 from "../../assets/Executive1.webp";
import member2 from "../../assets/Executive2.webp";
import member3 from "../../assets/Executive3.webp";
import member4 from "../../assets/Executive4.webp";
import member5 from "../../assets/Executive5.webp";
import member6 from "../../assets/Executive6.webp";
import member7 from "../../assets/Executive7.webp";
import member8 from "../../assets/Executive8.webp";

const executives = [
  {
    name: "Mark Liuw",
    role: "General Manager",
    image: member1,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Angela Kwang",
    role: "Chief Operating Officer",
    image: member2,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Nina Sherwood",
    role: "Senior Digital Strategist",
    image: member3,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Cherlyn Long",
    role: "Managing Director",
    image: member4,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Kevin Patel",
    role: "Marketing Lead",
    image: member5,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sophia Carter",
    role: "HR Manager",
    image: member6,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Michael Zhang",
    role: "Lead Product Designer",
    image: member7,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Emily Thompson",
    role: "Finance Head",
    image: member8,
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const ExecutiveTeam = () => {
  return (
    <section className="executive-section">
      <div className="executive-header">
        <h2 className="executive-title">Our Executive Team</h2>
        <p className="executive-subtitle">
          Our success is a result of teamwork and building upon our technical expertise
          and creative style providing a full-service solution to our clients.
        </p>
      </div>

      <div className="executive-grid">
        {executives.map((member, index) => (
          <div key={index} className="executive-card">
            <div className="executive-img-wrapper">
              <img src={member.image} alt={member.name} className="executive-img" />
              <div className="executive-socials">
                <a href={member.socials.twitter} className="social-icon twitter">
                  <Twitter size={18} />
                </a>
                <a href={member.socials.facebook} className="social-icon facebook">
                  <Facebook size={18} />
                </a>
                <a href={member.socials.linkedin} className="social-icon linkedin">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            <h3 className="executive-name">{member.name}</h3>
            <p className="executive-role">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExecutiveTeam;
