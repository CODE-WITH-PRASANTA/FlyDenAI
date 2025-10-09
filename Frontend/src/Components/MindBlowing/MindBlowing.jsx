import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import mind1 from "../../assets/mind1.webp";
import mind2 from "../../assets/mind2.webp";
import cmnt1 from "../../assets/cmnt1.webp";
import cmnt2 from "../../assets/cmnt2.webp";
import cmnt3 from "../../assets/cmnt3.webp";
import "./MindBlowing.css";

const commentsData = [
  { name: "Rosalina Kelian", date: "19th May 2024", text: "Lorem ipsum dolor sit amet...", avatar: cmnt1 },
  { name: "Arista Williamson", date: "21st Feb 2024", text: "Lorem ipsum dolor sit amet...", avatar: cmnt2 },
  { name: "Salman Ahmed", date: "29th Jan 2021", text: "Lorem ipsum dolor sit amet...", avatar: cmnt3 },
];

const MindBlowing = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ comment, name, email, website });
    setComment(""); setName(""); setEmail(""); setWebsite("");
    alert("Comment submitted!");
  };

  return (
    <div className="blog-page">
      {/* ===== Main Blog Content ===== */}
      <main className="blog-main">
        <article className="blog-article">
          <h1 className="blog-title">Mind-Blowing Reasons Why Agency Uses This Technique</h1>

          <div className="blog-meta">
            <span>👤 Shikhon .Ha</span>
            <span>💬 {commentsData.length} Comments</span>
            <span>📅 4th February 2024</span>
          </div>

          <p className="blog-text">
            With worldwide annual spend on digital advertising surpassing $325 billion, 
            it’s no surprise that different approaches to online marketing are becoming available.
          </p>

          <img className="blog-image" src={mind1} alt="Blog Visual" />

          <h2 className="blog-subtitle">You Should Experience Agency At Least Once In Your Lifetime</h2>
          <p className="blog-text">
            Performance marketing is an approach where businesses only pay for specific results like leads or sales.
          </p>

          <blockquote className="blog-quote">
            Diam luctus nostra dapibus varius et semper semper rutrum ad risus felis eros.
          </blockquote>

          <ul className="blog-checklist">
            {["Cooking is love made visible", "We're an open book", "100% goes to the field", "Received the highest grades"].map((item, i) => (
              <li key={i} className="checklist-item">✔ {item}</li>
            ))}
          </ul>

          <section className="blog-performance">
            <h2 className="performance-title">Easy & Most Powerful Server Platform</h2>
            <p className="performance-text">
              Learn how performance marketing ensures measurable results and effective ad spend.
            </p>
            <div className="performance-content">
              <img className="performance-image" src={mind2} alt="Team working" />
              <p className="performance-text-block">
                Businesses pay only when specific actions are completed—like clicks, sales, or leads.
              </p>
            </div>
          </section>

          {/* Related Tags & Social */}
          <section className="blog-tags-social">
            <div className="blog-tags">
              <h3>Related Tags</h3>
              {["Development", "Visa", "Tech"].map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <div className="blog-social">
              <h3>Share this post</h3>
              <div className="social-icons">
                {[faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube].map((icon, i) => (
                  <a href="#" key={i}><FontAwesomeIcon icon={icon} /></a>
                ))}
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section className="blog-comments">
            <h3>Comments ({commentsData.length})</h3>
            {commentsData.map((c, i) => (
              <div key={i} className="comment-card">
                <img src={c.avatar} alt={c.name} className="comment-avatar" />
                <div className="comment-body">
                  <div className="comment-header">
                    <span className="comment-name">{c.name}</span>
                    <span className="comment-date">{c.date}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                  <button className="reply-button">Reply</button>
                </div>
              </div>
            ))}

            <form className="comment-form" onSubmit={handleSubmit}>
              <h4>Post Comment</h4>
              <textarea placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="url" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              <button type="submit">Post Comment</button>
            </form>
          </section>
        </article>
      </main>

      {/* ===== Sidebar ===== */}
      <aside className="blog-sidebar">
        {/* Search */}
        <div className="sidebar-section search-box">
          <h4>Search</h4>
          <input type="text" placeholder="Keywords..." />
          <button>🔍</button>
        </div>

        {/* Popular Posts */}
        <div className="sidebar-section popular-posts">
          <h4>Popular Feeds</h4>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="sidebar-post">
              <img src={`https://source.unsplash.com/random/70x70?job,${i}`} alt="feed" />
              <div>
                <p>Top 25 Most In Demand Jobs In Canada</p>
                <span>📅 25th March 2024</span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="sidebar-section categories">
          <h4>Categories</h4>
          <ul>
            {["Abroad Study", "Green Card", "PR Applicants", "Travel Insurance", "Visa Consultancy", "Work Permits"].map((cat, i) => (
              <li key={i}>{cat}</li>
            ))}
          </ul>
        </div>

        {/* Popular Tags */}
        <div className="sidebar-section tags">
          <h4>Popular Tags</h4>
          <div>
            {["Business", "Consulting", "Education", "Immigration", "Travel", "Visa"].map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="sidebar-section socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {[faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube].map((icon, i) => (
              <a href="#" key={i}><FontAwesomeIcon icon={icon} /></a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MindBlowing;
