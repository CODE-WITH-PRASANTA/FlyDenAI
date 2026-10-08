import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Process.css";
import {
  FaCreditCard,
  FaFileUpload,
  FaClipboardCheck,
  FaThumbsUp,
} from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api";

const steps = [
  {
    icon: <FaCreditCard />,
    title: "Online Payment",
    desc: "Pay via our secure payment gateway safely and easily.",
  },
  {
    icon: <FaFileUpload />,
    title: "Document Upload",
    desc: "Upload your required documents quickly and easily.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Verification",
    desc: "We carefully verify and submit your documents for approval.",
  },
  {
    icon: <FaThumbsUp />,
    title: "Receive Visa",
    desc: "Get your visa approved online without hassle.",
  },
];

const Process = () => {
  const { id } = useParams();

  const [country, setCountry] = useState("Visa");

  useEffect(() => {
    const fetchVisaCountry = async () => {
      try {
        if (!id) return;

        const { data } = await axios.get(
          `${BASE_URL}/visas/published/${id}`
        );

        if (data?.success && data?.data?.country) {
          setCountry(data.data.country);
        }
      } catch (err) {
        console.error("Error fetching visa country:", err);
      }
    };

    fetchVisaCountry();
  }, [id]);

  return (
    <section id="process" className="flyixo-process">
      <div className="flyixo-process__container">

        {/* Header */}
        <div className="flyixo-process__header">
          <span className="flyixo-process__eyebrow">
            Simple & Secure
          </span>

          <h2 className="flyixo-process__title">
            Our Simple{" "}
            <span>{country}</span>{" "}
            Visa Process
          </h2>

          <p className="flyixo-process__subtitle">
            Follow our simple step-by-step process and let Flyixo
            make your visa journey smooth, secure, and hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="flyixo-process__steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flyixo-process-card"
            >
              {/* Step Number */}
              <div className="flyixo-process-card__number">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="flyixo-process-card__icon">
                {step.icon}
              </div>

              {/* Content */}
              <div className="flyixo-process-card__content">
                <h3 className="flyixo-process-card__title">
                  {step.title}
                </h3>

                <p className="flyixo-process-card__description">
                  {step.desc}
                </p>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div className="flyixo-process-card__connector">
                  <span></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Trust */}
        <div className="flyixo-process__trust">
          <div className="flyixo-process__trust-icon">
            ✓
          </div>

          <div className="flyixo-process__trust-content">
            <strong>Simple, Secure & Transparent</strong>
            <span>
              Your visa application is handled with care at every step.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;