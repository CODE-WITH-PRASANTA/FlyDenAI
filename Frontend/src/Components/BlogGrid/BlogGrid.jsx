import React from "react";
import "./BlogGrid.css";
import i1 from "../../assets/nb1.webp";
import i2 from "../../assets/nb2.webp";
import i3 from "../../assets/nb3.webp";


const cards = [
  {
    date: "26",
    month: "Nov",
    title: "Navigating Borders Ultimate Guide To Visa Success",
    image: i1,
  },
  {
    date: "11",
    month: "Dec",
    title: "Unlocking Opportunities The Visa Journey Unveiled",
    image: i2,
  },
  {
    date: "27",
    month: "Sep",
    title: "Navigating Borders Ultimate Guide To Visa Success",
    image: i3,
  },
  {
    date: "05",
    month: "Jan",
    title: "Visa Tips for First-Time Applicants",
    image: i2,
  },
  {
    date: "14",
    month: "Feb",
    title: "Mastering the Interview Process",
    image: i3,
  },
  {
    date: "22",
    month: "Mar",
    title: "Visa Application Mistakes to Avoid",
    image: i1,
  },
];

const BlogGrid = () => {
  return (
    <div className="blockgrid-container">
      {cards.map((card, index) => (
        <div key={index} className="blockgrid-card">
          <div
            className="blockgrid-image"
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className="blockgrid-date">
              <span className="blockgrid-day">{card.date}</span>
              <span className="blockgrid-month">{card.month}</span>
            </div>
          </div>
          <div className="blockgrid-content">
            <div className="blockgrid-meta">
              <span>👤 Shikhon .H</span>
              <span>💬 Comments (03)</span>
            </div>
            <h3 className="blockgrid-title">{card.title}</h3>
            <p className="blockgrid-desc">
              Transmds is the world’s driving worldwide coordinations supplier
              we uphold.
            </p>
            <a className="blockgrid-readmore" href="#">
              Read More <span>➡</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
