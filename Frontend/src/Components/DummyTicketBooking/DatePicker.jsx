import React, { useState, useRef, useEffect } from "react";
import "./DummyTicketBooking.css";
import { Calendar } from "lucide-react";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const DatePicker = ({ label, value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const selectDate = (day) => {
    const final = `${day}-${currentMonth.getMonth() + 1}-${currentMonth.getFullYear()}`;
    onSelect(final);
    setOpen(false);
  };

  return (
    <div className="DummyTicket-dateWrap" ref={ref}>
      <p className="DummyTicket-label">{label}</p>

      <div className="DummyTicket-dateBox" onClick={() => setOpen(true)}>
        <h3 className="DummyTicket-value">{value || "Select Date"}</h3>
        <Calendar size={18} />
      </div>

      {open && (
        <div className="DummyTicket-dateDropdown">

          <div className="DummyTicket-dateHeader">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                    1
                  )
                )
              }
            >
              ‹
            </button>

            <h4>
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>

            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
            >
              ›
            </button>
          </div>

          <div className="DummyTicket-weekDays">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>(
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="DummyTicket-daysGrid">
            {[...Array(firstDay)].map((_,i)=>(
              <span key={"empty-"+i}></span>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                className="DummyTicket-day"
                onClick={() => selectDate(day)}
              >
                {day}
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default DatePicker;
 