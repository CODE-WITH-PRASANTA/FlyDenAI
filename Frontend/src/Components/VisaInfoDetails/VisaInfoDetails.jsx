import React, { useState, useEffect } from "react";
import "./VisaInfoDetails.css";
import {
  Search,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { 
  FaFacebookF, 
  FaTwitter, 
  FaVimeoV, 
  FaYoutube,
  FaGooglePlusG, 
  FaLinkedinIn 
} from "react-icons/fa";

import visaMain from "../../assets/visa-info-main.webp";
import authorImg from "../../assets/ts2.webp";
import popular1 from "../../assets/ts7.webp";
import popular2 from "../../assets/ts6.webp";
import popular3 from "../../assets/ts5.webp";
import popular4 from "../../assets/ts4.webp";

import gallery1 from "../../assets/pp.webp";
import gallery2 from "../../assets/pp2.webp";
import gallery3 from "../../assets/pp3.webp";
import gallery4 from "../../assets/pp4.webp";
import gallery5 from "../../assets/have.webp";
import gallery6 from "../../assets/have2.webp";

import commentImg1 from "../../assets/test1.webp";
import commentImg2 from "../../assets/test2.webp";

const popularPosts = [
  {
    img: popular1,
    category: "IMMIGRATION",
    title: "Citizenship Concept on How to Become a UK Citizen.",
    likes: 12,
    comments: 3,
  },
  {
    img: popular2,
    category: "TOURIST",
    title: "Top 10 Travel Destinations for 2025 You Must Visit.",
    likes: 18,
    comments: 6,
  },
  {
    img: popular3,
    category: "NEWS & TIPS",
    title: "Important Visa Updates for International Students.",
    likes: 25,
    comments: 10,
  },
  {
    img: popular4,
    category: "RESIDENT",
    title: "How to Get Long-Term Residency in the UK Easily.",
    likes: 15,
    comments: 5,
  },
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const VisaInfoDetails = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % popularPosts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [popularPosts.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % popularPosts.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + popularPosts.length) % popularPosts.length);

  return (
    <section className="visa-info-details">
      <div className="visa-info-details-container">
        {/* LEFT SIDE CONTENT */}
        <div className="visa-info-details-left">
          <div className="visa-info-details-author">
            <img src={authorImg} alt="Author" className="visa-info-details-author-img" />
            <div>
              <p className="visa-info-details-author-category">
                <span className="visa-info-details-dot"></span> IMMIGRATION
              </p>
              <p className="visa-info-details-author-name">
                Post By: <strong>Colmin O'Neill</strong>
              </p>
            </div>
          </div>

          <h2 className="visa-info-details-title">
            Citizenship Concept on How to Become a UK Citizen
          </h2>

          <div className="visa-info-details-image-wrapper">
            <img src={visaMain} alt="Visa Info" className="visa-info-details-image" />
          </div>

          <p className="visa-info-details-text">
            Laborious physical exercise excepts obtain some advantage from in which toil and pain procure him some great foresee the pain and trouble that are bound not know how to pursue pleasure rationally encounter consequences that extremely painful or again is there anyone who loves or pursues or desires these cases are perfectly simple and easy to distinguish. In a free hours when our power choice is untrammelled and when nothing prevents righteous indignation and dislike men who are so beguiled and demoralized by that charms of pleasure of the moment so blinded by desire.
            <br /> <br />
            Toil and pain procure him some great foresee the pain and trouble that are bound not know how to pursue pleasure rationally encounter consequences that extremely painful or again is there anyone who loves or pursues or desires these cases are perfectly simple and easy to distinguish in a free hours when our power choice is untrammelled and when nothing prevents righteous indignation.
          </p>

          {/* ADDITIONAL DETAILS SECTION */}
          <div className="visa-info-details-points">
            <div className="visa-info-details-point">
              <div className="visa-info-details-bullet"></div>
              <div>
                <h4>Know Your Occupation</h4>
                <p>
                  Untrammelled and when nothing prevent work being able to do what we like
                  best every pleasures is all but in certain duty one who avoids a pain
                  that of the moment.
                </p>
              </div>
            </div>

            <div className="visa-info-details-point">
              <div className="visa-info-details-bullet"></div>
              <div>
                <h4>No Language Requirement</h4>
                <p>
                  Indignation and dislike men who are beguiled and demoralized by the
                  charms all pleasure the moment foresee occasionally circumstances occur
                  in demoralized by the charms.
                </p>
                <ul>
                  <li>That extremely painful or again is there anyone.</li>
                  <li>Indignation and dislike men who are so beguiled and demoralized.</li>
                  <li>Desires these cases are perfectly simple easy distinguish.</li>
                </ul>
              </div>
            </div>

            <div className="visa-info-details-req">
              <h3>Requirements for Citizenship</h3>
              <p>
                Idea of denouncing pleasure and praising pain was born and will give you
                complete account of the system and expound the actual teachings of the
                great explorer of the truth the master builder of human happiness one
                rejects dislikes pleasure undertakes laborious physical exercise.
              </p>
              <p>
                Praising pain was born and will give you complete account of the system
                and expound the actual teachings of the great explorer of the truth the
                master builder.
              </p>
            </div>
          </div>

          {/* ====== QUOTE + TAGS + SHARE SECTION ====== */}
       <div className="visa-info-quote-wrapper">
  {/* Quote Box */}
<div className="visa-info-quote-box">
  <span className="quote-mark quote-top">❝</span>
  <div className="visa-info-quote-content">
    <p className="visa-info-quote-text">
      UK is the most popular study destination in the world because of it’s modern learning environment.
    </p>
    <p className="visa-info-quote-author">~ Silvester Scott</p>
  </div>
  <span className="quote-mark quote-bottom">❝</span>
</div>


  {/* Description */}
  <div className="visa-info-quote-desc">
    <p>
      Beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire,
      that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs
      to those who fail in their duty through weakness of will, which is the same as saying through
      shrinking from toil and pain.
    </p>
    <p>
      In a free hour, when our power of choice is untrammelled and when nothing prevents our being
      able to do what we like best.
    </p>
  </div>

            {/* Tags + Share Row */}
            <div className="visa-info-tags-share">
              <div className="tags-section">
                <h4>TAGS</h4>
                <div className="tags-list">
                  <span># Agents</span>
                  <span># Business</span>
                  <span># Career</span>
                </div>
              </div>

              <div className="share-section">
                <h4>SHARE</h4>
                <div className="share-icons">
                  <a href="#"><FaFacebookF /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaVimeoV /></a>
                  <a href="#"><FaYoutube /></a>
                </div>
              </div>
            </div>
          </div>

          {/* About Author Section */}
          <div className="author-section">
            <h3 className="author-title">About Author</h3>

            <div className="author-card">
              <img src={authorImg} alt="Author" className="author-avatar" />

              <div className="author-details">
                <h4 className="author-name">Paul Anderson</h4>
                <p className="author-bio">
                  Undertakes laborious physical exercise, except to obtain some advantage
                  from it but who has any right to find fault with man who chooses to
                  enjoy a pleasure that has no annoying consequences.
                </p>

                <div className="author-social">
                  <a href="#"><FaFacebookF /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaGooglePlusG /></a>
                  <a href="#"><FaLinkedinIn /></a>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Comments Section ===== */}
          <div className="comments-section">
            <h3 className="comments-title">Comments</h3>

            {/* Comment 1 */}
            <div className="comment-item">
              <img src={commentImg1} alt="Isaac Herman" className="comment-avatar" />
              <div className="comment-content">
                <div className="comment-header">
                  <h4 className="comment-name">Isaac Herman</h4>
                  <span className="comment-date">JUNE 14, 2021 [11.00AM]</span>
                </div>
                <p className="comment-text">
                  How all this mistaken idea of denouncing pleasure and praising pain was
                  born and I will give you a complete account of the system.
                </p>
                <button className="comment-reply">
                  REPLY <span>&#8594;</span>
                </button>
              </div>
            </div>

            <hr className="comment-divider" />

            {/* Comment 2 */}
            <div className="comment-item">
              <img src={commentImg2} alt="William Cobus" className="comment-avatar" />
              <div className="comment-content">
                <div className="comment-header">
                  <h4 className="comment-name">William Cobus</h4>
                  <span className="comment-date">JUNE 14, 2021 [11.20AM]</span>
                </div>
                <p className="comment-text">
                  Undertakes laborious physical exercise, except to obtain some advantage
                  from it but who has any right to find fault desires to obtain pain.
                </p>
                <button className="comment-reply">
                  REPLY <span>&#8594;</span>
                </button>
              </div>
            </div>
          </div>

          {/* ===== Leave Comment Section ===== */}
          <div className="leave-comment">
            <h3 className="leave-comment-title">Send Your Comment</h3>
            <p className="leave-comment-text">
              Your email address will not be published. Required fields are marked *
            </p>

            <form className="comment-form">
              <div className="comment-form-row">
                <input type="text" placeholder="Your Name *" required />
                <input type="email" placeholder="Email Address *" required />
              </div>

              <textarea placeholder="Comment ..." rows="5" required></textarea>

              <button type="submit" className="comment-submit">
                POST COMMENT <span>&#8594;</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="visa-info-details-sidebar">
          {/* SEARCH BOX */}
          <div className="visa-info-details-search">
            <h3>Search</h3>
            <div className="visa-info-details-search-box">
              <input type="text" placeholder="Keyword..." />
              <Search className="visa-info-details-search-icon" size={18} />
            </div>
          </div>

          {/* POPULAR POST */}
          <div className="visa-info-details-popular">
            <div className="visa-info-details-popular-header">
              <h3>Popular Post</h3>
              <div className="visa-info-details-popular-controls">
                <button onClick={prevSlide}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextSlide}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="visa-info-details-popular-slider">
              <div className="visa-info-details-popular-card fade-in">
                <img
                  src={popularPosts[index].img}
                  alt="Popular Post"
                  className="visa-info-details-popular-img"
                />
                <div className="visa-info-details-popular-overlay">
                  <p className="visa-info-details-popular-category">
                    <span className="visa-info-details-dot"></span> {popularPosts[index].category}
                  </p>
                  <h4 className="visa-info-details-popular-title">{popularPosts[index].title}</h4>
                  <div className="visa-info-details-popular-icons">
                    <div className="visa-info-details-icon-item">
                      <Heart size={16} />
                      <span>{popularPosts[index].likes}</span>
                    </div>
                    <div className="visa-info-details-icon-item">
                      <MessageCircle size={16} />
                      <span>{popularPosts[index].comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="visa-info-details-categories">
            <h3>Categories</h3>
            <ul>
              <li><span>IMMIGRATION</span> <span>(24)</span></li>
              <li><span>RESIDENT</span> <span>(10)</span></li>
              <li><span>STUDENT</span> <span>(06)</span></li>
              <li><span>TOURIST</span> <span>(15)</span></li>
              <li><span>NEWS & TIPS</span> <span>(09)</span></li>
              <li><span>COUNTRY</span> <span>(11)</span></li>
            </ul>
          </div>

          {/* GALLERY */}
          <div className="visa-info-details-gallery">
            <h3>Gallery</h3>
            <div className="visa-info-details-gallery-grid">
              {galleryImages.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i + 1}`} />
              ))}
            </div>
          </div>

        

{/* Popular Tags */}
<div className="visa-info-details-tags">
  <h3>Popular Tags</h3>
  <div className="visa-info-details-tags-list">
    <span>#Travel</span>
    <span>#Visa</span>
    <span>#Immigration</span>
    <span>#Study</span>
    <span>#Tour</span>
    <span>#Business</span>
    <span>#Career</span>
  </div>
</div>

{/* Subscribe Us */}
<div className="visa-info-details-subscribe">
  <h3>Subscribe Us</h3>
  <p>Get the latest visa updates, news & tips delivered to your inbox.</p>
  <input type="email" placeholder="Enter your email" />
  <button>Subscribe</button>
</div>

        </div>
      </div>
    </section>
  );
};

export default VisaInfoDetails;