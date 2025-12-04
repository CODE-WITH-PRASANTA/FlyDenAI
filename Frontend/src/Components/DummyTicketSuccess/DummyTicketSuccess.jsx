import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Api";
import { useParams, useNavigate } from "react-router-dom";
import "./DummyTicketSuccess.css";

const DummyTicketSuccess = () => {
  const { id } = useParams(); // merchantOrderId
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 🔍 VERIFY PAYMENT STATUS
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/ticket-payment/order/verify?orderId=${id}`
        );

        const status = res.data.paymentStatus;

        if (status !== "SUCCESS") {
          navigate(`/dummyticket/booking/${id}`);
        }

        setLoading(false);
      } catch (error) {
        console.error("Payment verification failed:", error);
        navigate(`/dummyticket/booking/${id}`);
      }
    };

    verifyPayment();
  }, [id, navigate]);

  const handleGoToDashboard = () => {
    navigate("/DummyTicket");
  };

  if (loading)
    return (
      <div className="Success-wrapper">
        <div className="Success-card">
          <div className="Success-loading">Verifying Payment...</div>
        </div>
      </div>
    );

  return (
    <div className="Success-wrapper">
      <div className="Success-card">

        <div className="Success-icon">✓</div>

        <h2 className="Success-title">Booking Confirmed!</h2>

        <p className="Success-message">
          Thank you! Your Dummy Ticket Booking is{" "}
          <strong>successfully confirmed</strong>.
        </p>

        <p className="Success-message">
          You have already received your <strong>payment receipt</strong> and other
          booking details in your registered <strong>email</strong>.
        </p>

        <p className="Success-message">
          Your dummy ticket will be <strong>ready within 24 hours</strong> and sent to
          your registered <strong>email ID</strong> and <strong>phone</strong>.
        </p>

        <p className="Success-orderId">
          <strong>Order ID:</strong> {id}
        </p>

        <button className="Success-btn" onClick={handleGoToDashboard}>
          Go to Dashboard
        </button>

      </div>
    </div>
  );
};

export default DummyTicketSuccess;
