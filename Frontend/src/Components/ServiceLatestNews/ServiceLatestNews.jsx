import React, { useEffect } from "react";
import "./ServiceLatestNews.css";
import i1 from "../../assets/col-bgimage-12.jpg";

export default function ServiceLatestNews() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".servicelatestnews-article").forEach((el) => {
      observer.observe(el);
    });
  }, []);

  const relatedArticles = [
    {
      title: "Employment Insurance For Foreign Nationals",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description: "Learn the key details about employment insurance for foreign nationals and how it impacts your work abroad."
    },
    {
      title: "Covid-19 And Its Impact On UK Immigration",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description: "Discover how the pandemic has reshaped UK immigration policies and what applicants need to know."
    },
    {
      title: "How To Beat These Visa Application Tips!",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description: "Top tips and tricks to ensure your visa application is smooth and successful."
    },
    {
      title: "UK To Offer Point-Based Immigration",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
      description: "Everything you need to know about the new UK point-based immigration system."
    },
  ];

  return (
    <div className="full-servicelatest-news">
    <section className="servicelatestnews-container">
      {/* Header */}
      <div className="servicelatestnews-header">
        <h2 className="servicelatestnews-heading">LATEST NEWS</h2>
        <p className="servicelatestnews-subheading">
          Stay updated with our latest articles and insights
        </p>
      </div>

      {/* Articles Grid */}
      <div className="servicelatestnews-articles-grid">
        {relatedArticles.map((article, idx) => (
          <a href="#" className="servicelatestnews-article hidden" key={idx}>
            <div className="article-image">
              <img src={article.img} alt={article.title} />
            </div>
            <div className="service-news-content">
            <span className="article-meta">{article.meta}</span>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-description">{article.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
    </div>
  );
}
