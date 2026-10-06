import React, { useEffect, useRef } from "react";
import { FaQuoteRight, FaArrowRight, FaStar } from "react-icons/fa";
import "./TestimonialSection.css";

const testimonials = [
  {
    name: "Javan - USA, 19",
    link: "Psychology intern in Peru",
    text: "This experience has allowed me to explore a whole new perspective on how psychology is applicable to youth. I now feel more appreciative of what I have and more ambitious to do what I want. I feel more empowered and understand that there is a real need for people like myself in the field of Psychology.",
  },
  {
    name: "Sophia - UK, 22",
    link: "Business intern in Germany",
    text: "The internship helped me develop professional skills and confidence. Working in a cross-cultural environment taught me teamwork, leadership, and adaptability. Highly recommend this experience to anyone seeking career growth.",
  },
  {
    name: "Raj - India, 20",
    link: "STEM intern in Japan",
    text: "I gained hands-on experience in innovative projects, enhancing both my technical and problem-solving skills. This internship made me more industry-ready and gave me international exposure.",
  },
  {
    name: "Emily - Canada, 21",
    link: "Arts intern in Italy",
    text: "Exploring creative work in a new country was eye-opening. I built a strong portfolio, learned from experienced mentors, and connected with people from diverse backgrounds.",
  },
  {
    name: "Javan - USA, 19",
    link: "Psychology intern in Peru",
    text: "This experience has allowed me to explore a whole new perspective on how psychology is applicable to youth. I now feel more appreciative of what I have and more ambitious to do what I want. I feel more empowered and understand that there is a real need for people like myself in the field of Psychology.",
  },
  {
    name: "Sophia - UK, 22",
    link: "Business intern in Germany",
    text: "The internship helped me develop professional skills and confidence. Working in a cross-cultural environment taught me teamwork, leadership, and adaptability. Highly recommend this experience to anyone seeking career growth.",
  },
  {
    name: "Raj - India, 20",
    link: "STEM intern in Japan",
    text: "I gained hands-on experience in innovative projects, enhancing both my technical and problem-solving skills. This internship made me more industry-ready and gave me international exposure.",
  },
  {
    name: "Emily - Canada, 21",
    link: "Arts intern in Italy",
    text: "Exploring creative work in a new country was eye-opening. I built a strong portfolio, learned from experienced mentors, and connected with people from diverse backgrounds.",
  },
];

const TestimonialSection = () => {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let lastTime = performance.now();

    const smoothScroll = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const speed = 0.035;

      scrollPositionRef.current += delta * speed;

      const halfWidth = track.scrollWidth / 2;

      if (scrollPositionRef.current >= halfWidth) {
        scrollPositionRef.current = 0;
      }

      track.scrollLeft = scrollPositionRef.current;

      animationRef.current =
        requestAnimationFrame(smoothScroll);
    };

    animationRef.current =
      requestAnimationFrame(smoothScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleReadMore = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="flyixo-testimonial-section">

      {/* Background Decorations */}
      <div className="flyixo-testimonial-bg flyixo-testimonial-bg-one"></div>
      <div className="flyixo-testimonial-bg flyixo-testimonial-bg-two"></div>
      <div className="flyixo-testimonial-grid"></div>

      <div className="flyixo-testimonial-container">

        {/* Header */}
        <div className="flyixo-testimonial-header">

          <div className="flyixo-testimonial-eyebrow">
            <span className="flyixo-testimonial-line"></span>

            <span>FLYIXO TESTIMONIALS</span>

            <span className="flyixo-testimonial-line"></span>
          </div>

          <h2 className="flyixo-testimonial-title">
            Hear From Our
            <span> Global Interns</span>
          </h2>

          <p className="flyixo-testimonial-description">
            Discover real experiences from students and young
            professionals who have taken their careers beyond borders
            with Flyixo.
          </p>

          <button
            type="button"
            className="flyixo-testimonial-button"
            onClick={handleReadMore}
          >
            <span>Read More Reviews</span>

            <span className="flyixo-testimonial-button-icon">
              <FaArrowRight />
            </span>
          </button>

        </div>

        {/* Reviews Slider */}
        <div
          className="flyixo-testimonial-scroll"
          ref={trackRef}
          aria-label="Intern testimonials"
        >

          {[...testimonials, ...testimonials].map(
            (item, index) => (
              <article
                className="flyixo-testimonial-card"
                key={`${item.name}-${index}`}
              >

                {/* Top Card */}
                <div className="flyixo-testimonial-card-top">

                  <div className="flyixo-testimonial-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} />
                    ))}
                  </div>

                  <span className="flyixo-testimonial-card-number">
                    {String((index % testimonials.length) + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                </div>

                {/* Quote Background */}
                <div className="flyixo-testimonial-quote-bg">
                  <FaQuoteRight />
                </div>

                {/* Text */}
                <p className="flyixo-testimonial-text">
                  “{item.text}”
                </p>

                {/* Divider */}
                <div className="flyixo-testimonial-divider"></div>

                {/* Author */}
                <div className="flyixo-testimonial-author">

                  <div className="flyixo-author-avatar">
                    {item.name.charAt(0)}
                  </div>

                  <div className="flyixo-author-info">

                    <span className="flyixo-author-name">
                      {item.name}
                    </span>

                    <a
                      href="#"
                      className="flyixo-internship-link"
                      onClick={(event) =>
                        event.preventDefault()
                      }
                    >
                      {item.link}
                    </a>

                  </div>

                  <div className="flyixo-author-quote">
                    <FaQuoteRight />
                  </div>

                </div>

                {/* Card Bottom */}
                <div className="flyixo-testimonial-card-footer">
                  <span>FLYIXO EXPERIENCE</span>

                  <span className="flyixo-footer-dot"></span>

                  <span>GLOBAL INTERNSHIP</span>
                </div>

                {/* Decorative Corner */}
                <span className="flyixo-testimonial-corner"></span>

              </article>
            )
          )}

        </div>

        {/* Scroll Hint */}
        <div className="flyixo-testimonial-scroll-hint">
          <span className="flyixo-scroll-dot"></span>
          <span>More experiences from our global interns</span>
          <span className="flyixo-scroll-arrow">→</span>
        </div>

        {/* Bottom Trust */}
        <div className="flyixo-testimonial-bottom">

          <div className="flyixo-testimonial-bottom-line"></div>

          <p>
            Real experiences. Global opportunities.{" "}
            <strong>Flyixo</strong>.
          </p>

          <div className="flyixo-testimonial-bottom-line"></div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;