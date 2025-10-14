import React from 'react';
import './SuccessStories.css';

// ✅ Import user avatars
import sc1 from '../../assets/sc1.webp';
import sc2 from '../../assets/sc2.webp';
import sc3 from '../../assets/sc3.webp';
import sc4 from '../../assets/sc4.webp';
import sc5 from '../../assets/sc5.webp';
import sc6 from '../../assets/sc6.webp';

// ✅ Import university logos
import uniLogo1 from '../../assets/ul1.webp';
import uniLogo2 from '../../assets/ul2.webp';
import uniLogo3 from '../../assets/ul3.webp';
import uniLogo4 from '../../assets/ul4.webp';

const stories = [
  {
    name: 'Kshitij',
    locationFrom: 'Delhi',
    locationTo: 'United Kingdom',
    testimonial:
      'My FlyDenAi Edu coach made studying abroad a breeze. From university shortlisting to visa application, they guided me every step of the way.',
    category: 'Data Science',
    img: sc1,
    uniLogo: uniLogo1,
  },
  {
    name: 'Samad',
    locationFrom: 'Gujarat',
    locationTo: 'United Kingdom',
    testimonial:
      'Extremely satisfied with FlyDenAi Edu for my college application process. Deserves a perfect 5/5 rating!',
    category: 'Data Science',
    img: sc2,
    uniLogo: uniLogo2,
  },
  {
    name: 'Shubham',
    locationFrom: 'Telangana',
    locationTo: 'United States',
    testimonial:
      "Smooth process, supportive loan team, highly satisfied with FlyDenAi Edu's loan experience. Great service!",
    category: 'Sciences',
    img: sc3,
    uniLogo: uniLogo1,
  },
  {
    name: 'Naveenkumar',
    locationFrom: 'Karnataka',
    locationTo: 'United States',
    testimonial:
      'I applied to 4 universities and I got offers from 2 universities. FlyDenAi Edu helped me through entire process to pursue masters. They have separate teams to handle all this.',
    category: 'Data Science',
    img: sc4,
    uniLogo: uniLogo3,
  },
  {
    name: 'Shreya',
    locationFrom: 'Noida',
    locationTo: 'Germany',
    testimonial:
      'FlyDenAi Edu is proactive, detail-oriented, and trustworthy. They made my study abroad dream a breeze. Shoutout to the team for showcasing their excellence!',
    category: 'Management',
    img: sc5,
    uniLogo: uniLogo4,
  },
  {
    name: 'Hanna',
    locationFrom: 'Maharashtra',
    locationTo: 'Canada',
    testimonial:
      "FlyDenAi Edu made it incredibly convenient. Deepa, the consultant, provided excellent guidance. I'm thrilled with the all-in-one support for loans, forex, and accommodation.",
    category: 'Data Science',
    img: sc6,
    uniLogo: uniLogo1,
  },
];

const SuccessStories = () => {
  return (
    <section className="success-stories-container">
      <h2 className="main-heading">
        60,000+ <span>Success Stories</span>
      </h2>
      <p className="sub-heading">From Dreamers to Achievers</p>

      <div className="stories-grid">
        {stories.map((story, idx) => (
          <div key={idx} className="story-card">
            <div className="user-info">
              <img
                src={story.img}
                alt={story.name}
                className="user-avatar"
                loading="lazy"
              />
              <div>
                <p className="user-name">{story.name}</p>
                <p className="user-location">
                  {story.locationFrom} to {story.locationTo}
                </p>
              </div>
            </div>
            <p className="testimonial">{story.testimonial}</p>

            <div className="bottom-row">
              <span className="category">{story.category}</span>
              <img
                src={story.uniLogo}
                alt="University"
                className="university-logo"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
