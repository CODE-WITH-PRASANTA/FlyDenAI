import React, { useState } from "react";
import "./Milestones.css";
import b1 from "../../assets/b1.jpg"; // import local image
import mile2 from "../../assets/mile2.jpg"
import b3 from "../../assets/b3.jpg"
import b4 from "../../assets/b4.jpg"
import b5 from "../../assets/agent4.jpg"

const milestones = [
  {
    year: "2021",
    title: "Launched Online Visa Consultation Services",
    desc: `Introduced virtual consultations for visa applications, making our services accessible during global restrictions.`,
    img: b1,
    extra: [
      "Guided students for multiple country visa applications",
      "Provided online document verification services",
      "Introduced step-by-step visa processing assistance",
    ],
  },
  {
    year: "2022",
    title: "Expanded Study Abroad Programs",
    desc: `Partnered with top universities to offer specialized courses in technology, business, and healthcare for international students.`,
    img: b5,
    extra: [
      "Introduced scholarship and funding guidance",
      "Implemented career path counseling services",
      "Streamlined admission and pre-departure support",
    ],
  },
  {
    year: "2023",
    title: "Digital Transformation & Mobile App Launch",
    desc: `Launched our official mobile application to provide clients with visa updates, course search, and appointment scheduling at their fingertips.`,
    img: b4,
    extra: [
      "Real-time visa status tracking",
      "Easy online application submission",
      "Push notifications for deadlines and reminders",
    ],
  },
  {
    year: "2024",
    title: "Recognized as Top Overseas Education Consultancy",
    desc: `Received industry awards for excellence in student services, visa assistance, and professional guidance in international education.`,
    img: b3,
    extra: [
      "Awarded Best Overseas Education Consultancy 2024",
      "Expanded our partner network to 750+ universities",
      "Introduced new services for work-study programs",
    ],
  },
  {
    year: "2025",
    title: "Pioneering AI-Powered Visa Solutions",
    desc: `Introduced AI-based tools for personalized course recommendations, visa document verification, and faster processing.`,
    img: mile2,
    extra: [
      "AI-driven application evaluation for faster approval",
      "Customized study abroad plans for each student",
      "24/7 digital support for students worldwide",
    ],
  },
];


const Milestones = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="milestones-section">
      <h2 className="milestones-title">
        Our Major <span>Milestones</span>
      </h2>

      {/* Timeline */}
      <div className="milestones-timeline">
        <div
          className="milestones-progress"
          style={{
            width: `${(activeIndex / (milestones.length - 1)) * 100}%`,
          }}
        ></div>

        {milestones.map((m, i) => (
          <div
            key={i}
            className={`milestones-timeline-item ${i <= activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <span className="milestones-dot"></span>
            <p>{m.year}</p>
          </div>
        ))}
      </div>

      {/* Content Card */}
      <div
        className={`milestones-content ${activeIndex % 2 === 0 ? "left-img" : "right-img"}`}
      >
        <div className="milestones-img">
          <img src={milestones[activeIndex].img} alt={milestones[activeIndex].title} />
        </div>
        <div className="milestones-text">
          <h3>{milestones[activeIndex].title}</h3>
          <p>{milestones[activeIndex].desc}</p>
          <ul>
            {milestones[activeIndex].extra.map((point, i) => (
              <li key={i}>
                <span>✔</span> {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
