import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaFileAlt, FaHandsHelping, FaRegClock, FaUniversity } from "react-icons/fa";
import "./TrainingSection.css";

// Import images (replace with your proper visa-related images)
import docHelpImg from "../../assets/train1.webp";
import consultancyImg from "../../assets/train2.webp";
import trackingImg from "../../assets/train3.webp";
import universityImg from "../../assets/train4.webp";

// Visa enquiry cards with more detailed descriptions
const enquiryCards = [
  {
    id: 1,
    title: "Help in Documents",
    desc: "Get end-to-end assistance in preparing, verifying, and submitting all essential documents required for your visa application. We ensure that your forms, passports, ID proofs, academic transcripts, financial statements, and supporting letters are accurate and error-free to prevent delays and improve approval chances.",
    img: docHelpImg,
    icon: <FaFileAlt />,
  },
  {
    id: 2,
    title: "Visa Consultancy",
    desc: "Receive professional guidance on selecting the correct visa type according to your purpose and destination. Our experts provide personalized consultation, prepare you for interviews, explain visa policies, and offer tips to increase the likelihood of a successful visa approval. From student visas to work permits, we cover all visa categories.",
    img: consultancyImg,
    icon: <FaHandsHelping />,
  },
  {
    id: 3,
    title: "Application Tracking",
    desc: "Stay updated with the latest status of your visa application in real-time. We provide timely notifications, reminders, and tracking support so you can monitor each stage of the process—from submission to approval. Avoid unnecessary delays or missed updates with our reliable tracking system and expert assistance.",
    img: trackingImg,
    icon: <FaRegClock />,
  },
  {
    id: 4,
    title: "University Assistance",
    desc: "Receive comprehensive guidance for studying abroad, including help with university selection, course selection, admission procedures, documentation, and scholarship opportunities. We assist with application forms, recommendation letters, SOPs, and all administrative requirements, ensuring a smooth and stress-free path to your international education goals.",
    img: universityImg,
    icon: <FaUniversity />,
  },
];


export default function TrainingSection() {
  return (
    <section className="visa-enquiry-section">
      <p className="TrainingSec-subtitle">Free Visa Enquiry</p>
      <h2 className="section-title">
        We Simplify Your Visa Process <br /> With Expert Assistance
      </h2>

      <div className="enquiry-cards-container">
        {enquiryCards.map(({ id, title, desc, img, icon }) => (
          <div key={id} className="enquiry-card">
            {/* Image Circle */}
            <div className="img-circle">
              <img src={img} alt={title} />
            </div>

            {/* Icon Overlay */}
            <div className="icon-circle">{icon}</div>

            {/* Content */}
            <h3 className="TrainingSec-card-title">{title}</h3>
            <p className="card-desc">{desc}</p>

            {/* Read More Button */}
            <button className="TrainingSec-readbtn">
              <span className="read-more-text">Read More</span>
              <FiArrowRight className="arrow-icon" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
