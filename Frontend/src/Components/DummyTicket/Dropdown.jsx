// src/components/DummyTicket/Dropdown.jsx
import React, { useRef, useState, useEffect } from "react";

const Dropdown = ({ label, value, setValue, options = [] }) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const ref = useRef();

  useEffect(() => {
    function clickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setKeyword("");
      }
    }
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, []);

  // defensive: ensure options is an array
  const safeOptions = Array.isArray(options) ? options : [];

  // Filter options based on search keyword (defensive checks)
  const kw = (keyword || "").toString().toLowerCase();
  const filtered = safeOptions.filter((item) => {
    // protect against missing item or missing fields
    if (!item) return false;
    const city = (item.city || "").toString().toLowerCase();
    const airport = (item.airport || "").toString().toLowerCase();
    return city.includes(kw) || airport.includes(kw);
  });

  // Find current selected value; fallback to a stub if not found
  const found = safeOptions.find((opt) => opt.city === value);
  const currentValue = found || safeOptions[0] || { city: value || "Select...", airport: "" };

  return (
    <div className="DummyTicket-grid-item" ref={ref}>
      <label>{label}</label>

      <div
        className="DummyTicket-field clickable"
        onClick={() => {
          setOpen((o) => !o);
          setKeyword("");
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            setOpen((o) => !o);
            setKeyword("");
          }
        }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="DummyTicket-main-text">
          {currentValue.city}
        </div>
        <div className="DummyTicket-sub-text">
          {currentValue.airport}
        </div>
      </div>

      {open && (
        <div className="DummyTicket-dropdown" role="dialog">
          <div className="DummyTicket-dropdown-header">
            Search Location
          </div>
          <input
            className="DummyTicket-search"
            placeholder="Search city or airport..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                setKeyword("");
              }
            }}
          />

          <div className="DummyTicket-dropdown-list" role="listbox">
            {filtered.map((item) => (
              <div
                key={`${item.city ?? "unknown"}-${item.airport ?? "unknown"}`}
                className="DummyTicket-dropdown-item"
                onClick={() => {
                  // prefer item.city if present, otherwise fallback to item.city||item.airport
                  setValue(item.city ?? item.airport ?? "");
                  setOpen(false);
                  setKeyword("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                    setValue(item.city ?? item.airport ?? "");
                    setOpen(false);
                    setKeyword("");
                  }
                }}
                tabIndex={0}
                role="option"
                aria-label={`${item.city ?? ""} ${item.airport ?? ""}`}
              >
                <div className="DummyTicket-dropdown-city">{item.city ?? "—"}</div>
                <div className="DummyTicket-dropdown-airport">{item.airport ?? ""}</div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="DummyTicket-empty">No locations found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
