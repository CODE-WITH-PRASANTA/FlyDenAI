import React from "react";
import "./Testimonials.css";
import test from "../../assets/test.webp";

const Testimonials = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        {/* Left side: Text & Cards */}
        <div className="testimonial-left">
          <h5 className="testimonial-subtitle">Testimonials</h5>
          <h2 className="testimonial-title">
            Feedback from our <span className="testimonial-highlight">Clients</span>
          </h2>

          {/* Card 1 */}
          <div className="testimonial-card">
            <p className="testimonial-text">
              Travellers from countries categorized under the high-risk list who
              are eligible to enter Germany, aged 12 and older, are obliged to
              present certificates
            </p>
            <div className="testimonial-footer">
              <img src={test} alt="client" className="testimonial-client-img" />
              <div>
                <h4 className="testimonial-client-name">Sofia Dylan</h4>
                <p className="testimonial-client-role">Officer</p>
              </div>
            </div>
            <div className="testimonial-stars">★★★★★</div>
          </div>

          {/* Card 2 */}
          <div className="testimonial-card">
            <p className="testimonial-text">
              Truly knowledgeable, skilled and has empathy throughout the
              process. No doubt, the company's success & the recommendations.
            </p>
            <div className="testimonial-footer">
              <img src={test} alt="client" className="testimonial-client-img" />
              <div>
                <h4 className="testimonial-client-name">Alex Sam Martin</h4>
                <p className="testimonial-client-role">Officer</p>
              </div>
            </div>
            <div className="testimonial-stars">★★★★★</div>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="testimonial-right">
          <img src={test} alt="Testimonials" className="testimonial-image" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
