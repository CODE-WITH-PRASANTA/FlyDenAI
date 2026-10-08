import React, { useEffect, useState } from "react";
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

const FlyixoTicketBookingForm = ({ bookingData }) => {
  /* ============================================================
     DETECT BOOKING TYPE
  ============================================================ */

  const isHotel = bookingData?.type === "hotel";

  const sidebarData = isHotel
    ? {
        title: "Hotel Booking Summary",
        from:
          bookingData?.hotelLocation?.countryName ||
          "Select Location",
        to: "",
        date: bookingData?.checkInDate || "N/A",
        returnDate: bookingData?.checkOutDate || null,
        travellers: bookingData?.adults || 1,
        class: "N/A",
        tripType: "Hotel Booking",
      }
    : {
        title: "Flight Booking Summary",
        from:
          bookingData?.fromAirport?.countryName ||
          "N/A",
        to:
          bookingData?.toAirport?.countryName ||
          "N/A",
        date: bookingData?.departDate || "N/A",
        returnDate: bookingData?.returnDate || null,
        travellers:
          (bookingData?.adults || 0) +
          (bookingData?.children || 0) +
          (bookingData?.infants || 0),
        class: bookingData?.travelClass || "Economy",
        tripType: bookingData?.tripType || "One Way",
      };

  /* ============================================================
     PASSENGERS
  ============================================================ */

  const [passengers, setPassengers] = useState([
    {
      title: "Mr",
      firstName: "",
      lastName: "",
      nationality: "India",
    },
  ]);

  /* ============================================================
     COUPON
  ============================================================ */

  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  /* ============================================================
     PRICE
  ============================================================ */

  const [pricePerPassenger, setPricePerPassenger] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(true);

  /* ============================================================
     FETCH TICKET PRICE
  ============================================================ */

  const loadTicketPrice = async () => {
    try {
      setLoadingPrice(true);

      const res = await axios.get(`${BASE_URL}/price`);

      const backendPrice =
        res.data?.data?.ticketPrice || 0;

      setPricePerPassenger(Number(backendPrice));
    } catch (error) {
      console.error(
        "Error fetching ticket price:",
        error
      );

      setPricePerPassenger(0);
    } finally {
      setLoadingPrice(false);
    }
  };

  useEffect(() => {
    loadTicketPrice();
  }, []);

  /* ============================================================
     PRICING
  ============================================================ */

  const baseAmount =
    passengers.length * pricePerPassenger;

  /* ============================================================
     ADD PASSENGER
  ============================================================ */

  const addPassenger = () => {
    setPassengers((previous) => [
      ...previous,
      {
        title: "Mr",
        firstName: "",
        lastName: "",
        nationality: "India",
      },
    ]);
  };

  /* ============================================================
     REMOVE PASSENGER
  ============================================================ */

  const removePassenger = (index) => {
    setPassengers((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  /* ============================================================
     UPDATE PASSENGER
  ============================================================ */

  const updatePassenger = (index, field, value) => {
    setPassengers((previous) =>
      previous.map((passenger, passengerIndex) =>
        passengerIndex === index
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger
      )
    );
  };

  /* ============================================================
     RE-CALCULATE COUPON
  ============================================================ */

  const recalcCoupon = async () => {
    if (!isCouponApplied || !couponCode) {
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/coupons/apply`,
        {
          code: couponCode,
          amount: baseAmount,
        }
      );

      if (res.data?.success) {
        setDiscountAmount(
          res.data.amountDetails.discountAmount
        );

        setFinalAmount(
          res.data.amountDetails.finalAmount
        );
      }
    } catch (error) {
      setIsCouponApplied(false);
      setDiscountAmount(0);
      setFinalAmount(baseAmount);
    }
  };

  useEffect(() => {
    recalcCoupon();
  }, [baseAmount]);

  /* ============================================================
     APPLY COUPON
  ============================================================ */

  const applyCoupon = async () => {
    const trimmedCode = couponCode.trim();

    if (!trimmedCode) {
      setCouponMessage(
        "Please enter a coupon code."
      );
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/coupons/apply`,
        {
          code: trimmedCode,
          amount: baseAmount,
        }
      );

      if (res.data?.success) {
        const discount =
          res.data.amountDetails.discountAmount;

        const final =
          res.data.amountDetails.finalAmount;

        setDiscountAmount(discount);
        setFinalAmount(final);

        setCouponMessage(
          `Success! Coupon applied. You saved ₹${discount}`
        );

        setIsCouponApplied(true);
      }
    } catch (error) {
      setIsCouponApplied(false);
      setDiscountAmount(0);
      setFinalAmount(baseAmount);

      if (error.response) {
        setCouponMessage(
          error.response.data?.message ||
            "Invalid coupon code."
        );
      } else {
        setCouponMessage(
          "Error applying coupon."
        );
      }
    }
  };

  /* ============================================================
     HANDLE PAYMENT
  ============================================================ */

  const handlePayment = async () => {
    try {
      const totalToPay = isCouponApplied
        ? finalAmount
        : baseAmount;

      if (totalToPay <= 0) {
        alert("Invalid payment amount");
        return;
      }

      const customer = {
        phone:
          document.querySelector(
            "input[placeholder='Enter your phone number']"
          )?.value || "",

        purpose:
          document.querySelector(
            ".FlyixoBookingForm-purpose"
          )?.value || "",

        name:
          document.querySelector(
            "input[placeholder='Enter your full name']"
          )?.value || "",

        email:
          document.querySelector(
            "input[placeholder='Enter your email address']"
          )?.value || "",
      };

      /* ========================================================
         SAVE BOOKING
      ======================================================== */

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

      const bookingId =
        bookingSaveRes.data?.bookingId;

      if (!bookingId) {
        throw new Error(
          "Booking ID was not generated."
        );
      }

      localStorage.setItem(
        "bookingId",
        bookingId
      );

      /* ========================================================
         CREATE PAYMENT ORDER
      ======================================================== */

      const createRes = await axios.post(
        `${BASE_URL}/ticket-payment/order/create`,
        {
          amount: totalToPay,
          finalAmount: totalToPay,
          discountAmount,
          couponCode,
          customer,
          bookingId,
          bookingData: sidebarData,
        }
      );

      /* ========================================================
         REDIRECT TO PAYMENT
      ======================================================== */

      if (createRes.data?.success) {
        window.location.href =
          createRes.data.redirectUrl;
      } else {
        throw new Error(
          "Payment order could not be created."
        );
      }
    } catch (error) {
      console.error(
        "Payment Initiation Error:",
        error
      );

      alert(
        "Failed to initiate payment!"
      );
    }
  };

  /* ============================================================
     JSX
  ============================================================ */

  return (
    <section className="FlyixoBookingDetails">
      <div className="FlyixoBookingLayout">

        {/* ======================================================
            LEFT FORM
        ====================================================== */}

        <div className="FlyixoBookingForm FlyixoBookingForm-scroll">
          <div className="FlyixoBookingForm-mainTitle">
            <span className="FlyixoBookingForm-titleIcon">
              <Users size={23} />
            </span>

            <div>
              <span className="FlyixoBookingForm-eyebrow">
                Flyixo Travel
              </span>

              <h2>
                Contact & Passenger Details
              </h2>

              <p>
                Enter accurate details to continue
                your booking.
              </p>
            </div>
          </div>

          {/* ====================================================
              CONTACT DETAILS
          ==================================================== */}

          <div className="FlyixoBookingForm-section">
            <div className="FlyixoBookingForm-sectionHead">
              <span className="FlyixoBookingForm-sectionIcon">
                <User size={17} />
              </span>

              <div>
                <h3>Contact Details</h3>
                <p>
                  We will use these details for
                  booking communication.
                </p>
              </div>
            </div>

            <div className="FlyixoBookingForm-grid">

              {/* PHONE */}
              <div className="FlyixoBookingForm-group">
                <label>
                  <Phone size={15} />
                  Phone Number
                </label>

                <div className="FlyixoBookingForm-inputWrapper">
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* PURPOSE */}
              <div className="FlyixoBookingForm-group">
                <label>
                  <Briefcase size={15} />
                  Purpose
                </label>

                <div className="FlyixoBookingForm-inputWrapper">
                  <select className="FlyixoBookingForm-purpose">
                    <option value="">
                      Select Purpose
                    </option>

                    <option value="Business">
                      Business
                    </option>

                    <option value="Travel">
                      Travel
                    </option>

                    <option value="Work">
                      Work
                    </option>
                  </select>
                </div>
              </div>

              {/* NAME */}
              <div className="FlyixoBookingForm-group">
                <label>
                  <User size={15} />
                  Full Name
                </label>

                <div className="FlyixoBookingForm-inputWrapper">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="FlyixoBookingForm-group">
                <label>
                  <Mail size={15} />
                  Email Address
                </label>

                <div className="FlyixoBookingForm-inputWrapper">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              PASSENGERS
          ==================================================== */}

          {passengers.map((passenger, index) => (
            <div
              className="FlyixoBookingForm-passengerBox"
              key={index}
            >
              <div className="FlyixoBookingForm-passengerHeader">
                <div className="FlyixoBookingForm-passengerTitle">
                  <span>
                    <User size={17} />
                  </span>

                  <div>
                    <strong>
                      Passenger {index + 1}
                    </strong>

                    <small>
                      Passenger information
                    </small>
                  </div>
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    className="FlyixoBookingForm-removeBtn"
                    onClick={() =>
                      removePassenger(index)
                    }
                    aria-label={`Remove passenger ${
                      index + 1
                    }`}
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <div className="FlyixoBookingForm-grid">

                {/* TITLE */}
                <div className="FlyixoBookingForm-group">
                  <label>Title</label>

                  <div className="FlyixoBookingForm-inputWrapper">
                    <select
                      value={passenger.title}
                      onChange={(event) =>
                        updatePassenger(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                    >
                      <option value="Mr">
                        Mr
                      </option>

                      <option value="Mrs">
                        Mrs
                      </option>

                      <option value="Ms">
                        Ms
                      </option>
                    </select>
                  </div>
                </div>

                {/* FIRST NAME */}
                <div className="FlyixoBookingForm-group">
                  <label>First Name</label>

                  <div className="FlyixoBookingForm-inputWrapper">
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(event) =>
                        updatePassenger(
                          index,
                          "firstName",
                          event.target.value
                        )
                      }
                      placeholder="Enter first name"
                      autoComplete="given-name"
                    />
                  </div>
                </div>

                {/* LAST NAME */}
                <div className="FlyixoBookingForm-group">
                  <label>Last Name</label>

                  <div className="FlyixoBookingForm-inputWrapper">
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(event) =>
                        updatePassenger(
                          index,
                          "lastName",
                          event.target.value
                        )
                      }
                      placeholder="Enter last name"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* NATIONALITY */}
                <div className="FlyixoBookingForm-group">
                  <label>
                    <Globe size={14} />
                    Nationality
                  </label>

                  <div className="FlyixoBookingForm-inputWrapper">
                    <select
                      value={passenger.nationality}
                      onChange={(event) =>
                        updatePassenger(
                          index,
                          "nationality",
                          event.target.value
                        )
                      }
                    >
                      <option value="India">
                        India
                      </option>

                      <option value="UAE">
                        UAE
                      </option>

                      <option value="Saudi Arabia">
                        Saudi Arabia
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ADD PASSENGER */}

          <button
            type="button"
            className="FlyixoBookingForm-addPassenger"
            onClick={addPassenger}
          >
            <span>
              <Plus size={17} />
            </span>

            Add Passenger
          </button>
        </div>

        {/* ======================================================
            RIGHT SIDEBAR
        ====================================================== */}

        <aside className="FlyixoBookingSidebar">

          {/* SIDEBAR TITLE */}

          <div className="FlyixoBookingSidebar-title">
            <span>
              <Users size={19} />
            </span>

            <div>
              <small>FLYIXO BOOKING</small>
              <strong>
                {sidebarData.title}
              </strong>
            </div>
          </div>

          {/* ====================================================
              BOOKING SUMMARY
          ==================================================== */}

          <div className="FlyixoBookingSidebar-flightCard">
            <div className="FlyixoBookingSidebar-cardTop">
              <div>
                <span>
                  {isHotel
                    ? "HOTEL"
                    : "FLIGHT"}
                </span>

                <h4>
                  {sidebarData.title}
                </h4>
              </div>

              <div className="FlyixoBookingSidebar-status">
                Ready
              </div>
            </div>

            {/* ROUTE */}

            <div className="FlyixoBookingSidebar-route">
              <div className="FlyixoBookingSidebar-routePoint">
                <span className="FlyixoBookingSidebar-label">
                  {isHotel
                    ? "Hotel Location"
                    : "From"}
                </span>

                <strong className="FlyixoBookingSidebar-value">
                  {sidebarData.from}
                </strong>
              </div>

              {!isHotel && (
                <>
                  <span className="FlyixoBookingSidebar-arrow">
                    →
                  </span>

                  <div className="FlyixoBookingSidebar-routePoint">
                    <span className="FlyixoBookingSidebar-label">
                      To
                    </span>

                    <strong className="FlyixoBookingSidebar-value">
                      {sidebarData.to}
                    </strong>
                  </div>
                </>
              )}
            </div>

            {/* DATE */}

            <div className="FlyixoBookingSidebar-infoGrid">

              <div className="FlyixoBookingSidebar-infoBox">
                <span>
                  {isHotel
                    ? "Check-in Date"
                    : "Travel Date"}
                </span>

                <strong>
                  {sidebarData.date}
                </strong>
              </div>

              {sidebarData.returnDate && (
                <div className="FlyixoBookingSidebar-infoBox">
                  <span>
                    {isHotel
                      ? "Check-out"
                      : "Return"}
                  </span>

                  <strong>
                    {sidebarData.returnDate}
                  </strong>
                </div>
              )}

              <div className="FlyixoBookingSidebar-infoBox">
                <span>
                  {isHotel
                    ? "Guests"
                    : "Travellers"}
                </span>

                <strong>
                  {sidebarData.travellers}
                </strong>
              </div>

              {!isHotel && (
                <>
                  <div className="FlyixoBookingSidebar-infoBox">
                    <span>Class</span>

                    <strong>
                      {sidebarData.class}
                    </strong>
                  </div>

                  <div className="FlyixoBookingSidebar-infoBox FlyixoBookingSidebar-wideInfo">
                    <span>
                      Trip Type
                    </span>

                    <strong>
                      {sidebarData.tripType}
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ====================================================
              COUPON
          ==================================================== */}

          <div className="FlyixoBookingSidebar-couponCard">
            <div className="FlyixoBookingSidebar-sectionTitle">
              <span>
                <TicketPercent size={16} />
              </span>

              <div>
                <strong>
                  Discount Coupon
                </strong>

                <small>
                  Save more on your booking
                </small>
              </div>
            </div>

            <div className="FlyixoBookingSidebar-couponRow">
              <input
                type="text"
                className="FlyixoBookingSidebar-couponInput"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(event) =>
                  setCouponCode(
                    event.target.value
                  )
                }
              />

              <button
                type="button"
                className="FlyixoBookingSidebar-couponBtn"
                onClick={applyCoupon}
              >
                Apply
              </button>
            </div>

            {couponMessage && (
              <p
                className={`FlyixoBookingSidebar-couponMsg ${
                  isCouponApplied
                    ? "success"
                    : "error"
                }`}
              >
                {couponMessage}
              </p>
            )}
          </div>

          {/* ====================================================
              PAYMENT SUMMARY
          ==================================================== */}

          <div className="FlyixoBookingSidebar-paymentCard">
            <div className="FlyixoBookingSidebar-sectionTitle">
              <div>
                <strong>
                  Payment Summary
                </strong>

                <small>
                  Secure booking payment
                </small>
              </div>
            </div>

            {loadingPrice ? (
              <div className="FlyixoBookingSidebar-loading">
                <span className="FlyixoBookingSidebar-spinner" />
                <p>
                  Loading current price...
                </p>
              </div>
            ) : (
              <>
                <div className="FlyixoBookingSidebar-row">
                  <span>
                    Base Price
                  </span>

                  <strong>
                    ₹
                    {baseAmount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="FlyixoBookingSidebar-row">
                  <span>
                    Passengers
                  </span>

                  <strong>
                    {passengers.length}
                  </strong>
                </div>

                {isCouponApplied && (
                  <div className="FlyixoBookingSidebar-row FlyixoBookingSidebar-discountRow">
                    <span>
                      Coupon Discount
                    </span>

                    <strong>
                      - ₹
                      {discountAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                )}

                <div className="FlyixoBookingSidebar-divider" />

                <div className="FlyixoBookingSidebar-totalRow">
                  <div>
                    <span>
                      Final Amount
                    </span>

                    <small>
                      Including applicable discount
                    </small>
                  </div>

                  <strong>
                    ₹
                    {(isCouponApplied
                      ? finalAmount
                      : baseAmount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <button
                  type="button"
                  className="FlyixoBookingSidebar-payBtn"
                  onClick={handlePayment}
                >
                  <span>
                    Proceed to Payment
                  </span>

                  <strong>→</strong>
                </button>

                <div className="FlyixoBookingSidebar-secure">
                  <span>✓</span>
                  Secure & encrypted payment
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FlyixoTicketBookingForm;