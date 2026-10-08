import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import "./DummyTicketBooking.css";

import { Calendar } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const DatePicker = ({
  label,
  value,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const ref = useRef(null);

  /* ============================================================
     CLOSE ON OUTSIDE CLICK
  ============================================================ */

  useEffect(() => {
    const close = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      close
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        close
      );
    };
  }, []);

  /* ============================================================
     CALENDAR DATA
  ============================================================ */

  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  /* ============================================================
     SELECT DATE
  ============================================================ */

  const selectDate = (day) => {
    const finalDate = `${String(day).padStart(
      2,
      "0"
    )}-${String(month + 1).padStart(
      2,
      "0"
    )}-${year}`;

    onSelect(finalDate);

    setOpen(false);
  };

  /* ============================================================
     PREVIOUS MONTH
  ============================================================ */

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        year,
        month - 1,
        1
      )
    );
  };

  /* ============================================================
     NEXT MONTH
  ============================================================ */

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  /* ============================================================
     TODAY
  ============================================================ */

  const today = new Date();

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  /* ============================================================
     SELECTED DATE
  ============================================================ */

  const isSelected = (day) => {
    if (!value) return false;

    const selected = value.split("-");

    if (selected.length !== 3) {
      return false;
    }

    return (
      Number(selected[0]) === day &&
      Number(selected[1]) === month + 1 &&
      Number(selected[2]) === year
    );
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div
      className={`DummyTicket-dateWrap ${
        open
          ? "DummyTicket-dateWrap-open"
          : ""
      }`}
      ref={ref}
    >
      {/* LABEL */}

      <p className="DummyTicket-label">
        {label}
      </p>

      {/* DATE FIELD */}

      <button
        type="button"
        className="DummyTicket-dateBox"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        aria-expanded={open}
      >
        <div className="DummyTicket-dateContent">
          <span className="DummyTicket-dateValue">
            {value || "Select Date"}
          </span>
        </div>

        <Calendar
          size={18}
          className="DummyTicket-dateIcon"
        />
      </button>

      {/* CALENDAR */}

      {open && (
        <div className="DummyTicket-dateDropdown">

          {/* HEADER */}

          <div className="DummyTicket-dateHeader">

            <button
              type="button"
              onClick={previousMonth}
              aria-label="Previous month"
            >
              ‹
            </button>

            <h4>
              {months[month]} {year}
            </h4>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
            >
              ›
            </button>

          </div>

          {/* WEEK DAYS */}

          <div className="DummyTicket-weekDays">
            {weekDays.map((day) => (
              <span key={day}>
                {day}
              </span>
            ))}
          </div>

          {/* DAYS */}

          <div className="DummyTicket-daysGrid">

            {[...Array(firstDay)].map(
              (_, index) => (
                <span
                  key={`empty-${index}`}
                  className="DummyTicket-emptyDay"
                />
              )
            )}

            {Array.from(
              {
                length: daysInMonth,
              },
              (_, index) => index + 1
            ).map((day) => (
              <button
                type="button"
                key={day}
                className={`
                  DummyTicket-day
                  ${
                    isToday(day)
                      ? "today"
                      : ""
                  }
                  ${
                    isSelected(day)
                      ? "selected"
                      : ""
                  }
                `}
                onClick={() =>
                  selectDate(day)
                }
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