import React from "react";
import "./Testimonials.css";
import test from "../../assets/test.webp"

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonials-left">
        <h5 className="section-subtitle">TESTIMONIALS</h5>
        <h2 className="section-title">
          Feedback from our <span>Clients</span>
        </h2>

        {/* Card 1 */}
        <div className="testimonial-card">
          <p className="testimonial-text">
            Travellers from countries categorized under the high-risk list who
            are eligible to enter Germany, aged 12 and older, are obliged to
            present certificates
          </p>
          <div className="testimonial-footer">
            <img
              src={test}
              alt="client"
              className="client-img"
            />
            <div>
              <h4 className="client-name">Sofia Dylan</h4>
              <p className="client-role">Officer</p>
            </div>
          </div>
          <div className="stars">★★★★★</div>
        </div>

        {/* Card 2 */}
        <div className="testimonial-card">
          <p className="testimonial-text">
            Truly knowledgeable, skilled and has empathy through out the
            process. No doubt, the company's success & the recommendations.
          </p>
          <div className="testimonial-footer">
            <img
              src={test}
              alt="client"
              className="client-img"
            />
            <div>
              <h4 className="client-name">Alex Sam Martin</h4>
              <p className="client-role">Officer</p>
            </div>
          </div>
          <div className="stars">★★★★★</div>
        </div>
      </div>

      {/* Right Image */}
      <div className="testimonials-right">
        <img src={test} alt="Testimonials" />
      </div>
    </section>
  );
};

export default Testimonials;
