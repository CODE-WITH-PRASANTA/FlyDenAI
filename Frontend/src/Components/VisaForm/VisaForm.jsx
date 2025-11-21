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

  const cleanNumber = (value) =>
    value ? Number(String(value).replace(/[^0-9.]/g, "")) : 0;

  const openWhatsApp = () => {
    if (!contact?.whatsapp) return;
    const number = contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/91${number}`, "_blank");
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
        if (data.success && data.data.length > 0) {
          setContact(data.data.find((c) => c.published) || data.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();
  }, []);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`${BASE_URL}/visas/published/${id}`);
        const data = await res.json();
        if (data.success) setVisa(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVisa();
  }, [id]);

  useEffect(() => {
    if (selectedType && visa?.visaTypes?.length > 0) {
      const typeObj = visa.visaTypes.find((t) => t.name === selectedType);
      const price = cleanNumber(typeObj.fees);
      setTotalPrice(price * travellers);
    }
  }, [selectedType, travellers, visa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) return alert("Please select a visa type.");

    navigate(`/Apply/Now/${id}`, {
      state: { email, phone, selectedType, travellers, totalPrice },
    });
  };

  return (
    <div className="visa-card">
      <div className="visa-card-header">
        <h3>Quick Visa Application</h3>
        <p><strong>Fast & Hassle-Free</strong> – Takes under 2 minutes</p>
      </div>

      <form className="visa-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="tel"
          placeholder="Contact Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          required
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Choose Visa Type</option>
          {visa?.visaTypes?.map((type, i) => (
            <option key={i} value={type.name}>
              {type.name} — ₹{cleanNumber(type.fees)}
            </option>
          ))}
        </select>

        <select
          required
          onChange={(e) => setTravellers(Number(e.target.value))}
        >
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num} Traveller{num > 1 ? "s" : ""}</option>
          ))}
        </select>

        <div className="visa-price-box">
          <span>Total</span>
          <strong>₹ {totalPrice}</strong>
        </div>

        <button type="submit" className="visa-submit-btn">
          Apply Now
        </button>
      </form>

      {/* Contact Box */}
      <div className="contact-box">
        <div onClick={openWhatsApp}>
          <span>📱 WhatsApp</span>
          <p>+91 {contact?.whatsapp || "---"}</p>
        </div>

        <div onClick={callPhone}>
          <span>📞 Call Us</span>
          <p>{contact?.phone || "---"}</p>
        </div>
      </div>
    </div>
  );
};

export default VisaForm;
