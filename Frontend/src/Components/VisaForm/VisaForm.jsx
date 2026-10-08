import React, { useEffect, useState } from "react";
import "./VisaForm.css";
import BASE_URL from "../../Api";
import { useParams, useNavigate } from "react-router-dom";

const VisaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [visa, setVisa] = useState(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedType, setSelectedType] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const cleanNumber = (value) => {
    if (!value) return 0;

    const cleaned = String(value).replace(/[^0-9.]/g, "");

    return Number(cleaned) || 0;
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  const openWhatsApp = () => {
    if (!contact?.whatsapp) return;

    const number = contact.whatsapp.replace(/[^0-9]/g, "");

    window.open(
      `https://wa.me/91${number}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const callPhone = () => {
    if (!contact?.phone) return;

    const number = contact.phone.replace(/[^0-9]/g, "");

    window.location.href = `tel:${number}`;
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${BASE_URL}/contacts`);
        const data = await res.json();

        if (data.success && data.data?.length > 0) {
          setContact(
            data.data.find((item) => item.published) ||
              data.data[0]
          );
        }
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    };

    fetchContact();
  }, []);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/visas/published/${id}`
        );

        const data = await res.json();

        if (data.success) {
          setVisa(data.data);
        }
      } catch (err) {
        console.error("Error fetching visa:", err);
      }
    };

    if (id) {
      fetchVisa();
    }
  }, [id]);

  useEffect(() => {
    if (
      selectedType &&
      visa?.visaTypes?.length > 0
    ) {
      const typeObj = visa.visaTypes.find(
        (type) => type.name === selectedType
      );

      if (typeObj) {
        const price = cleanNumber(typeObj.fees);

        setTotalPrice(price * travellers);
      }
    } else {
      setTotalPrice(0);
    }
  }, [selectedType, travellers, visa]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedType) {
      alert("Please select a visa type.");
      return;
    }

    navigate(`/Apply/Now/${id}`, {
      state: {
        email,
        phone,
        selectedType,
        travellers,
        totalPrice,
      },
    });
  };

  return (
    <div className="flyixo-visa-form-card">

      {/* Header */}
      <div className="flyixo-visa-form-header">
        <div className="flyixo-visa-form-brand">
          <span className="flyixo-visa-form-brand-dot"></span>
          <span>Flyixo</span>
        </div>

        <h3>Quick Visa Application</h3>

        <p>
          <strong>Fast &amp; Hassle-Free</strong>
          <span> — Takes under 2 minutes</span>
        </p>
      </div>

      {/* Form */}
      <form
        className="flyixo-visa-form"
        onSubmit={handleSubmit}
      >

        {/* Email */}
        <div className="flyixo-visa-form-field">
          <label htmlFor="visa-email">
            Email Address
          </label>

          <input
            id="visa-email"
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        {/* Phone */}
        <div className="flyixo-visa-form-field">
          <label htmlFor="visa-phone">
            Contact Number
          </label>

          <input
            id="visa-phone"
            type="tel"
            placeholder="Enter your contact number"
            required
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />
        </div>

        {/* Visa Type */}
        <div className="flyixo-visa-form-field">
          <label htmlFor="visa-type">
            Visa Type
          </label>

          <select
            id="visa-type"
            required
            value={selectedType}
            onChange={(e) =>
              setSelectedType(e.target.value)
            }
          >
            <option value="">
              Choose Visa Type
            </option>

            {visa?.visaTypes?.map((type, index) => (
              <option
                key={index}
                value={type.name}
              >
                {type.name} — ₹
                {formatPrice(
                  cleanNumber(type.fees)
                )}
              </option>
            ))}
          </select>
        </div>

        {/* Travellers */}
        <div className="flyixo-visa-form-field">
          <label htmlFor="visa-travellers">
            Travellers
          </label>

          <select
            id="visa-travellers"
            value={travellers}
            required
            onChange={(e) =>
              setTravellers(
                Number(e.target.value)
              )
            }
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option
                key={num}
                value={num}
              >
                {num} Traveller
                {num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flyixo-visa-price-box">
          <div className="flyixo-visa-price-label">
            <span className="flyixo-visa-price-icon">
              ₹
            </span>

            <span>Total Amount</span>
          </div>

          <strong>
            ₹ {formatPrice(totalPrice)}
          </strong>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flyixo-visa-submit-btn"
        >
          <span>Apply Now</span>
          <span className="flyixo-visa-submit-arrow">
            →
          </span>
        </button>
      </form>

      {/* Contact */}
      <div className="flyixo-contact-box">

        {/* WhatsApp */}
        <button
          type="button"
          className="flyixo-contact-card flyixo-contact-whatsapp"
          onClick={openWhatsApp}
        >
          <span className="flyixo-contact-icon">
            💬
          </span>

          <span className="flyixo-contact-content">
            <strong>WhatsApp</strong>

            <span>
              +91 {contact?.whatsapp || "---"}
            </span>
          </span>

          <span className="flyixo-contact-arrow">
            →
          </span>
        </button>

        {/* Call */}
        <button
          type="button"
          className="flyixo-contact-card flyixo-contact-call"
          onClick={callPhone}
        >
          <span className="flyixo-contact-icon">
            📞
          </span>

          <span className="flyixo-contact-content">
            <strong>Call Us</strong>

            <span>
              {contact?.phone || "---"}
            </span>
          </span>

          <span className="flyixo-contact-arrow">
            →
          </span>
        </button>

      </div>

      {/* Footer */}
      <div className="flyixo-visa-form-footer">
        <span className="flyixo-footer-dot"></span>

        <span>
          Secure application assistance by{" "}
          <strong>Flyixo</strong>
        </span>
      </div>

    </div>
  );
};

export default VisaForm;