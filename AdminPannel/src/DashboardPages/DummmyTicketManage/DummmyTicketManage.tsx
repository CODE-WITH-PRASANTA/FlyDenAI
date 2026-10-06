import React, {
  useState,
  useEffect,
  FormEvent,
} from "react";
import "./DummmyTicketManage.css";
import axios from "axios";
import {
  Plane,
  MapPin,
  Globe2,
  IndianRupee,
  Search,
  Pencil,
  Trash2,
  Save,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Building2,
  Ticket,
  X,
} from "lucide-react";
import BASE_URL from "../../Api";

interface AirportItem {
  _id: string;
  airportName: string;
  countryName: string;
}

const DummyTicketManage: React.FC = () => {
  const [ticketPrice, setTicketPrice] = useState<string>("");
  const [isPriceSaved, setIsPriceSaved] =
    useState<boolean>(false);

  const [airportName, setAirportName] =
    useState<string>("");
  const [countryName, setCountryName] =
    useState<string>("");
  const [airportList, setAirportList] =
    useState<AirportItem[]>([]);

  const [editId, setEditId] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState<string>("");

  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const [loadingPrice, setLoadingPrice] =
    useState<boolean>(false);

  const [loadingAirport, setLoadingAirport] =
    useState<boolean>(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const itemsPerPage = 7;

  // =========================================
  // LOAD TICKET PRICE
  // =========================================

  const loadTicketPrice = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/price`
      );

      if (
        res.data?.data?.ticketPrice !== null &&
        res.data?.data?.ticketPrice !== undefined
      ) {
        setTicketPrice(
          String(res.data.data.ticketPrice)
        );
        setIsPriceSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // LOAD AIRPORT LIST
  // =========================================

  const loadAirports = async () => {
    try {
      setLoadingAirport(true);

      const res = await axios.get(
        `${BASE_URL}/airports`,
        {
          params: {
            search,
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      );

      setAirportList(
        Array.isArray(res.data?.data)
          ? res.data.data
          : []
      );
    } catch (err) {
      console.error(err);
      setAirportList([]);
    } finally {
      setLoadingAirport(false);
    }
  };

  useEffect(() => {
    loadTicketPrice();
  }, []);

  useEffect(() => {
    loadAirports();
  }, [search, currentPage]);

  // =========================================
  // SAVE / UPDATE PRICE
  // =========================================

  const handleSavePrice = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !ticketPrice ||
      Number(ticketPrice) <= 0
    ) {
      return;
    }

    try {
      setLoadingPrice(true);

      await axios.post(
        `${BASE_URL}/price`,
        {
          ticketPrice: ticketPrice,
        }
      );

      setIsPriceSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleUpdatePrice = () => {
    setIsPriceSaved(false);
  };

  // =========================================
  // ADD / UPDATE AIRPORT
  // =========================================

  const handleAddAirport = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !airportName.trim() ||
      !countryName.trim()
    ) {
      return;
    }

    try {
      setLoadingAirport(true);

      if (editId) {
        await axios.put(
          `${BASE_URL}/airports/${editId}`,
          {
            airportName:
              airportName.trim(),
            countryName:
              countryName.trim(),
          }
        );
      } else {
        await axios.post(
          `${BASE_URL}/airports`,
          {
            airportName:
              airportName.trim(),
            countryName:
              countryName.trim(),
          }
        );
      }

      setAirportName("");
      setCountryName("");
      setEditId(null);

      await loadAirports();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAirport(false);
    }
  };

  // =========================================
  // DELETE AIRPORT
  // =========================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this airport?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await axios.delete(
        `${BASE_URL}/airports/${id}`
      );

      await loadAirports();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================
  // EDIT AIRPORT
  // =========================================

  const handleEdit = (
    item: AirportItem
  ) => {
    setEditId(item._id);
    setAirportName(item.airportName);
    setCountryName(item.countryName);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // CANCEL EDIT
  // =========================================

  const handleCancelEdit = () => {
    setEditId(null);
    setAirportName("");
    setCountryName("");
  };

  // =========================================
  // SEARCH
  // =========================================

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // =========================================
  // REFRESH
  // =========================================

  const handleRefresh = () => {
    loadTicketPrice();
    loadAirports();
  };

  return (
    <main className="ticketManage-container">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="ticketManage-pageHeader">

        <div className="ticketManage-headingGroup">

          <div className="ticketManage-headingIcon">
            <Ticket size={24} />
          </div>

          <div>
            <p className="ticketManage-eyebrow">
              TICKET MANAGEMENT
            </p>

            <h1 className="ticketManage-pageTitle">
              Dummy Ticket Management
            </h1>

            <p className="ticketManage-pageSubtitle">
              Manage dummy ticket pricing and
              airport mappings from one place.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="ticketManage-refreshBtn"
          onClick={handleRefresh}
        >
          <RefreshCw size={17} />
          <span>Refresh</span>
        </button>

      </header>

      {/* =====================================================
          QUICK STATS
      ===================================================== */}

      <section className="ticketManage-stats">

        <div className="ticketManage-statCard">

          <div className="ticketManage-statIcon price">
            <IndianRupee size={19} />
          </div>

          <div className="ticketManage-statContent">
            <span>Ticket Price</span>
            <strong>
              {isPriceSaved
                ? `₹${Number(
                    ticketPrice
                  ).toLocaleString("en-IN")}`
                : "Not Set"}
            </strong>
          </div>

        </div>

        <div className="ticketManage-statCard">

          <div className="ticketManage-statIcon airport">
            <Building2 size={19} />
          </div>

          <div className="ticketManage-statContent">
            <span>Airport Records</span>
            <strong>
              {airportList.length}
            </strong>
          </div>

        </div>

        <div className="ticketManage-statCard">

          <div className="ticketManage-statIcon country">
            <Globe2 size={19} />
          </div>

          <div className="ticketManage-statContent">
            <span>Current Page</span>
            <strong>
              {currentPage}
            </strong>
          </div>

        </div>

      </section>

      {/* =====================================================
          PRICE MANAGEMENT
      ===================================================== */}

      <section className="ticketManage-priceCard">

        <div className="ticketManage-priceInfo">

          <div className="ticketManage-sectionIcon">
            <IndianRupee size={21} />
          </div>

          <div>
            <span className="ticketManage-sectionLabel">
              PRICING CONFIGURATION
            </span>

            <h2>
              Dummy Ticket Pricing
            </h2>

            <p>
              Set the default dummy ticket
              price charged per traveller.
            </p>
          </div>

        </div>

        {!isPriceSaved ? (

          <form
            className="ticketManage-priceForm"
            onSubmit={handleSavePrice}
          >

            <div className="ticketManage-priceInput">

              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter ticket price"
                value={ticketPrice}
                onChange={(e) =>
                  setTicketPrice(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              type="submit"
              className="ticketManage-primaryBtn"
              disabled={loadingPrice}
            >
              <Save size={17} />

              {loadingPrice
                ? "Saving..."
                : "Save Pricing"}
            </button>

          </form>

        ) : (

          <div className="ticketManage-savedPrice">

            <div className="ticketManage-priceAmount">

              <span>
                Current Price
              </span>

              <strong>
                ₹
                {Number(
                  ticketPrice
                ).toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

              <small>
                Per person
              </small>

            </div>

            <button
              type="button"
              onClick={
                handleUpdatePrice
              }
              className="ticketManage-outlineBtn"
            >
              <Pencil size={16} />
              Edit Price
            </button>

          </div>

        )}

      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="ticketManage-grid">

        {/* =================================================
            AIRPORT FORM
        ================================================= */}

        <div className="ticketManage-formCard">

          <div className="ticketManage-cardHeader">

            <div className="ticketManage-cardHeaderIcon">
              {editId ? (
                <Pencil size={19} />
              ) : (
                <Plus size={20} />
              )}
            </div>

            <div>

              <span className="ticketManage-cardKicker">
                AIRPORT MAPPING
              </span>

              <h2>
                {editId
                  ? "Edit Airport"
                  : "Add Airport"}
              </h2>

            </div>

          </div>

          <p className="ticketManage-formDescription">
            {editId
              ? "Update the airport and country information below."
              : "Create a new airport and connect it with a country."}
          </p>

          <form
            className="ticketManage-form"
            onSubmit={
              handleAddAirport
            }
          >

            <div className="ticketManage-field">

              <label>
                Airport Name
              </label>

              <div className="ticketManage-inputWrapper">

                <Building2 size={17} />

                <input
                  type="text"
                  value={
                    airportName
                  }
                  placeholder="e.g. Indira Gandhi International"
                  onChange={(e) =>
                    setAirportName(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="ticketManage-field">

              <label>
                Country Name
              </label>

              <div className="ticketManage-inputWrapper">

                <Globe2 size={17} />

                <input
                  type="text"
                  value={
                    countryName
                  }
                  placeholder="e.g. India"
                  onChange={(e) =>
                    setCountryName(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="ticketManage-formActions">

              <button
                type="submit"
                className="ticketManage-primaryBtn ticketManage-submitBtn"
                disabled={
                  loadingAirport
                }
              >

                {editId ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={18} />
                )}

                {loadingAirport
                  ? "Processing..."
                  : editId
                  ? "Update Airport"
                  : "Add Airport"}

              </button>

              {editId && (

                <button
                  type="button"
                  className="ticketManage-cancelBtn"
                  onClick={
                    handleCancelEdit
                  }
                >
                  <X size={17} />
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>

        {/* =================================================
            AIRPORT TABLE
        ================================================= */}

        <div className="ticketManage-listCard">

          <div className="ticketManage-listHeader">

            <div>

              <span className="ticketManage-cardKicker">
                DIRECTORY
              </span>

              <h2>
                Airport List
              </h2>

              <p>
                Manage all available
                airport mappings.
              </p>

            </div>

            <div className="ticketManage-recordBadge">
              {airportList.length} Records
            </div>

          </div>

          <div className="ticketManage-searchRow">

            <div className="ticketManage-searchBox">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search airport or country..."
                value={search}
                onChange={(e) =>
                  handleSearchChange(
                    e.target.value
                  )
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    handleSearchChange("")
                  }
                  className="ticketManage-clearSearch"
                >
                  <X size={15} />
                </button>
              )}

            </div>

          </div>

          {airportList.length === 0 &&
          !loadingAirport ? (

            <div className="ticketManage-empty">

              <div className="ticketManage-emptyIcon">
                <Plane size={25} />
              </div>

              <h3>
                No airports found
              </h3>

              <p>
                Try another search or
                add a new airport mapping.
              </p>

            </div>

          ) : (

            <div className="ticketManage-tableWrapper">

              <table className="ticketManage-table">

                <thead>

                  <tr>
                    <th>SL</th>
                    <th>Airport</th>
                    <th>Country</th>
                    <th className="ticketManage-center">
                      ACTION
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {loadingAirport ? (

                    Array.from({
                      length: 5,
                    }).map((_, index) => (

                      <tr
                        key={index}
                        className="ticketManage-skeletonRow"
                      >

                        <td>
                          <span />
                        </td>

                        <td>
                          <span />
                        </td>

                        <td>
                          <span />
                        </td>

                        <td>
                          <span />
                        </td>

                      </tr>

                    ))

                  ) : (

                    airportList.map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={
                            item._id
                          }
                        >

                          <td>
                            <span className="ticketManage-sl">
                              {(
                                currentPage -
                                1
                              ) *
                                itemsPerPage +
                                index +
                                1}
                            </span>
                          </td>

                          <td>

                            <div className="ticketManage-airportCell">

                              <div className="ticketManage-airportIcon">
                                <Plane
                                  size={
                                    16
                                  }
                                />
                              </div>

                              <div>
                                <strong>
                                  {
                                    item.airportName
                                  }
                                </strong>

                                <small>
                                  Airport
                                </small>
                              </div>

                            </div>

                          </td>

                          <td>

                            <div className="ticketManage-countryCell">

                              <Globe2
                                size={
                                  16
                                }
                              />

                              <span>
                                {
                                  item.countryName
                                }
                              </span>

                            </div>

                          </td>

                          <td className="ticketManage-center">

                            <div className="ticketManage-actions">

                              <button
                                type="button"
                                title="Edit"
                                className="ticketManage-iconBtn edit"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                              >
                                <Pencil
                                  size={
                                    16
                                  }
                                />
                              </button>

                              <button
                                type="button"
                                title="Delete"
                                className="ticketManage-iconBtn delete"
                                disabled={
                                  deletingId ===
                                  item._id
                                }
                                onClick={() =>
                                  handleDelete(
                                    item._id
                                  )
                                }
                              >
                                <Trash2
                                  size={
                                    16
                                  }
                                />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* PAGINATION */}

          <div className="ticketManage-pagination">

            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    page - 1
                )
              }
              className="ticketManage-paginationBtn"
            >
              <ChevronLeft size={17} />
              Previous
            </button>

            <div className="ticketManage-pageNumber">
              <span>
                Page
              </span>

              <strong>
                {currentPage}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    page + 1
                )
              }
              className="ticketManage-paginationBtn"
            >
              Next
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default DummyTicketManage;