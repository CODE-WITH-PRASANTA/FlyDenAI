import React, { useEffect, useRef } from "react";

const TravellersModal = ({
  close,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  travelClass,
  setTravelClass,
  CLASSES = ["Economy", "Premium Economy", "Business", "First Class"],
  mode = "flight",
}) => {
  const modalRef = useRef(null);

  // focus trap (basic) and close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        // basic focus trap: keep focus inside modal
        const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
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
    // initial focus
    setTimeout(() => {
      modalRef.current?.querySelector('button, [tabindex="0"], input')?.focus();
    }, 80);

    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className="DummyTicket-modal-backdrop" onClick={onBackdropClick} aria-modal="true" role="dialog" aria-label="Travellers and class">
      <div className="DummyTicket-modal" ref={modalRef}>
        <h3>Travellers & Travel Class</h3>

        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">Adults</div>
          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="Decrease adults">−</button>
                <div className="DummyTicket-counter-value" aria-live="polite">{String(adults).padStart(2, "0")}</div>
                <button onClick={() => setAdults(adults + 1)} aria-label="Increase adults">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">Children</div>
          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button onClick={() => setChildren(Math.max(0, children - 1))} aria-label="Decrease children">−</button>
                <div className="DummyTicket-counter-value" aria-live="polite">{String(children).padStart(2, "0")}</div>
                <button onClick={() => setChildren(children + 1)} aria-label="Increase children">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">Infants</div>
          <div className="DummyTicket-counter-row">
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-controls">
                <button onClick={() => setInfants(Math.max(0, infants - 1))} aria-label="Decrease infants">−</button>
                <div className="DummyTicket-counter-value" aria-live="polite">{String(infants).padStart(2, "0")}</div>
                <button onClick={() => setInfants(infants + 1)} aria-label="Increase infants">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="DummyTicket-modal-section">
          <div className="DummyTicket-modal-row-title">Travel Class</div>
          <div className="DummyTicket-class-row">
            {CLASSES.map((c) => (
              <button
                key={c}
                className={`DummyTicket-class-item ${travelClass === c ? "selected" : ""}`}
                onClick={() => setTravelClass(c)}
                type="button"
                aria-pressed={travelClass === c}
              >
                <input type="radio" name="class" checked={travelClass === c} readOnly style={{ marginRight: 8 }} />
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="DummyTicket-modal-actions">
          <button className="DummyTicket-secondary" onClick={close}>Cancel</button>
          <button className="DummyTicket-primary" onClick={close}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default TravellersModal;
