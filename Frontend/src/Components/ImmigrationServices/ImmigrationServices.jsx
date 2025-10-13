import React from "react";
import "./ImmigrationServices.css";
import i1 from "../../assets/consoltant.webp"; // Replace with your image path

export default function ImmigrationServices() {
  return (
    <section className="immigration-container">
      {/* Left Content */}
      <div className="immigration-left">
        <header>
          <h4>Our Expertise</h4>
          <h2>
            Professional services for <span>Visa, Study & Intern Abroad</span>
          </h2>
        </header>

        <div className="services">
          <article className="service">
            <h3>Visa Booking</h3>
            <p>
              We assist you in securing student, work, or travel visas quickly and efficiently, guiding you through every step of the process.
            </p>
          </article>

          <article className="service">
            <h3>Study Abroad</h3>
            <p>
              Get expert support for choosing the right universities, submitting applications, and preparing for a successful international education experience.
            </p>
          </article>

          <article className="service">
            <h3>Intern Abroad</h3>
            <p>
              Explore global internship opportunities to gain hands-on experience, enhance your skills, and expand your professional network worldwide.
            </p>
          </article>
        </div>

      </div>

      {/* Right Image Section */}
      <div className="immigration-right">
        <img src={i1} alt="Immigration consulting" />
        <div className="immigration-overlay">
          <h2>Step into your global journey with expert guidance.</h2>
          <button className="consult-btn">Book a Consultation</button>
        </div>
      </div>
    </section>
  );
}
