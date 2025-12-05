import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./PaymentFailed.css";

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/DummyTicket");
  };

  return (
    <div className="PaymentFailed-wrapper">
      <div className="PaymentFailed-card">

        {/* Failed Icon */}
        <div className="PaymentFailed-icon">
          <XCircle size={70} />
        </div>

        {/* Title */}
        <h2 className="PaymentFailed-title">Payment Failed</h2>

        {/* Messages */}
        <p className="PaymentFailed-message">
          Unfortunately, your dummy ticket payment could not be completed.
        </p>

        <p className="PaymentFailed-message">
          If any amount was deducted, it will be refunded automatically by your payment provider.
        </p>

        <p className="PaymentFailed-message small">
          Please try again or choose a different payment method.
        </p>

        {/* Retry Button */}
        <button className="PaymentFailed-btn" onClick={handleRetry}>
          Try Again
        </button>

      </div>
    </div>
  );
};

export default PaymentFailed;
