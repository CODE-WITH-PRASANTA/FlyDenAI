import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  User,
  Users,
  Plane,
  CreditCard,
  BadgeCheck,
  Trash2,
  Check,
  X,
  Search,
} from "lucide-react";

import "./DummyTicketHolder.css";
import axios from "axios";
import BASE_URL from "../../Api";

/* ---------------------- TYPE DEFINITIONS ---------------------- */

interface Passenger {
  title?: string;
  firstName?: string;
  lastName?: string;
  nationality?: string;
}

interface BookingData {
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
  travellers?: number;
  class?: string;
  tripType?: string;
}

interface PriceDetails {
  baseAmount?: number;
  discountAmount?: number;
  finalAmount?: number;
}

interface Customer {
  name?: string;
  email?: string;
  phone?: string;
  purpose?: string;
}

interface Booking {
  _id: string;
  customer?: Customer;
  passengers?: Passenger[];
  bookingData?: BookingData;
  priceDetails?: PriceDetails;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  approveStatus: "PENDING" | "APPROVED" | "REJECTED";
}

/* ---------------------- COMPONENT START ---------------------- */

const DummyTicketHolder: React.FC = () => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState("ALL");
  const [filterApproval, setFilterApproval] = useState("ALL");

  /* ---------------------- FETCH BOOKINGS ---------------------- */

  const fetchBookings = async () => {
    try {
      const params: any = {};

      if (searchTerm) params.search = searchTerm;
      if (filterPayment !== "ALL") params.status = filterPayment;
      if (filterApproval !== "ALL") params.approve = filterApproval;

      const res = await axios.get(`${BASE_URL}/ticket-booking`, { params });

      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Bookings Error:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [searchTerm, filterPayment, filterApproval]);

  /* ---------------------- ACTIONS ---------------------- */

  const approveBooking = async (id: string) => {
    try {
      await axios.put(`${BASE_URL}/ticket-booking/approve/${id}`);
      fetchBookings();
      setMenuIndex(null);
    } catch (err) {
      console.error("Approve Error:", err);
    }
  };

  const rejectBooking = async (id: string) => {
    try {
      await axios.put(`${BASE_URL}/ticket-booking/reject/${id}`);
      fetchBookings();
      setMenuIndex(null);
    } catch (err) {
      console.error("Reject Error:", err);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/ticket-booking/delete/${id}`);
      fetchBookings();
      setMenuIndex(null);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  /* ---------------------- PAGINATION ---------------------- */

  const pageSize = 6;
  const totalPages = Math.ceil(bookings.length / pageSize);

  const currentData = bookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleMenu = (index: number) => {
    setMenuIndex(menuIndex === index ? null : index);
  };

  /* ---------------------- SAFE GETTER ---------------------- */

  const safe = (value: any) => (value !== undefined && value !== null ? value : "N/A");

  /* ---------------------- UI ---------------------- */

  return (
    <div className="DummyTicketHolder-container">
      <h2 className="DummyTicketHolder-title">Dummy Ticket Bookings</h2>

      {/* Filters */}
      <div className="DummyTicketHolder-filters">
        <div className="DummyTicketHolder-searchBox">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="DummyTicketHolder-filterSelect"
          value={filterPayment}
          onChange={(e) => setFilterPayment(e.target.value)}
        >
          <option value="ALL">Payment: All</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>

        <select
          className="DummyTicketHolder-filterSelect"
          value={filterApproval}
          onChange={(e) => setFilterApproval(e.target.value)}
        >
          <option value="ALL">Approval: All</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* GRID */}
      <div className="DummyTicketHolder-grid">
        {currentData.map((data, index) => (
          <div className="DummyTicketHolder-card" key={data._id}>
            {/* HEADER */}
            <div className="DummyTicketHolder-cardHeader">
              <h3>{safe(data.customer?.name)}</h3>

              <div className="DummyTicketHolder-menuWrapper">
                <MoreVertical
                  className="DummyTicketHolder-menuIcon"
                  onClick={() => toggleMenu(index)}
                />

                {menuIndex === index && (
                  <div className="DummyTicketHolder-menuBox">
                    {data.approveStatus !== "APPROVED" && (
                      <button
                        className="DummyTicketHolder-menuItem approve"
                        onClick={() => approveBooking(data._id)}
                      >
                        <Check size={16} /> Approve
                      </button>
                    )}

                    {data.approveStatus !== "REJECTED" && (
                      <button
                        className="DummyTicketHolder-menuItem reject"
                        onClick={() => rejectBooking(data._id)}
                      >
                        <X size={16} /> Reject
                      </button>
                    )}

                    <button
                      className="DummyTicketHolder-menuItem delete"
                      onClick={() => deleteBooking(data._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CUSTOMER + PASSENGERS */}
            <div className="DummyTicketHolder-row">
              <div className="DummyTicketHolder-block">
                <div className="DummyTicketHolder-blockHeader">
                  <User size={18} /> <span>Customer</span>
                </div>

                <p><strong>Email:</strong> {safe(data.customer?.email)}</p>
                <p><strong>Phone:</strong> {safe(data.customer?.phone)}</p>
                <p><strong>Purpose:</strong> {safe(data.customer?.purpose)}</p>
              </div>

              <div className="DummyTicketHolder-block">
                <div className="DummyTicketHolder-blockHeader">
                  <Users size={18} /> <span>Passengers</span>
                </div>

                {data.passengers && data.passengers.length > 0 ? (
                  data.passengers.map((p, i) => (
                    <p key={i}>
                      {safe(p.title)} {safe(p.firstName)} {safe(p.lastName)} ({safe(p.nationality)})
                    </p>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>

            {/* BOOKING + PRICE */}
            <div className="DummyTicketHolder-row">
              <div className="DummyTicketHolder-block">
                <div className="DummyTicketHolder-blockHeader">
                  <Plane size={18} /> <span>Booking Info</span>
                </div>

                <p><strong>From:</strong> {safe(data.bookingData?.from)}</p>
                <p><strong>To:</strong> {safe(data.bookingData?.to)}</p>
                <p><strong>Date:</strong> {safe(data.bookingData?.date)}</p>
                <p><strong>Return:</strong> {safe(data.bookingData?.returnDate)}</p>
              </div>

              <div className="DummyTicketHolder-block">
                <div className="DummyTicketHolder-blockHeader">
                  <CreditCard size={18} /> <span>Price</span>
                </div>

                <p><strong>Base:</strong> ₹{safe(data.priceDetails?.baseAmount)}</p>
                <p><strong>Discount:</strong> -₹{safe(data.priceDetails?.discountAmount)}</p>
                <p className="DummyTicketHolder-final">
                  <strong>Final:</strong> ₹{safe(data.priceDetails?.finalAmount)}
                </p>
              </div>
            </div>

            {/* STATUS */}
            <div className="DummyTicketHolder-row">
              <div className="DummyTicketHolder-block">
                <div className="DummyTicketHolder-blockHeader">
                  <BadgeCheck size={18} /> <span>Status</span>
                </div>

                <p>
                  <strong>Payment:</strong>
                  <span className={`DummyTicketHolder-status ${data.paymentStatus}`}>
                    {data.paymentStatus}
                  </span>
                </p>

                <p>
                  <strong>Approval:</strong>
                  <span className={`DummyTicketHolder-status ${data.approveStatus}`}>
                    {data.approveStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="DummyTicketHolder-pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`DummyTicketHolder-pageBtn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DummyTicketHolder;
