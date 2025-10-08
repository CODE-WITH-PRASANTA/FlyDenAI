import React from "react";
import "./BlogBanner.css";
import bannerImage from "../../assets/ab1.jpg"; // Replace with your image

const BlogBanner = () => {
  return (
    <section
      className="blog-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="blog-banner-content">
        <div className="banner-left">BLOG</div>
        <div className="banner-right">Home Page - Blog</div>
      </div>
    </section>
  );
};

export default BlogBanner;
