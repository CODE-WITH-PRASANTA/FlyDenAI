import React, { useEffect, useState } from "react";
import "./Dummyticketclients.css";
import bgImage from "../../assets/nf-img.webp";

const testimonials = [
  {
    quote:
      "FlyDenAI provided my dummy ticket within minutes. Perfect format for my visa interview and accepted without any issue. Highly recommended!",
    name: "Ankit Sharma",
    designation: "Student Visa Applicant",
  },
  {
    quote:
      "Super fast service! I needed a dummy ticket for my Canada visa submission and FlyDenAI delivered it professionally and at the best price.",
    name: "Meera Patel",
    designation: "Visa Applicant",
  },
  {
    quote:
      "I was struggling to get a confirmed itinerary for my Schengen visa. FlyDenAI made it simple and stress-free. Their customer support is excellent!",
    name: "Rohit Agarwal",
    designation: "Business Traveller",
  },
  {
    quote:
      "My travel agent was charging too much for dummy tickets. FlyDenAI provided the same service at half the price with instant delivery.",
    name: "Priya Sahu",
    designation: "Tourist Visa Applicant",
  },
  {
    quote:
      "Trusted and reliable company! The dummy ticket looked authentic and exactly what the embassy required. Thank you FlyDenAI!",
    name: "Siddharth Rao",
    designation: "Frequent Traveler",
  },
  {
    quote:
      "Excellent service! I received my dummy ticket for US visa in just 3 minutes. Fastest service I have ever seen.",
    name: "Harpreet Singh",
    designation: "Software Engineer",
  },
  {
    quote:
      "Very professional team. They helped me with both flight and hotel dummy bookings required for my Spain visa. Smooth and affordable!",
    name: "Tanisha Kapoor",
    designation: "Travel Enthusiast",
  },
  {
    quote:
      "FlyDenAI's dummy ticket service is super reliable. The embassy accepted it without any questions. Will definitely use again for future trips.",
    name: "Abdul Rahman",
    designation: "Dubai Visa Applicant",
  },
  {
    quote:
      "I urgently needed a dummy ticket for an emergency visa appointment. FlyDenAI delivered within 2 minutes. Amazing speed!",
    name: "Karishma Jain",
    designation: "Student Traveler",
  },
  {
    quote:
      "Affordable pricing and very smooth process. FlyDenAI has become my go-to service for all visa-related travel documents.",
    name: "Arjun Mehta",
    designation: "Frequent Flyer",
  },
  {
    quote:
      "Highly recommend FlyDenAI — their dummy ticket quality is top-notch and embassy compliant. Very professional team!",
    name: "Nikki Dsouza",
    designation: "UK Visa Applicant",
  },
  {
    quote:
      "The best service for dummy tickets. I use FlyDenAI for all my client visa applications. Reliable and fast every single time.",
    name: "Thomas",
    designation: "Travel Consultant",
  },
];


const ClientsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCurrentSlide(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate slide groups
  const getSlides = () => {
    if (isMobile) {
      return testimonials.map((t) => [t]); // single card per slide
    } else {
      const result = [];
      for (let i = 0; i < testimonials.length; i += 2) {
        result.push(testimonials.slice(i, i + 2)); // pair of cards per slide
      }
      return result;
    }
  };

  const slides = getSlides();

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, isMobile ? 5000 : 2500);

    return () => clearInterval(interval);
  }, [slides.length, isMobile]);

  return (
    <section
      className="ClientSec-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="ClientSec-overlay">
        <div className="ClientSec-container">
          <h2 className="ClientSec-heading">What Our Clients Say</h2>
          <p className="ClientSec-subtext">
            5000+ Customers trust us for secure, quick & hassle-free services.
          </p>

          {/* Slider */}
          <div className="ClientSec-sliderWrapper">
            <div
              className="ClientSec-sliderTrack"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideGroup, index) => (
                <div className="ClientSec-slide" key={index}>
                  {slideGroup.map((item, i) => (
                    <article className="ClientSec-card" key={i}>
                      <div className="ClientSec-quoteIcon">❝</div>

                      <p className="ClientSec-quote">{item.quote}</p>

                      <div className="ClientSec-stars">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      <div className="ClientSec-profile">
                        <div className="ClientSec-avatar">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="ClientSec-name">{item.name}</p>
                          <p className="ClientSec-designation">
                            {item.designation}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="ClientSec-pagination">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`ClientSec-dot ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>

          {/* CTA Button */}
          <button className="ClientSec-button">View All Experiences</button>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
