import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Api";
import "./TypesOfVisas.css";

const TypesVisa = ({
  visaTypes: initialVisaTypes,
  country,
  visaId,
  author,
  lastUpdated,
  reviews = [],
}) => {
  const [backendVisaTypes, setBackendVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const fetchVisaData = async () => {
      setLoading(true);
      setError("");

      try {
        // Use the specific published ID route if visaId is provided, otherwise fetch all published or default listings
        const endpoint = visaId 
          ? `${BASE_URL}/visas/published/${visaId}` 
          : `${BASE_URL}/visas`;

        const response = await axios.get(endpoint);
        const payload = response.data;

        let extractedVisaTypes = [];

        if (visaId) {
          const listing = payload?.data || payload;
          const types = Array.isArray(listing?.visaTypes) ? listing.visaTypes : [];
          const parentId = listing._id || listing.id || visaId;

          extractedVisaTypes = types.map((visa) => ({
            ...visa,
            // Ensure every visa option retains a unique route-able ID
            _id: visa._id || visa.id || parentId,
            _listingId: parentId,
            _country:
              typeof listing.country === "object"
                ? listing.country?.countryName || listing.country?.name
                : listing.country || listing.countryName || "",
          }));
        } else {
          const listings = Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.visas)
            ? payload.visas
            : Array.isArray(payload?.data?.visas)
            ? payload.data.visas
            : [];

          extractedVisaTypes = listings.flatMap((listing) => {
            const types = Array.isArray(listing.visaTypes) ? listing.visaTypes : [];
            const parentId = listing._id || listing.id;

            return types.map((visa) => ({
              ...visa,
              _id: visa._id || visa.id || parentId,
              _listingId: parentId,
              _country:
                typeof listing.country === "object"
                  ? listing.country?.countryName || listing.country?.name
                  : listing.country || listing.countryName || "",
            }));
          });
        }

        if (active) {
          setBackendVisaTypes(extractedVisaTypes);
        }
      } catch (err) {
        console.error("Failed to fetch visa data:", err);

        if (active) {
          setError(
            err?.response?.data?.message ||
              "Unable to load visa types. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchVisaData();

    return () => {
      active = false;
    };
  }, [visaId]);

  const filteredVisaTypes = useMemo(() => {
    let result = backendVisaTypes;

    if (!visaId && country) {
      const selectedCountry =
        typeof country === "object"
          ? country.countryName || country.name || country._id
          : country;

      result = result.filter(
        (visa) =>
          String(visa._country).toLowerCase() ===
          String(selectedCountry).toLowerCase()
      );
    }

    if (
      result.length === 0 &&
      Array.isArray(initialVisaTypes) &&
      initialVisaTypes.length > 0
    ) {
      result = initialVisaTypes;
    }

    return result;
  }, [backendVisaTypes, country, visaId, initialVisaTypes]);

  const formatFee = (fees) => {
    if (fees === undefined || fees === null || fees === "") {
      return null;
    }

    const cleaned = String(fees).replace(/[₹,\s]/g, "");

    if (!/^\d+(\.\d+)?$/.test(cleaned)) {
      return String(fees);
    }

    return `₹${Number(cleaned).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  const hasValue = (value) =>
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "";

  // Handles clicking a visa card to redirect to /apply/now/:id using its unique ID
  const handleCardClick = (visa) => {
    const targetId = visa._id || visa.id || visa._listingId || visaId;
    if (targetId) {
      navigate(`/apply/now/${targetId}`);
    }
  };

  return (
    <section className="flyixo-types-visa-page">
      <div className="flyixo-types-left-content">
        <h2 className="flyixo-types-title">Visa Types</h2>

        {loading ? (
          <div className="flyixo-types-status" role="status">
            <span className="flyixo-types-spinner" />
            <p>Loading visa types...</p>
          </div>
        ) : error && filteredVisaTypes.length === 0 ? (
          <div className="flyixo-types-status flyixo-types-error">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        ) : filteredVisaTypes.length > 0 ? (
          <div className="flyixo-types-visa-cards">
            {filteredVisaTypes.map((visa, index) => {
              const fee = formatFee(visa.fees);

              const details = [
                {
                  label: "Processing Time",
                  value: visa.processingTime,
                },
                {
                  label: "Stay Period",
                  value: visa.stayPeriod || visa.duration,
                },
                {
                  label: "Validity",
                  value: visa.validity,
                },
                {
                  label: "Entry Type",
                  value: visa.entryType,
                },
                {
                  label: "Visa Fee",
                  value: fee,
                  fee: true,
                },
              ].filter((item) => hasValue(item.value));

              return (
                <article
                  className="flyixo-types-visa-card"
                  key={
                    visa._id ||
                    visa.id ||
                    `${visa._listingId || "visa"}-${visa.name}-${index}`
                  }
                  onClick={() => handleCardClick(visa)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flyixo-types-visa-card-header">
                    <span>{visa.name || "Visa Type"}</span>

                    {visa.category && (
                      <span className="flyixo-visa-category">
                        {visa.category}
                      </span>
                    )}
                  </div>

                  <div className="flyixo-types-visa-card-details">
                    {details.length > 0 ? (
                      details.map((item) => (
                        <div key={item.label}>
                          <span>{item.label}</span>

                          <span
                            className={
                              item.fee ? "flyixo-visa-fees" : ""
                            }
                          >
                            {item.value}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div>
                        <span>Visa Information</span>
                        <span>Details not available</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flyixo-types-status">
            <p>
              No visa types found
              {country
                ? ` for ${
                    typeof country === "object"
                      ? country.countryName || country.name || "this country"
                      : country
                  }`
                : ""}.
            </p>
          </div>
        )}

        {(author || lastUpdated) && (
          <div className="flyixo-author-update">
            {author && (
              <div className="flyixo-author-info">
                {author.photo && (
                  <img
                    className="flyixo-author-photo"
                    src={author.photo}
                    alt={author.name || "Visa Expert"}
                    loading="lazy"
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

            {lastUpdated && (
              <div className="flyixo-last-updated">
                <span>Last Updated:</span>
                <strong>{lastUpdated}</strong>
              </div>
            )}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="flyixo-reviews-banner">
            <div className="flyixo-review-avatars">
              {reviews.slice(0, 4).map((review, index) => {
                const image =
                  review.image || review.photo || review.avatar;

                return image ? (
                  <img
                    key={review._id || review.id || index}
                    src={image}
                    alt={review.name || "Reviewer"}
                    loading="lazy"
                  />
                ) : null;
              })}
            </div>

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

                <span className="flyixo-google-arrow">→</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TypesVisa;