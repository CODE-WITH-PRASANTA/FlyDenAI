import React, { useState } from "react";
import "./MultiStepForm.css";
import {
  FaPlaneDeparture,
  FaLaptop,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import summaryImg from "../../assets/summary.webp";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [programType, setProgramType] = useState("");
  const [destination, setDestination] = useState("Costa Rica");
  const [internship, setInternship] = useState("Physical Therapy");
  const [duration, setDuration] = useState("9 weeks");
  const [startDate, setStartDate] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    "Create Account",
    "Program Type",
    "Program Details",
    "Personal Details",
    "Deposit",
  ];

  // ====================== STEPPER ======================
  const Stepper = () => (
    <div className="MultiStepForm-Stepper">
      {steps.map((label, i) => {
        const num = i + 1;
        return (
          <div
            key={num}
            className={`MultiStepForm-StepItem ${
              step >= num ? "active" : ""
            }`}
          >
            <div className="MultiStepForm-StepCircle">{num}</div>
            <p className="MultiStepForm-StepLabel">{label}</p>
          </div>
        );
      })}
    </div>
  );

  // ====================== SUMMARY CARD ======================
  const SummaryCard = () => (
    <div className="MultiStepForm-SummaryCard">
      <h3 className="MultiStepForm-SummaryTitle">Internship Summary</h3>
      <img src={summaryImg} alt="Summary" className="MultiStepForm-SummaryImg" />

      <div className="MultiStepForm-SummaryInfo">
        <p><FaMapMarkerAlt /> Destination: {destination}</p>
        <p><FaCheckCircle /> Internship: {internship}</p>
        <p><FaCalendarAlt /> Start Date: {startDate || "January 12, 2026"}</p>
        <p><FaCalendarAlt /> Duration: {duration}</p>
      </div>

      <div className="MultiStepForm-SummaryIncluded">
        <h4>What's Included</h4>
        <ul>
          <li>Airport pick-up</li>
          <li>Accommodation</li>
          <li>24/7 Support</li>
          <li>Program Orientation</li>
          <li>Supervisor Coaching</li>
          <li>Completion Certificate</li>
        </ul>
      </div>

      <div className="MultiStepForm-SummaryFees">
        <h4>Fees</h4>
        <div><span>Deposit</span><span>US$499</span></div>
        <div><span>Remaining</span><span>US$4,995</span></div>
        <div><span>Total (9 weeks)</span><span>US$5,494</span></div>
        <p className="MultiStepForm-SummaryNote">
          You’re applying for <strong>FREE</strong> to check your eligibility.
        </p>
      </div>
    </div>
  );

  // ====================== FORM STEPS ======================
  const renderStep = () => {
    switch (step) {
      // STEP 1 - CREATE ACCOUNT
      case 1:
        return (
          <div className="MultiStepForm-FormStep">
            <h2 className="MultiStepForm-Heading">Create Your Account</h2>
            <p className="MultiStepForm-Subtext">
              Apply in just 5 minutes — no commitment required!
            </p>

            <form className="MultiStepForm-Grid">
              <input type="text" placeholder="First Name *" className="MultiStepForm-Input" />
              <input type="text" placeholder="Last Name *" className="MultiStepForm-Input" />
              <input type="email" placeholder="Email Address *" className="MultiStepForm-Input" />
              <input type="email" placeholder="Re-enter Email *" className="MultiStepForm-Input" />
              <input type="password" placeholder="Password *" className="MultiStepForm-Input" />
              <input type="password" placeholder="Re-enter Password *" className="MultiStepForm-Input" />

              <label className="MultiStepForm-Checkbox">
                <input type="checkbox" /> I agree to the Terms & Privacy Policy
              </label>
              <label className="MultiStepForm-Checkbox">
                <input type="checkbox" /> Send me internship updates
              </label>

              <button
                type="button"
                className="MultiStepForm-BtnPrimary"
                onClick={nextStep}
              >
                Create Account
              </button>
            </form>

            <p className="MultiStepForm-LoginText">
              Already have an account? <a href="#">Log in</a>
            </p>
          </div>
        );

      // STEP 2 - PROGRAM TYPE
      case 2:
        return (
          <div className="MultiStepForm-FormStep">
            <h2 className="MultiStepForm-Heading">Choose Your Internship Type</h2>

            <div className="MultiStepForm-Options">
              {[
                { type: "abroad", icon: <FaPlaneDeparture />, text: "Intern Abroad" },
                { type: "remote", icon: <FaLaptop />, text: "Intern Remotely" },
              ].map(({ type, icon, text }) => (
                <div
                  key={type}
                  className={`MultiStepForm-Option ${
                    programType === type ? "active" : ""
                  }`}
                  onClick={() => setProgramType(type)}
                >
                  <div className="MultiStepForm-OptionIcon">{icon}</div>
                  <h3 className="MultiStepForm-OptionText">{text}</h3>
                </div>
              ))}
            </div>

            <div className="MultiStepForm-Actions">
              <button className="MultiStepForm-BtnSecondary" onClick={prevStep}>Back</button>
              <button
                className="MultiStepForm-BtnPrimary"
                disabled={!programType}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        );

      // STEP 3 - PROGRAM DETAILS
      case 3:
        return (
          <div className="MultiStepForm-FormStep MultiStepForm-TwoColumn">
            <div className="MultiStepForm-Left">
              <h2 className="MultiStepForm-Heading">Customize Your Internship</h2>

              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="MultiStepForm-Select"
              >
                <option>Belize</option>
                <option>Costa Rica</option>
                <option>Greece</option>
              </select>

              <select
                value={internship}
                onChange={(e) => setInternship(e.target.value)}
                className="MultiStepForm-Select"
              >
                <option>Habitat Conservation</option>
                <option>Marine Biology</option>
                <option>Physical Therapy</option>
              </select>

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="MultiStepForm-Select"
              >
                <option>4 weeks</option>
                <option>6 weeks</option>
                <option>9 weeks</option>
                <option>12 weeks</option>
              </select>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="MultiStepForm-Input"
              />

              <div className="MultiStepForm-Actions">
                <button className="MultiStepForm-BtnSecondary" onClick={prevStep}>Back</button>
                <button className="MultiStepForm-BtnPrimary" onClick={nextStep}>Next</button>
              </div>
            </div>

            <SummaryCard />
          </div>
        );

      // STEP 4 - PERSONAL DETAILS
      case 4:
        return (
          <div className="MultiStepForm-FormStep MultiStepForm-TwoColumn">
            <div className="MultiStepForm-Left">
              <h2 className="MultiStepForm-Heading">Complete Personal Details</h2>

              <input type="text" placeholder="Referral Code" className="MultiStepForm-Input" />
              <input type="text" placeholder="Nationality *" className="MultiStepForm-Input" />
              <input type="text" placeholder="Country of Residence *" className="MultiStepForm-Input" />
              <input type="tel" placeholder="Phone Number *" className="MultiStepForm-Input" />
              <input type="date" placeholder="Date of Birth *" className="MultiStepForm-Input" />
              <textarea
                placeholder="Medical / Allergies / Impairments"
                className="MultiStepForm-Textarea"
              ></textarea>
              <textarea
                placeholder="Dietary Requirements"
                className="MultiStepForm-Textarea"
              ></textarea>

              <div className="MultiStepForm-Actions">
                <button className="MultiStepForm-BtnSecondary" onClick={prevStep}>Back</button>
                <button className="MultiStepForm-BtnPrimary" onClick={nextStep}>Next</button>
              </div>
            </div>

            <SummaryCard />
          </div>
        );

      // STEP 5 - DEPOSIT
      case 5:
        return (
          <div className="MultiStepForm-FormStep MultiStepForm-TwoColumn">
            <div className="MultiStepForm-Left">
              <h2 className="MultiStepForm-Heading">Thank You!</h2>
              <p className="case5-MultiStepForm-Subtext">
                Your application has been submitted successfully.
              </p>

              <h3 className="MultiStepForm-SubHeading">Deposit Options</h3>
              <div className="MultiStepForm-DepositOptions">
                <div className="MultiStepForm-Option">Standard - US$499</div>
                <div className="MultiStepForm-Option">Flexi - US$599</div>
              </div>

              <ul className="MultiStepForm-Benefits">
                <li>Secured program spot</li>
                <li>Access to preparation checklist</li>
                <li>Dedicated program manager</li>
              </ul>

              <button className="MultiStepForm-BtnSecondary" onClick={prevStep}>Back</button>
            </div>

            <SummaryCard />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="MultiStepForm-Container">
      <Stepper />
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
