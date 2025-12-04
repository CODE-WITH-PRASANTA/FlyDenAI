// components/TravellerModal.jsx
import React, { useEffect, useRef } from "react";
import "./DummyTicketBooking.css";
import { X } from "lucide-react";

const TravellerModal = ({
  open,
  close,
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants,
  travelClass,
  setTravelClass,
}) => {

  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    if (open) document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!open) return null;

  const classes = [
    "Economy",
    "Premium Economy",
    "Business",
    "First Class",
  ];

  return (
    <div className="DummyTicket-travOverlay">
      <div className="DummyTicket-travModal" ref={ref}>

        <div className="DummyTicket-travHeader">
          <h2>Select Travelers & Class</h2>
          <button className="DummyTicket-closeBtn" onClick={close}>
            <X size={20} />
          </button>
        </div>

        <div className="DummyTicket-travBlock">
          <h3>Travellers</h3>

          {/* adults */}
          <div className="DummyTicket-travRow">
            <div>
              <h4>Adults</h4>
              <span>(12+ Yrs)</span>
            </div>
            <div className="DummyTicket-counter">
              <button onClick={() => adults > 1 && setAdults(adults - 1)}>-</button>
              <p>{adults < 10 ? `0${adults}` : adults}</p>
              <button onClick={() => setAdults(adults + 1)}>+</button>
            </div>
          </div>

          {/* children */}
          <div className="DummyTicket-travRow">
            <div>
              <h4>Childrens</h4>
              <span>(2–12 Yrs)</span>
            </div>
            <div className="DummyTicket-counter">
              <button onClick={() => children > 0 && setChildren(children - 1)}>-</button>
              <p>{children < 10 ? `0${children}` : children}</p>
              <button onClick={() => setChildren(children + 1)}>+</button>
            </div>
          </div>

          {/* infants */}
          <div className="DummyTicket-travRow">
            <div>
              <h4>Infants</h4>
              <span>(0–12 Yrs)</span>
            </div>
            <div className="DummyTicket-counter">
              <button onClick={() => infants > 0 && setInfants(infants - 1)}>-</button>
              <p>{infants < 10 ? `0${infants}` : infants}</p>
              <button onClick={() => setInfants(infants + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="DummyTicket-travBlock">
          <h3>Travellers</h3>

          <div className="DummyTicket-classRow">
            {classes.map((c, i) => (
              <label key={i} className="DummyTicket-radioOption">
                <input
                  type="radio"
                  name="class"
                  checked={travelClass === c}
                  onChange={() => setTravelClass(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        <button className="DummyTicket-primaryBtn" onClick={close}>
          Done
        </button>

      </div>
    </div>
  );
};

export default TravellerModal;
