import React from "react";
import "./NewsBlog.css";
import { FaUserAlt, FaComments } from "react-icons/fa";
import i1 from "../../assets/nb1.webp";
import i2 from "../../assets/nb2.webp";
import i3 from "../../assets/nb3.webp";
import mind1 from "../../assets/mind1.webp";





const blogs = [
  {
    date: "26",
    month: "Nov",
    image: i1, // your image path
    author: "Shikhon .H",
    comments: "03",
    title: "Navigating Borders Ultimate Guide To Visa Success",
    desc: "Transmds is the world’s driving worldwide coordinations supplier we uphold.",
    link: "#"
  },
  {
    date: "11",
    month: "Dec",
    image: i2, // your image path
    author: "Shikhon .H",
    comments: "03",
    title: "Unlocking Opportunities The Visa Journey Unveiled",
    desc: "Transmds is the world’s driving worldwide coordinations supplier we uphold.",
    link: "#"
  },
  {
    date: "27",
    month: "Sep",
    image: i3, // your image path
    author: "Shikhon .H",
    comments: "03",
    title: "Navigating Borders Ultimate Guide To Visa Success",
    desc: "Transmds is the world’s driving worldwide coordinations supplier we uphold.",
    link: "#"
  }
];

const NewsBlog = () => {
  return (
    <section className="newblog">
      <div className="newblog-header">
        <h2 style={{ color: "#e63946" }}>NEWS & BLOG</h2>
        <p>Read Our Latest News & Blog</p>
      </div>
      <div className="newblog-container">
        {blogs.map((blog, index) => (
          <div className="newblog-card" key={index}>
            <div className="newblog-image">
              <img src={blog.image} alt={blog.title} />
              <div className="newblog-date">
                <span className="day">{blog.date}</span>
                <span className="month">{blog.month}</span>
              </div>
            </div>

            <div className="newblog-content">
              <div className="newblog-meta">
                <span><FaUserAlt /> {blog.author}</span>
                <span><FaComments /> Comments ({blog.comments})</span>
              </div>
              <h3 className="newblog-title">{blog.title}</h3>
              <p className="newblog-desc">{blog.desc}</p>
              <a href={blog.link} className="newblog-read-more">
                Read More <span>&#8594;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsBlog;