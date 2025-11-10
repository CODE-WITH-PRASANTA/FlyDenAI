import React, { useState } from "react";
import "./CustomerReviews.css";

// 🖼️ Import all images
import reviewer1 from "../../assets/r1.webp";
import reviewer2 from "../../assets/r2.webp";
import circleLarge from "../../assets/cir1.webp";


const CustomerReviews = () => {
  const reviews = [
    {
      name: "Dr Poonam Bharti",
      stars: 5,
      text: "I have processed visas thrice through FlyDenAi. Acknowledge the efficient and prompt service by...",
      img: reviewer1,
      link: "#",
    },
    {
      name: "Nupur Sawant",
      stars: 5,
      text: "Got my Thailand visa within 5 days! It was much before than I expected. Thanks a lot for your prompt service...",
      img: reviewer2,
      link: "#",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="customer-reviews">
      <h2 className="title">What customers says about us</h2>

      <div className="review-section">
        {/* ===== LEFT FLOATING IMAGES AREA ===== */}
        <div className="review-left">
 
          <img src={circleLarge} alt="circle large" className="circle large" />
      
        </div>

        {/* ===== RIGHT SIDE REVIEW CARD ===== */}
        <div className="review-cards">
          <button className="nav-btn left" onClick={prevReview}>
            &#8592;
          </button>

          <div className="review-card">
            <div className="reviewer">
              <img
                src={reviews[current].img}
                alt={reviews[current].name}
                className="profile-img"
              />
              <div>
                <h4>{reviews[current].name}</h4>
                <div className="stars">
                  {"★".repeat(reviews[current].stars)}
                </div>
              </div>
            </div>
            <p className="review-text">{reviews[current].text}</p>
            <a href={reviews[current].link} className="read-more">
              Read more
            </a>
          </div>

          <button className="nav-btn right" onClick={nextReview}>
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
