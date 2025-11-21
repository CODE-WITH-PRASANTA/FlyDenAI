import React, { useState, useEffect } from "react";
import "./DisountCouponGeneratingPage.css";
import {
  FaEdit,
  FaTrashAlt,
  FaCopy,
  FaSearch,
  FaPlusCircle,
} from "react-icons/fa";
import BASE_URL from "../../Api"; // ✅ e.g. "http://localhost:5000/api"

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  status: "Pending" | "Active" | "Expired" | "Used";
}

const DisountCouponGeneratingPage: React.FC = () => {
  const [percent, setPercent] = useState<number | "">("");
  const [status, setStatus] = useState<Coupon["status"]>("Pending");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ⭐ Updated Token Generator (Professional Style)
  const generateCouponCode = (): string => {
    const prefixWords = ["Fly", "Visa", "Sky", "Trip", "Den", "Go", "Air"];
    const suffixWords = ["Den", "Jet", "Pass", "Way", "Now", "Up", "Card"];

    const prefix = prefixWords[Math.floor(Math.random() * prefixWords.length)];
    const suffix = suffixWords[Math.floor(Math.random() * suffixWords.length)];

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}${suffix}-${randomNumber}`;
  };

  // ✅ Fetch all coupons from backend
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/coupons`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch coupons");
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

  // ✅ Create or Update coupon (backend integration)
  const handleGenerate = async () => {
    if (!percent || percent <= 0) {
      return alert("Enter valid percentage!");
    }

    try {
      setLoading(true);

      if (editId) {
        // 🔁 UPDATE existing coupon
        const res = await fetch(`${BASE_URL}/coupons/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            discount: percent,
            status,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to update coupon");
        }

        // Update in state
        setCoupons((prev) =>
          prev.map((c) => (c._id === editId ? data : c))
        );
        setEditId(null);
        alert("Coupon updated successfully");
      } else {
        // ✨ CREATE new coupon
        const code = generateCouponCode();

        const res = await fetch(`${BASE_URL}/coupons`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            discount: percent,
            status,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to create coupon");
        }

        // Add to top of list
        setCoupons((prev) => [data, ...prev]);
        alert("Coupon generated & saved successfully");
      }

      resetForm();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPercent("");
    setStatus("Pending");
    setEditId(null);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Coupon Copied!");
  };

  // ✅ Delete coupon (backend + frontend)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/coupons/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete coupon");
      }

      setCoupons((prev) => prev.filter((c) => c._id !== id));
      alert("Coupon deleted successfully");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error deleting coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coupon-page">
      {/* Page Header */}
      <div className="coupon-header">
        <h1 className="coupon-title">Discount Coupon Manager</h1>

        <div className="coupon-header-controls">
          <input
            className="coupon-search"
            type="text"
            placeholder="Search coupon..."
          />
          <FaSearch className="icon search-icon" />
        </div>
      </div>

      <div className="coupon-grid">
        {/* LEFT - Form */}
        <div className="coupon-form-card">
          <h2 className="section-title">
            {editId ? "Edit Coupon" : "Create New Coupon"}
          </h2>

          <div className="coupon-form-group">
            <label>Discount Percentage (%)</label>
            <input
              type="number"
              className="coupon-input"
              placeholder="e.g. 20"
              value={percent}
              onChange={(e) =>
                setPercent(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <div className="coupon-form-group">
            <label>Status</label>
            <select
              className="coupon-input"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Coupon["status"])
              }
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <button
            className="btn-primary"
            onClick={handleGenerate}
            disabled={loading}
          >
            <FaPlusCircle />{" "}
            {editId ? (loading ? "Updating..." : "Update Coupon") : loading ? "Generating..." : "Generate Coupon"}
          </button>
        </div>

        {/* RIGHT - Table */}
        <div className="coupon-table-card">
          <h2 className="section-title">Generated Coupons</h2>

          {loading && coupons.length === 0 && (
            <p className="no-data">Loading coupons...</p>
          )}

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table className="coupon-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {coupons.map((c, index) => (
                  <tr key={c._id}>
                    <td>{index + 1}</td>
                    <td className="code-box">
                      {c.code}
                      <FaCopy
                        className="icon copy-icon"
                        title="Copy Code"
                        onClick={() => copyCode(c.code)}
                      />
                    </td>
                    <td>{c.discount}%</td>
                    <td>
                      <span
                        className={`badge badge-${c.status.toLowerCase()}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="action-col">
                      <FaEdit
                        className="icon edit-icon"
                        title="Edit"
                        onClick={() => {
                          setEditId(c._id);
                          setPercent(c.discount);
                          setStatus(c.status);
                        }}
                      />

                      <FaTrashAlt
                        className="icon delete-icon"
                        title="Delete"
                        onClick={() => handleDelete(c._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!loading && coupons.length === 0 && (
            <p className="no-data">No Coupons Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisountCouponGeneratingPage;
