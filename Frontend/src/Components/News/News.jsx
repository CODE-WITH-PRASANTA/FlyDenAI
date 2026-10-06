import React, { useEffect, useState } from "react";
import "./News.css";
import {
  Calendar,
  MessageCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
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
      {/* Background Decorations */}
      <div className="news-bg-shape news-bg-shape-one"></div>
      <div className="news-bg-shape news-bg-shape-two"></div>

      <div className="news-wrapper-dark">
        {/* Section Header */}
        <div className="news-header-dark">
          <span className="section-badge-dark">
            <BookOpen size={14} />
            Latest Updates
          </span>

          <p className="section-subtitle-dark">
            LATEST ARTICLES
          </p>

          <h2 className="section-title-dark">
            Stay Updated with{" "}
            <span>Flyixo</span>
          </h2>

          <div className="section-underline-dark">
            <span></span>
            <i></i>
            <span></span>
          </div>

          <p className="section-description-dark">
            Explore our latest immigration, visa, travel, and
            study-abroad updates to stay informed about your
            international journey.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="news-grid-dark">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <article
                className="news-card-dark"
                key={blog._id || index}
              >
                {/* Image */}
                <div className="news-image-wrapper-dark">
                  <img
                    src={`${BASE_URL.replace("/api", "")}/${blog.imageUrl}`}
                    alt={blog.title || "Blog article"}
                    className="news-image-dark"
                  />

                  {/* Image Overlay */}
                  <div className="news-image-overlay-dark"></div>

                  {/* Category Badge */}
                  <span className="news-image-category-dark">
                    {blog.category || "GENERAL"}
                  </span>

                  {/* Arrow Button */}
                  <button
                    type="button"
                    className="circle-btn-dark"
                    onClick={() => handleBlogClick(blog._id)}
                    aria-label={`Read ${blog.title}`}
                  >
                    <ArrowRight
                      size={20}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="news-content-dark">
                  <div className="news-top-line-dark">
                    <span className="news-category-dark">
                      {blog.category || "GENERAL"}
                    </span>
                  </div>

                  <h3 className="news-heading-dark">
                    {blog.title}
                  </h3>

                  {/* Meta */}
                  <div className="news-meta-dark">
                    <span className="news-meta-item-dark">
                      <span className="news-meta-icon-dark">
                        <Calendar
                          size={15}
                          strokeWidth={1.8}
                        />
                      </span>

                      {new Date(
                        blog.createdAt
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    <span className="news-meta-item-dark">
                      <span className="news-meta-icon-dark">
                        <MessageCircle
                          size={15}
                          strokeWidth={1.8}
                        />
                      </span>

                      {blog.comments
                        ? blog.comments.length
                        : 0}{" "}
                      Comments
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="news-content-divider-dark"></div>

                  {/* Description */}
                  <p className="news-description-dark">
                    {blog.popularLine
                      ? blog.popularLine.substring(0, 120)
                      : blog.desc
                        ? blog.desc.substring(0, 120)
                        : "Read our latest article for more information."}
                    ...

                    <button
                      type="button"
                      className="inline-readmore-btn-dark"
                      onClick={() =>
                        handleBlogClick(blog._id)
                      }
                    >
                      Read More
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                      />
                    </button>
                  </p>
                </div>

                {/* Card Bottom Line */}
                <div className="news-card-bottom-line-dark"></div>
              </article>
            ))
          ) : (
            <div className="no-blogs-dark">
              <div className="no-blogs-icon-dark">
                <BookOpen size={30} />
              </div>

              <h3>No Published Blogs Yet</h3>

              <p>
                New articles and updates will appear here
                soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;