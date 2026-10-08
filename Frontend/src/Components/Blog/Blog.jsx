import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Blog.css";
import BASE_URL from "../../Api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${BASE_URL}/blogs/published`);

        /*
          Supports both:
          1. res.data = [...]
          2. res.data.data = [...]
        */
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setPosts(res.data.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Unable to load blogs. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return {
        day: "--",
        month: "---",
      };
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return {
        day: "--",
        month: "---",
      };
    }

    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleString("default", {
        month: "short",
      }),
    };
  };

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/900x600?text=Flyixo+Blog";
    }

    /*
      If backend already gives a complete URL
    */
    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://") ||
      imageUrl.startsWith("data:") ||
      imageUrl.startsWith("blob:")
    ) {
      return imageUrl;
    }

    /*
      Remove /api from:
      http://localhost:5000/api

      Result:
      http://localhost:5000
    */
    const serverUrl = BASE_URL.replace(/\/api\/?$/, "");

    const cleanPath = imageUrl
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");

    return `${serverUrl}/${cleanPath}`;
  };

  /* =========================================================
     CATEGORY
  ========================================================= */

  const getCategory = (post) => {
    return (
      post.category ||
      post.blogCategory ||
      post.type ||
      "Travel Guide"
    );
  };

  /* =========================================================
     READ TIME
  ========================================================= */

  const getReadTime = (post) => {
    return (
      post.readTime ||
      post.readingTime ||
      "5 min read"
    );
  };

  /* =========================================================
     COMMENTS
  ========================================================= */

  const getCommentsCount = (post) => {
    if (typeof post.commentsCount === "number") {
      return post.commentsCount;
    }

    if (Array.isArray(post.comments)) {
      return post.comments.length;
    }

    if (typeof post.comments === "number") {
      return post.comments;
    }

    return 0;
  };

  /* =========================================================
     DESCRIPTION
  ========================================================= */

  const getDescription = (post) => {
    const description =
      post.popularLine ||
      post.desc ||
      post.description ||
      "Discover useful travel insights, destination guides and helpful travel information.";

    return description.length > 150
      ? `${description.slice(0, 150)}...`
      : description;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="blogsec-section">
        <div className="blogsec-bg blogsec-bg-one"></div>
        <div className="blogsec-bg blogsec-bg-two"></div>
        <div className="blogsec-grid-pattern"></div>

        <div className="blogsec-container">
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
              Stay updated with the latest immigration news,
              visa guidance, study abroad opportunities, and
              international travel insights from Flyixo.
            </p>

            <div className="blogsec-heading-line">
              <span></span>
              <i></i>
              <span></span>
            </div>
          </div>

          <div className="blogsec-loading">
            <div className="blogsec-loader"></div>
            <p>Loading latest blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <section className="blogsec-section">
        <div className="blogsec-bg blogsec-bg-one"></div>
        <div className="blogsec-bg blogsec-bg-two"></div>
        <div className="blogsec-grid-pattern"></div>

        <div className="blogsec-container">
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
          </div>

          <div className="blogsec-error">
            <div className="blogsec-error-icon">!</div>

            <h3>Unable to load blogs</h3>

            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blogsec-section">

      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="blogsec-bg blogsec-bg-one"></div>
      <div className="blogsec-bg blogsec-bg-two"></div>
      <div className="blogsec-grid-pattern"></div>

      <div className="blogsec-container">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <motion.div
          className="blogsec-header"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
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
            Stay updated with the latest immigration news,
            visa guidance, study abroad opportunities, and
            international travel insights from Flyixo.
          </p>

          <div className="blogsec-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </motion.div>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {posts.length === 0 && (
          <motion.div
            className="blogsec-empty"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="blogsec-empty-icon">
              ✈
            </div>

            <h3>No Blogs Found</h3>

            <p>
              There are no published blogs available right now.
            </p>
          </motion.div>
        )}

        {/* =================================================
            BLOG GRID
        ================================================= */}

        {posts.length > 0 && (
          <div className="blogsec-grid">

            {posts.map((post, index) => {
              const { day, month } = formatDate(
                post.createdAt
              );

              const imageUrl = getImageUrl(
                post.imageUrl
              );

              const category = getCategory(post);

              const readTime = getReadTime(post);

              const commentsCount =
                getCommentsCount(post);

              const description =
                getDescription(post);

              return (
                <motion.article
                  key={post._id || post.id || index}
                  className="blogsec-card"
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.65,
                    delay: Math.min(
                      index * 0.08,
                      0.4
                    ),
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="blogsec-img">

                    <img
                      src={imageUrl}
                      alt={
                        post.title ||
                        "Flyixo Blog"
                      }
                      className="blogsec-image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://via.placeholder.com/900x600?text=Flyixo+Blog";
                      }}
                    />

                    <div className="blogsec-image-overlay"></div>

                    {/* Flyixo Tag */}
                    <span className="blogsec-image-tag">
                      FLYIXO
                    </span>

                    {/* Date */}
                    <div className="blogsec-date">
                      <h4>{day}</h4>

                      <p>{month}</p>
                    </div>

                    {/* Category */}
                    <div className="blogsec-category">
                      <span>✦</span>

                      <span>
                        {category}
                      </span>
                    </div>

                    {/* Read Time */}
                    <div className="blogsec-readtime">
                      <span>◷</span>

                      <span>
                        {readTime}
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="blogsec-info">

                    {/* Meta */}
                    <div className="blogsec-meta-wrapper">
                      <div className="blogsec-meta">

                        <span className="blogsec-meta-author">
                          👤{" "}
                          {post.author ||
                            "Flyixo Travel"}
                        </span>

                        <span className="blogsec-meta-separator">
                          |
                        </span>

                        <span>
                          💬{" "}
                          {commentsCount} Comments
                        </span>

                      </div>
                    </div>

                    {/* Title */}
                    <Link
                      to={`/blog/details/${post._id}`}
                      className="blogsec-post-title-link"
                    >
                      <h3 className="blogsec-post-title">
                        {post.title ||
                          "Untitled Blog"}
                      </h3>
                    </Link>

                    {/* Divider */}
                    <div className="blogsec-card-divider">
                      <span></span>
                    </div>

                    {/* Description */}
                    <p className="blogsec-desc">
                      {description}
                    </p>

                    {/* Bottom */}
                    <div className="blogsec-card-bottom">

                      <Link
                        to={`/blog/details/${post._id}`}
                        className="blogsec-link"
                      >
                        <span>
                          Read More
                        </span>

                        <span className="blogsec-link-arrow">
                          →
                        </span>
                      </Link>

                      <span className="blogsec-brand-mark">
                        Flyixo
                      </span>

                    </div>

                  </div>

                  {/* Bottom accent */}
                  <div className="blogsec-card-accent"></div>

                </motion.article>
              );
            })}

          </div>
        )}

        {/* =================================================
            BOTTOM TEXT
        ================================================= */}

        {posts.length > 0 && (
          <motion.div
            className="blogsec-bottom"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
          >
            <div className="blogsec-bottom-line"></div>

            <p>
              Discover more global opportunities with{" "}
              <strong>Flyixo</strong>.
            </p>

            <div className="blogsec-bottom-line"></div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Blog;