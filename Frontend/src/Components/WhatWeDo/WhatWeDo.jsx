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
              <div className="stat-number">852</div>
              <div className="stat-label">Projects Are Completed</div>
            </div>

            <div className="stat">
              <div className="stat-number">900</div>
              <div className="stat-label">Gave Signage Advice</div>
            </div>

            <div className="stat">
              <div className="stat-number">8630</div>
              <div className="stat-label">Clients Are Satisfied</div>
            </div>
          </div>
        </div>

        {/* RIGHT: all textual content lives here (moved fully to the right) */}
        <div className="whatwedo-right">
          <div className="sub-title">WHAT WE DO</div>

          <h2 className="title">
            Immigration services
            <br />
            from <span className="em">Experienced</span> agents
          </h2>

          <div className="content-block">
            <h3>Study and work visa consultant</h3>
            <p>
              Skilled professionals are always ready to provide reliable services
              to our clients! We guide the applicants for their immigration.
            </p>
          </div>

          <div className="divider" />

          <div className="content-block">
            <h3>Online visa services and guidance</h3>
            <p>
              You can directly contact us through filling up the form. Our team
              will get back to you with your visa enquiry and help you for visa
              services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
