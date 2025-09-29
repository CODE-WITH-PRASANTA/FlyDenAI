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
    },
    {
      title: "Covid-19 And Its Impact On UK Immigration",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
    },
    {
      title: "How To Beat These Visa Application Tips!",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
    },
    {
      title: "UK To Offers Point Based Immigration",
      meta: "ALEX | 0 COMMENTS",
      img: i1,
    },
  ];

  return (
    <section className="servicelatestnews-container">
      {/* Header */}
      <div className="servicelatestnews-header">
        <h2 className="servicelatestnews-heading">LATEST NEWS</h2>
        <p className="servicelatestnews-subheading">
          Truvik gets more articles from our resources and news
        </p>
      </div>

      {/* Main Content */}
      <div className="servicelatestnews-content">
        {/* Left Image */}
        <div className="servicelatestnews-image">
          <img src={i1} alt="Family at airport" />
        </div>

        {/* Right News */}
        <div className="servicelatestnews-news">
          <h3 className="servicelatestnews-news-heading">
            Employment Insurance For Foreign Nationals
          </h3>
          <p className="servicelatestnews-news-text">
            Nunc mi ipsum faucibus vitae. Mauris vitae ultricies leo integer
            malesuada nunc vel risus commodo. Non blandit massa enim nec dui
            turpis nunc eget nunc.
          </p>

          {/* Related Articles */}
          <div className="servicelatestnews-related-articles">
            {relatedArticles.map((article, idx) => (
              <div className="servicelatestnews-article hidden" key={idx}>
                <div className="article-image">
                  <img src={article.img} alt={article.title} />
                </div>
                <span className="article-meta">{article.meta}</span>
                <a href="#" className="article-title">
                  {article.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
