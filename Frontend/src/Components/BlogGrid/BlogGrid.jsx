import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BlogGrid.css";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);

 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/published`);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  fetchBlogs();
}, []);


  // ✅ Helper: Format date like (26 / Nov)
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    return { day, month };
  };

  return (
    <section className="bloggrid-section">
      <motion.div
        className="bloggrid-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        {blogs.length === 0 ? (
          <p className="bloggrid-empty">No blogs found</p>
        ) : (
          blogs.map((post, index) => {
            const { day, month } = formatDate(post.createdAt);
            return (
              <motion.div
                key={post._id}
                className="bloggrid-card"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1, duration: 0.6 },
                }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
             <div
                  className="bloggrid-image"
                  style={{
                    backgroundImage: `url(${
                      post.imageUrl
                        ? `${BASE_URL.replace("/api", "")}/${post.imageUrl.replace(/\\/g, "/")}`
                        : "https://via.placeholder.com/600x400?text=No+Image"
                    })`,
                  }}
                >
                  <div className="bloggrid-date">
                    <span className="bloggrid-day">{day}</span>
                    <span className="bloggrid-month">{month}</span>
                  </div>
                  <div className="bloggrid-overlay"></div>
                </div>
                {/* Content Section */}
                <div className="bloggrid-content">
                  <div className="bloggrid-meta">
                    <span>👤 {post.author || "Unknown"}</span>
                    <span>💬 Comments (0)</span>
                  </div>

                  {/* Blog title */}
                  <Link
                    to={`/blog/details/${post._id}`}
                    className="bloggrid-title-link"
                  >
                    <h3 className="bloggrid-title">{post.title}</h3>
                  </Link>

                  <p className="bloggrid-desc">
                    {post.popularLine || post.desc.slice(0, 120) + "..."}
                  </p>

                  {/* Read More link */}
                  <motion.div whileHover={{ x: 6 }}>
                    <Link
                      to={`/blog/details/${post._id}`}
                      className="bloggrid-readmore"
                    >
                      Read More <span>➡</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </section>
  );
};

export default BlogGrid;
