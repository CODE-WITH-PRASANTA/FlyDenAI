import React, { useState } from "react";
import "./ClientAction.css";
import { useTheme } from "../../context/ThemeContext";
import {
  FaStar,
  FaRegStar,
  FaTrashAlt,
  FaCheckCircle,
  FaClock,
  FaComments,
  FaUsers,
  FaQuoteLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface Client {
  id: number;
  name: string;
  rating: number;
  message: string;
  published: boolean;
  expanded?: boolean;
}

const ClientAction: React.FC = () => {
  const { theme } = useTheme();

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      message:
        "Excellent service! The team was very professional and responsive. They completed the project before the deadline with great quality. Highly recommended for anyone looking for reliable developers.",
      published: true,
      expanded: false,
    },
    {
      id: 2,
      name: "Riya Patel",
      rating: 4,
      message:
        "Very satisfied with the work! Communication was smooth, and the design exceeded my expectations. Will definitely work with them again for future projects.",
      published: false,
      expanded: false,
    },
  ]);

  const togglePublish = (id: number) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? {
              ...client,
              published: !client.published,
            }
          : client
      )
    );
  };

  const deleteClient = (id: number) => {
    const client = clients.find((item) => item.id === id);

    if (
      window.confirm(
        `Are you sure you want to delete ${client?.name || "this testimonial"}?`
      )
    ) {
      setClients((prev) =>
        prev.filter((client) => client.id !== id)
      );
    }
  };

  const toggleReadMore = (id: number) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? {
              ...client,
              expanded: !client.expanded,
            }
          : client
      )
    );
  };

  const publishedCount = clients.filter(
    (client) => client.published
  ).length;

  const draftCount = clients.filter(
    (client) => !client.published
  ).length;

  const averageRating =
    clients.length > 0
      ? (
          clients.reduce(
            (total, client) => total + client.rating,
            0
          ) / clients.length
        ).toFixed(1)
      : "0.0";

  return (
    <div
      className={`clientAction-container ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="clientAction-header">
        <div className="clientAction-header-left">
          <div className="clientAction-header-icon">
            <FaComments />
          </div>

          <div>
            <span className="clientAction-eyebrow">
              TESTIMONIAL MANAGEMENT
            </span>

            <h2 className="clientAction-title">
              Client Testimonials
            </h2>

            <p className="clientAction-subtitle">
              Review, publish and manage client feedback from one place.
            </p>
          </div>
        </div>

        <div className="clientAction-header-count">
          <span>Total Reviews</span>
          <strong>{clients.length}</strong>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <div className="clientAction-stats">
        <div className="clientAction-stat-card">
          <div className="clientAction-stat-icon purple">
            <FaComments />
          </div>

          <div className="clientAction-stat-content">
            <span>Total Testimonials</span>
            <strong>{clients.length}</strong>
            <small>Customer feedback</small>
          </div>
        </div>

        <div className="clientAction-stat-card">
          <div className="clientAction-stat-icon green">
            <FaCheckCircle />
          </div>

          <div className="clientAction-stat-content">
            <span>Published</span>
            <strong>{publishedCount}</strong>
            <small>Visible testimonials</small>
          </div>
        </div>

        <div className="clientAction-stat-card">
          <div className="clientAction-stat-icon orange">
            <FaClock />
          </div>

          <div className="clientAction-stat-content">
            <span>Drafts</span>
            <strong>{draftCount}</strong>
            <small>Waiting for publishing</small>
          </div>
        </div>

        <div className="clientAction-stat-card">
          <div className="clientAction-stat-icon yellow">
            <FaStar />
          </div>

          <div className="clientAction-stat-content">
            <span>Average Rating</span>
            <strong>{averageRating}</strong>
            <small>Customer satisfaction</small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SECTION HEADER
      ====================================================== */}
      <div className="clientAction-sectionHeader">
        <div>
          <h3>Customer Reviews</h3>

          <p>
            Manage published and unpublished testimonials.
          </p>
        </div>

        <div className="clientAction-reviewCount">
          <FaUsers />
          <span>{clients.length} Reviews</span>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="clientAction-tableWrapper">
        {clients.length === 0 ? (
          <div className="clientAction-noData">
            <div className="clientAction-emptyIcon">
              <FaComments />
            </div>

            <h3>No testimonials available</h3>

            <p>
              Client testimonials will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="clientAction-tableCard">
            <div className="clientAction-tableScroll">
              <table className="clientAction-table">
                <thead>
                  <tr>
                    <th className="serial-column">#</th>
                    <th className="client-column">
                      Client
                    </th>
                    <th className="rating-column">
                      Rating
                    </th>
                    <th className="message-column">
                      Testimonial
                    </th>
                    <th className="status-column">
                      Status
                    </th>
                    <th className="action-column">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {clients.map((client, index) => (
                    <tr key={client.id}>
                      {/* Serial */}
                      <td className="serial-column">
                        <span className="clientAction-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="client-column">
                        <div className="clientAction-client">
                          <div className="clientAction-avatar">
                            {client.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="clientAction-clientInfo">
                            <strong>{client.name}</strong>

                            <span>
                              Client testimonial
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="rating-column">
                        <div className="clientAction-rating">
                          <div className="clientAction-stars">
                            {Array.from(
                              { length: 5 },
                              (_, starIndex) =>
                                starIndex < client.rating ? (
                                  <FaStar
                                    key={starIndex}
                                  />
                                ) : (
                                  <FaRegStar
                                    key={starIndex}
                                  />
                                )
                            )}
                          </div>

                          <span>
                            {client.rating}.0
                          </span>
                        </div>
                      </td>

                      {/* Message */}
                      <td className="message-column">
                        <div className="clientAction-messageBox">
                          <FaQuoteLeft className="quote-icon" />

                          <div className="clientAction-message">
                            {client.expanded
                              ? client.message
                              : client.message.slice(
                                  0,
                                  90
                                ) +
                                (client.message.length >
                                90
                                  ? "..."
                                  : "")}

                            {client.message.length > 90 && (
                              <button
                                className="clientAction-readMoreBtn"
                                onClick={() =>
                                  toggleReadMore(
                                    client.id
                                  )
                                }
                              >
                                {client.expanded ? (
                                  <>
                                    Read Less
                                    <FaChevronUp />
                                  </>
                                ) : (
                                  <>
                                    Read More
                                    <FaChevronDown />
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="status-column">
                        <span
                          className={`clientAction-status ${
                            client.published
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot"></span>

                          {client.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="action-column">
                        <div className="clientAction-actions">
                          <button
                            type="button"
                            className={`clientAction-publishBtn ${
                              client.published
                                ? "unpublish"
                                : "publish"
                            }`}
                            onClick={() =>
                              togglePublish(
                                client.id
                              )
                            }
                          >
                            {client.published
                              ? "Unpublish"
                              : "Publish"}
                          </button>

                          <button
                            type="button"
                            className="clientAction-deleteBtn"
                            onClick={() =>
                              deleteClient(
                                client.id
                              )
                            }
                            aria-label={`Delete ${client.name}`}
                            title="Delete testimonial"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="clientAction-tableFooter">
              <span>
                Showing{" "}
                <strong>{clients.length}</strong>{" "}
                testimonial
                {clients.length !== 1 ? "s" : ""}
              </span>

              <span className="clientAction-footerStatus">
                <span className="status-dot"></span>
                Management panel
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientAction;