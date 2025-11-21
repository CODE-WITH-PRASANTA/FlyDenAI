import React from "react";
import { FaUser, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Step2Traveller = ({
  travellerData,
  updateTravellerField,
  handleTravellerFile,
  handlePrev,
  handleNext,
}) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--travellers">
      <div className="VisaApplicationForm__section-head">
        <h3 className="VisaApplicationForm__title">Traveller Details</h3>
        <p className="VisaApplicationForm__subtitle">
          Fill details for all travellers.
        </p>
      </div>

      <div className="VisaApplicationForm__traveller-list">
        {travellerData.map((t, idx) => (
          <article className="VisaApplicationForm__traveller-card" key={idx}>
            <header className="VisaApplicationForm__traveller-header">
              <div className="VisaApplicationForm__traveller-icon">
                <FaUser />
              </div>
              <div className="VisaApplicationForm__traveller-title">
                Traveller {idx + 1}
              </div>
            </header>

            <div className="VisaApplicationForm__traveller-body">
              <div className="VisaApplicationForm__form-row VisaApplicationForm__row--3">
                <div className="VisaApplicationForm__form-group">
                  <label className="VisaApplicationForm__label">Title</label>
                  <select
                    className="VisaApplicationForm__select"
                    value={t.title}
                    onChange={(e) =>
                      updateTravellerField(idx, "title", e.target.value)
                    }
                  >
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>

                <div className="VisaApplicationForm__form-group">
                  <label className="VisaApplicationForm__label">First Name</label>
                  <input
                    className="VisaApplicationForm__input"
                    type="text"
                    value={t.firstName}
                    onChange={(e) =>
                      updateTravellerField(idx, "firstName", e.target.value)
                    }
                  />
                </div>

                <div className="VisaApplicationForm__form-group">
                  <label className="VisaApplicationForm__label">Last Name</label>
                  <input
                    className="VisaApplicationForm__input"
                    type="text"
                    value={t.lastName}
                    onChange={(e) =>
                      updateTravellerField(idx, "lastName", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="VisaApplicationForm__form-row">
                <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--date">
                  <label className="VisaApplicationForm__label">Date of Birth</label>
                  <div className="VisaApplicationForm__input-with-icon">
                    <FaCalendarAlt className="VisaApplicationForm__input-icon" />
                    <input
                      className="VisaApplicationForm__input"
                      type="date"
                      value={t.dob}
                      onChange={(e) =>
                        updateTravellerField(idx, "dob", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="VisaApplicationForm__form-group">
                  <label className="VisaApplicationForm__label">Nationality</label>
                  <input
                    className="VisaApplicationForm__input VisaApplicationForm__input--readonly"
                    readOnly
                    value={t.nationality}
                  />
                </div>
              </div>

              <div className="VisaApplicationForm__form-row">
                <div className="VisaApplicationForm__form-group">
                  <label className="VisaApplicationForm__label">
                    Passport No
                  </label>
                  <input
                    className="VisaApplicationForm__input"
                    type="text"
                    value={t.passportNo}
                    onChange={(e) =>
                      updateTravellerField(idx, "passportNo", e.target.value)
                    }
                  />
                </div>

                <div className="VisaApplicationForm__form-group">
                  <label className="VisaApplicationForm__label">
                    Contact Number
                  </label>
                  <input
                    className="VisaApplicationForm__input"
                    type="text"
                    value={t.contactNumber}
                    onChange={(e) =>
                      updateTravellerField(idx, "contactNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="VisaApplicationForm__form-row">
                <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--file">
                  <label className="VisaApplicationForm__label">
                    Passport Copy
                  </label>
                  <input
                    className="VisaApplicationForm__file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleTravellerFile(
                        idx,
                        "passportCopy",
                        e.target.files?.[0]
                      )
                    }
                  />
                </div>

                <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--file">
                  <label className="VisaApplicationForm__label">Photo</label>
                  <input
                    className="VisaApplicationForm__file"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleTravellerFile(idx, "photo", e.target.files?.[0])
                    }
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="VisaApplicationForm__actions VisaApplicationForm__actions--split">
        <button
          className="VisaApplicationForm__btn VisaApplicationForm__btn--outline"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
          onClick={handleNext}
        >
          Continue <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Step2Traveller;
