import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BlogGrid.css";
import BASE_URL from "../../Api";

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${BASE_URL}/blogs/published`);

        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setBlogs(res.data.data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Unable to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) {
      return {
        day: "--",
        month: "---",
      };
    }

    const date = new Date(isoDate);

    if (Number.isNaN(date.getTime())) {
      return {
        day: "--",
        month: "---",
      };
    }

    const day = date.getDate().toString().padStart(2, "0");

    const month = date.toLocaleString("default", {
      month: "short",
    });

    return {
      day,
      month,
    };
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/900x600?text=Flyixo+Blog";
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://") ||
      imageUrl.startsWith("data:") ||
      imageUrl.startsWith("blob:")
    ) {
      return imageUrl;
    }

    const serverUrl = BASE_URL.replace(/\/api\/?$/, "");

    const cleanPath = imageUrl
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");

    return `${serverUrl}/${cleanPath}`;
  };

  const getCategory = (post) => {
    return (
      post.category ||
      post.blogCategory ||
      post.type ||
      "Travel Guide"
    );
  };

  const getReadTime = (post) => {
    return post.readTime || post.readingTime || "5 min read";
  };

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

  return (
    <section className="bloggrid-section">
      {/* Background decorations */}
      <div className="bloggrid-bg bloggrid-bg-one" />
      <div className="bloggrid-bg bloggrid-bg-two" />
      <div className="bloggrid-bg bloggrid-bg-three" />
      <div className="bloggrid-grid-pattern" />

      <div className="bloggrid-container">
        {/* Header */}
        <motion.div
          className="bloggrid-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bloggrid-eyebrow">
            <span className="bloggrid-eyebrow-line" />
            <span>FLYIXO TRAVEL BLOG</span>
            <span className="bloggrid-eyebrow-line" />
          </div>

          <h2 className="bloggrid-main-title">
            Latest <span>Travel</span> Insights
          </h2>

          <p className="bloggrid-subtitle">
            Discover travel tips, destination guides and expert advice
            to make your next journey unforgettable.
          </p>

          <div className="bloggrid-title-decoration">
            <span />
            <i />
            <span />
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="bloggrid-loading-container">
            <div className="bloggrid-loading">
              <span className="bloggrid-loader" />
              <p>Loading travel stories...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <motion.div
            className="bloggrid-error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bloggrid-error-icon">!</div>

            <h3>Something went wrong</h3>

            <p>{error}</p>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && blogs.length === 0 && (
          <motion.div
            className="bloggrid-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bloggrid-empty-icon">✈</div>

            <h3>No Blogs Found</h3>

            <p>
              We don't have any travel stories available right now.
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="bloggrid-list">
            {blogs.map((post, index) => {
              const { day, month } = formatDate(post.createdAt);

              const imageUrl = getImageUrl(post.imageUrl);

              const category = getCategory(post);

              const readTime = getReadTime(post);

              const commentsCount = getCommentsCount(post);

              const description = getDescription(post);

              return (
                <motion.article
                  key={post._id || index}
                  className="bloggrid-card"
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
                    delay: Math.min(index * 0.08, 0.45),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >
                  {/* Image */}
                  <div className="bloggrid-image">
                    <img
                      src={imageUrl}
                      alt={post.title || "Flyixo travel blog"}
                      className="bloggrid-image-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/900x600?text=Flyixo+Blog";
                      }}
                    />

                    <div className="bloggrid-image-overlay" />

                    <div className="bloggrid-image-shine" />

                    {/* Date */}
                    <div className="bloggrid-date">
                      <span className="bloggrid-day">{day}</span>

                      <span className="bloggrid-month">
                        {month}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="bloggrid-category">
                      <span className="bloggrid-category-icon">
                        ✦
                      </span>

                      <span>{category}</span>
                    </div>

                    {/* Read time */}
                    <div className="bloggrid-readtime">
                      <span className="bloggrid-readtime-icon">
                        ◷
                      </span>

                      <span>{readTime}</span>
                    </div>

                    {/* Brand */}
                    <div className="bloggrid-image-brand">
                      FLYIXO
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bloggrid-content">
                    {/* Meta */}
                    <div className="bloggrid-meta">
                      <div className="bloggrid-meta-item">
                        <span className="bloggrid-meta-icon">
                          👤
                        </span>

                        <span>
                          {post.author || "Flyixo Travel"}
                        </span>
                      </div>

                      <div className="bloggrid-meta-divider" />

                      <div className="bloggrid-meta-item">
                        <span className="bloggrid-meta-icon">
                          💬
                        </span>

                        <span>
                          {commentsCount} Comments
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link
                      to={`/blog/details/${post._id}`}
                      className="bloggrid-title-link"
                    >
                      <h3 className="bloggrid-title">
                        {post.title || "Untitled Travel Story"}
                      </h3>
                    </Link>

                    {/* Divider */}
                    <div className="bloggrid-divider">
                      <span />
                    </div>

                    {/* Description */}
                    <p className="bloggrid-desc">
                      {description}
                    </p>

                    {/* Read More */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link
                        to={`/blog/details/${post._id}`}
                        className="bloggrid-readmore"
                      >
                        <span>Read More</span>

                        <span className="bloggrid-readmore-arrow">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="bloggrid-card-bottom" />
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Bottom Brand */}
        {!loading && !error && blogs.length > 0 && (
          <motion.div
            className="bloggrid-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span />

            <p>
              Explore more stories with{" "}
              <strong>Flyixo</strong>
            </p>

            <span />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;