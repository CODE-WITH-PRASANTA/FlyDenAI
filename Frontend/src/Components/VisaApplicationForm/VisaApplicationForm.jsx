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

  // ⭐ Custom Application ID (FlyDen-2025-xxxxx)
  const [applicationId, setApplicationId] = useState(null);

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

  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  const [globalDocs, setGlobalDocs] = useState({
    passportCopy: null,
    photo: null,
    travelItinerary: null,
    additionalDocument: null,
  });

  // Load Visa Types
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

  // Sync Traveller Count
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

  // Pricing
  const pricePerTraveller =
    Number(visaTypes[selectedVisaTypeIndex]?.fees?.replace(/[^\d]/g, "")) ||
    DEFAULT_PRICE_PER_TRAVELLER;

  const baseFare = travellers * pricePerTraveller;
  const taxAmount = Math.round(baseFare * TAX_RATE);
  const discountAmount = Math.round((baseFare * discountPercent) / 100);

  const totalPayable =
    baseFare + SERVICE_CHARGE + taxAmount - discountAmount;

  // AUTO VERIFIED PAYMENT
  useEffect(() => {
    const merchantOrderId = new URLSearchParams(window.location.search).get(
      "merchantOrderId"
    );
    if (!merchantOrderId) return;

    Swal.fire({ title: "Verifying Payment...", didOpen: () => Swal.showLoading() });

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

        const status = data.paymentStatus;

        if (status === "SUCCESS") {
          setPaymentStatus("SUCCESS");

          // ⭐ Update payment in backend using Application ID
          await fetch(`${BASE_URL}/applications/${applicationId}/payment`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              merchantOrderId,
              status: "SUCCESS",
              transactionId: data?.data?.transactionId || "",
              rawResponse: data,
            }),
          });

          Swal.fire({ title: "Payment Successful!", icon: "success", timer: 1000, showConfirmButton: false });

          window.history.replaceState({}, "", window.location.pathname);
          setTimeout(() => setStep(4), 800);
          return;
        }

        if (status === "PENDING") {
          setPaymentStatus("PENDING");
          Swal.fire("Payment Pending", "", "info");
        } else {
          setPaymentStatus("FAILED");
          Swal.fire("Payment Failed", "", "error");
        }

        setStep(3);
      } catch (err) {
        Swal.close();
        setPaymentStatus("FAILED");
        Swal.fire("Error verifying payment", "", "error");
        setStep(3);
      }
    };

    verifyPayment();
  }, [applicationId]);

  // HANDLE PAYMENT
  const handlePayment = async () => {
    if (paymentStatus === "SUCCESS") return;

    try {
      // ⭐ CREATE APPLICATION FIRST
      if (!applicationId) {
        const createRes = await fetch(`${BASE_URL}/applications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visaId: id,
            visaType,
            travellersCount: travellers,
            travellers: travellerData,
            onwardDate,
            returnDate,
            couponCode,
            discountPercent,
            baseFare,
            taxAmount,
            serviceCharge: 1,
            discountAmount,
            totalPayable,
          }),
        });

        const created = await createRes.json();

        if (!created.success) {
          Swal.fire("Error", "Could not create application", "error");
          return;
        }

        setApplicationId(created.applicationId); // ⭐ custom ID like FlyDen-2025-123456
      }

      setIsInitiatingPayment(true);
      Swal.fire({ title: "Initiating Payment...", didOpen: () => Swal.showLoading() });

      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayable,
          visaId: id,
          meta: { visaType, travellers },
        }),
      });

      const data = await res.json();
      Swal.close();
      setIsInitiatingPayment(false);

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        Swal.fire("Could not initiate payment", data.message || "", "error");
      }
    } catch (err) {
      Swal.close();
      setIsInitiatingPayment(false);
      Swal.fire("Server error initiating payment", "", "error");
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
        return Swal.fire("Invalid Coupon", data.message, "error");
      }

      const { discountAmount, finalAmount } = data.amountDetails;

      setAppliedCoupon(data.coupon?.code || couponCode.toUpperCase());
      setDiscountPercent(data.coupon?.discount || 0);

      Swal.fire(
        "Coupon Applied 🎉",
        `Saved ₹${discountAmount} — New Total: ₹${finalAmount}`,
        "success"
      );
    } catch (err) {
      Swal.fire("Server Error", "", "error");
    }
  };

  // ⭐ FINAL SUBMIT — UPLOAD FILES
  const handleSubmitApplication = async () => {
    if (!applicationId) {
      Swal.fire("Error", "Application ID missing", "error");
      return;
    }

    const fd = new FormData();

    fd.append("data", JSON.stringify({ travellers: travellerData }));

    travellerData.forEach((trav, i) => {
      if (trav.files.passportCopy)
        fd.append(`traveller_${i}_passportCopy`, trav.files.passportCopy);

      if (trav.files.photo)
        fd.append(`traveller_${i}_photo`, trav.files.photo);
    });

    if (globalDocs.passportCopy)
      fd.append("global_passportCopy", globalDocs.passportCopy);

    if (globalDocs.photo)
      fd.append("global_photo", globalDocs.photo);

    if (globalDocs.travelItinerary)
      fd.append("travelItinerary", globalDocs.travelItinerary);

    if (globalDocs.additionalDocument)
      fd.append("additionalDocument", globalDocs.additionalDocument);

    Swal.fire({ title: "Uploading...", didOpen: () => Swal.showLoading() });

    const res = await fetch(
      `${BASE_URL}/applications/${applicationId}/upload`, // ⭐ using readable ID
      { method: "POST", body: fd }
    );

    const result = await res.json();
    Swal.close();

    if (!result.success) {
      Swal.fire("Upload Failed", result.message, "error");
      return;
    }

    Swal.fire("Success!", "Application Submitted Successfully.", "success");
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
              updateTravellerField={(i, field, value) =>
                setTravellerData((prev) => {
                  const upd = [...prev];
                  upd[i][field] = value;
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
