import React, { useState, useEffect } from "react";
import "./VisaApplicationForm.css";
import Swal from "sweetalert2";
import { FaPlaneDeparture, FaUser, FaCreditCard, FaFileUpload } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import BASE_URL from "../../Api";

import Step1Itinerary from "./Steps/Step1Itinerary";
import Step2Traveller from "./Steps/Step2Traveller";
import Step3Payment from "./Steps/Step3Payment";
import Step4UploadDocs from "./Steps/Step4UploadDocs";
import Step5Success from "./Steps/Step5Success";
import SummarySidebar from "./SummarySidebar";

const DEFAULT_PRICE_PER_TRAVELLER = 748;
export const SERVICE_CHARGE = 200;
export const TAX_RATE = 0.18;

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
  const { id } = useParams();
  const location = useLocation();
  const userRequest = location.state || {};
  const { selectedType, travellers: selectedTravellers } = userRequest;

  const [step, setStep] = useState(1);
  const [visaTypes, setVisaTypes] = useState([]);
  const [selectedVisaTypeIndex, setSelectedVisaTypeIndex] = useState(0);
  const [visaType, setVisaType] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [onwardDate, setOnwardDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellerData, setTravellerData] = useState([emptyTraveller()]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const [globalDocs, setGlobalDocs] = useState({
    passportCopy: null,
    photo: null,
    travelItinerary: null,
    additionalDocument: null,
  });

  const progressSteps = [
    { label: "Itinerary", icon: <FaPlaneDeparture /> },
    { label: "Traveller Details", icon: <FaUser /> },
    { label: "Make Payment", icon: <FaCreditCard /> },
    { label: "Documents", icon: <FaFileUpload /> },
  ];

  // ================== FETCH VISA TYPE ==================
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`${BASE_URL}/visas/published/${id}`);
        const data = await res.json();
        if (!data.success) return;
        setVisaTypes(data.data?.visaTypes || []);
      } catch (err) {
        console.error("Error fetching visas:", err);
      }
    };
    if (id) fetchVisa();
  }, [id]);

  useEffect(() => {
    if (selectedTravellers) setTravellers(selectedTravellers);
  }, [selectedTravellers]);

  useEffect(() => {
    if (visaTypes.length > 0) {
      if (selectedType) {
        const index = visaTypes.findIndex((v) => v.name === selectedType);
        if (index !== -1) {
          setSelectedVisaTypeIndex(index);
          setVisaType(selectedType);
          return;
        }
      }
      setVisaType(visaTypes[0].name);
    }
  }, [selectedType, visaTypes]);

  // ================== AUTO PAYMENT VERIFICATION ==================
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("orderId");
      if (!orderId) return; // user came normally, not from PhonePe

      const verifyPayment = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/payment/verify-payment?orderId=${orderId}`
          );
          const data = await res.json();

          if (!data.success) {
            return Swal.fire(
              "Verification Failed ❌",
              "Unable to verify your payment. Please contact support.",
              "error"
            );
          }

          const status = data.status;

          if (status === "COMPLETED") {
            setStep(4);
            Swal.fire(
              "Payment Successful 🎉",
              "Upload your documents to complete your visa application.",
              "success"
            );
          } else if (status === "PENDING") {
            Swal.fire(
              "Payment Pending ⏳",
              "We are still waiting for confirmation. Please refresh after a few seconds.",
              "info"
            );
          } else {
            Swal.fire(
              "Payment Failed ❌",
              "Your payment could not be completed. Please try again.",
              "error"
            );
          }
        } catch (err) {
          console.error("Verification failed:", err);
          Swal.fire(
            "Server Error ❌",
            "Something went wrong while verifying the payment.",
            "error"
          );
        }
      };

      verifyPayment();
    }, []);


  // Sync travellers on count change
  useEffect(() => {
    setTravellerData((prev) => {
      const arr = [...prev];
      if (travellers > prev.length) {
        for (let i = prev.length; i < travellers; i++) arr.push(emptyTraveller());
      } else {
        arr.length = travellers;
      }
      return arr;
    });
  }, [travellers]);

  // ================== TRAVELLER HANDLERS ==================
  const updateTravellerField = (index, field, value) => {
    setTravellerData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleTravellerFile = (index, key, file) => {
    setTravellerData((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        files: { ...updated[index].files, [key]: file },
      };
      return updated;
    });
  };

  // Pricing
  const pricePerTraveller =
    Number(visaTypes[selectedVisaTypeIndex]?.fees?.replace(/[^\d]/g, "")) ||
    DEFAULT_PRICE_PER_TRAVELLER;
  const baseFare = travellers * pricePerTraveller;
  const taxAmount = Math.round(baseFare * TAX_RATE);
  const discountAmount = Math.round((baseFare * discountPercent) / 100);
  const totalPayable = baseFare + SERVICE_CHARGE + taxAmount - discountAmount;

  // ================== PAYMENT CALL ==================
  // ================== PAYMENT CALL ==================
const handlePayment = async () => {
  try {
    const res = await fetch(`${BASE_URL}/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPayable }),
    });

    const data = await res.json();

    if (!data.success || !data.redirectUrl) {
      return Swal.fire(
        "Payment Error ❌",
        data.message || "Unable to initiate payment.",
        "error"
      );
    }

    // Redirect user to PhonePe PayPage
    window.location.href = data.redirectUrl;
  } catch (err) {
    Swal.fire(
      "Server Error ❌",
      "Unable to connect to payment server. Try again later.",
      "error"
    );
    console.log("Payment Failed:", err);
  }
};


  // Reset Everything
  const resetForm = () => {
    setStep(1);
    setTravellerData([emptyTraveller()]);
    setTravellers(1);
    setOnwardDate("");
    setReturnDate("");
    setCouponCode("");
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setGlobalDocs({
      passportCopy: null,
      photo: null,
      travelItinerary: null,
      additionalDocument: null,
    });
  };

  const handleNext = () => {
    if (step === 1 && (!visaType || !onwardDate || !returnDate)) {
      return Swal.fire("Missing Fields!", "Fill all required details.", "warning");
    }
    if (step === 2) {
      for (let i = 0; i < travellerData.length; i++) {
        const t = travellerData[i];
        if (!t.firstName || !t.lastName || !t.passportNo) {
          return Swal.fire(
            "Missing Traveller Details ❌",
            `Fill details for Traveller ${i + 1}`,
            "error"
          );
        }
      }
    }
    setStep(step + 1);
  };

  return (
    <div className="VisaApplicationForm__wrapper">

      {/* PROGRESS BAR */}
      <div className="VisaApplicationForm__progress">
        <div
          className="VisaApplicationForm__progress-fill"
          style={{ width: `${((step - 1) / (progressSteps.length - 1)) * 100}%` }}
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
                <div className="VisaApplicationForm__progress-label">{p.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN FORM GRID */}
      <div className="VisaApplicationForm__grid">
        <main className="VisaApplicationForm__main">
          
          {step === 1 && (
            <Step1Itinerary
              visaTypes={visaTypes}
              selectedVisaTypeIndex={selectedVisaTypeIndex}
              setSelectedVisaTypeIndex={setSelectedVisaTypeIndex}
              setVisaType={setVisaType}
              travellers={travellers}
              setTravellers={setTravellers}
              baseFare={baseFare}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              totalPayable={totalPayable}
              onwardDate={onwardDate}
              setOnwardDate={setOnwardDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              handleNext={handleNext}
            />
          )}

          {step === 2 && (
            <Step2Traveller
              travellerData={travellerData}
              updateTravellerField={updateTravellerField}
              handleTravellerFile={handleTravellerFile}
              handlePrev={() => setStep(step - 1)}
              handleNext={handleNext}
            />
          )}

          {step === 3 && (
            <Step3Payment
              totalPayable={totalPayable}
              handlePayment={handlePayment}
              handlePrev={() => setStep(step - 1)}
            />
          )}

          {step === 4 && (
            <Step4UploadDocs
              handleGlobalFile={(key, file) =>
                setGlobalDocs((prev) => ({ ...prev, [key]: file }))
              }
              handlePrev={() => setStep(step - 1)}
              handleSubmitApplication={() => setStep(5)}
            />
          )}

          {step === 5 && (
            <Step5Success resetForm={resetForm} />
          )}
        </main>

        {/* Sidebar */}
        <SummarySidebar
          baseFare={baseFare}
          taxAmount={taxAmount}
          discountAmount={discountAmount}
          totalPayable={totalPayable}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          appliedCoupon={appliedCoupon}
        />

      </div>
    </div>
  );
};

export default VisaApplicationForm;
