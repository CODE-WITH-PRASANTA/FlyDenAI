import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // import Link
import "./BlogGrid.css";
import i1 from "../../assets/nb1.webp";
import i2 from "../../assets/nb2.webp";
import i3 from "../../assets/nb3.webp";

const blogPosts = [
  {
    date: "26",
    month: "Nov",
    title: "Top 10 Visa Hacks You Need Before Traveling Abroad",
    image: i1,
    author: "John Carter",
    comments: 5,
    desc: "Discover the insider tips and expert-approved methods to make your visa process smoother and faster than ever.",
  },
  {
    date: "11",
    month: "Dec",
    title: "The Hidden Secrets Behind Visa Approvals Revealed",
    image: i2,
    author: "Sophia Lee",
    comments: 8,
    desc: "Ever wondered why some applications get approved instantly? Learn what really makes a difference in 2025.",
  },
  {
    date: "27",
    month: "Sep",
    title: "Visa Interview Mastery: Answer Any Question With Confidence",
    image: i3,
    author: "Daniel Green",
    comments: 4,
    desc: "From first-time travelers to frequent flyers, this guide reveals the key strategies to impress visa officers.",
  },
  {
    date: "05",
    month: "Jan",
    title: "Step-by-Step Visa Success Blueprint For Beginners",
    image: i2,
    author: "Olivia Stone",
    comments: 6,
    desc: "New to the process? Follow this complete checklist to ensure your first visa application is a success story.",
  },
  {
    date: "14",
    month: "Feb",
    title: "Avoid These 7 Costly Mistakes When Applying For Visa",
    image: i3,
    author: "Michael Brown",
    comments: 9,
    desc: "Many applicants lose their chances due to tiny errors. Learn what to double-check before hitting submit.",
  },
  {
    date: "22",
    month: "Mar",
    title: "2025 Visa Trends: What’s Changing & How To Prepare",
    image: i1,
    author: "Emma Davis",
    comments: 3,
    desc: "The visa landscape is evolving fast — here’s everything you must know to stay ahead of the approval curve.",
  },
];

const BlogGrid = () => {
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
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
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
            <div
              className="bloggrid-image"
              style={{ backgroundImage: `url(${post.image})` }}
            >
              <div className="bloggrid-date">
                <span className="bloggrid-day">{post.date}</span>
                <span className="bloggrid-month">{post.month}</span>
              </div>
              <div className="bloggrid-overlay"></div>
            </div>

            <div className="bloggrid-content">
              <div className="bloggrid-meta">
                <span>👤 {post.author}</span>
                <span>💬 Comments ({post.comments})</span>
              </div>

              {/* Wrap the title in Link */}
              <Link to="/blog/details" className="bloggrid-title-link">
                <h3 className="bloggrid-title">{post.title}</h3>
              </Link>

              <p className="bloggrid-desc">{post.desc}</p>

              {/* Use Link for Read More */}
              <motion.div whileHover={{ x: 6 }}>
                <Link to="/blog/details" className="bloggrid-readmore">
                  Read More <span>➡</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BlogGrid;
