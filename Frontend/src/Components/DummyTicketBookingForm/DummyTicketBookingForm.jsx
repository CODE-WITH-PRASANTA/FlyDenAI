import React, { useState, useEffect } from "react";
import {
  Phone,
  User,
  Mail,
  Briefcase,
  Plus,
  X,
  Globe,
  Users,
  TicketPercent,
} from "lucide-react";
import axios from "axios";
import BASE_URL from "../../Api";
import "./DummyTicketBookingForm.css";

const DummyTicketBookingForm = ({ bookingData }) => {

  /* ------------------------------------
        DETECT BOOKING TYPE
  ------------------------------------ */
  const isHotel = bookingData?.type === "hotel";
  const sidebarData = isHotel
    ? {
        title: "Hotel Booking Summary",
        from: bookingData?.hotelLocation?.countryName || "Select Location",
        to: "",
        date: bookingData?.checkInDate || "N/A",
        returnDate: bookingData?.checkOutDate || null,
        travellers: bookingData?.adults || 1,
        class: "N/A",
        tripType: "Hotel Booking",
      }
    : {
        title: "Flight Booking Summary",
        from: bookingData?.fromAirport?.countryName || "N/A",        to: bookingData?.toAirport?.countryName || "N/A",
        date: bookingData?.departDate || "N/A",
        returnDate: bookingData?.returnDate || null,
        travellers:
          (bookingData?.adults || 0) +
          (bookingData?.children || 0) +
          (bookingData?.infants || 0),
        class: bookingData?.travelClass || "Economy",
        tripType: bookingData?.tripType,
      };

  /* ------------------------------------
        PASSENGERS STATE
  ------------------------------------ */
  const [passengers, setPassengers] = useState([
    { title: "Mr", firstName: "", lastName: "", nationality: "India" },
  ]);

  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  /* ------------------------------------
        BACKEND PRICE STATE
  ------------------------------------ */
  const [pricePerPassenger, setPricePerPassenger] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(true);

  /* ------------------------------------
        FETCH PRICE FROM BACKEND
  ------------------------------------ */
  const loadTicketPrice = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/price`);
      const backendPrice = res.data?.data?.ticketPrice || 0;

      setPricePerPassenger(Number(backendPrice));
      setLoadingPrice(false);
    } catch (err) {
      console.error("Error fetching price:", err);
      setLoadingPrice(false);
    }
  };

  useEffect(() => {
    loadTicketPrice();
  }, []);

  /* ------------------------------------
        PRICING LOGIC
  ------------------------------------ */
  const baseAmount = passengers.length * pricePerPassenger;

  /* ------------------------------------
        ADD OR REMOVE PASSENGER
  ------------------------------------ */
  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { title: "Mr", firstName: "", lastName: "", nationality: "India" },
    ]);
  };

  const removePassenger = (index) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  /* ------------------------------------
        RE-CALCULATE COUPON (AUTO)
  ------------------------------------ */
  const recalcCoupon = async () => {
    if (!isCouponApplied || !couponCode) return;

    try {
      const res = await axios.post(`${BASE_URL}/coupons/apply`, {
        code: couponCode,
        amount: baseAmount,
      });

      if (res.data.success) {
        setDiscountAmount(res.data.amountDetails.discountAmount);
        setFinalAmount(res.data.amountDetails.finalAmount);
      }
    } catch (err) {
      setIsCouponApplied(false);
      setDiscountAmount(0);
      setFinalAmount(baseAmount);
    }
  };

  useEffect(() => {
    recalcCoupon();
  }, [baseAmount]);

  /* ------------------------------------
        APPLY COUPON
  ------------------------------------ */
  const applyCoupon = async () => {
    if (!couponCode) {
      setCouponMessage("Please enter a coupon code.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/coupons/apply`, {
        code: couponCode,
        amount: baseAmount,
      });

      if (res.data.success) {
        setDiscountAmount(res.data.amountDetails.discountAmount);
        setFinalAmount(res.data.amountDetails.finalAmount);
        setCouponMessage(
          `Success! Coupon applied. You saved ₹${res.data.amountDetails.discountAmount}`
        );
        setIsCouponApplied(true);
      }
    } catch (err) {
      setIsCouponApplied(false);
      setDiscountAmount(0);
      setFinalAmount(baseAmount);

      if (err.response) {
        setCouponMessage(err.response.data.message);
      } else {
        setCouponMessage("Error applying coupon.");
      }
    }
  };

  /* ------------------------------------
      HANDLE PAYMENT + STORE BOOKING DATA
  ------------------------------------ */
  const handlePayment = async () => {
  try {
    const totalToPay = isCouponApplied ? finalAmount : baseAmount;

    if (totalToPay <= 0) {
      alert("Invalid payment amount");
      return;
    }

    // Prepare customer info
    const customer = {
      phone: document.querySelector("input[placeholder='Enter your phone number']")?.value || "",
      purpose: document.querySelector("select")?.value || "",
      name: document.querySelector("input[placeholder='Enter your full name']")?.value || "",
      email: document.querySelector("input[placeholder='Enter your email address']")?.value || ""
    };

    // 1️⃣ STORE BOOKING IN DATABASE
    const bookingSaveRes = await axios.post(
      `${BASE_URL}/ticket-booking/create`,
      {
        customer,
        passengers,
        bookingData: sidebarData,
        priceDetails: {
          baseAmount,
          discountAmount,
          finalAmount: totalToPay,
          couponCode,
          isCouponApplied,
        },
      }
    );

    const bookingId = bookingSaveRes.data.bookingId;

    // ⭐ SAVE BOOKING ID LOCALLY (IMPORTANT!)
    localStorage.setItem("bookingId", bookingId);

    // 2️⃣ CREATE PAYMENT ORDER
        const createRes = await axios.post(`${BASE_URL}/ticket-payment/order/create`, {
        amount: totalToPay,
        finalAmount: totalToPay,
        discountAmount,
        couponCode,
        customer,
        bookingId,
        bookingData: sidebarData
      });



    // 3️⃣ REDIRECT TO PAYMENT PAGE
    if (createRes.data.success) {
      window.location.href = createRes.data.redirectUrl;
    }
  } catch (err) {
    console.error("Payment Initiation Error:", err);
    alert("Failed to initiate payment!");
  }
};


  /* ------------------------------------
        JSX RETURN
  ------------------------------------ */
  return (
    <div className="BookingDetails-container">
      {/* LEFT FORM */}
      <div className="BookingForm-wrapper BookingForm-scrollArea">
        <div className="BookingForm-mainTitle">
          <Users size={24} />
          Contact & Passenger Details
        </div>

        {/* CONTACT */}
        <div className="BookingForm-section">
          <div className="BookingForm-sectionHead">
            <User size={18} />
            Contact Details
          </div>

          <div className="BookingForm-grid">
            <div className="BookingForm-group">
              <label>
                <Phone size={16} /> Phone Number
              </label>
              <div className="BookingForm-inputWrapper">
                <input type="text" placeholder="Enter your phone number" />
              </div>
            </div>

            <div className="BookingForm-group">
              <label>
                <Briefcase size={16} /> Purpose
              </label>
              <div className="BookingForm-inputWrapper">
              <select>
              <option value="">Select Purpose</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Work">Work</option>
            </select>

              </div>
            </div>

            <div className="BookingForm-group">
              <label>
                <User size={16} /> Full Name
              </label>
              <div className="BookingForm-inputWrapper">
                <input type="text" placeholder="Enter your full name" />
              </div>
            </div>

            <div className="BookingForm-group">
              <label>
                <Mail size={16} /> Email Address
              </label>
              <div className="BookingForm-inputWrapper">
                <input type="email" placeholder="Enter your email address" />
              </div>
            </div>
          </div>
        </div>

        {/* PASSENGERS */}
        {passengers.map((pass, index) => (
          <div className="BookingForm-passengerBox" key={index}>
            <div className="BookingForm-passengerHeader">
              <div className="BookingForm-passengerTitle">
                <User size={18} />
                Passenger {index + 1}
              </div>

              {index > 0 && (
                <X
                  size={20}
                  className="BookingForm-removeIcon"
                  onClick={() => removePassenger(index)}
                />
              )}
            </div>

            <div className="BookingForm-grid">
              <div className="BookingForm-group">
                <label>Title</label>
                <div className="BookingForm-inputWrapper">
                  <select
                    value={passengers[index].title}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[index].title = e.target.value;
                      setPassengers(updated);
                    }}
                  >
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>
              </div>

              <div className="BookingForm-group">
                <label>First Name</label>
                <div className="BookingForm-inputWrapper">
                  <input
                    type="text"
                    value={passengers[index].firstName}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[index].firstName = e.target.value;
                      setPassengers(updated);
                    }}
                    placeholder="Enter first name"
                  />
                </div>
              </div>

              <div className="BookingForm-group">
                <label>Last Name</label>
                <div className="BookingForm-inputWrapper">
                  <input
                    type="text"
                    value={passengers[index].lastName}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[index].lastName = e.target.value;
                      setPassengers(updated);
                    }}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="BookingForm-group">
                <label>
                  <Globe size={15} /> Nationality
                </label>
                <div className="BookingForm-inputWrapper">
                  <select
                    value={passengers[index].nationality}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[index].nationality = e.target.value;
                      setPassengers(updated);
                    }}
                  >
                    <option>India</option>
                    <option>UAE</option>
                    <option>Saudi Arabia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ADD PASSENGER */}
        <button className="BookingForm-add" onClick={addPassenger}>
          <Plus size={18} /> Add Passenger
        </button>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="BookingSidebar-wrapper">
        <div className="BookingSidebar-title">
          <Users size={20} />
          {sidebarData.title}
        </div>

        {/* BOOKING SUMMARY */}
        <div className="BookingSidebar-flightCard">
          <h4 className="BookingSidebar-subTitle">{sidebarData.title}</h4>

          <div className="BookingSidebar-route">
            <div>
              <p className="BookingSidebar-label">
                {isHotel ? "Hotel Location" : "From"}
              </p>
              <h5 className="BookingSidebar-value">{sidebarData.from}</h5>
            </div>

            {!isHotel && (
              <>
                <span className="BookingSidebar-arrow">→</span>

                <div>
                  <p className="BookingSidebar-label">To</p>
                  <h5 className="BookingSidebar-value">{sidebarData.to}</h5>
                </div>
              </>
            )}
          </div>

          {/* DATES */}
          <div className="BookingSidebar-dateBox">
            <p>{isHotel ? "Check-in Date" : "Travel Date"}</p>
            <strong>{sidebarData.date}</strong>

            {sidebarData.returnDate && (
              <p>
                <strong>{isHotel ? "Check-out:" : "Return:"}</strong>{" "}
                {sidebarData.returnDate}
              </p>
            )}
          </div>

          {/* TRAVELLERS */}
          <div className="BookingSidebar-dateBox">
            <p>{isHotel ? "Guests" : "Travellers"}</p>
            <strong>{sidebarData.travellers}</strong>
          </div>

          {!isHotel && (
            <div className="BookingSidebar-dateBox">
              <p>Class</p>
              <strong>{sidebarData.class}</strong>
            </div>
          )}

          {!isHotel && (
            <div className="BookingSidebar-dateBox">
              <p>Trip Type</p>
              <strong>{sidebarData.tripType}</strong>
            </div>
          )}
        </div>

        {/* COUPON */}
        <div className="BookingSidebar-couponCard">
          <h4 className="BookingSidebar-sectionTitle">
            <TicketPercent size={16} /> Discount Coupon
          </h4>

          <div className="BookingSidebar-couponRow">
            <input
              type="text"
              className="BookingSidebar-couponInput"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="BookingSidebar-couponBtn" onClick={applyCoupon}>
              Apply
            </button>
          </div>

          {couponMessage && (
            <p className="BookingSidebar-couponMsg">{couponMessage}</p>
          )}
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="BookingSidebar-card">
          <h4 className="BookingSidebar-sectionTitle">Total Amount</h4>

          {loadingPrice ? (
            <p>Loading price...</p>
          ) : (
            <>
              <div className="BookingSidebar-row">
                <span>Base Price</span>
                <strong>₹{baseAmount}</strong>
              </div>

              {isCouponApplied && (
                <div className="BookingSidebar-row discountRow">
                  <span>Coupon Discount</span>
                  <strong>- ₹{discountAmount}</strong>
                </div>
              )}

              <div className="BookingSidebar-row amount">
                <span>Final Amount</span>
                <strong className="BookingSidebar-price">
                  ₹{isCouponApplied ? finalAmount : baseAmount}
                </strong>
              </div>

              <button className="BookingSidebar-payBtn" onClick={handlePayment}>
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DummyTicketBookingForm;
