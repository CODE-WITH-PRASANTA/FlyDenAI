import React, { useEffect, useState } from "react";
import "./VisaPayments.css";
import {
  FiMoreVertical,
  FiDownloadCloud
} from "react-icons/fi";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaFlag,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import BASE_URL from "../../Api";

/* ============================
   TYPES & INTERFACES
============================ */

interface FileInfo {
  fieldname: string;
  filename: string;
  path: string;
  url: string;
  size: number;
  mimeType: string;
}

interface Traveller {
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;
  passportNo: string;
  contactNumber: string;
  files?: {
    passportCopy?: FileInfo;
    photo?: FileInfo;
  };
}

interface GlobalFiles {
  passportCopy?: FileInfo;
  photo?: FileInfo;
  travelItinerary?: FileInfo;
  additionalDocument?: FileInfo;
}

interface VisaApplication {
  applicationId: string;
  visaType: string;
  onwardDate: string;
  returnDate: string;
  travellersCount: number;
  travellers: Traveller[];
  totalAmount: number;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  stepCompleted: number;
  createdAt: string;
  approved?: boolean;
  approvedAt?: string | null;
  globalFiles: GlobalFiles;
}

/* ============================
   COMPONENT
============================ */

const VisaPayments: React.FC = () => {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [filteredApps, setFilteredApps] = useState<VisaApplication[]>([]);

  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [travellerMenuOpen, setTravellerMenuOpen] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedStep, setSelectedStep] = useState<string>("");

  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: ""
  });

  const cardsPerPage = 6;
  const FILE_BASE = BASE_URL.replace("/api", "");

  /* ----------------- Fetch Applications ----------------- */
  useEffect(() => {
    fetchAllApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applications, searchText, selectedMonth, selectedStatus, selectedStep, dateRange]);

  const fetchAllApplications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/applications/all`);
      const data = await res.json();

      if (data.success) {
        setApplications(data.data);
        setFilteredApps(data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };
  /* ------------------------ UI Toggles ------------------------ */
  const toggleMenu = (id: string) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const toggleTravellerMenu = (id: string) => {
    setTravellerMenuOpen(travellerMenuOpen === id ? null : id);
  };

  /* ------------------------ Filter Logic ------------------------ */
  const applyFilters = () => {
    let list = [...applications];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (a) =>
          a.applicationId.toLowerCase().includes(q) ||
          a.visaType.toLowerCase().includes(q) ||
          a.travellers.some(
            (t) =>
              `${t.firstName} ${t.lastName}`.toLowerCase().includes(q) ||
              t.passportNo.toLowerCase().includes(q) ||
              t.nationality.toLowerCase().includes(q)
          )
      );
    }

    if (selectedMonth !== "") {
      list = list.filter((a) => {
        const d = new Date(a.createdAt);
        return d.getMonth() + 1 === Number(selectedMonth);
      });
    }

    if (selectedStatus !== "") {
      list = list.filter((a) => a.paymentStatus === selectedStatus);
    }

    if (selectedStep !== "") {
      list = list.filter((a) => a.stepCompleted === Number(selectedStep));
    }

    if (dateRange.from && dateRange.to) {
      const from = new Date(dateRange.from).getTime();
      const to = new Date(dateRange.to).getTime();

      list = list.filter((a) => {
        const created = new Date(a.createdAt).getTime();
        return created >= from && created <= to;
      });
    }

    setFilteredApps(list);
  };

  const resetFilters = () => {
    setSelectedMonth("");
    setSelectedStatus("");
    setSelectedStep("");
    setDateRange({ from: "", to: "" });
    setSearchText("");
    setShowFilterMenu(false);
  };

  /* ------------------------ Date Formatting ------------------------ */
  const formatDate = (rawDate: string): string => {
    if (!rawDate) return "";
    const date = new Date(rawDate);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  /* =============================
     APPROVE APPLICATION
  ============================= */
  const handleApprove = async (id: string) => {
    const app = applications.find(a => a.applicationId === id);
    if (app?.approved) {
      alert("This application is already approved.");
      return;
    }

    if (!window.confirm("Do you want to approve this application?")) return;

    try {
      const res = await fetch(`${BASE_URL}/applications/${id}/approve`, {
        method: "PUT",
      });

      const data = await res.json();

      if (data.success) {
        alert("Application Approved Successfully!");

        const updated = applications.map((app) =>
          app.applicationId === id
            ? { ...app, approved: true, approvedAt: new Date().toISOString() }
            : app
        );

        setApplications(updated);
        applyFilters();
      }
    } catch (err) {
      console.error("Approve Error:", err);
    }
  };

  /* =============================
     DELETE APPLICATION
  ============================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure? This will permanently delete all uploaded documents.")) {
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/applications/${id}/delete`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Application Deleted Successfully!");
        fetchAllApplications();
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };
  return (
    <div className="VisaPayment-Container">
      <h2 className="VisaPayment-Title">Visa Applications</h2>

      {/* ----------------- Search + Filter Bar ----------------- */}
      <div className="VisaPayment-TopBar">

        <div className="VisaPayment-SearchBox">
          <FaSearch className="SearchIcon" />
          <input
            type="text"
            placeholder="Search by Name, Passport, Visa Type..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <button
          className="VisaPayment-FilterBtn"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <FaFilter /> Filters
        </button>

      </div>

      {/* ----------------- Filter Dropdown ----------------- */}
      {showFilterMenu && (
        <div className="VisaPayment-FilterMenu animateDropdown">
          
          <div className="filter-row">
            <label>Filter by Month</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">All</option>
              {Array.from({ length: 12 }).map((_, m) => (
                <option key={m + 1} value={m + 1}>
                  {new Date(0, m).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-row">
            <label>Payment Status</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">All</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          <div className="filter-row">
            <label>Step Completed</label>
            <select value={selectedStep} onChange={(e) => setSelectedStep(e.target.value)}>
              <option value="">All</option>
              <option value="1">Step 1</option>
              <option value="2">Step 2</option>
              <option value="3">Step 3</option>
              <option value="4">Completed (Step 4)</option>
            </select>
          </div>

          <div className="filter-row">
            <label>Custom Date Range</label>
            <div className="filter-date-range">
              <input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
              <input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
            </div>
          </div>

          <button className="VisaPayment-ResetBtn" onClick={resetFilters}>
            Reset Filters
          </button>

        </div>
      )}

      {/* ----------------- Cards ----------------- */}
      <div className="VisaPayment-CardGrid">
        {filteredApps
          .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
          .map((app, index) => (
            <div className="VisaPayment-Card" key={index}>

              {/* Header */}
              <div className="VisaPayment-Header">
                <div>
                  <h3 className="VisaPayment-Country">{app.visaType}</h3>
                  <p className="VisaPayment-AppId">Application ID: {app.applicationId}</p>
                </div>

                <div className="VisaPayment-MenuArea">
                  <FiMoreVertical
                    className="VisaPayment-MenuIcon"
                    onClick={() => toggleMenu(app.applicationId)}
                  />

                  {menuOpen === app.applicationId && (
                    <div className="VisaMenu-Dropdown animateMenu">

                      {!app.approved ? (
                        <div
                          className="VisaMenu-Item approve"
                          onClick={() => handleApprove(app.applicationId)}
                        >
                          ✔ Approve Visa
                        </div>
                      ) : (
                        <div className="VisaMenu-Item approved disabled">
                          ✅ Already Approved
                        </div>
                      )}

                      <div
                        className="VisaMenu-Item delete"
                        onClick={() => handleDelete(app.applicationId)}
                      >
                        🗑 Delete Application
                      </div>

                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="VisaPayment-DateGroup">

                <div className="VisaPayment-DateItem">
                  <FaCalendarAlt className="VisaPayment-DateIcon" />
                  <div className="VisaPayment-DateText">
                    <span>Onward Date</span>
                    <strong>{formatDate(app.onwardDate)}</strong>
                  </div>
                </div>

                <div className="VisaPayment-DateItem">
                  <FaCalendarAlt className="VisaPayment-DateIcon" />
                  <div className="VisaPayment-DateText">
                    <span>Return Date</span>
                    <strong>{formatDate(app.returnDate)}</strong>
                  </div>
                </div>

              </div>

              {/* Info Grid */}
              <div className="VisaPayment-InfoGrid">

                <div className="VisaPayment-InfoBox">
                  <FaUser className="VisaPayment-InfoIcon" />
                  <div className="VisaPayment-InfoText">
                    <span>Total Travellers</span>
                    <strong>{app.travellersCount}</strong>
                  </div>
                </div>

                <div className="VisaPayment-InfoBox">
                  <FaClock className="VisaPayment-InfoIcon" />
                  <div className="VisaPayment-InfoText">
                    <span>Step Completed</span>
                    <strong>{app.stepCompleted}/4</strong>
                  </div>
                </div>

                <div className="VisaPayment-InfoBox">
                  <FaFlag className="VisaPayment-InfoIcon" />
                  <div className="VisaPayment-InfoText">
                    <span>Payment Status</span>
                    <strong className={`VisaPayment-StatusBadge ${app.paymentStatus.toLowerCase()}`}>
                      {app.paymentStatus}
                    </strong>
                  </div>
                </div>

                <div className="VisaPayment-InfoBox">
                  <span className="VisaPayment-RupeeSymbol">₹</span>
                  <div className="VisaPayment-InfoText">
                    <span>Total Amount</span>
                    <strong className="VisaPayment-Amount">{app.totalAmount}</strong>
                  </div>
                </div>

              </div>

              {/* Travellers */}
              <div className="VisaPayment-TravellerSection">
                <h4>Travellers</h4>

                {app.travellers.map((t, i) => (
                  <div className="VisaPayment-TravellerCard" key={i}>
                    <div>
                      <strong>{t.title} {t.firstName} {t.lastName}</strong>
                      <p>Nationality: {t.nationality}</p>
                      <p>Passport No: {t.passportNo}</p>
                      <p>Contact: {t.contactNumber}</p>
                    </div>

                    <FiMoreVertical
                      className="VisaPayment-TravellerMenuIcon"
                      onClick={() => toggleTravellerMenu(`${app.applicationId}-${i}`)}
                    />

                    {travellerMenuOpen === `${app.applicationId}-${i}` && (
                      <div className="VisaPayment-TravellerDropdown animateDropdown">

                        {t.files?.passportCopy && (
                          <p>
                            <a href={`${FILE_BASE}${t.files.passportCopy.url}`} target="_blank" download>
                              📄 Passport
                            </a>
                          </p>
                        )}

                        {t.files?.photo && (
                          <p>
                            <a href={`${FILE_BASE}${t.files.photo.url}`} target="_blank" download>
                              🖼 Photo
                            </a>
                          </p>
                        )}

                      </div>
                    )}

                  </div>
                ))}
              </div>

              {/* Global Documents */}
              <div className="VisaPayment-DocsSection">
                <h4>Global Documents</h4>

                <div className="VisaPayment-DocButtons">
                  {["passportCopy", "photo", "travelItinerary", "additionalDocument"].map((key) => {
                    const file = app.globalFiles?.[key as keyof GlobalFiles];

                    return (
                      <a
                        key={key}
                        className={`VisaPayment-DocBtn ${file ? "active" : "inactive"}`}
                        href={file ? `${FILE_BASE}${file.url.replace(/\\/g, "/")}` : "#"}
                        target="_blank"
                      >
                        <FiDownloadCloud className="VisaPayment-DocIcon" />
                        {key.replace(/([A-Z])/g, " $1")}
                      </a>
                    );
                  })}
                </div>

              </div>

            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="VisaPagination">

        <button
          className="VisaPagination-Btn"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        {Array.from({ length: Math.ceil(filteredApps.length / cardsPerPage) }).map((_, i) => (
          <button
            key={i}
            className={`VisaPagination-Number ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="VisaPagination-Btn"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === Math.ceil(filteredApps.length / cardsPerPage)}
        >
          Next →
        </button>

      </div>

    </div>
  );
};

export default VisaPayments;
