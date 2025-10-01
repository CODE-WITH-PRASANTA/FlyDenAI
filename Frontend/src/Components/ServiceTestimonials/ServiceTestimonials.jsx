import React from "react";
import "./ServiceTestimonials.css";
import { FaStar } from "react-icons/fa";
import i1 from "../../assets/col-bgimage-12.jpg";

const testimonials = [
  {
    quote: "Travellers from countries categorized under the high-risk list who are eligible to enter Germany, aged 12 and older, are obliged to present certificates.",
    name: "Sofia Dylan",
    role: "Officer",
    avatar: i1,
    rating: 5
  },
  {
    quote: "Truly knowledgeable, skilled and has empathy throughout the process. No doubt, the company’s success & the recommendations.",
    name: "Alex Sam Martin",
    role: "Consultant",
    avatar: i1,
    rating: 5
  },
  {
    quote: "Truly knowledgeable, skilled and has empathy throughout the process. No doubt, the company’s success & the recommendations.",
    name: "Alex Sam Martin",
    role: "Consultant",
    avatar: i1,
    rating: 5
  },
  {
    quote: "Truly knowledgeable, skilled and has empathy throughout the process. No doubt, the company’s success & the recommendations.",
    name: "Alex Sam Martin",
    role: "Consultant",
    avatar: i1,
    rating: 5
  },
];

const ServiceTestimonials = () => {
  return (
    <section className="service-testimonials-section">
      <div className="service-testimonials-container">
        <div className="service-testimonials-left">
          <h4 className="service-testimonials-subtitle">TESTIMONIALS</h4>
          <h2 className="service-testimonials-title">
            Feedback from our <span>Clients</span>
          </h2>

          <div className="service-testimonials-cards">
            {testimonials.map((t, index) => (
              <div key={index} className="service-testimonial-card">
                <p className="service-testimonial-quote">"{t.quote}"</p>
                <div className="service-testimonial-rating">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <FaStar key={i} color="#f39c12" />
                  ))}
                </div>
                <div className="service-testimonial-author">
                  <img src={t.avatar} alt={t.name} className="service-testimonial-avatar" />
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="service-testimonials-right">
          <img src={i1} alt="Clients" />
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
