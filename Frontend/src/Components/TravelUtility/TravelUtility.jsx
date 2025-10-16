import React, { useState } from "react";
import "./TravelUtility.css";
import { FaShieldAlt, FaCreditCard, FaLock } from "react-icons/fa";
import upi from "../../assets/upi.webp";


const TravelUtility = () => {
  const [activePayment, setActivePayment] = useState("UPI");

  const paymentMethods = [
    "UPI",
    "Credit Card",
    "AMEX",
    "Debit Card",
    "Net Banking",
    "Credit Card EMI",
    "Wallet",
    "Phonepe",
    "Google Pay",
  ];

  const renderPaymentContent = () => {
    switch (activePayment) {
      case "UPI":
        return (
          <>
            <h4>Scan & Pay with UPI App</h4>
            <ol>
              <li>Open any UPI or banking app on your phone</li>
              <li>Scan the QR code to pay</li>
            </ol>
            <div className="upi-icons">
              <img src={upi} alt="Phonepe" />

            </div>
            <div className="upi-steps">
              <div className="step">
                <div className="step-number">1</div>
                <img src="/path-to-icons/desktop.png" alt="desktop" />
                <p>Enter VPA on Akbartravels payment page</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <img src="/path-to-icons/mobile-bank.png" alt="mobile" />
                <p>Go to your bank's app to access request</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <img src="/path-to-icons/success.png" alt="success" />
                <p>Enter MPIN to authenticate on your bank app</p>
              </div>
            </div>
            <div className="virtual-address">
              <label>Virtual payment address</label>
              <input type="text" placeholder="Virtual payment address" />
            </div>
            <div className="payment-footer">
              <span>
                Total payable amount <strong>₹748</strong>
              </span>
              <button className="pay-btn">Make Payment</button>
            </div>
          </>
        );
      case "Credit Card":
      case "Debit Card":
      case "AMEX":
        return (
          <>
            <h4>Pay via {activePayment}</h4>
            <p>
              Enter your card details below to complete the payment securely.
            </p>
            <div className="card-payment-form">
              <div className="form-row">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
              </div>
              <div className="form-row">
                <label>Cardholder Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-row">
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" />
              </div>
              <div className="form-row">
                <label>CVV</label>
                <input type="password" placeholder="XXX" />
              </div>
            </div>
            <div className="payment-footer">
              <span>
                Total payable amount <strong>₹748</strong>
              </span>
              <button className="pay-btn">Make Payment</button>
            </div>
          </>
        );
      case "Net Banking":
        return (
          <>
            <h4>Net Banking</h4>
            <p>Select your bank from the list below to proceed.</p>
            <select>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>SBI Bank</option>
              <option>Axis Bank</option>
            </select>
            <div className="payment-footer">
              <span>
                Total payable amount <strong>₹748</strong>
              </span>
              <button className="pay-btn">Make Payment</button>
            </div>
          </>
        );
      case "Credit Card EMI":
        return <p>Credit Card EMI option will be available soon.</p>;
      case "Wallet":
      case "Phonepe":
      case "Google Pay":
        return <p>Payment via {activePayment} coming soon.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="travel-utility-container">
      <h2>Travel Utility</h2>
      <p>
        Travel Utility is an online payment option available for the convenience
        of customer to pay additional amount for the service opted.
      </p>

      <div className="travel-utility-main-grid">
        {/* LEFT SIDE */}
        <div className="utility-left">
          {/* Payment & Contact Cards */}
          {/* ...same as before... (omit for brevity, include Payment and Contact cards) */}

          {/* UPI Payment Section */}
          <div className="upi-payment-section">
            <h3>Make Payment</h3>
            <span className="upi-note">
              NOTE: Non-refundable Convenience fee of ₹249 is applicable
            </span>
            <div className="upi-grid">
              <div className="upi-menu">
                <ul>
                  {paymentMethods.map((method) => (
                    <li
                      key={method}
                      className={activePayment === method ? "active" : ""}
                      onClick={() => setActivePayment(method)}
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="upi-content">{renderPaymentContent()}</div>
            </div>
          </div>

              <div className="agreement-text">
      By click on Make Payment, I agree with the <a href="#">Booking Policies</a>, <a href="#">Privacy policy & Terms</a>, the Visa Rules and the T&Cs of <a href="#">FlyDenAI.com</a>.
      <br />
      <a href="#" className="read-more">ReadMore</a>
    </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="utility-right">
          <div className="feature">
            <FaShieldAlt className="feature-icon" />
            <div>
              <h4>Secure Payment</h4>
              <p>
                We use Secure Server Technology to provide a 100% safe online
                payment experience.
              </p>
            </div>
          </div>
          <div className="feature">
            <FaCreditCard className="feature-icon" />
            <div>
              <h4>10 Million + Transactions</h4>
              <p>All our transactions are fast, secure and reliable.</p>
            </div>
          </div>
          <div className="feature">
            <FaLock className="feature-icon" />
            <div>
              <h4>256 Bit Encryption</h4>
              <p>Top leading Encryption hardware & software to protect your information.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TravelUtility;
