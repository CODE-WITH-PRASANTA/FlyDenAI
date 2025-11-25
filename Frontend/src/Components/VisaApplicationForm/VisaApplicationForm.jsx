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

const DEFAULT_PRICE_PER_TRAVELLER = 748;
export const SERVICE_CHARGE = 1;
export const TAX_RATE = 0.0;

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
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);

  // paymentStatus → "PENDING" | "SUCCESS" | "FAILED"
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  const [globalDocs, setGlobalDocs] = useState({
    passportCopy: null,
    photo: null,
    travelItinerary: null,
    additionalDocument: null,
  });

  // LOAD VISA TYPES
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${BASE_URL}/visas/published/${id}`);
      const data = await res.json();
      if (data.success) setVisaTypes(data.data?.visaTypes || []);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (selectedTravellers) setTravellers(selectedTravellers);
  }, [selectedTravellers]);

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

  // SYNC TRAVELLER COUNT
  useEffect(() => {
    setTravellerData((prev) => {
      let arr = [...prev];
      if (travellers > prev.length) {
        for (let i = prev.length; i < travellers; i++) arr.push(emptyTraveller());
      } else {
        arr.length = travellers;
      }
      return arr;
    });
  }, [travellers]);

  // PRICING
  const pricePerTraveller =
    Number(visaTypes[selectedVisaTypeIndex]?.fees?.replace(/[^\d]/g, "")) ||
    DEFAULT_PRICE_PER_TRAVELLER;

  const baseFare = travellers * pricePerTraveller;
  const taxAmount = Math.round(baseFare * TAX_RATE);
  const discountAmount = Math.round((baseFare * discountPercent) / 100);

  const totalPayable = Math.round(
    baseFare + SERVICE_CHARGE + taxAmount - discountAmount
  );

  // AUTO VERIFY PHONEPE RESPONSE
  useEffect(() => {
    const merchantOrderId = new URLSearchParams(window.location.search).get(
      "merchantOrderId"
    );
    if (!merchantOrderId) return;

    Swal.fire({
      title: "Verifying Payment...",
      didOpen: () => Swal.showLoading(),
    });

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/payment/verify-payment?merchantOrderId=${merchantOrderId}`
        );
        const data = await res.json();

        Swal.close();

        if (!data.success) {
          setPaymentStatus("FAILED");
          Swal.fire("Verification Failed", "", "error");
          setStep(3);
          return;
        }

        const status = data.paymentStatus; // SUCCESS | FAILED | PENDING

        if (status === "SUCCESS") {
          setPaymentStatus("SUCCESS");
          Swal.fire({
            title: "Payment Successful!",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });

          // clean URL
          window.history.replaceState({}, "", window.location.pathname);

          setTimeout(() => setStep(4), 1000);
          return;
        }

        if (status === "PENDING") {
          setPaymentStatus("PENDING");
          Swal.fire("Payment Pending", "", "info");
          setStep(3);
          return;
        }

        setPaymentStatus("FAILED");
        Swal.fire("Payment Failed or Cancelled", "", "error");
        setStep(3);
      } catch (err) {
        Swal.close();
        setPaymentStatus("FAILED");
        Swal.fire("Error verifying payment", "", "error");
        setStep(3);
      }
    };

    verifyPayment();
  }, []);

  // HANDLE PAYMENT
  const handlePayment = async () => {
    if (paymentStatus === "SUCCESS") return;

    setIsInitiatingPayment(true);

    Swal.fire({
      title: "Initiating Payment...",
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayable,
          visaId: id,
          meta: { visaType: visaType, travellers },
        }),
      });

      const data = await res.json();
      setIsInitiatingPayment(false);
      Swal.close();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        Swal.fire("Could not initiate payment", data.message || "", "error");
      }
    } catch (err) {
      Swal.close();
      setIsInitiatingPayment(false);
      Swal.fire("Server error while initiating payment", "", "error");
    }
  };

  // APPLY COUPON
  const applyCoupon = async () => {
    if (!couponCode) return Swal.fire("Enter a coupon!", "", "warning");

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
        return Swal.fire("Invalid Coupon ❌", data.message || "Invalid coupon");
      }

      const { discountAmount, finalAmount } = data.amountDetails || {};

      setAppliedCoupon(data.coupon?.code || couponCode.toUpperCase());
      setDiscountPercent(data.coupon?.discount || 0);

      Swal.fire(
        "Coupon Applied! 🎉",
        `You saved ₹${discountAmount}\nNew Total: ₹${finalAmount}`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  const handleSubmitApplication = () => {
    setStep(5);
  };

  return (
    <div className="VisaApplicationForm__wrapper">
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
              onwardDate={onwardDate}
              setOnwardDate={setOnwardDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              baseFare={baseFare}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              totalPayable={totalPayable}
              handleNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <Step2Traveller
              travellerData={travellerData}
              updateTravellerField={(i, f, v) =>
                setTravellerData((prev) => {
                  const upd = [...prev];
                  upd[i][f] = v;
                  return upd;
                })
              }
              handleTravellerFile={(i, key, file) =>
                setTravellerData((prev) => {
                  const upd = [...prev];
                  upd[i].files[key] = file;
                  return upd;
                })
              }
              handlePrev={() => setStep(1)}
              handleNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <Step3Payment
              totalPayable={totalPayable}
              paymentStatus={paymentStatus}
              isInitiatingPayment={isInitiatingPayment}
              handlePayment={handlePayment}
              handlePrev={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <Step4UploadDocs
              globalDocs={globalDocs}
              handleGlobalFile={(key, file) =>
                setGlobalDocs((prev) => ({ ...prev, [key]: file }))
              }
              handlePrev={() => setStep(3)}
              handleSubmitApplication={handleSubmitApplication}
            />
          )}

          {step === 5 && (
            <Step5Success resetForm={() => window.location.reload()} />
          )}
        </main>

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
