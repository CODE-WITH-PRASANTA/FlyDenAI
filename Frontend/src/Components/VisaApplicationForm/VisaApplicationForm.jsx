// src/components/VisaApplicationForm/VisaApplicationForm.jsx

import React, { useState, useEffect } from "react";
import "./VisaApplicationForm.css";
import Swal from "sweetalert2";
import { useParams, useLocation } from "react-router-dom";
import BASE_URL from "../../Api";

import Step1Itinerary from "./Steps/Step1Itinerary";
import Step2Traveller from "./Steps/Step2Traveller";
import Step3Payment from "./Steps/Step3Payment";
import Step4UploadDocs from "./Steps/Step4UploadDocs";
import Step5Success from "./Steps/Step5Success";
import SummarySidebar from "./SummarySidebar";

// DEFAULT CONSTANTS
const DEFAULT_PRICE_PER_TRAVELLER = 748;
export const SERVICE_CHARGE = 1;
export const TAX_RATE = 0.0;

// TRAVELLER DEFAULT STRUCTURE
const emptyTraveller = () => ({
  title: "Mr",
  firstName: "",
  lastName: "",
  dob: "",
  nationality: "Indian",
  passportNo: "",
  contactNumber: "",
  files: { passportCopy: null, photo: null },
});

const VisaApplicationForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const userRequest = location.state || {};

  const { selectedType, travellers: selectedTravellers } = userRequest;

  // ---------------- LOCAL STATE ----------------
  const [step, setStep] = useState(1);
  const [visaTypes, setVisaTypes] = useState([]);
  const [selectedVisaTypeIndex, setSelectedVisaTypeIndex] = useState(0);
  const [visaType, setVisaType] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [onwardDate, setOnwardDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [travellerData, setTravellerData] = useState([emptyTraveller()]);
  const [globalFiles, setGlobalFiles] = useState({});

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const [isInitiatingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  // ---------------- LOAD VISA TYPES ----------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BASE_URL}/visas/published/${id}`);
        const data = await res.json();
        if (data.success) {
          setVisaTypes(data.data?.visaTypes || []);
        }
      } catch (err) {
        console.error("load visa types err:", err);
      }
    };
    load();
  }, [id]);

  // PREFILL TRAVELLERS COUNT FROM HOME PAGE
  useEffect(() => {
    if (selectedTravellers) setTravellers(selectedTravellers);
  }, [selectedTravellers]);

  // PREFILL VISA TYPE
  useEffect(() => {
    if (visaTypes.length > 0) {
      if (selectedType) {
        const idx = visaTypes.findIndex((v) => v.name === selectedType);
        if (idx !== -1) {
          setSelectedVisaTypeIndex(idx);
          setVisaType(selectedType);
          return;
        }
      }
      setVisaType(visaTypes[0].name);
    }
  }, [visaTypes, selectedType]);

  // UPDATE TRAVELLER ARRAY LENGTH
  useEffect(() => {
    setTravellerData((prev) => {
      if (prev.length < travellers) {
        return [
          ...prev,
          ...Array.from({ length: travellers - prev.length }, () =>
            emptyTraveller()
          ),
        ];
      }
      if (prev.length > travellers) return prev.slice(0, travellers);
      return prev;
    });
  }, [travellers]);

  // ---------------- PRICING ----------------
  const pricePerTraveller =
    Number(visaTypes[selectedVisaTypeIndex]?.fees?.replace(/[^\d]/g, "")) ||
    DEFAULT_PRICE_PER_TRAVELLER;

  const baseFare = travellers * pricePerTraveller;
  const taxAmount = Math.round(baseFare * TAX_RATE);
  const discountAmount = Math.round((baseFare * discountPercent) / 100);
  const totalPayable =
    baseFare + SERVICE_CHARGE + taxAmount - discountAmount;

  // ---------------- APPLY COUPON ----------------
  const applyCoupon = async () => {
    if (!couponCode)
      return Swal.fire("Enter a coupon!", "", "warning");

    try {
      const res = await fetch(`${BASE_URL}/coupons/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode.toUpperCase(),
          amount: baseFare,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        return Swal.fire(
          "Invalid Coupon",
          data.message || "",
          "error"
        );
      }

      setAppliedCoupon(data.coupon?.code || couponCode.toUpperCase());
      setDiscountPercent(data.coupon?.discount || 0);

      Swal.fire(
        "Coupon Applied 🎉",
        `Saved ₹${data.amountDetails.discountAmount}`,
        "success"
      );
    } catch (err) {
      Swal.fire("Server Error", "", "error");
    }
  };

  // ---------------- VERIFY PAYMENT AFTER REDIRECT ----------------
  useEffect(() => {
    const merchantOrderId = new URLSearchParams(
      window.location.search
    ).get("merchantOrderId");

    if (!merchantOrderId) return;

    Swal.fire({
      title: "Verifying Payment...",
      didOpen: () => Swal.showLoading(),
    });

    const verify = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/payment/verify-payment?merchantOrderId=${merchantOrderId}`
        );
        const data = await res.json();

        Swal.close();

        if (!data.success) {
          setPaymentStatus("FAILED");
          Swal.fire("Payment Verification Failed", "", "error");
          return setStep(3);
        }

        if (data.paymentStatus === "SUCCESS") {
          setPaymentStatus("SUCCESS");
          Swal.fire("Payment Successful!", "", "success");

          window.history.replaceState({}, "", window.location.pathname);
          return setStep(4);
        }

        Swal.fire("Payment Pending", "", "info");
        setStep(3);
      } catch (err) {
        Swal.fire("Verification Error", "", "error");
      }
    };

    verify();
  }, []);

  // ---------------- INITIATE PAYMENT (FINAL) ----------------
  const handlePayment = async () => {
    try {
      const appId = localStorage.getItem("applicationId");

      // Save payment info before redirect
      await fetch(`${BASE_URL}/applications/${appId}/payment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: totalPayable }),
      });

      Swal.fire({
        title: "Redirecting to payment...",
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayable,
          visaId: id,
        }),
      });

      const data = await res.json();
      Swal.close();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        Swal.fire("Payment Error", data.message || "", "error");
      }
    } catch (err) {
      Swal.fire("Payment Server Error", "", "error");
    }
  };

  // ---------------- STEP FUNCTIONS ----------------
  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  // ---------------- STEP 1 → SEND DATA TO BACKEND ----------------
  const handleStep1Next = async () => {
    try {
      if (!visaType || !onwardDate || !returnDate)
        return Swal.fire("Fill all fields");

      const res = await fetch(`${BASE_URL}/applications/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visaType,
          onwardDate,
          returnDate,
          travellersCount: travellers,
        }),
      });

      const data = await res.json();
      if (!data.success)
        return Swal.fire("Step 1 Failed", data.msg, "error");

      localStorage.setItem("applicationId", data.data.applicationId);

      next();
    } catch (err) {
      Swal.fire("Server Error", err.message, "error");
    }
  };

  // ---------------- STEP 2 → SEND TRAVELLERS ----------------
  const handleSaveTravellers = async () => {
    try {
      const appId = localStorage.getItem("applicationId");
      if (!appId) return Swal.fire("Application missing");

      const form = new FormData();
      form.append("travellers", JSON.stringify(travellerData));

      travellerData.forEach((t, i) => {
        if (t.files.passportCopy)
          form.append(`passportCopy_${i}`, t.files.passportCopy);
        if (t.files.photo)
          form.append(`photo_${i}`, t.files.photo);
      });

      const res = await fetch(
        `${BASE_URL}/applications/${appId}/travellers`,
        {
          method: "PUT",
          body: form,
        }
      );

      const data = await res.json();
      if (data.success) next();
      else Swal.fire("Traveller Upload Failed", "", "error");
    } catch (err) {
      Swal.fire("Server Error", err.message, "error");
    }
  };

  // ---------------- STEP 4 → GLOBAL DOCS UPLOAD ----------------
const handleSubmitApplication = async () => {
  try {
    const appId = localStorage.getItem("applicationId");

    const form = new FormData();
    Object.keys(globalFiles).forEach((key) => {
      form.append(key, globalFiles[key]);
    });

    const res = await fetch(`${BASE_URL}/applications/${appId}/global-docs`, {
      method: "PUT",
      body: form,
    });

    const data = await res.json();
    if (data.success) {
      setStep(5); // <-- final success
    } else {
      Swal.fire("Document Upload Failed", "", "error");
    }
  } catch (err) {
    Swal.fire("Server Error", err.message, "error");
  }
};


  // ---------------- RENDER UI ----------------
  return (
    <div className="VisaApplicationForm__wrapper">
      <div className="VisaApplicationForm__grid">
        <main className="VisaApplicationForm__main">
          {/* STEP 1 */}
          {step === 1 && (
            <Step1Itinerary
              visaTypes={visaTypes}
              selectedVisaTypeIndex={selectedVisaTypeIndex}
              setSelectedVisaTypeIndex={(i) => {
                setSelectedVisaTypeIndex(i);
                setVisaType(visaTypes[i]?.name || "");
              }}
              travellers={travellers}
              setTravellers={setTravellers}
              onwardDate={onwardDate}
              setOnwardDate={setOnwardDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              baseFare={baseFare}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              totalPayable={totalPayable}
              handleNext={handleStep1Next}
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <Step2Traveller
              travellerData={travellerData}
              updateTravellerField={(i, f, v) =>
                setTravellerData((prev) => {
                  const u = [...prev];
                  if (!u[i]) u[i] = emptyTraveller();
                  u[i][f] = v;
                  return u;
                })
              }
              handleTravellerFile={(i, key, file) =>
                setTravellerData((prev) => {
                  const u = [...prev];
                  if (!u[i]) u[i] = emptyTraveller();
                  u[i].files[key] = file;
                  return u;
                })
              }
              handlePrev={prev}
              handleNext={handleSaveTravellers}
            />
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <Step3Payment
              totalPayable={totalPayable}
              paymentStatus={paymentStatus}
              handlePayment={handlePayment}
              handlePrev={prev}
            />
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <Step4UploadDocs
              handlePrev={prev}
              handleGlobalFile={(key, file) =>
                setGlobalFiles((prev) => ({
                  ...prev,
                  [key]: file,
                }))
              }
              handleSubmitApplication={handleSubmitApplication}
            />
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <Step5Success
              resetForm={() => {
                localStorage.removeItem("applicationId");
                window.location.reload();
              }}
            />
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <SummarySidebar
          baseFare={baseFare}
          taxAmount={taxAmount}
          discountAmount={discountAmount}
          totalPayable={totalPayable}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          appliedCoupon={appliedCoupon}
          applyCoupon={applyCoupon}
          showCouponInput={showCouponInput}
          setShowCouponInput={setShowCouponInput}
        />
      </div>
    </div>
  );
};

export default VisaApplicationForm;
