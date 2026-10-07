import React, { useState, useEffect } from "react";
import "./DisountCouponGeneratingPage.css";
import {
  FaEdit,
  FaTrashAlt,
  FaCopy,
  FaSearch,
  FaPlusCircle,
  FaTicketAlt,
  FaPercentage,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";
import BASE_URL from "../../Api";

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  status: "Pending" | "Active" | "Expired" | "Used";
}

const DisountCouponGeneratingPage: React.FC = () => {
  const [percent, setPercent] = useState<number | "">("");
  const [status, setStatus] =
    useState<Coupon["status"]>("Pending");

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // GENERATE COUPON CODE
  // =========================================================

  const generateCouponCode = (): string => {
    const prefixWords = [
      "Fly",
      "Visa",
      "Sky",
      "Trip",
      "Den",
      "Go",
      "Air",
    ];

    const suffixWords = [
      "Den",
      "Jet",
      "Pass",
      "Way",
      "Now",
      "Up",
      "Card",
    ];

    const prefix =
      prefixWords[
        Math.floor(Math.random() * prefixWords.length)
      ];

    const suffix =
      suffixWords[
        Math.floor(Math.random() * suffixWords.length)
      ];

    const randomNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    return `${prefix}${suffix}-${randomNumber}`;
  };

  // =========================================================
  // FETCH COUPONS
  // =========================================================

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/coupons`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to fetch coupons"
        );
      }

      setCoupons(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error fetching coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleGenerate = async () => {
    if (!percent || percent <= 0 || percent > 100) {
      return alert(
        "Please enter a valid discount between 1% and 100%."
      );
    }

    try {
      setLoading(true);

      if (editId) {
        const res = await fetch(
          `${BASE_URL}/coupons/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              discount: percent,
              status,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message || "Failed to update coupon"
          );
        }

        setCoupons((prev) =>
          prev.map((c) =>
            c._id === editId ? data : c
          )
        );

        setEditId(null);

        alert("Coupon updated successfully");
      } else {
        const code = generateCouponCode();

        const res = await fetch(
          `${BASE_URL}/coupons`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              discount: percent,
              status,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message || "Failed to create coupon"
          );
        }

        setCoupons((prev) => [data, ...prev]);

        alert(
          "Coupon generated & saved successfully"
        );
      }

      resetForm();
    } catch (error: any) {
      console.error(error);
      alert(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setPercent("");
    setStatus("Pending");
    setEditId(null);
  };

  // =========================================================
  // COPY
  // =========================================================

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Coupon code copied!");
    } catch {
      alert("Unable to copy coupon code");
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this coupon?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/coupons/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to delete coupon"
        );
      }

      setCoupons((prev) =>
        prev.filter((c) => c._id !== id)
      );

      alert("Coupon deleted successfully");
    } catch (error: any) {
      console.error(error);

      alert(
        error.message || "Error deleting coupon"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (coupon: Coupon) => {
    setEditId(coupon._id);
    setPercent(coupon.discount);
    setStatus(coupon.status);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredCoupons = coupons.filter((coupon) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    return (
      coupon.code.toLowerCase().includes(search) ||
      coupon.status.toLowerCase().includes(search) ||
      coupon.discount.toString().includes(search)
    );
  });

  // =========================================================
  // STATS
  // =========================================================

  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "Active"
  ).length;

  const pendingCoupons = coupons.filter(
    (coupon) => coupon.status === "Pending"
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === "Expired"
  ).length;

  return (
    <div className="coupon-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="coupon-header">
        <div className="coupon-header-left">
          <div className="coupon-heading-icon">
            <FaTicketAlt />
          </div>

          <div>
            <p className="coupon-eyebrow">
              PROMOTIONS & OFFERS
            </p>

            <h1 className="coupon-title">
              Discount Coupon Manager
            </h1>

            <p className="coupon-subtitle">
              Create, manage and monitor your promotional
              discount coupons.
            </p>
          </div>
        </div>

        <div className="coupon-header-controls">
          <FaSearch className="search-icon" />

          <input
            className="coupon-search"
            type="text"
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="coupon-stats">
        <div className="coupon-stat-card">
          <div className="coupon-stat-icon purple">
            <FaTicketAlt />
          </div>

          <div>
            <span>Total Coupons</span>
            <strong>{totalCoupons}</strong>
          </div>
        </div>

        <div className="coupon-stat-card">
          <div className="coupon-stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Active Coupons</span>
            <strong>{activeCoupons}</strong>
          </div>
        </div>

        <div className="coupon-stat-card">
          <div className="coupon-stat-icon orange">
            <FaClock />
          </div>

          <div>
            <span>Pending Coupons</span>
            <strong>{pendingCoupons}</strong>
          </div>
        </div>

        <div className="coupon-stat-card">
          <div className="coupon-stat-icon red">
            <FaTimesCircle />
          </div>

          <div>
            <span>Expired Coupons</span>
            <strong>{expiredCoupons}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="coupon-grid">
        {/* ===================================================
            FORM
        =================================================== */}

        <div className="coupon-form-card">
          <div className="card-top">
            <div>
              <span className="card-label">
                COUPON SETTINGS
              </span>

              <h2 className="section-title">
                {editId
                  ? "Edit Coupon"
                  : "Create New Coupon"}
              </h2>
            </div>

            <div className="form-card-icon">
              <FaPercentage />
            </div>
          </div>

          <div className="form-divider" />

          <div className="coupon-form-content">
            {/* Discount */}

            <div className="coupon-form-group">
              <label>
                Discount Percentage
                <span>*</span>
              </label>

              <div className="percentage-input-wrapper">
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="coupon-input percentage-input"
                  placeholder="20"
                  value={percent}
                  onChange={(e) =>
                    setPercent(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                />

                <div className="percentage-symbol">
                  %
                </div>
              </div>

              <small>
                Enter a discount value between 1% and
                100%.
              </small>
            </div>

            {/* Status */}

            <div className="coupon-form-group">
              <label>
                Coupon Status
                <span>*</span>
              </label>

              <select
                className="coupon-input"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as Coupon["status"]
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Expired">
                  Expired
                </option>

                <option value="Used">
                  Used
                </option>
              </select>

              <small>
                Choose the current availability of this
                coupon.
              </small>
            </div>

            {/* Preview */}

            <div className="coupon-preview">
              <div className="preview-top">
                <div className="preview-icon">
                  <FaTicketAlt />
                </div>

                <div>
                  <span>COUPON PREVIEW</span>
                  <strong>
                    {editId
                      ? coupons.find(
                          (c) => c._id === editId
                        )?.code || "COUPON-0000"
                      : "AUTO-GENERATED"}
                  </strong>
                </div>
              </div>

              <div className="preview-discount">
                <strong>
                  {percent || 0}%
                </strong>

                <span>
                  Discount
                </span>
              </div>
            </div>

            {/* Button */}

            <button
              className="btn-primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSyncAlt className="spin" />

                  {editId
                    ? "Updating Coupon..."
                    : "Generating Coupon..."}
                </>
              ) : (
                <>
                  <FaPlusCircle />

                  {editId
                    ? "Update Coupon"
                    : "Generate Coupon"}
                </>
              )}
            </button>

            {editId && (
              <button
                className="btn-cancel"
                onClick={resetForm}
                disabled={loading}
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="coupon-table-card">
          <div className="table-card-header">
            <div>
              <span className="card-label">
                COUPON DIRECTORY
              </span>

              <h2 className="section-title">
                Generated Coupons
              </h2>
            </div>

            <div className="coupon-count">
              {filteredCoupons.length}{" "}
              {filteredCoupons.length === 1
                ? "Coupon"
                : "Coupons"}
            </div>
          </div>

          <div className="table-divider" />

          {loading && coupons.length === 0 ? (
            <div className="coupon-loading">
              <div className="loading-spinner" />
              <p>Loading coupons...</p>
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="coupon-empty">
              <div className="empty-icon">
                <FaTicketAlt />
              </div>

              <h3>
                {searchTerm
                  ? "No matching coupons"
                  : "No Coupons Available"}
              </h3>

              <p>
                {searchTerm
                  ? "Try changing your search keyword."
                  : "Create your first discount coupon to get started."}
              </p>
            </div>
          ) : (
            <div className="coupon-table-wrapper">
              <table className="coupon-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Coupon Code</th>
                    <th>Discount</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCoupons.map(
                    (coupon, index) => (
                      <tr key={coupon._id}>
                        <td>
                          <span className="serial-number">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>
                        </td>

                        <td>
                          <div className="coupon-code-wrapper">
                            <div className="coupon-code-icon">
                              <FaTicketAlt />
                            </div>

                            <span className="coupon-code">
                              {coupon.code}
                            </span>

                            <button
                              className="copy-button"
                              title="Copy Coupon Code"
                              onClick={() =>
                                copyCode(
                                  coupon.code
                                )
                              }
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </td>

                        <td>
                          <div className="discount-value">
                            <strong>
                              {coupon.discount}%
                            </strong>

                            <span>
                              OFF
                            </span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`badge badge-${coupon.status.toLowerCase()}`}
                          >
                            <span className="badge-dot" />

                            {coupon.status}
                          </span>
                        </td>

                        <td>
                          <div className="action-col">
                            <button
                              className="table-action edit"
                              title="Edit Coupon"
                              onClick={() =>
                                handleEdit(
                                  coupon
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                            <button
                              className="table-action delete"
                              title="Delete Coupon"
                              onClick={() =>
                                handleDelete(
                                  coupon._id
                                )
                              }
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisountCouponGeneratingPage;