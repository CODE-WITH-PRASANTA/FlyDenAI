import React from "react";
import "./ServiceWeProvide.css";
import { FaArrowRight } from "react-icons/fa";
import s1 from "../../assets/service1.webp";
import s2 from "../../assets/service2.webp";
import s3 from "../../assets/RP.jpg";
import s4 from "../../assets/service4.webp";

const ServiceWeProvide = () => {
  const services = [
    {
      title: "Business Visa",
      description:
        "Sit amet consectetur bestibulu ullamcorer arcustulla amet dolor tortor elementum",
      image: s1,
    },
    {
      title: "Student Visa",
      description:
        "Sit amet consectetur bestibulu ullamcorer arcustulla amet dolor tortor elementum",
      image: s2,
    },
    {
      title: "Work Visa",
      description:
        "Sit amet consectetur bestibulu ullamcorer arcustulla amet dolor tortor elementum",
      image: s3,
      active: true,
    },
    {
      title: "Tourist Visa",
      description:
        "Sit amet consectetur bestibulu ullamcorer arcustulla amet dolor tortor elementum",
      image: s4,
    },
  ];

  return (
    <section className="serviceweprovide">
      <h3 className="service-subheading">Service We Provide</h3>
      <h2 className="service-heading">
        Explore Our Visa Citizenship & Immigration Services
      </h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${service.active ? "active" : ""}`}
          >
            <div className="image-wrapper">
              <img src={service.image} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="read-more">
              <span>Read More</span>
              <div className="read-more-icon">
                <FaArrowRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceWeProvide;
