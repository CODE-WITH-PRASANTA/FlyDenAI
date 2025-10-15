import React from "react";
import "./TypesOfVisas.css";
import VisaForm from "../VisaForm/VisaForm";

import au1 from "../../assets/au1.webp";
import au2 from "../../assets/r1.webp";
import au3 from "../../assets/au3.webp";
import au4 from "../../assets/r2.webp";
import go from "../../assets/go.webp";

const TypesOfVisas = () => {
  return (
    <div className="types-visa-page">
      {/* Left Content */}
      <div className="left-content">
        <h2 className="types-title">Types of Malaysia Visas</h2>

        {/* Visa Cards */}
        <div className="TypesVisa-cards">
          <div className="TypesVisa-card">
            <div className="TypesVisa-card-header">Malaysia Digital Arrival Card (MDAC)</div>
            <div className="TypesVisa-card-details">
              <div><span>Processing time:</span> 24 hours</div>
              <div><span>Stay period:</span> 30 days</div>
              <div><span>Validity:</span> 1 month</div>
              <div><span>Visa category:</span> Tourist / Business</div>
              <div><span>Entry:</span> Single</div>
              <div className="visa-fees"><span>Fees:</span> <strong>INR 499/-</strong></div>
            </div>
          </div>

          <div className="TypesVisa-card">
            <div className="TypesVisa-card-header">30 Days Malaysia Sticker Visa</div>
            <div className="TypesVisa-card-details">
              <div><span>Processing time:</span> 4–5 days</div>
              <div><span>Stay period:</span> 30 days</div>
              <div><span>Validity:</span> Up to 12 months</div>
              <div><span>Visa category:</span> Tourist / Business</div>
              <div><span>Entry:</span> Single / Multiple</div>
              <div className="visa-fees"><span>Fees:</span> <strong>INR 7,099/-</strong></div>
            </div>
          </div>
        </div>

        {/* Author & Last Updated */}
        <div className="author-update">
          <div className="author-info">
            <img src={au1} alt="Prisca Vaniyapilly" className="author-photo" />
            <div>
              <strong>Prisca Vaniyapilly</strong>
              <div className="author-role">Author</div>
            </div>
          </div>
          <div className="last-updated">
            Last Updated: <strong>7-Oct-2025</strong>
          </div>
        </div>

        {/* Reviews Banner */}
        <div className="reviews-banner">
          <div className="review-avatars">
            <img src={au2} alt="reviewer1" />
            <img src={au3} alt="reviewer2" />
            <img src={au4} alt="reviewer3" />
          </div>

          <div className="review-text">
            <strong>Akbartravels - Reviews</strong>
            <div className="review-details">
              <span className="review-rating">EXCELLENT ★★★★☆</span>
              <span>821 reviews on</span>
              <img src={go} alt="Google" className="google-logo" />
            </div>
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default TypesOfVisas;
