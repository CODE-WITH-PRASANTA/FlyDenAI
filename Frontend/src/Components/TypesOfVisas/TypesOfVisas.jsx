import React from "react";
import "./TypesOfVisas.css";

const TypesVisa = ({
  visaTypes = [],
  author,
  lastUpdated,
  reviews = [],
}) => {
  return (
    <section className="flyixo-types-visa-page">
      <div className="flyixo-types-left-content">

        {/* =====================================================
            SECTION TITLE
        ===================================================== */}
        <h2 className="flyixo-types-title">
          Visa Types
        </h2>

        {/* =====================================================
            VISA CARDS
        ===================================================== */}
        <div className="flyixo-types-visa-cards">
          {visaTypes && visaTypes.length > 0 ? (
            visaTypes.map((visa, index) => (
              <article
                className="flyixo-types-visa-card"
                key={visa._id || visa.id || index}
              >
                {/* Card Header */}
                <div className="flyixo-types-visa-card-header">
                  {visa.name || "Visa Type"}
                </div>

                {/* Card Details */}
                <div className="flyixo-types-visa-card-details">

                  {visa.processingTime && (
                    <div>
                      <span>
                        Processing Time
                      </span>

                      <span>
                        {visa.processingTime}
                      </span>
                    </div>
                  )}

                  {visa.validity && (
                    <div>
                      <span>
                        Validity
                      </span>

                      <span>
                        {visa.validity}
                      </span>
                    </div>
                  )}

                  {visa.entryType && (
                    <div>
                      <span>
                        Entry Type
                      </span>

                      <span>
                        {visa.entryType}
                      </span>
                    </div>
                  )}

                  {visa.duration && (
                    <div>
                      <span>
                        Duration
                      </span>

                      <span>
                        {visa.duration}
                      </span>
                    </div>
                  )}

                  {visa.fees !== undefined &&
                    visa.fees !== null &&
                    visa.fees !== "" && (
                      <div>
                        <span>
                          Visa Fee
                        </span>

                        <span className="flyixo-visa-fees">
                          ₹
                          {Number(
                            String(visa.fees).replace(
                              /[^0-9.]/g,
                              ""
                            )
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                </div>
              </article>
            ))
          ) : (
            <div className="flyixo-types-visa-card">
              <div className="flyixo-types-visa-card-header">
                Visa Information
              </div>

              <div className="flyixo-types-visa-card-details">
                <div>
                  <span>
                    Visa Types
                  </span>

                  <span>
                    Information unavailable
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            AUTHOR / LAST UPDATED
        ===================================================== */}
        {(author || lastUpdated) && (
          <div className="flyixo-author-update">

            {/* Author */}
            {author && (
              <div className="flyixo-author-info">

                {author.photo && (
                  <img
                    className="flyixo-author-photo"
                    src={author.photo}
                    alt={
                      author.name
                        ? author.name
                        : "Visa Expert"
                    }
                  />
                )}

                <div>
                  {author.name && (
                    <p className="flyixo-author-name">
                      {author.name}
                    </p>
                  )}

                  {author.role && (
                    <p className="flyixo-author-role">
                      {author.role}
                    </p>
                  )}
                </div>

              </div>
            )}

            {/* Last Updated */}
            {lastUpdated && (
              <div className="flyixo-last-updated">
                <span>
                  Last Updated:
                </span>

                <strong>
                  {lastUpdated}
                </strong>
              </div>
            )}

          </div>
        )}

        {/* =====================================================
            REVIEWS
        ===================================================== */}
        {reviews && reviews.length > 0 && (
          <div
            className="flyixo-reviews-banner"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
              }
            }}
          >

            {/* Review Avatars */}
            <div className="flyixo-review-avatars">
              {reviews
                .slice(0, 4)
                .map((review, index) => (
                  <img
                    key={
                      review._id ||
                      review.id ||
                      index
                    }
                    src={
                      review.image ||
                      review.photo ||
                      review.avatar
                    }
                    alt={
                      review.name ||
                      "Reviewer"
                    }
                  />
                ))}
            </div>

            {/* Review Content */}
            <div className="flyixo-review-text">
              <strong>
                Trusted by thousands of travellers
              </strong>

              <div className="flyixo-review-details">

                <span className="flyixo-review-rating">
                  ★ 4.9
                </span>

                <span className="flyixo-review-details-text">
                  Google Reviews
                </span>

                <img
                  className="flyixo-google-logo"
                  src="/google.png"
                  alt="Google"
                />

                <span className="flyixo-google-arrow">
                  →
                </span>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default TypesVisa;