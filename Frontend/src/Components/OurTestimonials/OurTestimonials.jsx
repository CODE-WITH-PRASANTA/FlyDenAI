import React from "react";
import "./OurTestimonials.css";
import { FaQuoteRight } from "react-icons/fa";
import i1 from "../../assets/ts7.webp";
import i2 from "../../assets/ts6.webp";
import i3 from "../../assets/ts8.webp"

const testimonials = [
  {
    name: "Kawser Ahmed",
    role: "Web Developer",
    image: i1, 
    date: "May 10, 2023",
    text: "Creative agency, we believe in innovation. We constantly push boundaries of what's possible, striving to create not only beautiful and effective work but also impactful and meaningful solutions.",
  },
  {
    name: "Jhon Dev",
    role: "UI Designer",
    image: i2,
    date: "June 21, 2023",
    text: "Creative agency, we believe in innovation. We constantly push boundaries of what's possible, striving to create not only beautiful and effective work but also impactful and meaningful solutions.",
  },
  {
    name: "Salman Ahmed",
    role: "WordPress Developer",
    image: i3,
    date: "July 3, 2023",
    text: "Creative agency, we pride ourselves on delivering exceptional work and meaningful digital experiences for every client.",
  },
];

const OurTestimonials = () => {
  return (
    <section className="ourtestimonials">
      <p className="subtitle">OUR TESTIMONIALS</p>
      <h2 className="title">
        Let’s Explore Why People Say <br /> About Our Services
      </h2>

      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div key={index} className="testimonials-card">
            <div className="profile">
              <img src={item.image} alt={item.name} className="profile-img" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.role}</p>
              </div>
              <FaQuoteRight className="quote-icon" />
            </div>
            <p className="testimonials-text">{item.text}</p>
            <div className="testimonials-date">{item.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTestimonials;
