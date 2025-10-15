import React from 'react';
import './Reviews.css';
import au1 from "../../assets/au1.webp";
import au2 from "../../assets/au2.webp";
import au3 from "../../assets/au3.webp";
import reviewIcon from "../../assets/best-choice.webp"; // Add your image here

const reviews = [
  {
    name: 'Nupur Sawant',
    time: '2 months ago',
    rating: 5,
    text: 'Got my Thailand visa within 5 days. It was much before than I expected. Thanks a lot for your prompt service. We appreciate your efforts and the personal attention. Wish you good luck.',
    image: au1,
  },
  {
    name: 'Dr Poonam Bharti',
    time: '1 month ago',
    rating: 5,
    text: 'I have processed visas thrice through Akbar travels. Acknowledge the efficient and prompt service by the customer support team. Got the Dubai visas way before the expected time.',
    image: au2,
  },
  {
    name: 'Mayur Waman',
    time: '2 weeks ago',
    rating: 5,
    text: 'Thank you for the smooth and hassle free visa application for Singapore. Very happy with the service, I will',
    image: au3,
  },
];

const Reviews = () => {
  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <img src={reviewIcon} alt="Review Icon" className="reviews-header-img" />
        <div>
          <div className="best-choice-badge">
            <span>BEST CHOICE</span>
            <span>Guaranteed</span>
          </div>
          <h2>Akbartravels - Reviews</h2>
          <p>
            EXCELLENT <span className="rating">5.0</span> ★★★★★ 821 reviews on <span className="google">Google</span>
          </p>
        </div>
      </div>

      {reviews.map((review, index) => (
        <div key={index} className="review">
          <div className="review-profile">
            <img src={review.image} alt={review.name} />
            <div>
              <h3>{review.name}</h3>
              <p>{review.time}</p>
            </div>
          </div>
          <p>{review.text}</p>
          <div className="review-rating">
            {Array(review.rating).fill('★').join('')}
            <span className="google-icon">G</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
