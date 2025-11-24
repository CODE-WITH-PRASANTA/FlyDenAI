// src/components/DummyTicket/TravellersModal.jsx
import React, { useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const TravellersModal = ({
  mode, // flight / hotel
  close,

  adults, setAdults,
  children, setChildren,

  // flight only
  infants, setInfants,
  travelClass, setTravelClass,
  CLASSES,

  // hotel only
  rooms, setRooms,
}) => {

  const modalRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="DummyTicket-modal-backdrop">
      <div className="DummyTicket-modal" ref={modalRef}>
        <h3>{mode === "flight" ? "Travellers & Class" : "Guests & Rooms"}</h3>

        {/* COUNTERS */}
        <div className="DummyTicket-counter-row">

          {/* Adults */}
          <div className="DummyTicket-counter">
            <div className="DummyTicket-counter-title">Adults</div>
            <div className="DummyTicket-counter-controls">
              <button onClick={() => setAdults(Math.max(1, adults - 1))}>
                <FaMinus />
              </button>
              <div className="DummyTicket-counter-value">
                {String(adults).padStart(2, "0")}
              </div>
              <button onClick={() => setAdults(adults + 1)}>
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="DummyTicket-counter">
            <div className="DummyTicket-counter-title">Children</div>
            <div className="DummyTicket-counter-controls">
              <button onClick={() => setChildren(Math.max(0, children - 1))}>
                <FaMinus />
              </button>
              <div className="DummyTicket-counter-value">
                {String(children).padStart(2, "0")}
              </div>
              <button onClick={() => setChildren(children + 1)}>
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Flight Only — Infants */}
          {mode === "flight" && (
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-title">Infants</div>
              <div className="DummyTicket-counter-controls">
                <button onClick={() => setInfants(Math.max(0, infants - 1))}>
                  <FaMinus />
                </button>
                <div className="DummyTicket-counter-value">
                  {String(infants).padStart(2, "0")}
                </div>
                <button onClick={() => setInfants(infants + 1)}>
                  <FaPlus />
                </button>
              </div>
            </div>
          )}

          {/* Hotel Only — Rooms */}
          {mode === "hotel" && (
            <div className="DummyTicket-counter">
              <div className="DummyTicket-counter-title">Rooms</div>
              <div className="DummyTicket-counter-controls">
                <button onClick={() => setRooms(Math.max(1, rooms - 1))}>
                  <FaMinus />
                </button>
                <div className="DummyTicket-counter-value">
                  {String(rooms).padStart(2, "0")}
                </div>
                <button onClick={() => setRooms(rooms + 1)}>
                  <FaPlus />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FLIGHT CLASS */}
        {mode === "flight" && (
          <div className="DummyTicket-modal-section">
            <div className="DummyTicket-modal-row-title">Travel Class</div>

            <div className="DummyTicket-class-row">
              {CLASSES.map((c) => (
                <label
                  key={c}
                  className={`DummyTicket-class-item ${
                    travelClass === c ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="tclass"
                    checked={travelClass === c}
                    onChange={() => setTravelClass(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="DummyTicket-modal-actions">
          <button className="DummyTicket-secondary" onClick={close}>
            Cancel
          </button>
          <button className="DummyTicket-primary" onClick={close}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravellersModal;
