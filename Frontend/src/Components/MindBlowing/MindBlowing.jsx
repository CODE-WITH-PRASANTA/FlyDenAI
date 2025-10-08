import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mind2 from "../../assets/mind2.webp";
import mind1 from "../../assets/mind1.webp";
import cmnt from "../../assets/cmnt1.webp";
import cmnt2 from "../../assets/cmnt2.webp";
import cmnt3 from "../../assets/cmnt3.webp";

import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./MindBlowing.css";

const commentsData = [
  {
    name: "Rosalina Kelian",
    date: "19th May 2024",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad minim veniam, quis nostrud laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: cmnt,
  },
  {
    name: "Arista Williamson",
    date: "21st Feb 2024",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco nisi ut aliquip ex ea commodo consequat.",
    avatar: cmnt2,
  },
  {
    name: "Salman Ahmed",
    date: "29th Jan 2021",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..",
    avatar: cmnt3,
  },
];

const MindBlowing = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ comment, name, email, website });
    setComment("");
    setName("");
    setEmail("");
    setWebsite("");
    alert("Comment submitted!");
  };

  return (
    <div className="mindblowing-container">
      {/* ===== Main Content ===== */}
      <div className="mindblowing-main">
        <h1 className="mindblowing-title">
          Mind-Blowing Reasons Why Agency Is Using This Technique For Exposure.
        </h1>

        <div className="mindblowing-meta">
          <span>👤 Shikhon .Ha</span>
          <span>💬 {commentsData.length} Comments</span>
          <span>📅 4th February 2024</span>
        </div>

        <p className="mindblowing-text">
          With worldwide annual spend on digital advertising surpassing $325
          billion, it’s no surprise that different approaches to online
          marketing are becoming available. One of these new approaches is
          performance marketing or digital performance marketing.
        </p>

        <p className="mindblowing-text">
          Keep reading to learn all about performance marketing, from how it
          works to how it compares to digital marketing. Plus, get insight into
          the benefits and risks of performance marketing and how it can affect
          your company’s long-term success.
        </p>

        <img
          className="mindblowing-image"
          src={mind1}
          alt="Blog visual"
        />

        <h2 className="mindblowing-subtitle">
          You Should Experience Agency At Least Once In Your Lifetime And Here's
          Why.
        </h2>

        <p className="mindblowing-text">
          Performance marketing is an approach to digital marketing or
          advertising where businesses only pay when a specific result occurs.
          This result could be a new lead, sale, or other outcome agreed upon
          by the advertiser and business.
        </p>

        <div className="mindblowing-quote">
          <p>
            Diam luctus nostra dapibus varius et semper semper rutrum ad risus
            felis eros. Cursus libero viverra tempus netus diam vestibulum.
          </p>
        </div>

        <p className="mindblowing-text">
          With worldwide annual spend on digital advertising surpassing $325
          billion, it’s no surprise that different approaches to online
          marketing are becoming available. One of these new approaches is
          performance marketing or digital performance marketing.
        </p>

        {/* Checklist */}
        <div className="checklist">
          {[
            "Cooking is love made visible",
            "We're an open book",
            "100% goes to the field",
            "Received the highest grades",
          ].map((item, index) => (
            <div key={index} className="checklist-item">
              <span className="check">&#10003;</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Performance Marketing */}
        <div className="performance-marketing">
          <h1 className="performance-title">
            Easy & Most Powerful Server Platform.
          </h1>
          <p className="performance-intro">
            With worldwide annual spend on digital advertising surpassing $325
            billion, it’s no surprise that different approaches to online
            marketing are becoming available. One of these new approaches is
            performance marketing or digital performance marketing. Keep
            reading to learn all about performance marketing, from how it works
            to how it compares to digital marketing.
          </p>

          <div className="performance-content">
            <div className="performance-image-wrapper">
              <img
                className="performance-image"
                src={mind2}
                alt="Team discussing in office"
              />
            </div>

            <div className="performance-text-block">
              <p>
                Performance marketing is an advertising strategy where
                businesses pay only when specific actions are completed—like
                clicks, sales, or leads.
              </p>
              <p>
                This data-driven approach ensures brands spend their marketing
                budget effectively while gaining measurable insights into
                performance.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tags + Social */}
        <div className="related-tags-container">
          <div className="related-tags">
            <h2 className="related-tags-heading">Related Tags</h2>
            <div className="tags">
              <span className="tag">Development</span>
              <span className="tag">Visa</span>
              <span className="tag">Tech</span>
            </div>
          </div>

          <div className="social-share">
            <h2 className="social-share-heading">Share this post</h2>
      <div className="social-icons">
      <a href="#" className="fb">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="#" className="tw">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="#" className="ig">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="#" className="li">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a href="#" className="yt">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
    </div>
          </div>
        </div>

        {/* Comments */}
        <div className="comments-section">
          <h2 className="comments-title">Comments ({commentsData.length})</h2>
          {commentsData.map((comment, i) => (
            <div className="comment-card" key={i}>
              <div className="comment-avatar">
                <img src={comment.avatar} alt={comment.name} />
              </div>
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-name">{comment.name}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                <button className="reply-button">Reply</button>
              </div>
            </div>
          ))}

          <div className="new-comment">
  <h3 className="comments-title">Post Comment</h3>

  <textarea
    placeholder="Write a comment..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    className="comment-textarea"
  />

  <input
    type="text"
    placeholder="Type your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="comment-input"
  />

  <input
    type="email"
    placeholder="Type your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="comment-input"
  />

  <input
    type="url"
    placeholder="Type your website"
    value={website}
    onChange={(e) => setWebsite(e.target.value)}
    className="comment-input"
  />

  <button className="submit-comment" onClick={handleSubmit}>
    Post Comment
  </button>
</div>

        </div>
      </div>

      {/* ===== Sidebar ===== */}
      <div className="mindblowing-sidebar">
        {/* Search Box */}
        <div className="mindblowing-searchbox">
          <h3 className="mindblowing-heading">
            <span className="dash">—</span> Search
          </h3>
          <div className="mindblowing-search">
            <input type="text" placeholder="Keywords Here...." />
            <button>🔍</button>
          </div>
        </div>

        {/* Popular Feeds */}
        <div className="mindblowing-popular">
          <h3 className="mindblowing-heading">
            <span className="dash">—</span> Popular Feeds
          </h3>
          {[1, 2, 3].map((_, i) => (
            <div className="mindblowing-feed" key={i}>
              <img
                src={`https://source.unsplash.com/random/70x70?job,${i}`}
                alt="feed"
              />
              <div>
                <p className="feed-title">
                  Top 25 Most In Demand Jobs In Canada
                </p>
                <span className="feed-date">📅 25th March 2024</span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mindblowing-categories">
          <h3 className="mindblowing-heading">
            <span className="dash">—</span> Categories
          </h3>
          <ul className="category-list">
            {[
              ["Abroad Study", 23],
              ["Green Card", 24],
              ["PR Applicants", 11],
              ["Travel Insurance", 5],
              ["Visa Consultancy", 6],
              ["Work Permits", 10],
            ].map(([cat, count], i) => (
              <li key={i}>
                <span>{cat}</span>
                <span className="cat-count">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Never Miss News */}
        <div className="mindblowing-news">
          <h3 className="mindblowing-heading">
            <span className="dash">—</span> Never Miss News
          </h3>
          <div className="news-socials">
            {[faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube].map(
              (icon, i) => (
                <a href="#" key={i}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              )
            )}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mindblowing-tags">
          <h3 className="mindblowing-heading">
            <span className="dash">—</span> Popular Tags
          </h3>
          <div className="tags-list">
            {[
              "Business",
              "Consulting",
              "Education",
              "Immigration",
              "Travel",
              "Visa",
            ].map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindBlowing;
