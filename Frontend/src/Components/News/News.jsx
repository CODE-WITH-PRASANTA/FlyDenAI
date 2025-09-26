import React from "react";
import "./News.css";
import test from "../../assets/test.webp"

const News = () => {
  const posts = [
    {
      id: 1,
      img: test,
      author: "ALEX",
      comments: "0 COMMENTS",
      title: "Employment Insurance For Foreign Nationals",
      desc: "Nunc mi ipsum faucibus vitae. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Non blandit massa enim nec dui turpis nunc eget nunc.",
      featured: true,
    },
    {
      id: 2,
      img: test,
      author: "ALEX",
      comments: "0 COMMENTS",
      title: "Employment Insurance For Foreign Nationals",
    },
    {
      id: 3,
      img: test,
      author: "ALEX",
      comments: "0 COMMENTS",
      title: "Covid-19 And Its Impact On UK Immigration",
    },
    {
      id: 4,
      img: test,
      author: "ALEX",
      comments: "0 COMMENTS",
      title: "How To Beat These Visa Application Tip!",
    },
    {
      id: 5,
      img: test,
      author: "ALEX",
      comments: "0 COMMENTS",
      title: "UK To Offers Point Based Immigration System",
    },
  ];

  return (
    <section className="news">
      {/* Header */}
      <div className="news-header">
        <h5 className="section-subtitle">LATEST NEWS</h5>
        <h2 className="section-title">
          Truvik get more articles from our <span>Recources</span> news
        </h2>
      </div>

      {/* Featured Post */}
      <div className="featured-post fade-in">
        <div className="featured-img">
          <img src={posts[0].img} alt="featured" />
        </div>
        <div className="featured-text">
          <div className="meta">
            <span>{posts[0].author}</span> | <span>{posts[0].comments}</span>
          </div>
          <h3 className="post-title">{posts[0].title}</h3>
          <p className="post-desc">{posts[0].desc}</p>
        </div>
      </div>

      {/* Grid posts */}
      <div className="post-grid fade-up">
        {posts.slice(1).map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-img">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="post-info">
              <div className="meta">
                <span>{post.author}</span> | <span>{post.comments}</span>
              </div>
              <h4 className="post-title">{post.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
