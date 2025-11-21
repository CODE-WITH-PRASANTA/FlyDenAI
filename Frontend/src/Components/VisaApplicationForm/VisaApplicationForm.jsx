import React, { useState, useEffect } from "react";
import "./VisaApplicationForm.css";
import Swal from "sweetalert2";
import {
  FaUser,
  FaCalendarAlt,
  FaArrowRight,
  FaPlaneDeparture,
  FaCreditCard,
  FaCheckCircle,
  FaFileUpload,
  FaPlus,
  FaTag,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import BASE_URL from "../../Api";

// Pricing constants
const DEFAULT_PRICE_PER_TRAVELLER = 748;
const SERVICE_CHARGE = 200; // flat service charge
const TAX_RATE = 0.18; // 18% GST

const emptyTraveller = () => ({
  title: "Mr",
  firstName: "",
  lastName: "",
  dob: "",
  nationality: "Indian",
  passportNo: "",
  contactNumber: "",
  files: {
    passportCopy: null,
    photo: null,
  },
});

const VisaApplicationForm = () => {
  const { id } = useParams(); // visa ID from URL

  const [step, setStep] = useState(1);
  const [activePayment, setActivePayment] = useState("UPI");

  const [visaTypes, setVisaTypes] = useState([]);
  const [selectedVisaTypeIndex, setSelectedVisaTypeIndex] = useState(0);
  const [visaType, setVisaType] = useState("");

  const [travellers, setTravellers] = useState(1);
  const [onwardDate, setOnwardDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellerData, setTravellerData] = useState([emptyTraveller()]);

  const [globalDocs, setGlobalDocs] = useState({
    passportCopy: null,
    photo: null,
    travelItinerary: null,
    additionalDocument: null,
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const paymentOptions = [
    "UPI",
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "Wallet",
    "PhonePe",
    "Google Pay",
    "AMEX",
  ];

  const progressSteps = [
    { label: "Itinerary", icon: <FaPlaneDeparture /> },
    { label: "Traveller Details", icon: <FaUser /> },
    { label: "Make Payment", icon: <FaCreditCard /> },
    { label: "Documents", icon: <FaFileUpload /> },
  ];

  // Fetch visa + visa types based on ID
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`${BASE_URL}/visas/published/${id}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("Failed to fetch visa:", data);
          return;
        }

        const types = data.data?.visaTypes || [];
        setVisaTypes(types);
        if (types.length > 0) {
          setSelectedVisaTypeIndex(0);
          setVisaType(types[0].name || "");
        }
      } catch (err) {
        console.error("Error fetching visa:", err);
      }
    };

    if (id) fetchVisa();
  }, [id]);

  // Make sure travellerData array always matches travellers count
  useEffect(() => {
    setTravellerData((prev) => {
      const arr = [...prev];
      if (travellers > prev.length) {
        for (let i = prev.length; i < travellers; i++) arr.push(emptyTraveller());
      } else if (travellers < prev.length) {
        arr.length = travellers;
      }
      return arr;
    });
  }, [travellers]);

  // Helper: get numeric fees per traveller from selected visa type
  const getPricePerTraveller = () => {
    if (!visaTypes.length) return DEFAULT_PRICE_PER_TRAVELLER;
    const selectedType = visaTypes[selectedVisaTypeIndex];
    const feeRaw = selectedType?.fees || DEFAULT_PRICE_PER_TRAVELLER;
    const numeric = Number(String(feeRaw).replace(/[^\d]/g, ""));
    return Number.isNaN(numeric) || numeric <= 0
      ? DEFAULT_PRICE_PER_TRAVELLER
      : numeric;
  };

  const pricePerTraveller = getPricePerTraveller();
  const baseFare = travellers * pricePerTraveller;
  const taxAmount = Math.round(baseFare * TAX_RATE); // 18% of base fare
  const discountAmount = Math.round((baseFare * discountPercent) / 100);
  const totalPayable = baseFare + SERVICE_CHARGE + taxAmount - discountAmount;

  // ---------- Handlers ----------

  const handleNext = (e) => {
  if (e?.preventDefault) e.preventDefault();

  if (step === 1) {
    if (!visaType) {
      Swal.fire({
        title: "Visa Type Required!",
        icon: "warning",
        html: "Please <b>select a visa type</b> to continue.",
        confirmButtonText: "Okay",
      });
      return;
    }
    if (!onwardDate || !returnDate) {
      Swal.fire({
        title: "Date Required!",
        icon: "warning",
        html: "Please select both <b>Onward</b> and <b>Return</b> dates.",
        confirmButtonText: "Okay",
      });
      return;
    }
  }

  if (step === 2) {
    for (let i = 0; i < travellerData.length; i++) {
      const t = travellerData[i];
      if (!t.firstName || !t.lastName || !t.passportNo) {
        Swal.fire({
          title: `Missing Details for Traveller ${i + 1}`,
          icon: "error",
          html: `
            Please make sure to provide: <br/>
            <b>First Name</b>, <b>Last Name</b>, and <b>Passport Number</b>.
          `,
          confirmButtonText: "Fix it!",
        });
        return;
      }
    }
  }

  // Progress to next step
  if (step < 5) {
    setStep((s) => s + 1);
  }
    };


  const handlePrev = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (step > 1) setStep((s) => s - 1);
  };

  const updateTravellerField = (index, field, value) => {
    setTravellerData((prev) => {
      const arr = [...prev];
      arr[index] = { ...arr[index], [field]: value };
      return arr;
    });
  };

  const handleTravellerFile = (idx, key, file) => {
    setTravellerData((prev) => {
      const arr = [...prev];
      arr[idx] = {
        ...arr[idx],
        files: { ...arr[idx].files, [key]: file },
      };
      return arr;
    });
  };

  const handleGlobalFile = (key, file) => {
    setGlobalDocs((prev) => ({ ...prev, [key]: file }));
  };

  const applyCoupon = () => {
    const validCoupons = { SAVE10: 10, FLAT20: 20, FIRST30: 30 };
    const code = couponCode.trim().toUpperCase();
    if (validCoupons[code]) {
      setDiscountPercent(validCoupons[code]);
      alert(`Coupon applied! You get ${validCoupons[code]}% off.`);
    } else {
      Swal.fire({
        title: "Invalid Coupon",
        icon: "error",
        html: "The coupon code you entered is not valid.<br/>Please try again!",
        confirmButtonText: "Got it",
      });
      setDiscountPercent(0);
    }
  };

  const handleSubmitApplication = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    try {
      const fd = new FormData();

      // Core visa info
      fd.append("visaId", id || "");
      fd.append("visaType", visaType);
      fd.append("pricePerTraveller", String(pricePerTraveller));
      fd.append("baseFare", String(baseFare));
      fd.append("taxAmount", String(taxAmount));
      fd.append("discountAmount", String(discountAmount));
      fd.append("totalPrice", String(totalPayable));

      fd.append("travellers", String(travellers));
      fd.append("onwardDate", onwardDate);
      fd.append("returnDate", returnDate);

      const jsonTravellers = travellerData.map((t) => {
        const { files, ...rest } = t;
        return rest;
      });

      fd.append("travellerData", JSON.stringify(jsonTravellers));

      travellerData.forEach((t, idx) => {
        if (t.files?.passportCopy)
          fd.append(`traveller_${idx}_passportCopy`, t.files.passportCopy);
        if (t.files?.photo)
          fd.append(`traveller_${idx}_photo`, t.files.photo);
      });

      Object.entries(globalDocs).forEach(([k, file]) => {
        if (file) fd.append(`global_${k}`, file);
      });

      fd.append("paymentMethod", activePayment);

      const res = await fetch(`${BASE_URL}/apply`, { method: "POST", body: fd });
      if (!res.ok) {
        const txt = await res.text();
        console.error("Submission error:", txt);
        Swal.fire({
          title: "Submission Failed!",
          icon: "error",
          html: `
            Oops! Something went wrong 🛑<br/>
            Please check your connection and try again.`,
          confirmButtonText: "Retry",
        });
        return;
      }

     Swal.fire({
        title: "<strong>Application Submitted 🎉</strong>",
        icon: "success",
        html: `
          Your visa application has been submitted successfully.<br/>
          Our team will get in touch with you soon!
        `,
        showCloseButton: true,
        confirmButtonText: "Great!",
      });
      setStep(5);

    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting application.");
    }
  };

  // ---------- JSX ----------

  return (
    <div className="VisaApplicationForm__wrapper">
      {/* PROGRESS */}
      <div className="VisaApplicationForm__progress">
        <div
          className="VisaApplicationForm__progress-fill"
          style={{
            width: `${((step - 1) / (progressSteps.length - 1)) * 100}%`,
          }}
        />
        <div className="VisaApplicationForm__progress-steps">
          {progressSteps.map((p, i) => {
            const state =
              step === i + 1 ? "active" : step > i + 1 ? "completed" : "inactive";
            return (
              <div
                key={i}
                className={`VisaApplicationForm__progress-step VisaApplicationForm__progress-step--${state}`}
              >
                <div className="VisaApplicationForm__progress-icon">{p.icon}</div>
                <div className="VisaApplicationForm__progress-label">
                  {p.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GRID */}
      <div className="VisaApplicationForm__grid">
        <main className="VisaApplicationForm__main">

          {/* STEP 1 */}
          {step === 1 && (
            <section className="VisaApplicationForm__step VisaApplicationForm__step--itinerary">
              <div className="VisaApplicationForm__section-head">
                <h3 className="VisaApplicationForm__title">Travel Itinerary</h3>
                <p className="VisaApplicationForm__subtitle">
                  Select visa type and traveller count.
                </p>
              </div>

              <div className="VisaApplicationForm__form">
                <div className="VisaApplicationForm__form-row">
                  <div className="VisaApplicationForm__form-group">
                    <label className="VisaApplicationForm__label">Visa Type</label>
                    <select
                      className="VisaApplicationForm__select"
                      value={selectedVisaTypeIndex}
                      onChange={(e) => {
                        const idx = Number(e.target.value);
                        setSelectedVisaTypeIndex(idx);
                        const selected = visaTypes[idx];
                        setVisaType(selected?.name || "");
                      }}
                    >
                      {visaTypes.length === 0 && (
                        <option value={0}>No visa types available</option>
                      )}
                      {visaTypes.map((vt, idx) => (
                        <option key={idx} value={idx}>
                          {vt.name}
                          {vt.fees
                            ? ` - ₹${String(vt.fees).replace(/[^\d.]/g, "")}`
                            : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="VisaApplicationForm__form-group">
                    <label className="VisaApplicationForm__label">
                      No. of Travellers
                    </label>
                    <select
                      className="VisaApplicationForm__select"
                      value={travellers}
                      onChange={(e) => setTravellers(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option value={n} key={n}>
                          {n} Traveller{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="VisaApplicationForm__price-box">
                  <div className="VisaApplicationForm__price-header">
                    <h4 className="VisaApplicationForm__price-title">Total Estimated Cost</h4>
                    <div className="VisaApplicationForm__price-main">
                      <span className="VisaApplicationForm__price-amount">₹ {totalPayable}</span>
                    </div>
                  </div>

                  <div className="VisaApplicationForm__price-breakdown">
                    <span>
                      💳 ₹{pricePerTraveller} × {travellers} - Base Fare
                    </span>
                    <span>
                      🛠️ ₹{SERVICE_CHARGE} - Service Charge
                    </span>
                    <span>
                      🧾 ₹{taxAmount} - GST (18%)
                    </span>
                    {discountAmount > 0 && (
                      <span className="VisaApplicationForm__discount">
                        🎉 -₹{discountAmount} - Discount Applied
                      </span>
                    )}
                  </div>
                </div>

                <div className="VisaApplicationForm__form-row">
                  <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--date">
                    <label className="VisaApplicationForm__label">Onward Date</label>
                    <div className="VisaApplicationForm__input-with-icon">
                      <FaCalendarAlt className="VisaApplicationForm__input-icon" />
                      <input
                        className="VisaApplicationForm__input"
                        type="date"
                        value={onwardDate}
                        onChange={(e) => setOnwardDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--date">
                    <label className="VisaApplicationForm__label">Return Date</label>
                    <div className="VisaApplicationForm__input-with-icon">
                      <FaCalendarAlt className="VisaApplicationForm__input-icon" />
                      <input
                        className="VisaApplicationForm__input"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="VisaApplicationForm__actions">
                  <button
                    className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
                    onClick={handleNext}
                  >
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            </section>
          )}
          
          {/* STEP 2 */}
          {step === 2 && (
            <section className="VisaApplicationForm__step VisaApplicationForm__step--travellers">
              <div className="VisaApplicationForm__section-head">
                <h3 className="VisaApplicationForm__title">Traveller Details</h3>
                <p className="VisaApplicationForm__subtitle">
                  Fill details for all travellers.
                </p>
              </div>

              <div className="VisaApplicationForm__traveller-list">
                {travellerData.map((t, idx) => (
                  <article
                    className="VisaApplicationForm__traveller-card"
                    key={idx}
                  >
                    <header className="VisaApplicationForm__traveller-header">
                      <div className="VisaApplicationForm__traveller-icon">
                        <FaUser />
                      </div>
                      <div className="VisaApplicationForm__traveller-title">
                        Traveller {idx + 1}
                      </div>
                    </header>

                    <div className="VisaApplicationForm__traveller-body">
                      <div className="VisaApplicationForm__form-row VisaApplicationForm__row--3">
                        <div className="VisaApplicationForm__form-group">
                          <label className="VisaApplicationForm__label">Title</label>
                          <select
                            className="VisaApplicationForm__select"
                            value={t.title}
                            onChange={(e) =>
                              updateTravellerField(idx, "title", e.target.value)
                            }
                          >
                            <option>Mr</option>
                            <option>Mrs</option>
                            <option>Ms</option>
                          </select>
                        </div>

                        <div className="VisaApplicationForm__form-group">
                          <label className="VisaApplicationForm__label">
                            First Name
                          </label>
                          <input
                            className="VisaApplicationForm__input"
                            type="text"
                            value={t.firstName}
                            onChange={(e) =>
                              updateTravellerField(idx, "firstName", e.target.value)
                            }
                          />
                        </div>

                        <div className="VisaApplicationForm__form-group">
                          <label className="VisaApplicationForm__label">
                            Last Name
                          </label>
                          <input
                            className="VisaApplicationForm__input"
                            type="text"
                            value={t.lastName}
                            onChange={(e) =>
                              updateTravellerField(idx, "lastName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="VisaApplicationForm__form-row">
                        <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--date">
                          <label className="VisaApplicationForm__label">
                            Date of Birth
                          </label>
                          <div className="VisaApplicationForm__input-with-icon">
                            <FaCalendarAlt className="VisaApplicationForm__input-icon" />
                            <input
                              className="VisaApplicationForm__input"
                              type="date"
                              value={t.dob}
                              onChange={(e) =>
                                updateTravellerField(idx, "dob", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="VisaApplicationForm__form-group">
                          <label className="VisaApplicationForm__label">
                            Nationality
                          </label>
                          <input
                            className="VisaApplicationForm__input VisaApplicationForm__input--readonly"
                            readOnly
                            value={t.nationality}
                          />
                        </div>
                      </div>

                      <div className="VisaApplicationForm__form-row">
                        <div className="VisaApplicationForm__form-group">
                          <label className="VisaApplicationForm__label">
                            Passport No
                          </label>
                          <input
                            className="VisaApplicationForm__input"
                            type="text"
                            value={t.passportNo}
                            onChange={(e) =>
                              updateTravellerField(idx, "passportNo", e.target.value)
                            }
                          />
                        </div>

                        <div className="VisaApplicationForm__form-group">
                          <label className="VisaApplicationForm__label">
                            Contact Number
                          </label>
                          <input
                            className="VisaApplicationForm__input"
                            type="text"
                            value={t.contactNumber}
                            onChange={(e) =>
                              updateTravellerField(
                                idx,
                                "contactNumber",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="VisaApplicationForm__form-row">
                        <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--file">
                          <label className="VisaApplicationForm__label">
                            Passport Copy
                          </label>
                          <input
                            className="VisaApplicationForm__file"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleTravellerFile(
                                idx,
                                "passportCopy",
                                e.target.files?.[0]
                              )
                            }
                          />
                        </div>

                        <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--file">
                          <label className="VisaApplicationForm__label">Photo</label>
                          <input
                            className="VisaApplicationForm__file"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleTravellerFile(
                                idx,
                                "photo",
                                e.target.files?.[0]
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="VisaApplicationForm__actions VisaApplicationForm__actions--split">
                <button
                  className="VisaApplicationForm__btn VisaApplicationForm__btn--outline"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <button
                  className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
                  onClick={handleNext}
                >
                  Continue <FaArrowRight />
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <section className="VisaApplicationForm__step VisaApplicationForm__step--payment">
              <div className="VisaApplicationForm__section-head">
                <h3 className="VisaApplicationForm__title">Make Payment</h3>
                <p className="VisaApplicationForm__subtitle">
                  Choose your preferred payment method.
                </p>
              </div>

              <div className="VisaApplicationForm__payment-grid">
                {paymentOptions.map((p) => (
                  <div
                    role="button"
                    tabIndex={0}
                    key={p}
                    className={`VisaApplicationForm__payment-option ${
                      activePayment === p
                        ? "VisaApplicationForm__payment-option--active"
                        : ""
                    }`}
                    onClick={() => setActivePayment(p)}
                  >
                    {p}
                  </div>
                ))}
              </div>

              <div className="VisaApplicationForm__payment-box">
                <h4 className="VisaApplicationForm__payment-title">
                  {activePayment} Payment
                </h4>
                <p className="VisaApplicationForm__payment-desc">
                  {activePayment === "UPI"
                    ? "Scan the QR code or enter your Virtual Payment Address (VPA)."
                    : `Enter your ${activePayment} details to proceed.`}
                </p>

                <div className="VisaApplicationForm__payment-footer">
                  <div className="VisaApplicationForm__payment-amount">
                    Total payable amount: <strong>₹ {totalPayable}</strong>
                  </div>
                  <div>
                    <button
                      className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
                      onClick={handleNext}
                    >
                      Pay Now <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <section className="VisaApplicationForm__step VisaApplicationForm__step--upload">
              <div className="VisaApplicationForm__section-head">
                <h3 className="VisaApplicationForm__title">Upload Documents</h3>
                <p className="VisaApplicationForm__subtitle">
                  Upload clear scanned copies of required documents.
                </p>
              </div>

              <div className="VisaApplicationForm__upload-grid">
                <div className="VisaApplicationForm__upload-card">
                  <label className="VisaApplicationForm__label">
                    Passport Copy (Primary / additional)
                  </label>
                  <input
                    className="VisaApplicationForm__file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleGlobalFile("passportCopy", e.target.files?.[0])
                    }
                  />
                </div>

                <div className="VisaApplicationForm__upload-card">
                  <label className="VisaApplicationForm__label">
                    Photo (Primary / additional)
                  </label>
                  <input
                    className="VisaApplicationForm__file"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleGlobalFile("photo", e.target.files?.[0])
                    }
                  />
                </div>

                <div className="VisaApplicationForm__upload-card">
                  <label className="VisaApplicationForm__label">
                    Travel Itinerary
                  </label>
                  <input
                    className="VisaApplicationForm__file"
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) =>
                      handleGlobalFile("travelItinerary", e.target.files?.[0])
                    }
                  />
                </div>

                <div className="VisaApplicationForm__upload-card">
                  <label className="VisaApplicationForm__label">
                    Additional Document
                  </label>
                  <input
                    className="VisaApplicationForm__file"
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) =>
                      handleGlobalFile("additionalDocument", e.target.files?.[0])
                    }
                  />
                </div>
              </div>

              <div className="VisaApplicationForm__actions VisaApplicationForm__actions--split">
                <button
                  className="VisaApplicationForm__btn VisaApplicationForm__btn--outline"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <button
                  className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
                  onClick={handleSubmitApplication}
                >
                  Submit Application
                </button>
              </div>
            </section>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <section className="VisaApplicationForm__step VisaApplicationForm__step--thankyou">
              <div className="VisaApplicationForm__thank-icon">
                <FaCheckCircle />
              </div>
              <h2 className="VisaApplicationForm__title VisaApplicationForm__title--center">
                Thank You! 🎉
              </h2>
              <p className="VisaApplicationForm__subtitle VisaApplicationForm__subtitle--center">
                Your visa application has been submitted successfully.
              </p>

              <div className="VisaApplicationForm__actions VisaApplicationForm__actions--center">
                <button
                  className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
                  onClick={() => {
                    setStep(1);
                    setTravellerData([emptyTraveller()]);
                    setTravellers(1);
                    setOnwardDate("");
                    setReturnDate("");
                    setGlobalDocs({
                      passportCopy: null,
                      photo: null,
                      travelItinerary: null,
                      additionalDocument: null,
                    });
                  }}
                >
                  Apply Another Visa
                </button>
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="VisaApplicationForm__sidebar">
          <div className="VisaApplicationForm__fare-card">
            <h4 className="VisaApplicationForm__fare-title">Fare Summary</h4>
            <div className="VisaApplicationForm__fare-row">
              <span>Base Fare</span>
              <span>₹{baseFare}</span>
            </div>
            <div className="VisaApplicationForm__fare-row">
              <span>Service Charge</span>
              <span>₹{SERVICE_CHARGE}</span>
            </div>
            <div className="VisaApplicationForm__fare-row">
              <span>GST (18%)</span>
              <span>₹{taxAmount}</span>
            </div>
            <div className="VisaApplicationForm__fare-row">
              <span>Discount</span>
              <span>-₹{discountAmount}</span>
            </div>
            <div className="VisaApplicationForm__fare-total">
              <span>Total</span>
              <span>₹ {totalPayable}</span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="VisaApplicationForm__coupon-card">
            <div className="VisaApplicationForm__coupon-header">
              <span>Have a discount coupon?</span>
              <button
                onClick={() => setShowCouponInput((v) => !v)}
                className="VisaApplicationForm__btn"
              >
                <FaPlus />
              </button>
            </div>

            {showCouponInput && (
              <div className="VisaApplicationForm__coupon-body">
                <div className="VisaApplicationForm__coupon-input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="VisaApplicationForm__input VisaApplicationForm__input--coupon"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="VisaApplicationForm__btn--apply"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="VisaApplicationForm__help-card">
            <h5 className="VisaApplicationForm__help-title">Need Help?</h5>
            <p className="VisaApplicationForm__help-text">
              For support, contact our team with your application details.
            </p>
            <button className="VisaApplicationForm__btn VisaApplicationForm__btn--outline">
              Contact Support
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default VisaApplicationForm;
