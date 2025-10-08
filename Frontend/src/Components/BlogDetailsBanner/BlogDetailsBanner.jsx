import React from "react";
import "./BlogDetailsBanner.css";
import bannerImage from "../../assets/ab1.jpg"; // Replace with your image

const BlogDetailsBanner = () => {
  return (
    <section
      className="blog-details-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="blog-details-banner-content">
        <div className="blog-title-left">BLOG</div>
        <div className="blog-title-right">Home Page - Blog</div>
      </div>
    </section>
  );
};

export default BlogDetailsBanner;
