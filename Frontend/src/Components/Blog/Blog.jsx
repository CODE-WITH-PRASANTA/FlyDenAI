import React from "react";
import "./Blog.css";
import b1 from "../../assets/b1.jpg"; 
import b3 from "../../assets/b3.jpg"
import b4 from "../../assets/b4.jpg"
import b5 from "../../assets/DI.jpg"

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
    <section className="blog-section">
      <div className="blog-header">
        <div>
          <p className="blog-subtitle">OUR NEWS</p>
          <h2 className="blog-title">
            Read inspirational story our <span>Blog</span>
          </h2>
        </div>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-img">
              <img src={post.img} alt={post.title} />
              <div className="blog-date">
                <h4>{post.date}</h4>
                <p>{post.month}</p>
              </div>
            </div>
            <div className="blog-info">
              <p className="blog-meta">
                {post.author} | {post.comments} COMMENTS
              </p>
              <h3>{post.title}</h3>
              <p className="blog-desc">{post.desc}</p>
              <a href="#" className="blog-link">
                View More &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
