import React, { useEffect } from "react";
import "./ServiceLatestNews.css";
import {
  FaArrowRight,
  FaRegNewspaper,
  FaCalendarAlt,
} from "react-icons/fa";

import i1 from "../../assets/col-bgimage-12.jpg";

export default function ServiceLatestNews() {
  useEffect(() => {
    const articles = document.querySelectorAll(
      ".servicelatestnews-article"
    );

    if (!("IntersectionObserver" in window)) {
      articles.forEach((article) => {
        article.classList.add("animate-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    articles.forEach((article) => {
      observer.observe(article);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const relatedArticles = [
    {
      title: "Employment Insurance For Foreign Nationals",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description:
        "Learn the key details about employment insurance for foreign nationals and how it impacts your work abroad.",
    },
    {
      title: "Covid-19 And Its Impact On UK Immigration",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description:
        "Discover how the pandemic has reshaped UK immigration policies and what applicants need to know.",
    },
    {
      title: "How To Beat These Visa Application Tips!",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description:
        "Top tips and tricks to ensure your visa application is smooth and successful.",
    },
    {
      title: "UK To Offer Point-Based Immigration",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description:
        "Everything you need to know about the new UK point-based immigration system.",
    },
  ];

  return (
    <section className="full-servicelatest-news">
      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="servicelatestnews-background">
        <span className="servicelatestnews-bg-circle servicelatestnews-bg-circle-one"></span>
        <span className="servicelatestnews-bg-circle servicelatestnews-bg-circle-two"></span>

        <span className="servicelatestnews-bg-ring servicelatestnews-bg-ring-one"></span>
        <span className="servicelatestnews-bg-ring servicelatestnews-bg-ring-two"></span>

        <div className="servicelatestnews-grid-pattern"></div>
      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="servicelatestnews-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="servicelatestnews-header">
          <div className="servicelatestnews-badge">
            <span className="servicelatestnews-badge-icon">
              <FaRegNewspaper />
            </span>

            <span>FLYIXO INSIGHTS</span>
          </div>

          <p className="servicelatestnews-eyebrow">
            STAY INFORMED
          </p>

          <h2 className="servicelatestnews-heading">
            Latest
            <span> News & Insights</span>
          </h2>

          <p className="servicelatestnews-subheading">
            Stay updated with the latest articles, visa information,
            immigration updates, and international opportunities
            from Flyixo.
          </p>

          <div className="servicelatestnews-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* =================================================
            ARTICLES GRID
        ================================================= */}

        <div className="servicelatestnews-articles-grid">
          {relatedArticles.map((article, idx) => (
            <a
              href="#"
              className="servicelatestnews-article hidden"
              key={article.title}
              onClick={(event) => event.preventDefault()}
              style={{
                "--article-delay": `${idx * 0.12}s`,
              }}
            >
              {/* Card Number */}
              <div className="servicelatestnews-card-number">
                0{idx + 1}
              </div>

              {/* Image */}
              <div className="article-image">
                <img
                  src={article.img}
                  alt={`Flyixo - ${article.title}`}
                />

                <div className="article-image-overlay"></div>

                <div className="article-category">
                  FLYIXO NEWS
                </div>

                <div className="article-image-arrow">
                  <FaArrowRight />
                </div>
              </div>

              {/* Content */}
              <div className="service-news-content">
                <div className="article-top-meta">
                  <span className="article-meta-icon">
                    <FaCalendarAlt />
                  </span>

                  <span className="article-meta">
                    {article.meta}
                  </span>
                </div>

                <div className="article-title-line"></div>

                <h3 className="article-title">
                  {article.title}
                </h3>

                <p className="article-description">
                  {article.description}
                </p>

                {/* Read More */}
                <div className="article-read-more">
                  <span>Read More</span>

                  <span className="article-read-more-arrow">
                    <FaArrowRight />
                  </span>
                </div>

                {/* Brand */}
                <div className="article-brand">
                  <span>FLY</span>IXO
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* =================================================
            BOTTOM AREA
        ================================================= */}

        <div className="servicelatestnews-footer">
          <div className="servicelatestnews-footer-line"></div>

          <div className="servicelatestnews-footer-content">
            <span className="footer-dot"></span>

            <span>
              Discover more global opportunities with
              <strong> Flyixo</strong>
            </span>

            <span className="footer-dot"></span>
          </div>

          <div className="servicelatestnews-footer-line"></div>
        </div>
      </div>
    </section>
  );
}