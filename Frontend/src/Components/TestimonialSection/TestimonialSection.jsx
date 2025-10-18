import React from "react";
import { FaQuoteRight } from "react-icons/fa";

import "./TestimonialSection.css";

const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-left">
        <h2>Read what our recent interns have said</h2>
        <button className="btn-read-more">Read more reviews</button>
      </div>

      <div className="testimonial-right">
        <div className="testimonial-quote-bg">
          <FaQuoteRight className="quote-bg-icon" />
        </div>

        <p className="testimonial-text">
          &rdquo;This experience has allowed me to explore a whole new
          perspective on how psychology is applicable to youth. I now feel more
          appreciative of what I have and more ambitious to do what I want. I
          feel more empowered and understand that there is a real need for
          people like myself in the field of Psychology.&rdquo;
        </p>

        <div className="testimonial-author">
          <div className="author-info">
            <span className="author-name">Javan - USA, 19</span>
            <a href="#" className="internship-link">
              Psychology intern in Peru
            </a>
          </div>
          <FaQuoteRight className="quote-icon" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
