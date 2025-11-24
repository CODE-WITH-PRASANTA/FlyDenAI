import React, { useEffect, useState } from "react";
import "./Dummyticketclients.css";

// put this image into your assets folder and fix the path:
import bgImage from "../../assets/nf-img.webp"; // use your wavy background

const testimonials = [
  {
    quote: "Really Best Rate in the Market...Quick Service",
    name: "Raj",
  },
  {
    quote:
      "Unexpectedly Good. I was so amazed with such a service that too online. I have been struggling to obtain the same locally and frustrated, but to my amaze I got the same service online at a more competitive price and hassle free.",
    name: "Roopesh Agrawal",
  },
  {
    quote: "Excellent service… received my booking in minutes!",
    name: "Vishal",
  },
  {
    quote: "Professional, quick response & trusted company.",
    name: "Sneha",
  },
  {
    quote: "Affordable pricing and very smooth process.",
    name: "Arjun",
  },
  {
    quote: "Highly recommend TripCafe… stress-free and reliable.",
    name: "Pooja",
  },
];

// helper: group array into chunks of 2 (for 2 cards per slide)
const chunkByTwo = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr.slice(i, i + 2));
  }
  return result;
};

const slides = chunkByTwo(testimonials); // 3 slides, each with 2 cards

const ClientsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // auto-move every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="clients-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="clients-overlay">
        <div className="clients-container">
          <h2 className="clients-heading">What Our Clients Say</h2>

          <div className="slider-wrapper">
            <div
              className="slider-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((pair, index) => (
                <div className="slider-slide" key={index}>
                  {pair.map((t, i) => (
                    <article className="client-card" key={i}>
                      <div className="client-quote-icon">❝</div>

                      <p className="client-text">{t.quote}</p>

                      <div className="client-stars">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      <p className="client-name">– {t.name}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className="clients-button">View All Experience</button>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
