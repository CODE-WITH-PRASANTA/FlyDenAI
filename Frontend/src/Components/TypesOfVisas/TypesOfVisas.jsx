
import React, { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    let active = true;

    const fetchVisaTypes = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch all visa listings saved in the backend.
        const response = await axios.get(`${BASE_URL}/visas`);

        const payload = response.data;

        // Support common API response structures.
        const listings = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.visas)
              ? payload.visas
              : Array.isArray(payload?.data?.visas)
                ? payload.data.visas
                : [];

        // Extract every visa type from every visa listing.
        const extractedVisaTypes = listings.flatMap((listing) => {
          const types = Array.isArray(listing.visaTypes)
            ? listing.visaTypes
            : [];

          return types.map((visa) => ({
            ...visa,
            _listingId: listing._id || listing.id,
            _country:
              typeof listing.country === "object"
                ? listing.country?.countryName || listing.country?.name
                : listing.country || listing.countryName || "",
          }));
        });

        if (active) {
          setBackendVisaTypes(extractedVisaTypes);
        }
      } catch (err) {
        console.error("Failed to fetch visa types:", err);

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

    fetchVisaTypes();

    return () => {
      active = false;
    };
  }, []);

  // Filter the fetched visa types when a country or listing ID is supplied.
  const filteredVisaTypes = useMemo(() => {
    let result = backendVisaTypes;

    if (visaId) {
      result = result.filter(
        (visa) => String(visa._listingId) === String(visaId)
      );
    } else if (country) {
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

    // Use prop data as a fallback if the API returned no matching types.
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

    // Preserve non-numeric fee descriptions.
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
