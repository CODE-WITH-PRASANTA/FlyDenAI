import React from "react";
import "./WhatWeDo.css";
import what from "../../assets/what.webp"; // keep your import

const WhatWeDo = () => {
  return (
    <section className="whatwedo">
      <div className="whatwedo-container">
        {/* LEFT: image */}
        <div className="whatwedo-left">
          <img src={what} alt="What we do" className="whatwedo-img" />

          {/* stats anchored to the right edge of the left column, overlapping seam */}
          <div className="whatwedo-stats" aria-hidden="false">
            <div className="stat">
              <div className="stat-number">1200+</div>
              <div className="stat-label">Visa Applications Processed</div>
            </div>

            <div className="stat">
              <div className="stat-number">750+</div>
              <div className="stat-label">Students Placed Abroad</div>
            </div>

            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* RIGHT: all textual content lives here */}
        <div className="whatwedo-right">
          <div className="sub-title">WHAT WE DO</div>

          <h2 className="title">
            Complete <span className="em">Visa & Study Abroad</span> Solutions
            <br />
            from Experienced Professionals
          </h2>

          <div className="content-block">
            <h3>Visa Services</h3>
            <p>
              We provide end-to-end visa assistance for students, professionals,
              and travelers. From documentation to interview preparation, our
              experienced consultants ensure a smooth and stress-free visa
              process for every client.
            </p>
          </div>

          <div className="divider" />

          <div className="content-block">
            <h3>Intern Abroad Programs</h3>
            <p>
              Gain valuable international experience through our global internship
              programs. We connect students and professionals with leading
              organizations abroad, offering opportunities to grow, learn, and
              build global networks.
            </p>
          </div>

          <div className="divider" />

          <div className="content-block">
            <h3>Study Abroad Consultancy</h3>
            <p>
              We help students achieve their dream of studying in top universities
              across the world. From course selection and application guidance to
              pre-departure support, we make your international education journey
              seamless and successful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
