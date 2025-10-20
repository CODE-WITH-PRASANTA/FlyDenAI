import React, { useRef, useEffect } from "react";
import { FaQuoteRight } from "react-icons/fa";
import "./TestimonialSection.css";

const testimonials = [
  {
    name: "Javan - USA, 19",
    link: "Psychology intern in Peru",
    text: "This experience has allowed me to explore a whole new perspective on how psychology is applicable to youth. I now feel more appreciative of what I have and more ambitious to do what I want. I feel more empowered and understand that there is a real need for people like myself in the field of Psychology."
  },
  {
    name: "Sophia - UK, 22",
    link: "Business intern in Germany",
    text: "The internship helped me develop professional skills and confidence. Working in a cross-cultural environment taught me teamwork, leadership, and adaptability. Highly recommend this experience to anyone seeking career growth."
  },
  {
    name: "Raj - India, 20",
    link: "STEM intern in Japan",
    text: "I gained hands-on experience in innovative projects, enhancing both my technical and problem-solving skills. This internship made me more industry-ready and gave me international exposure."
  },
  {
    name: "Emily - Canada, 21",
    link: "Arts intern in Italy",
    text: "Exploring creative work in a new country was eye-opening. I built a strong portfolio, learned from experienced mentors, and connected with people from diverse backgrounds."
  },
  {
    name: "Javan - USA, 19",
    link: "Psychology intern in Peru",
    text: "This experience has allowed me to explore a whole new perspective on how psychology is applicable to youth. I now feel more appreciative of what I have and more ambitious to do what I want. I feel more empowered and understand that there is a real need for people like myself in the field of Psychology."
  },
  {
    name: "Sophia - UK, 22",
    link: "Business intern in Germany",
    text: "The internship helped me develop professional skills and confidence. Working in a cross-cultural environment taught me teamwork, leadership, and adaptability. Highly recommend this experience to anyone seeking career growth."
  },
  {
    name: "Raj - India, 20",
    link: "STEM intern in Japan",
    text: "I gained hands-on experience in innovative projects, enhancing both my technical and problem-solving skills. This internship made me more industry-ready and gave me international exposure."
  },
  {
    name: "Emily - Canada, 21",
    link: "Arts intern in Italy",
    text: "Exploring creative work in a new country was eye-opening. I built a strong portfolio, learned from experienced mentors, and connected with people from diverse backgrounds."
  },
];

const TestimonialSection = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let scrollPos = 0;

    const smoothScroll = () => {
      scrollPos += 0.5; // Adjust speed here
      if (scrollPos >= track.scrollWidth / 2) {
        scrollPos = 0; // reset for infinite loop
      }
      track.scrollLeft = scrollPos;
      requestAnimationFrame(smoothScroll);
    };

    smoothScroll(); // start the animation
  }, []);

  return (
    <section className="Testimonial-section">
      <div className="Testimonial-header">
        <h2>Read what our recent interns have said</h2>
        <button className="btn-read-more">Read more reviews</button>
      </div>

      <div className="Testimonial-scroll-section" ref={trackRef}>
        {/* Duplicate content for seamless infinite scroll */}
        {[...testimonials, ...testimonials].map((item, index) => (
          <div className="Testimonial-card" key={index}>
            <div className="Testimonial-quote-bg">
              <FaQuoteRight className="quote-bg-icon" />
            </div>
            <p className="Testimonial-text">&rdquo;{item.text}&rdquo;</p>
            <div className="Testimonial-author">
              <div className="author-info">
                <span className="author-name">{item.name}</span>
                <a href="#" className="internship-link">{item.link}</a>
              </div>
              <FaQuoteRight className="quote-icon" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
