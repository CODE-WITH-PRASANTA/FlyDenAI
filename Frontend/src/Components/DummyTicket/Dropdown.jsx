import React, { useRef, useState, useEffect } from "react";

/**
 * Dropdown
 * - Accepts `options` as:
 *    - array of strings: ["New York, USA", "London, UK", ...]
 *    - array of objects: [{ city: "New York, USA", airport: "JFK" }, ...]
 * - setValue will be called with the string value (city or airport fallback)
 */
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

  // normalize option to object shape { city, airport }
  const normalize = (item) => {
    if (!item && item !== 0) return { city: "", airport: "" };

    if (typeof item === "string") {
      return { city: item, airport: "" };
    }

    // object - try common field names
    const city =
      item.city ??
      item.label ??
      item.name ??
      item.title ??
      (typeof item === "object" ? String(item).trim() : "");
    const airport = item.airport ?? item.code ?? item.iata ?? "";
    return { city: city ?? "", airport: airport ?? "" };
  };

  const normalizedOptions = safeOptions.map((o) => normalize(o));

  // Filter options based on search keyword (defensive checks)
  const kw = (keyword || "").toString().toLowerCase().trim();
  const filtered = normalizedOptions.filter((opt) => {
    if (!opt) return false;
    const city = (opt.city || "").toString().toLowerCase();
    const airport = (opt.airport || "").toString().toLowerCase();
    if (!kw) return true;
    return city.includes(kw) || airport.includes(kw);
  });

  // Find current selected value; fallback to a stub if not found
  const found =
    normalizedOptions.find(
      (opt) => (opt.city && opt.city === value) || (opt.airport && opt.airport === value)
    ) ?? null;

  const currentValue =
    found ||
    normalizedOptions[0] ||
    (value ? { city: value, airport: "" } : { city: "Select...", airport: "" });

  const handleSelect = (opt) => {
    // prefer city, fallback to airport
    const val = (opt.city || "").toString() || (opt.airport || "").toString();
    setValue(val);
    setOpen(false);
    setKeyword("");
  };

  return (
    <div className="DummyTicket-grid-item" ref={ref}>
      {label && <label>{label}</label>}

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
        <div className="DummyTicket-main-text">{currentValue.city}</div>
        <div className="DummyTicket-sub-text">{currentValue.airport}</div>
      </div>

      {open && (
        <div className="DummyTicket-dropdown" role="dialog" aria-label="Select location">
          <div className="DummyTicket-dropdown-header">Search Location</div>

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
            aria-label="Search locations"
          />

          <div className="DummyTicket-dropdown-list" role="listbox" aria-label="Locations">
            {filtered.map((item, idx) => {
              const key = `${item.city ?? "unknown"}-${item.airport ?? ""}-${idx}`;
              return (
                <div
                  key={key}
                  className="DummyTicket-dropdown-item"
                  onClick={() => handleSelect(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                      handleSelect(item);
                    }
                  }}
                  tabIndex={0}
                  role="option"
                  aria-label={`${item.city ?? ""} ${item.airport ?? ""}`}
                >
                  <div className="DummyTicket-dropdown-city">{item.city ?? "—"}</div>
                  <div className="DummyTicket-dropdown-airport">{item.airport ?? ""}</div>
                </div>
              );
            })}

            {filtered.length === 0 && <div className="DummyTicket-empty">No locations found</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
