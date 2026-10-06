import React from "react";
import "./Blog.css";

import b1 from "../../assets/b1.jpg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpg";
import b5 from "../../assets/DI.jpg";

const posts = [
  {
    id: 1,
    date: "15",
    month: "Aug",
    author: "Alex",
    comments: 0,
    title: "Employment Insurance For Foreign Nationals",
    desc: "Nunc mi ipsum faucibus vitae. Mauris vitae ultricies leo integer malesuada nunc vel risu...",
    img: b1,
  },
  {
    id: 2,
    date: "14",
    month: "Jul",
    author: "Alex",
    comments: 0,
    title: "Covid-19 And Its Impact On UK Immigration",
    desc: "Nunc mi ipsum faucibus vitae. Mauris vitae ultricies leo integer malesuada nunc vel risu...",
    img: b3,
  },
  {
    id: 3,
    date: "08",
    month: "Jun",
    author: "Alex",
    comments: 0,
    title: "How To Beat These Visa Application Tip!",
    desc: "Nunc mi ipsum faucibus vitae. Mauris vitae ultricies leo integer malesuada nunc vel risu...",
    img: b4,
  },
  {
    id: 4,
    date: "23",
    month: "May",
    author: "Alex",
    comments: 0,
    title: "UK To Offers Point Based Immigration Process",
    desc: "Nunc mi ipsum faucibus vitae. Mauris vitae ultricies leo integer malesuada nunc vel risu...",
    img: b5,
  },
];

const Blog = () => {
  return (
    <section className="blogsec-section">

      {/* Background Decorations */}
      <div className="blogsec-bg blogsec-bg-one"></div>
      <div className="blogsec-bg blogsec-bg-two"></div>
      <div className="blogsec-grid-pattern"></div>

      <div className="blogsec-container">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="blogsec-header">

          <span className="blogsec-eyebrow">
            FLYIXO INSIGHTS
          </span>

          <p className="blogsec-subtitle">
            OUR NEWS
          </p>

          <h2 className="blogsec-title">
            Read Inspirational Stories on Our{" "}
            <span>Blog</span>
          </h2>

          <p className="blogsec-header-description">
            Stay updated with the latest immigration news, visa
            guidance, study abroad opportunities, and international
            travel insights from Flyixo.
          </p>

          <div className="blogsec-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>

        </div>

        {/* =================================================
            BLOG GRID
        ================================================= */}

        <div className="blogsec-grid">

          {posts.map((post, index) => (
            <article
              key={post.id}
              className="blogsec-card"
              style={{
                "--blog-delay": `${index * 0.1}s`,
              }}
            >

              {/* Image */}
              <div className="blogsec-img">

                <img
                  src={post.img}
                  alt={`Flyixo - ${post.title}`}
                  className="blogsec-image"
                />

                <div className="blogsec-image-overlay"></div>

                {/* Image Tag */}
                <span className="blogsec-image-tag">
                  FLYIXO
                </span>

                {/* Date */}
                <div className="blogsec-date">
                  <h4>{post.date}</h4>
                  <p>{post.month}</p>
                </div>

              </div>

              {/* Content */}
              <div className="blogsec-info">

                {/* Meta */}
                <div className="blogsec-meta-wrapper">
                  <p className="blogsec-meta">
                    <span className="blogsec-meta-author">
                      BY {post.author}
                    </span>

                    <span className="blogsec-meta-separator">
                      |
                    </span>

                    <span>
                      {post.comments} COMMENTS
                    </span>
                  </p>
                </div>

                {/* Title */}
                <h3 className="blogsec-post-title">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="blogsec-desc">
                  {post.desc}
                </p>

                {/* Bottom */}
                <div className="blogsec-card-bottom">

                  <a
                    href="#"
                    className="blogsec-link"
                    onClick={(event) => event.preventDefault()}
                  >
                    <span>View More</span>

                    <span className="blogsec-link-arrow">
                      →
                    </span>
                  </a>

                  <span className="blogsec-brand-mark">
                    Flyixo
                  </span>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* Bottom Text */}
        <div className="blogsec-bottom">

          <div className="blogsec-bottom-line"></div>

          <p>
            Discover more global opportunities with{" "}
            <strong>Flyixo</strong>.
          </p>

          <div className="blogsec-bottom-line"></div>

        </div>

      </div>
    </section>
  );
};

export default Blog;