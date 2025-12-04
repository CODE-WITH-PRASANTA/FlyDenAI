import React, { useState, useEffect, useMemo, FormEvent } from "react";
import "./DummmyTicketManage.css";
import axios from "axios";
import BASE_URL from "../../Api";

interface AirportItem {
  _id: string;
  airportName: string;
  countryName: string;
}

const DummyTicketManage: React.FC = () => {
  const [ticketPrice, setTicketPrice] = useState<string>("");
  const [isPriceSaved, setIsPriceSaved] = useState<boolean>(false);

  const [airportName, setAirportName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [airportList, setAirportList] = useState<AirportItem[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  // =========================================
  // LOAD TICKET PRICE (GET)
  // =========================================
  const loadTicketPrice = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/price`);
      if (res.data?.data?.ticketPrice !== null) {
        setTicketPrice(res.data.data.ticketPrice);
        setIsPriceSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // LOAD AIRPORT LIST (GET)
  // =========================================
  const loadAirports = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/airports`, {
        params: {
          search,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      setAirportList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTicketPrice();
  }, []);

  useEffect(() => {
    loadAirports();
  }, [search, currentPage]);

  // =========================================
  // SAVE OR UPDATE PRICE
  // =========================================
  const handleSavePrice = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/price`, {
        ticketPrice: ticketPrice,
      });

      setIsPriceSaved(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePrice = () => {
    setIsPriceSaved(false);
  };

  // =========================================
  // ADD / UPDATE AIRPORT
  // =========================================
  const handleAddAirport = async (e: FormEvent) => {
    e.preventDefault();
    if (!airportName || !countryName) return;

    try {
      if (editId) {
        // Update
        await axios.put(`${BASE_URL}/airports/${editId}`, {
          airportName,
          countryName,
        });
      } else {
        // Create
        await axios.post(`${BASE_URL}/airports`, {
          airportName,
          countryName,
        });
      }

      setAirportName("");
      setCountryName("");
      setEditId(null);

      loadAirports();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // DELETE AIRPORT (API DELETE)
  // =========================================
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/airports/${id}`);
      loadAirports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: AirportItem) => {
    setEditId(item._id);
    setAirportName(item.airportName);
    setCountryName(item.countryName);
  };

  return (
    <div className="ticketManage-container">

      {/* PRICE SECTION */}
      <div className="ticketManage-card">
        <h2 className="ticketManage-title">Dummy Ticket Pricing</h2>

        {!isPriceSaved ? (
          <form className="ticketManage-priceForm" onSubmit={handleSavePrice}>
            <label className="ticketManage-label">Ticket Price Per Person</label>

            <input
              type="number"
              className="ticketManage-input"
              placeholder="Enter ticket price"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />

            <button className="ticketManage-btn">Save Pricing</button>
          </form>
        ) : (
          <div className="ticketManage-priceBox">
            <h3 className="ticketManage-priceText">₹ {ticketPrice}</h3>
            <button onClick={handleUpdatePrice} className="ticketManage-editBtn">
              Edit Price
            </button>
          </div>
        )}
      </div>

      {/* MAIN GRID */}
      <div className="ticketManage-grid">

        {/* LEFT FORM */}
        <div className="ticketManage-card">
          <h2 className="ticketManage-title">
            {editId ? "Edit Airport Mapping" : "Add Airport Mapping"}
          </h2>

          <form className="ticketManage-form" onSubmit={handleAddAirport}>
            <label className="ticketManage-label">Airport Name</label>
            <input
              type="text"
              className="ticketManage-input"
              value={airportName}
              placeholder="Enter airport name"
              onChange={(e) => setAirportName(e.target.value)}
            />

            <label className="ticketManage-label">Country Name</label>
            <input
              type="text"
              className="ticketManage-input"
              value={countryName}
              placeholder="Enter country name"
              onChange={(e) => setCountryName(e.target.value)}
            />

            <button className="ticketManage-btn">
              {editId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT TABLE */}
        <div className="ticketManage-card">
          <div className="ticketManage-tableHeader">
            <h2 className="ticketManage-title">Airport List</h2>

            <input
              type="text"
              className="ticketManage-search"
              placeholder="Search airport or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {airportList.length === 0 ? (
            <p className="ticketManage-empty">No records found.</p>
          ) : (
            <div className="ticketManage-tableWrapper">
              <table className="ticketManage-table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Airport Name</th>
                    <th>Country</th>
                    <th className="ticketManage-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {airportList.map((item, index) => (
                    <tr key={item._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.airportName}</td>
                      <td>{item.countryName}</td>
                      <td className="ticketManage-center">
                        <button
                          className="ticketManage-tableEdit"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="ticketManage-tableDelete"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="ticketManage-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="ticketManage-pageBtn"
            >
              Prev
            </button>

            <span className="ticketManage-pageInfo">Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="ticketManage-pageBtn"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DummyTicketManage;
