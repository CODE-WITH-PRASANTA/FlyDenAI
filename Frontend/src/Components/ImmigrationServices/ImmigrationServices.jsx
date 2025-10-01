import React from "react";
import "./ImmigrationServices.css";
import i1 from "../../assets/col-bgimage-12.jpg"; // Replace with your image path

export default function ImmigrationServices() {
  return (
    <section className="immigration-container">
      {/* Left Content */}
      <div className="immigration-left">
        <header>
          <h4>Our Expertise</h4>
          <h2>
            Professional immigration services by <span>trusted experts</span>
          </h2>
        </header>

        <div className="services">
          <article className="service">
            <h3>Immigration Program</h3>
            <p>
              Expert guidance through the visa application process, ensuring
              a smooth journey from start to finish.
            </p>
          </article>

          <article className="service">
            <h3>Skilled Worker Visa</h3>
            <p>
              Assistance for professionals seeking exciting international
              opportunities with valid permits.
            </p>
          </article>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="immigration-right">
        <img src={i1} alt="Immigration consulting" />
        <div className="immigration-overlay">
          <h2>Step into your future with expert consulting.</h2>
          <button className="consult-btn">Book a Consultation</button>
        </div>
      </div>
    </section>
  );
}
