// src/components/DummyTicket/Dropdown.jsx
import React, { useRef, useState, useEffect } from "react";

const Dropdown = ({ label, value, setValue, options }) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const ref = useRef();

  useEffect(() => {
    function clickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, []);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="DummyTicket-grid-item" ref={ref}>
      <label>{label}</label>

      <div
        className="DummyTicket-field clickable"
        onClick={() => setOpen(!open)}
      >
        <div className="DummyTicket-main-text">
          {value.split(",")[0]}
        </div>
        <div className="DummyTicket-sub-text">
          {value.split(",").slice(1).join(", ").trim()}
        </div>
      </div>

      {open && (
        <div className="DummyTicket-dropdown">
          <input
            className="DummyTicket-search"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <div className="DummyTicket-dropdown-list">
            {filtered.map((item) => (
              <div
                key={item}
                className="DummyTicket-dropdown-item"
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                  setKeyword("");
                }}
              >
                {item}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="DummyTicket-empty">No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
