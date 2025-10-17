import React from 'react';
import './RentalTerms.css';
import carImage from "../../assets/term-img.webp";

const RentalTerms = () => {
  return (
    <div className="terms-container">
      <div className="terms-header">
        <div className="header-text">
          <h1>Terms And <br /> Conditions</h1>
          <p>
            Welcome to RoadTripRent, your premier destination for reliable and convenient car rental services.
            These terms and conditions govern your use of our website and the rental of vehicles from us. By
            accessing or using our website and renting a vehicle, you agree to comply with and be bound by the
            following terms. Please read these terms carefully before proceeding with your rental.
          </p>
        </div>
        <div className="header-image">
          <img src={carImage} alt="Car rental" />
        </div>
      </div>

      <div className="terms-grid">
        <div className="terms-column">
          <div className="term-item">
            <h2>1. Rental Agreement:</h2>
            <p>
              When you rent a vehicle from RoadTripRent, you are entering into a legally binding agreement with us.
              This agreement encompasses the terms and conditions of your rental, outlining your responsibilities as a
              renter, the duration of the rental period, and any associated fees or charges.
            </p>
          </div>

          <div className="term-item">
            <h2>2. Vehicle Availability:</h2>
            <p>
              While we make every effort to maintain a diverse and well-maintained fleet of vehicles, availability is
              subject to change and cannot be guaranteed. We reserve the right to substitute a comparable vehicle if
              necessary to fulfill your reservation.
            </p>
          </div>

          <div className="term-item">
            <h2>3. Reservation Policy:</h2>
            <p>
              Reservations are subject to availability and must be confirmed by our team. To secure a reservation, a
              valid credit card is required. Cancellation policies may apply, and any changes to reservations may be
              subject to fees.
            </p>
          </div>

          <div className="term-item">
            <h2>4. Rental Requirements:</h2>
            <p>
              To rent a vehicle from us, you must meet certain eligibility criteria, including age, possession of a
              valid driver’s license, and compliance with payment method requirements. Additional documentation may be
              requested at the time of rental.
            </p>
          </div>

          <div className="term-item">
            <h2>5. Insurance Coverage:</h2>
            <p>
              Our rental vehicles come with basic insurance coverage, but additional options may be available for
              purchase. It is important to review the insurance coverage provided and consider additional options based
              on your individual needs and preferences.
            </p>
          </div>
        </div>

        <div className="terms-column">
          <div className="term-item">
            <h2>6. Fuel Policy:</h2>
            <p>
              Rental vehicles are typically provided with a full tank of fuel and should be returned in the same
              condition. Failure to return the vehicle with a full tank may result in refueling charges, which will be
              detailed in your rental agreement.
            </p>
          </div>

          <div className="term-item">
            <h2>7. Damage and Liability:</h2>
            <p>
              Renters are responsible for any damage to the rental vehicle during the rental period. It is essential to
              conduct a thorough inspection of the vehicle before accepting it and report any pre-existing damage to our
              team.
            </p>
          </div>

          <div className="term-item">
            <h2>8. Usage Restrictions:</h2>
            <p>
              Rental vehicles are intended for personal use and should not be used for commercial purposes or activities
              that violate local laws or regulations. Violation of usage restrictions may result in additional fees or
              penalties.
            </p>
          </div>

          <div className="term-item">
            <h2>9. Payment Terms:</h2>
            <p>
              Payment for rental services must be made in accordance with the terms outlined in our rental agreement.
              Late payments may incur additional charges, and unpaid fees may be subject to collection efforts.
            </p>
          </div>

          <div className="term-item">
            <h2>10. Governing Law:</h2>
            <p>
              These terms and conditions are governed by the laws of “Example of Jurisdiction”. Any disputes arising
              under these terms will be subject to the exclusive jurisdiction of the courts of “Example of
              Jurisdiction”.
            </p>
          </div>
        </div>
      </div>

      <div className="terms-footer">
        <p>
          By using our website and rental services, you acknowledge that you have read, understood, and agree to be
          bound by these terms and conditions. If you do not agree with any part of these terms.
        </p>
      </div>
    </div>
  );
};

export default RentalTerms;
