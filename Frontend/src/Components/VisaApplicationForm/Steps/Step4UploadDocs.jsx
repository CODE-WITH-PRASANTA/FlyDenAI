import React from "react";

const Step4UploadDocs = ({ handleGlobalFile, handlePrev, handleSubmitApplication, isSaving }) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--upload">
      <div className="VisaApplicationForm__section-head">
        <h3 className="VisaApplicationForm__title">Upload Documents</h3>
        <p className="VisaApplicationForm__subtitle">Upload clear scanned copies of required documents.</p>
      </div>

      <div className="VisaApplicationForm__upload-grid">
        <div className="VisaApplicationForm__upload-card">
          <label className="VisaApplicationForm__label">Passport Copy (Primary / additional)</label>
          <input className="VisaApplicationForm__file" type="file" accept="image/*,.pdf" onChange={(e) => handleGlobalFile("passportCopy", e.target.files?.[0])} />
        </div>

        <div className="VisaApplicationForm__upload-card">
          <label className="VisaApplicationForm__label">Photo (Primary / additional)</label>
          <input className="VisaApplicationForm__file" type="file" accept="image/*" onChange={(e) => handleGlobalFile("photo", e.target.files?.[0])} />
        </div>

        <div className="VisaApplicationForm__upload-card">
          <label className="VisaApplicationForm__label">Travel Itinerary</label>
          <input className="VisaApplicationForm__file" type="file" accept="application/pdf,image/*" onChange={(e) => handleGlobalFile("travelItinerary", e.target.files?.[0])} />
        </div>

        <div className="VisaApplicationForm__upload-card">
          <label className="VisaApplicationForm__label">Additional Document</label>
          <input className="VisaApplicationForm__file" type="file" accept="application/pdf,image/*" onChange={(e) => handleGlobalFile("additionalDocument", e.target.files?.[0])} />
        </div>
      </div>

      <div className="VisaApplicationForm__actions VisaApplicationForm__actions--split">
        <button className="VisaApplicationForm__btn VisaApplicationForm__btn--outline" onClick={handlePrev}>Back</button>
        <button className="VisaApplicationForm__btn VisaApplicationForm__btn--primary" onClick={handleSubmitApplication} disabled={isSaving}>
          {isSaving ? "Saving..." : "Submit Application"}
        </button>
      </div>
    </section>
  );
};

export default Step4UploadDocs;
