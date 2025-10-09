import React from "react";
import "./BlogDetailsBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const BlogDetailsBanner = () => {
  return (
    <div
      className="BlogDetails-banner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="BlogDetails-overlay">
        <div className="BlogDetails-content">
          <h1 className="BlogDetails-title">Blog Details</h1>
          <div className="BlogDetails-breadcrumb">
            <FaHome className="home-icon" />
            <span className="crumb">Home</span>
            <span className="separator">-</span>
            <span className="crumb active">Blog Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsBanner;
