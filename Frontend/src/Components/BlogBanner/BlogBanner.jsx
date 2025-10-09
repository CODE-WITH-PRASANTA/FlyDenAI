import React from "react";
import "./BlogBanner.css";
import ab1 from "../../assets/ab1.jpg";
import { FaHome } from "react-icons/fa";



const BlogBanner = () => {
  return (
       <div
          className="BlogSec-banner"
          style={{ backgroundImage: `url(${ab1})` }}
        >
          <div className="BlogSec-overlay">
            <div className="BlogSec-content">
              <h1 className="BlogSec-title">Our Latest Blog</h1>
              <div className="BlogSec-breadcrumb">
                <FaHome className="home-icon" />
                <span className="crumb">Home</span>
                <span className="separator">-</span>
                <span className="crumb active">Blog</span>
              </div>
            </div>
          </div>
        </div>
  );
};

export default BlogBanner;
