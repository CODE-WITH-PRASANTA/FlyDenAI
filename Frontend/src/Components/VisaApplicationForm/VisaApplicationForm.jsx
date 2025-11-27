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

 useEffect(() => {
  const merchantOrderId = new URLSearchParams(window.location.search).get(
    "merchantOrderId"
  );

  if (merchantOrderId) {
    // 🔥 Returning from payment → need applicationId for verification
    const stored = localStorage.getItem("applicationId");
    if (stored) setApplicationId(stored);
  } else {
    // 🔥 Starting a new application → clear previous ID
    localStorage.removeItem("applicationId");
    setApplicationId(null);
  }
}, []);


  // Load Visa Types
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BASE_URL}/visas/published/${id}`);
        const data = await res.json();
        if (data.success) setVisaTypes(data.data?.visaTypes || []);
      } catch (err) {
        console.error("Error loading visa types", err);
      }
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
        // if same count, DO NOTHING — keep existing files
        if (prev.length === travellers) return prev;

        let arr = [...prev];

        if (travellers > prev.length) {
          for (let i = prev.length; i < travellers; i++) {
            arr.push(emptyTraveller());
          }
        } 
        
        if (travellers < prev.length) {
          arr = arr.slice(0, travellers);
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

  const totalPayable = baseFare + SERVICE_CHARGE + taxAmount - discountAmount;

  // -------------- Backend integration helpers ----------------

  // Create application on server
  const createApplicationOnServer = async (overrides = {}) => {
    try {
      const payload = {
        visaId: id || null,
        visaType: visaType || "",
        travellers: travellers || 1,
        meta: {
          onwardDate,
          returnDate,
          ...overrides,
        },
      };

      const res = await fetch(`${BASE_URL}/applications/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to create application");

      // store app id
      const appId = data.applicationId || data.data?.applicationId || data.data?._id;
      if (appId) {
        setApplicationId(appId);
        localStorage.setItem("applicationId", appId);
      }
      return { success: true, appId, data: data.data || null };
    } catch (err) {
      console.error("createApplicationOnServer error:", err);
      return { success: false, message: err.message || "Server error" };
    }
  };

  // Update step data (text fields) on server
  const saveStepToServer = async (appId, stepNumber, data) => {
    if (!appId) return { success: false, message: "Missing applicationId" };
    try {
      const res = await fetch(`${BASE_URL}/applications/${appId}/step`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: stepNumber, data }),
      });
      const resp = await res.json();
      if (!resp.success) throw new Error(resp.message || "Failed to save step");
      return { success: true, data: resp.data };
    } catch (err) {
      console.error("saveStepToServer error:", err);
      return { success: false, message: err.message || "Server error" };
    }
  };

  // Ensure application exists (create if missing). Returns applicationId on success.
  const ensureApplicationExists = async () => {
    if (applicationId) return applicationId;
    const result = await createApplicationOnServer();
    if (result.success) return result.appId;
    throw new Error(result.message || "Unable to create application");
  };

  // ---------------- Auto verified payment — only after applicationId is available ------------
  useEffect(() => {
    if (!applicationId) return;

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

          Swal.fire({
            title: "Payment Successful!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });

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

  // ----------------- HANDLE PAYMENT INIT -------------------------
  const handlePayment = async () => {
    if (paymentStatus === "SUCCESS") return;

    try {
      setIsInitiatingPayment(true);
      Swal.fire({
        title: "Initiating Payment...",
        didOpen: () => Swal.showLoading(),
      });

      // Ensure app exists before creating payment order, and include applicationId in meta
      let appId = applicationId;
      if (!appId) {
        const created = await createApplicationOnServer({
          createdFrom: "frontend_initiate_payment",
        });
        if (!created.success) {
          Swal.close();
          setIsInitiatingPayment(false);
          return Swal.fire("Could not create application", created.message || "", "error");
        }
        appId = created.appId;
      }

      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayable,
          visaId: id,
          meta: {
            visaType,
            travellers,
            applicationId: appId, // include so backend/payment provider can map
          },
        }),
      });

      const data = await res.json();
      Swal.close();
      setIsInitiatingPayment(false);

      if (data.success && data.redirectUrl) {
        // redirect to payment provider
        window.location.href = data.redirectUrl;
      } else {
        Swal.fire("Could not initiate payment", data.message || "", "error");
      }
    } catch (err) {
      Swal.close();
      setIsInitiatingPayment(false);
      console.error("handlePayment error:", err);
      Swal.fire("Server error initiating payment", "", "error");
    }
  };

  // ----------------- APPLY COUPON ---------------------------
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
      console.error("applyCoupon error:", err);
      Swal.fire("Server Error", "", "error");
    }
  };

  // ----------------- FINAL SUBMIT — UPLOAD FILES -------------------
  const handleSubmitApplication = async () => {
    if (!applicationId) {
      // shouldn't happen because we create before upload in flow, but guard
      Swal.fire("Error", "Application ID missing", "error");
      return;
    }

    // Save textual traveller data to server BEFORE uploading files so server has full traveller data
    const saveResp = await saveStepToServer(applicationId, 4, {
      travellers: travellerData,
      globalDocsMeta: {
        onwardDate,
        returnDate,
      },
    });

    if (!saveResp.success) {
      Swal.fire("Error", "Could not save application data before upload", "error");
      return;
    }

    const fd = new FormData();

    // Although controller.uploadFiles currently only processes files, keep "data" for future use
    fd.append("data", JSON.stringify({ travellers: travellerData }));

    // Traveller files
    travellerData.forEach((trav, i) => {
        if (trav.files?.passportCopy) {
          fd.append(`traveller_${i}_passportCopy`, trav.files.passportCopy);
        }
        if (trav.files?.photo) {
          fd.append(`traveller_${i}_photo`, trav.files.photo);
        }
      });


    // Global Docs ONLY If File Exists
    if (globalDocs.passportCopy instanceof File)
      fd.append("global_passportCopy", globalDocs.passportCopy);

    if (globalDocs.photo instanceof File) fd.append("global_photo", globalDocs.photo);

    if (globalDocs.travelItinerary instanceof File)
      fd.append("travelItinerary", globalDocs.travelItinerary);

    if (globalDocs.additionalDocument instanceof File)
      fd.append("additionalDocument", globalDocs.additionalDocument);

    Swal.fire({ title: "Uploading...", didOpen: () => Swal.showLoading() });

    try {
     // DEBUG — Check what files are being sent
      for (var p of fd.entries()) {
        console.log("FD:", p[0], p[1]);
      }

      const res = await fetch(`${BASE_URL}/applications/${applicationId}/upload`, {
        method: "POST",
        body: fd,
      });


      const result = await res.json();
      Swal.close();

      if (!result.success) {
        Swal.fire("Upload Failed", result.message, "error");
        return;
      }

      Swal.fire("Success!", "Application Submitted Successfully.", "success");

      // Clear ID after success
      localStorage.removeItem("applicationId");

      setStep(5);
    } catch (err) {
      Swal.close();
      console.error("handleSubmitApplication error:", err);
      Swal.fire("Upload Failed", "", "error");
    }
  };

  // ------------------- Wrapped step transitions that sync with backend -------------------

  // When moving from Step 1 -> 2: ensure application exists and save itinerary/top-level details
    const handleNextFromStep1 = async () => {
      try {
        Swal.fire({ title: "Saving...", didOpen: () => Swal.showLoading() });

        // Step 1: Create application if missing
        let appId = applicationId;
        if (!appId) {
          const created = await createApplicationOnServer();
          if (!created.success) throw new Error("Could not create application");
          appId = created.appId;
        }

        // Step 2: Update step AFTER creation
        const saved = await saveStepToServer(appId, 1, {
          visaType,
          travellers,
          onwardDate,
          returnDate
        });

        if (!saved.success) throw new Error("Could not save step 1");

        setStep(2);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        Swal.close();
      }
    };


  // When moving from Step 2 -> 3: save travellers textual data
  const handleNextFromStep2 = async () => {
    try {
      const appId = await ensureApplicationExists();
      await saveStepToServer(appId, 2, { travellers: travellerData });
      setStep(3);
    } catch (err) {
      console.error("handleNextFromStep2 error:", err);
      Swal.fire("Error", "Could not save traveller data. Try again.", "error");
    }
  };

  // When moving back or forward, we can optionally save step
  const handlePrevFromStep2 = () => setStep(1);
  const handlePrevFromStep3 = () => setStep(2);
  const handlePrevFromStep4 = () => setStep(3);

  // ---------------- Render ----------------
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
              // wrapped: ensure application created and saved
              handleNext={handleNextFromStep1}
            />
          )}

          {step === 2 && (
            <Step2Traveller
              travellerData={travellerData}
              updateTravellerField={(i, field, value) =>
                  setTravellerData((prev) => {
                    const upd = [...prev];
                    if (!upd[i]) upd[i] = emptyTraveller();
                    upd[i][field] = value;
                    return upd;
                  })
                }

              handleTravellerFile={(i, key, file) =>
                setTravellerData((prev) => {
                  const upd = [...prev];
                  if (!upd[i]) upd[i] = emptyTraveller();
                  upd[i].files[key] = file;
                  return upd;
                })
              }
              handlePrev={handlePrevFromStep2}
              // wrapped: save travellers then move on
              handleNext={handleNextFromStep2}
            />
          )}

          {step === 3 && (
            <Step3Payment
              totalPayable={totalPayable}
              paymentStatus={paymentStatus}
              isInitiatingPayment={isInitiatingPayment}
              handlePayment={async () => {
                // ensure application exists and save current travellers text before initiating payment
                try {
                  const appId = await ensureApplicationExists();
                  await saveStepToServer(appId, 3, {
                    travellers: travellerData,
                    meta: { initiatedAt: new Date().toISOString() },
                  });
                } catch (err) {
                  console.error("Pre-payment save failed:", err);
                  // still attempt payment, but notify user
                  Swal.fire(
                    "Warning",
                    "Could not save application before payment. Payment will still proceed but data may not be persisted.",
                    "warning"
                  );
                }
                handlePayment();
              }}
              handlePrev={handlePrevFromStep3}
            />
          )}

          {step === 4 && (
            <Step4UploadDocs
              globalDocs={globalDocs}
              handleGlobalFile={(key, file) =>
                setGlobalDocs((prev) => ({ ...prev, [key]: file }))
              }
              handlePrev={handlePrevFromStep4}
              handleSubmitApplication={handleSubmitApplication}
            />
          )}

          {step === 5 && <Step5Success resetForm={() => window.location.reload()} />}
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
