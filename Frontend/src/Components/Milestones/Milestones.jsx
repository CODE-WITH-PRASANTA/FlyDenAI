import React, { useState } from "react";
import "./Milestones.css";
import b1 from "../../assets/b1.jpg"; // import local image
import mile2 from "../../assets/mile2.jpg"
import b3 from "../../assets/b3.jpg"
import b4 from "../../assets/b4.jpg"
import b5 from "../../assets/agent4.jpg"

const milestones = [
  {
    year: "2010",
    title: "Get a skilled job abroad taking our technical courses",
    desc: `To obtain higher performance, Our leaders first identify the critical obstacles to forward change to overcoming them. We define your company mission and prioritize company objectives.`,
    img: b5,
    extra: [
      "The desire to blur global boundaries to fulfil passion",
      "Certified legal advisors to serve you better",
      "Easy approval choosing top visa consultant",
    ],
  },
  {
    year: "2012",
    title: "We’re Global Partner of 580+ Universities",
    desc: `To obtain higher performance, Our leaders first identify the critical obstacles to forward change to overcoming them.`,
    img: b4,
    extra: [
      "The desire to blur global boundaries to fulfil passion",
      "Certified legal advisors to serve you better",
      "Easy approval choosing top visa consultant",
    ],
  },
  {
    year: "2016",
    title: "Recent Updates of Visa And Immigration",
    desc: `To obtain higher performance, Our leaders first identify the critical obstacles to forward change to overcoming them.`,
    img: b3,
    extra: [
      "The desire to blur global boundaries to fulfil passion",
      "Certified legal advisors to serve you better",
      "Easy approval choosing top visa consultant",
    ],
  },
  {
    year: "2020",
    title: "A Guide To Attracting Clients To Your Agency",
    desc: `To obtain higher performance, Our leaders first identify the critical obstacles to forward change to overcoming them.`,
    img: mile2,
    extra: [
      "The desire to blur global boundaries to fulfil passion",
      "Certified legal advisors to serve you better",
      "Easy approval choosing top visa consultant",
    ],
  },
  {
    year: "2022",
    title: "Designing Better Links For Websites And Emails",
    desc: `To obtain higher performance, Our leaders first identify the critical obstacles to forward change to overcoming them.`,
    img: b1,
    extra: [
      "The desire to blur global boundaries to fulfil passion",
      "Certified legal advisors to serve you better",
      "Easy approval choosing top visa consultant",
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
