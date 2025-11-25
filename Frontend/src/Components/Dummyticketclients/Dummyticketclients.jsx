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

const ClientsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Reset to first slide when switching between mobile/desktop
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group testimonials based on screen size
  const getSlides = () => {
    if (isMobile) {
      // For mobile: each slide contains one testimonial
      return testimonials.map(testimonial => [testimonial]);
    } else {
      // For desktop: group into pairs of 2
      const result = [];
      for (let i = 0; i < testimonials.length; i += 2) {
        result.push(testimonials.slice(i, i + 2));
      }
      return result;
    }
  };

  const slides = getSlides();

  // Auto-slide configuration
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, isMobile ? 5000 : 2000); // 5 seconds for mobile, 2 seconds for desktop
    
    return () => clearInterval(interval);
  }, [slides.length, isMobile]);

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
              {slides.map((slideTestimonials, index) => (
                <div className="slider-slide" key={index}>
                  {slideTestimonials.map((testimonial, i) => (
                    <article className="client-card" key={i}>
                      <div className="client-quote-icon">❝</div>

                      <p className="client-text">{testimonial.quote}</p>

                      <div className="client-stars">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      <p className="client-name">– {testimonial.name}</p>
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