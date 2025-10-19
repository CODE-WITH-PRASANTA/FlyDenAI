import React, { useState } from "react";
import "./MultiStepForm.css";
import { FaPlaneDeparture, FaLaptop, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import i1 from "../../assets/summary.webp"; // replace with your image path

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [programType, setProgramType] = useState("");
  const [destination, setDestination] = useState("Costa Rica");
  const [internship, setInternship] = useState("Physical Therapy");
  const [duration, setDuration] = useState("-");
  const [startDate, setStartDate] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-container">
            <h2 className="form-title">Apply for free in just 5 minutes</h2>
            <p className="form-subtitle">
              Submit your application so we can confirm availability and your eligibility – no commitment required!
            </p>
            <form>
              <div className="form-row">
                <div className="form-field">
                  <label>First name *</label>
                  <input type="text" placeholder="John" />
                </div>
                <div className="form-field">
                  <label>Last name *</label>
                  <input type="text" placeholder="Doe" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Email address *</label>
                  <input type="email" placeholder="example@mail.com" />
                </div>
                <div className="form-field">
                  <label>Re-enter email address *</label>
                  <input type="email" placeholder="example@mail.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Password *</label>
                  <input type="password" placeholder="At least 8 characters" />
                </div>
                <div className="form-field">
                  <label>Re-enter password *</label>
                  <input type="password" placeholder="Confirm password" />
                </div>
              </div>
              <div className="checkbox-group">
                <input type="checkbox" /> I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
              </div>
              <div className="checkbox-group">
                <input type="checkbox" /> YES! I want to receive career tips and internship alerts.
              </div>
              <button type="button" className="primary-btn" onClick={nextStep}>CREATE ACCOUNT</button>
            </form>
            <p className="login-text">Already have an account? <a href="#">Log in here</a></p>
          </div>
        );

      case 2:
        return (
          <div className="form-container">
            <h2 className="form-title">Choose your internship type</h2>
            <p className="form-subtitle">Select the internship type that best aligns with your goals.</p>
            <div className="card-group">
              <div className={`option-card ${programType === "abroad" ? "active" : ""}`} onClick={() => setProgramType("abroad")}>
                <div className="card-icon"><FaPlaneDeparture /></div>
                <h3>Intern Abroad</h3>
                <p>Gain international experience, enhance your resume, and explore a new part of the world.</p>
              </div>
              <div className={`option-card ${programType === "remote" ? "active" : ""}`} onClick={() => setProgramType("remote")}>
                <div className="card-icon"><FaLaptop /></div>
                <h3>Intern Remotely</h3>
                <p>Build professional experience from home with flexible remote internships tailored to your schedule.</p>
              </div>
            </div>
            <div className="step-controls">
              <button className="secondary-btn" onClick={prevStep}>Back</button>
              <button className="primary-btn" disabled={!programType} onClick={nextStep}>Next</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-container step-three">
            <div className="program-left">
              <h2 className="form-title">Customize your internship program</h2>
              <div className="form-field">
                <label>Where would you like to go? *</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                  <option>Belize</option>
                  <option>Costa Rica</option>
                  <option>Greece</option>
                </select>
              </div>
              <div className="form-field">
                <label>Select an internship *</label>
                <select value={internship} onChange={(e) => setInternship(e.target.value)}>
                  <option>Habitat Conservation</option>
                  <option>Marine Biology</option>
                  <option>Physical Therapy</option>
                </select>
              </div>
              <div className="requirements-box">
                <strong>Requirements for this project:</strong>
                <p>Habitat Conservation internships in Belize are suitable for students or recent graduates with at least one year of relevant college/university study in a related field. Must have willingness and physical ability to conduct outdoor fieldwork.</p>
              </div>
              <div className="form-field">
                <label>Choose a duration *</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option>4 weeks</option>
                  <option>6 weeks</option>
                  <option>9 weeks</option>
                  <option>12 weeks</option>
                </select>
              </div>
              <div className="form-field">
                <label>Select your preferred start date *</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-field">
                <label>Do you want to invite friends to go with you?</label>
                <div className="checkbox-group">
                  <input type="radio" name="friends" /> Yes please! I want to invite friends to intern abroad with me.
                </div>
                <div className="checkbox-group">
                  <input type="radio" name="friends" /> No thanks, I'll join solo.
                </div>
              </div>
              <div className="step-controls">
                <button className="secondary-btn" onClick={prevStep}>Back</button>
                <button className="primary-btn" onClick={nextStep}>Next</button>
              </div>
            </div>

<div className="program-right">
  <h3>Internship Abroad Summary</h3>
  <img src={i1} alt="Internship Summary" className="summary-image" />
  <p><FaMapMarkerAlt /> Destination: Belize</p>
  <p><FaCheckCircle /> Internship: Habitat Conservation</p>
  <p><FaCalendarAlt /> Start Date: January 12, 2026</p>
  <p><FaCalendarAlt /> Duration: 9 weeks</p>

  <h4>What's included?</h4>
  <ul className="whats-included">
    <li>Airport pick-up</li>
    <li>Daily breakfast and dinner</li>
    <li>Accommodation</li>
    <li>24/7 in-country support</li>
    <li>Program orientation</li>
    <li>Dedicated support before, during and after your internship</li>
    <li>Sourcing and securing your internship placement</li>
    <li>Personalization of your internship plan</li>
    <li>Coaching from your supervisor</li>
    <li>Documented portfolio of your experiential learnings</li>
    <li>International reference letter</li>
    <li>Certificate of Internship Completion</li>
  </ul>

 <div class="fees-section">
  <h4>Fees</h4>

  <div class="fee-item">
    <div class="fee-label">Deposit</div>
    <div class="fee-amount">US$499</div>
    <div class="fee-desc">To secure your place and start your online preparation</div>
  </div>

  <div class="fee-item">
    <div class="fee-label">Remaining balance</div>
    <div class="fee-amount">US$4,995</div>
    <div class="fee-desc">Due 60 days before your start date</div>
  </div>

  <div class="fee-item">
    <div class="fee-label">Total fees for 9 weeks</div>
    <div class="fee-amount">US$5,494</div>
  </div>

  <div class="fee-item">
    <div class="fee-label">Due now</div>
    <div class="fee-amount">US$0</div>
  </div>

  <div class="fee-note">
    You’re applying for <strong>FREE</strong> to know if you’re eligible for this internship.
  </div>
</div>
</div>

          </div>
        );

      case 4:
        return (
          <div className="form-container step-four">
            <div className="form-left">
              <h2 className="form-title">Complete your personal details</h2>
              <div className="form-field">
                <label>Do you have a referral code or promo code?</label>
                <input type="text" placeholder="Enter code here" />
              </div>
              <div className="form-field">
                <label>Nationality *</label>
                <select><option>United States</option></select>
              </div>
              <div className="form-field">
                <label>Country of Residence *</label>
                <select><option>United States</option></select>
              </div>
              <div className="form-field">
                <label>Mobile phone number *</label>
                <input type="tel" placeholder="+1 201-555-0123" />
              </div>
          <div className="form-field address-group">
  <label>Your Address</label>
  <div className="address-grid">
    <input type="text" placeholder="Address 1" />
    <input type="text" placeholder="Address 2" />
    <input type="text" placeholder="City" />
    <input type="text" placeholder="State/Province" />
    <input type="text" placeholder="Zip/Postal Code" />
  </div>
</div>

              <div className="form-field">
                <label>Gender *</label>
                <select><option>Please choose one option</option></select>
              </div>
              <div className="form-field">
                <label>Date of Birth *</label>
                <input type="date" />
              </div>
              <div className="form-field">
                <label>Medical / Allergies / Impairments</label>
                <textarea placeholder="List any medical conditions"></textarea>
              </div>
              <div className="form-field">
                <label>Dietary requirements</label>
                <textarea placeholder="List any special dietary requirements"></textarea>
              </div>
              <div className="form-field">
                <label>Criminal convictions? *</label>
                <div className="checkbox-group">
                  <input type="radio" name="conviction" /> Yes
                </div>
                <div className="checkbox-group">
                  <input type="radio" name="conviction" /> No
                </div>
              </div>
              <div className="form-field">
                <label>Student info *</label>
                <div className="checkbox-group">
                  <input type="radio" name="student" /> Yes
                </div>
                <div className="checkbox-group">
                  <input type="radio" name="student" /> No
                </div>
              </div>
              <div className="form-field">
                <label>What kind of student?</label>
                <select>
                  <option>College/University student</option>
                  <option>High School student</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="step-controls">
                <button className="secondary-btn" onClick={prevStep}>Back</button>
                <button className="primary-btn" onClick={nextStep}>Next</button>
              </div>
            </div>

<div className="program-right">
  <h3>Internship Abroad Summary</h3>
  <img src={i1} alt="Internship Summary" className="summary-image" />
  <p><FaMapMarkerAlt /> Destination: Belize</p>
  <p><FaCheckCircle /> Internship: Habitat Conservation</p>
  <p><FaCalendarAlt /> Start Date: January 12, 2026</p>
  <p><FaCalendarAlt /> Duration: 9 weeks</p>

  <h4>What's included?</h4>
  <ul className="whats-included">
    <li>Airport pick-up</li>
    <li>Daily breakfast and dinner</li>
    <li>Accommodation</li>
    <li>24/7 in-country support</li>
    <li>Program orientation</li>
    <li>Dedicated support before, during and after your internship</li>
    <li>Sourcing and securing your internship placement</li>
    <li>Personalization of your internship plan</li>
    <li>Coaching from your supervisor</li>
    <li>Documented portfolio of your experiential learnings</li>
    <li>International reference letter</li>
    <li>Certificate of Internship Completion</li>
  </ul>

 <div class="fees-section">
  <h4>Fees</h4>

  <div class="fee-item">
    <div class="fee-label">Deposit</div>
    <div class="fee-amount">US$499</div>
    <div class="fee-desc">To secure your place and start your online preparation</div>
  </div>

  <div class="fee-item">
    <div class="fee-label">Remaining balance</div>
    <div class="fee-amount">US$4,995</div>
    <div class="fee-desc">Due 60 days before your start date</div>
  </div>

  <div class="fee-item">
    <div class="fee-label">Total fees for 9 weeks</div>
    <div class="fee-amount">US$5,494</div>
  </div>

  <div class="fee-item">
    <div class="fee-label">Due now</div>
    <div class="fee-amount">US$0</div>
  </div>

  <div class="fee-note">
    You’re applying for <strong>FREE</strong> to know if you’re eligible for this internship.
  </div>
</div>

</div>

          </div>
        );

      case 5:
        return (
          <div className="form-container step-five">
            <div className="form-left">
              <h2 className="form-title">Thank you, your application has been submitted!</h2>
              <p>The next step is to secure your place by paying your Deposit. If you do this now, your application will be prioritized for review.</p>
              <div className="deposit-options">
                <div className="option-card">
                  <h4>Standard - US$499</h4>
                  <p>Non refundable for all cancellations</p>
                  <p>Your internship is secured</p>
                </div>
                <div className="option-card">
                  <h4>Flexi - US$599</h4>
                  <p>US$499 is refundable if you cancel within 90 days</p>
                  <p>Your internship is secured</p>
                </div>
              </div>
              <div className="what-you-get">
                <h3>What do you get after paying your Deposit</h3>
                <ul>
                  <li>A secured place on the program</li>
                  <li>Full access to your preparation checklist</li>
                  <li>Full access to your Program Guide</li>
                  <li>Support from your dedicated Program Manager</li>
                  <li>Option to maximize your experience with academic credit</li>
                  <li>Exclusive deals on travel insurance, tours and more</li>
                </ul>
              </div>
              <div className="step-controls">
                <button className="secondary-btn" onClick={prevStep}>Back</button>
              </div>
            </div>

            <div className="program-right">
              <h3>Internship Summary</h3>
              <img src={i1} alt="Program Summary" className="summary-image" />
              <p><FaMapMarkerAlt /> Destination: {destination}</p>
              <p><FaCheckCircle /> Internship: {internship}</p>
              <p><FaCalendarAlt /> Start Date: {startDate || "January 5, 2026"}</p>
              <p><FaCalendarAlt /> Duration: {duration}</p>
            </div>
          </div>
        );

      default:
        return <div>Other Steps</div>;
    }
  };

  return (
    <div className="multi-step-form">
      {/* Progress Bar */}
      <div className="stepper">
        {[1,2,3,4,5].map((num) => (
          <div key={num} className={`step-item ${step >= num ? "active" : ""}`}>
            <div className="circle">{num}</div>
            <p>{["Create Account","Program Type","Program Details","Personal Details","Deposit"][num-1]}</p>
          </div>
        ))}
      </div>

      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
