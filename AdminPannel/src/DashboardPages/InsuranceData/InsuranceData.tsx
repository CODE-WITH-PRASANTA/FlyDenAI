import React, { useState, useEffect } from "react";
import "./InsuranceData.css";
import { MoreVertical, Search } from "lucide-react";
import Swal from "sweetalert2";
import BASE_URL from "../../Api";

/* ---------------------------------------------
   TYPES
---------------------------------------------- */
interface AirportType {
  airportName: string;
}

interface BookingType {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  fromAirport: AirportType;
  toAirport: AirportType;
  insuranceStartDate: string;
  insuranceEndDate: string;
  travelPurpose: string;
  bookingId: string;
  insuranceCode: string;
  status: "Pending" | "Finalized";
}

/* ---------------------------------------------
   MAIN COMPONENT
---------------------------------------------- */
const InsuranceData: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPurpose, setFilterPurpose] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------------------------------------
     FETCH BOOKINGS FROM BACKEND
  ---------------------------------------------- */
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/insurance`);
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  /* ---------------------------------------------
     FINALIZE BOOKING
  ---------------------------------------------- */
  const finalizeBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/insurance/finalize/${bookingId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Updated!", data.message, "success");
        fetchBookings();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  /* ---------------------------------------------
     DELETE BOOKING
  ---------------------------------------------- */
  const deleteBooking = async (bookingId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${BASE_URL}/insurance/${bookingId}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (data.success) {
            Swal.fire("Deleted!", "Booking removed successfully.", "success");
            fetchBookings();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete booking", "error");
        }
      }
    });
  };

  /* ---------------------------------------------
     SEARCH + FILTER
  ---------------------------------------------- */
  const filteredData = bookings
    .filter((item) => {
      const s = searchTerm.toLowerCase();
      return (
        item.fullName.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s) ||
        item.bookingId.toLowerCase().includes(s) ||
        item.insuranceCode.toLowerCase().includes(s)
      );
    })
    .filter(
      (item) => filterPurpose === "All" || item.travelPurpose === filterPurpose
    )
    .filter((item) => filterStatus === "All" || item.status === filterStatus);

  /* ---------------------------------------------
     PAGINATION
  ---------------------------------------------- */
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ---------------------------------------------
     UI
  ---------------------------------------------- */
  return (
    <div className="Insurance-booking-container">
      <h2 className="Insurance-booking-title">Insurance Bookings</h2>

      {/* SEARCH + FILTER BAR */}
      <div className="Insurance-controls">
        {/* SEARCH */}
        <div className="Insurance-search">
          <Search size={18} className="Insurance-search-icon" />
          <input
            type="text"
            placeholder="Search name, email, booking ID, insurance code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* PURPOSE FILTER */}
        <select
          className="Insurance-filter"
          value={filterPurpose}
          onChange={(e) => setFilterPurpose(e.target.value)}
        >
          <option value="All">All Purposes</option>
          <option value="Tourism / Vacation">Tourism</option>
          <option value="Study Visa Travel">Study Visa</option>
          <option value="Business Trip">Business Trip</option>
        </select>

        {/* STATUS FILTER */}
        <select
          className="Insurance-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Finalized">Finalized</option>
        </select>
      </div>

      {/* BOOKING GRID */}
      <div className="Insurance-booking-grid">
        {currentData.map((item, index) => (
          <div key={index} className="Insurance-booking-card">
            {/* HEADER */}
            <div className="Insurance-booking-header">
              <div>
                <h3 className="Insurance-booking-name">{item.fullName}</h3>

                <p className="Insurance-booking-subtitle">
                  {item.fromAirport.airportName} → {item.toAirport.airportName}
                </p>

                <p className="Insurance-code">
                  Insurance Code: <strong>{item.insuranceCode}</strong>
                </p>
              </div>

              {/* 3 DOT MENU */}
              <div
                className="Insurance-booking-menu-icon"
                onClick={() => toggleMenu(index)}
              >
                <MoreVertical size={22} />

                {openMenu === index && (
                  <div className="Insurance-booking-dropdown">
                    {item.status === "Pending" && (
                      <button
                        className="Insurance-booking-option"
                        onClick={() => finalizeBooking(item.bookingId)}
                      >
                        Finalize
                      </button>
                    )}

                    <button
                      className="Insurance-booking-option delete"
                      onClick={() => deleteBooking(item.bookingId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS */}
            <div className="Insurance-booking-details">
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>WhatsApp:</strong> {item.whatsapp}</p>
              <p><strong>Purpose:</strong> {item.travelPurpose}</p>
              <p><strong>Start:</strong> {item.insuranceStartDate}</p>
              <p><strong>End:</strong> {item.insuranceEndDate}</p>

              <p className="Insurance-status-label">
                <strong>Status:</strong>
                <span className={`Insurance-status ${item.status}`}>
                  {item.status}
                </span>
              </p>

              <p className="Insurance-booking-id">
                <strong>Booking ID:</strong> {item.bookingId}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="Insurance-pagination">
        <button
          className="Insurance-page-btn"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`Insurance-page-number ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="Insurance-page-btn"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InsuranceData;
