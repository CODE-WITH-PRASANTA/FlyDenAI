import React, { useEffect, useRef } from "react";
import "./DummyTicket.css";

/**
 * TravellersModal (advanced / premium UI)
 *
 * Props:
 * - close: function
 * - adults, setAdults
 * - children, setChildren
 * - infants, setInfants
 * - rooms, setRooms
 * - travelClass, setTravelClass
 * - CLASSES: array of class strings
 * - mode: "hotel" | "flight"
 *
 * Safe defaults are provided for missing setters/values.
 */
const TravellersModal = ({
  close,
  adults = 1,
  setAdults = () => {},
  children = 0,
  setChildren = () => {},
  infants = 0,
  setInfants = () => {},
  rooms = 1,
  setRooms = () => {},
  travelClass = "Economy",
  setTravelClass = () => {},
  CLASSES = ["Economy", "Premium Economy", "Business", "First Class"],
  mode = "flight",
}) => {
  const modalRef = useRef(null);

  // focus trap and Escape handling
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || !focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    // initial focus inside modal
    const focusTimer = setTimeout(() => {
      modalRef.current?.querySelector('button, [tabindex="0"], input')?.focus();
    }, 80);

    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [close]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const ClassCard = ({ name, subtitle, hint }) => {
    const selected = travelClass === name;
    return (
      <button
        type="button"
        role="option"
        aria-pressed={selected}
        className={`DummyTicket-class-item premium-class ${selected ? "selected" : ""}`}
        onClick={() => setTravelClass(name)}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontWeight: 800 }}>{name}</div>
            {selected && (
              <span className="premium-check" aria-hidden="true">✓</span>
            )}
          </div>
          {subtitle && <div className="DummyTicket-dropdown-airport" style={{ marginTop: 6 }}>{subtitle}</div>}
        </div>

        {hint && <div className="premium-hint">{hint}</div>}
      </button>
    );
  };

  return (
    <div
      className="DummyTicket-modal-backdrop"
      onClick={onBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label="Travellers and travel class"
    >
      <div className="DummyTicket-modal premium-modal" ref={modalRef}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>Travellers & travel class</h3>
            <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>
              Choose number of travellers and preferred cabin/class
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="city-clear"
            >
              ✕
            </button>
            <button
              type="button"
              className="DummyTicket-secondary"
              onClick={() => {
                // quick preset: family-friendly (2 adults, 2 children, 1 room)
                setAdults(2);
                setChildren(2);
                setInfants(0);
                setRooms(1);
              }}
              title="Apply family preset"
            >
              Family
            </button>
          </div>
        </div>

        {/* Adults */}
        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">
            Adults
            <span className="premium-badge" aria-hidden="true">Recommended</span>
          </div>

          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  aria-label="Decrease adults"
                >
                  −
                </button>

                <div
                  className="DummyTicket-counter-value"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {String(adults).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  aria-label="Increase adults"
                >
                  +
                </button>
              </div>

              <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
                Ages 12+
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">
            Children
            <span className="premium-badge neutral" aria-hidden="true">Family</span>
          </div>

          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button
                  type="button"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  aria-label="Decrease children"
                >
                  −
                </button>

                <div
                  className="DummyTicket-counter-value"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {String(children).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  onClick={() => setChildren(children + 1)}
                  aria-label="Increase children"
                >
                  +
                </button>
              </div>

              <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
                0–11 years
              </div>
            </div>
          </div>
        </div>

        {/* Infants */}
        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">
            Infants
            <span className="premium-badge small" aria-hidden="true">Lap</span>
          </div>

          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button
                  type="button"
                  onClick={() => setInfants(Math.max(0, infants - 1))}
                  aria-label="Decrease infants"
                >
                  −
                </button>

                <div
                  className="DummyTicket-counter-value"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {String(infants).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  onClick={() => setInfants(infants + 1)}
                  aria-label="Increase infants"
                >
                  +
                </button>
              </div>

              <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
                Under 2 years
              </div>
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">
            Rooms
            <span className="premium-badge" aria-hidden="true">Per stay</span>
          </div>

          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button
                  type="button"
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  aria-label="Decrease rooms"
                >
                  −
                </button>

                <div
                  className="DummyTicket-counter-value"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {String(rooms).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  onClick={() => setRooms(rooms + 1)}
                  aria-label="Increase rooms"
                >
                  +
                </button>
              </div>

              <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
                Add more rooms for groups
              </div>
            </div>
          </div>
        </div>

        {/* Travel class (hidden for hotel mode) */}
        {mode !== "hotel" && (
          <div className="DummyTicket-modal-section">
            <div className="DummyTicket-modal-row-title">
              Travel Class
              <span className="premium-badge neutral">Upgrade</span>
            </div>

            <div className="DummyTicket-class-row" role="listbox" aria-label="Travel classes">
              <ClassCard name="Economy" subtitle="Best value" hint="Lowest fare" />
              <ClassCard name="Premium Economy" subtitle="More legroom" hint="+30%"/>
              <ClassCard name="Business" subtitle="Flat bed & lounge" hint="+150%"/>
              <ClassCard name="First Class" subtitle="Top-tier luxury" hint="+300%"/>
            </div>
          </div>
        )}

        <div className="DummyTicket-modal-actions">
          <button className="DummyTicket-secondary" onClick={close} type="button">
            Cancel
          </button>
          <button
            className="DummyTicket-primary"
            onClick={close}
            type="button"
            aria-label="Apply travellers and class"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravellersModal;
