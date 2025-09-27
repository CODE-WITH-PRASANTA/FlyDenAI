import React from "react";
import "./News.css";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";

import BlogImg1 from "../../assets/02.webp";
import BlogImg2 from "../../assets/03.webp";
import BlogImg3 from "../../assets/04.webp";

const articles = [
  {
    category: "SCIENCE",
    title: "Crafting Effective Learning Guidelines",
    date: "15 Nov, 2023",
    comments: 0,
    image: BlogImg1,
  },
  {
    category: "TECHNOLOGY",
    title: "Exploring Learning Landscapes in Academics",
    date: "14 Nov, 2023",
    comments: 3,
    image: BlogImg2,
  },
  {
    category: "LEARNING",
    title: "Voices from the Learning Education Hub",
    date: "13 Nov, 2023",
    comments: 2,
    image: BlogImg3,
  },
];

const News = () => {
  return (
    <section className="news-section-dark">
      <div className="news-wrapper-dark">
        <p className="section-subtitle-dark">LATEST ARTICLES</p>
        <h2 className="section-title-dark">Stay Updated with EduBlink</h2>
        <div className="section-underline-dark"></div>

        <div className="news-grid-dark">
          {articles.map((item, index) => (
            <div className="news-card-dark" key={index}>
              <div className="news-image-wrapper-dark">
                <img src={item.image} alt={item.title} className="news-image-dark" />
                <div className="circle-btn-dark">
                  <ArrowRight size={20} strokeWidth={2} />
                </div>
              </div>

              <div className="news-content-dark">
                <p className="news-category-dark">{item.category}</p>
                <h3 className="news-heading-dark">{item.title}</h3>

                <div className="news-meta-dark">
                  <span>
                    <Calendar size={16} strokeWidth={1.5} /> {item.date}
                  </span>
                  <span>
                    <MessageCircle size={16} strokeWidth={1.5} /> {item.comments} Comments
                  </span>
                </div>

                <p className="news-description-dark">
                  Discover insights and updates from the world of education, science, and technology to stay ahead in your learning journey.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
