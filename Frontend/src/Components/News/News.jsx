import React, { useEffect, useState } from "react";
import "./News.css";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Api";

const News = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs/published`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchPublishedBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/details/${id}`);
  };

  return (
    <section className="news-section-dark">
      <div className="news-wrapper-dark">
        <p className="section-subtitle-dark">LATEST ARTICLES</p>
        <h2 className="section-title-dark">Stay Updated with FlyDenAi</h2>
        <div className="section-underline-dark"></div>

        <div className="news-grid-dark">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div className="news-card-dark" key={index}>
                <div className="news-image-wrapper-dark">
                  <img
                    src={`${BASE_URL.replace("/api", "")}/${blog.imageUrl}`}
                    alt={blog.title}
                    className="news-image-dark"
                  />
                  <div
                    className="circle-btn-dark"
                    onClick={() => handleBlogClick(blog._id)}
                  >
                    <ArrowRight size={20} strokeWidth={2} />
                  </div>
                </div>

                <div className="news-content-dark">
                  <p className="news-category-dark">
                    {blog.category || "GENERAL"}
                  </p>
                  <h3 className="news-heading-dark">{blog.title}</h3>

                  <div className="news-meta-dark">
                    <span>
                      <Calendar size={16} strokeWidth={1.5} />{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      <MessageCircle size={16} strokeWidth={1.5} />{" "}
                      {blog.comments ? blog.comments.length : 0} Comments
                    </span>
                  </div>

                  {/* ✅ Description with Read More inline */}
                  <p className="news-description-dark">
                    {blog.popularLine
                      ? blog.popularLine.substring(0, 120)
                      : blog.desc.substring(0, 120)}
                    ...
                    <button
                      className="inline-readmore-btn-dark"
                      onClick={() => handleBlogClick(blog._id)}
                    >
                      Read More
                    </button>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-blogs-dark">No published blogs yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
