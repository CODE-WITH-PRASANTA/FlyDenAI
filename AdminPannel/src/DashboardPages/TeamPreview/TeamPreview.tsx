import React, { useState } from "react";
import {
  FaEllipsisV,
  FaTrash,
  FaUserTie,
  FaUsers,
  FaUserCircle,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";
import "./TeamPreview.css";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  team: string;
}

const TeamPreview: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Amit Sharma",
      designation: "Project Manager",
      team: "Design Team",
    },
    {
      id: 2,
      name: "Priya Singh",
      designation: "Frontend Developer",
      team: "Development Team",
    },
    {
      id: 3,
      name: "Ravi Mehta",
      designation: "Backend Engineer",
      team: "Development Team",
    },
    {
      id: 4,
      name: "Sneha Patel",
      designation: "UI/UX Designer",
      team: "Design Team",
    },
  ]);

  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleRemove = (id: number) => {
    if (window.confirm("Remove this team member?")) {
      setTeamMembers((prev) =>
        prev.filter((member) => member.id !== id)
      );

      setMenuOpen(null);
    }
  };

  const designCount = teamMembers.filter((member) =>
    member.team.includes("Design")
  ).length;

  const developmentCount = teamMembers.filter((member) =>
    member.team.includes("Development")
  ).length;

  return (
    <div className="team-preview-container">
      {/* ================= PAGE HEADER ================= */}
      <div className="team-preview-header">
        <div className="team-preview-heading">
          <div className="team-preview-title-icon">
            <FaUsers />
          </div>

          <div>
            <span className="team-preview-eyebrow">
              TEAM MANAGEMENT
            </span>

            <h2>Team Members</h2>

            <p>
              Manage your team members, roles and department assignments.
            </p>
          </div>
        </div>

        <div className="team-preview-total">
          <span>Total Members</span>
          <strong>{teamMembers.length}</strong>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="team-preview-summary">
        <div className="team-summary-card">
          <div className="team-summary-icon purple">
            <FaUsers />
          </div>

          <div className="team-summary-content">
            <span>Total Team</span>
            <strong>{teamMembers.length}</strong>
            <small>Active members</small>
          </div>
        </div>

        <div className="team-summary-card">
          <div className="team-summary-icon green">
            <FaLayerGroup />
          </div>

          <div className="team-summary-content">
            <span>Design Team</span>
            <strong>{designCount}</strong>
            <small>Creative members</small>
          </div>
        </div>

        <div className="team-summary-card">
          <div className="team-summary-icon blue">
            <FaUserTie />
          </div>

          <div className="team-summary-content">
            <span>Development</span>
            <strong>{developmentCount}</strong>
            <small>Development members</small>
          </div>
        </div>
      </div>

      {/* ================= SECTION HEADER ================= */}
      <div className="team-section-header">
        <div>
          <h3>Our Team</h3>
          <p>
            View and manage all currently available team members.
          </p>
        </div>

        <div className="team-member-count">
          {teamMembers.length} Members
        </div>
      </div>

      {/* ================= TEAM CARDS ================= */}
      {teamMembers.length > 0 ? (
        <div className="team-cards">
          {teamMembers.map((member) => {
            const isDesignTeam = member.team.includes("Design");

            return (
              <div
                key={member.id}
                className={`team-card ${
                  isDesignTeam ? "design-card" : "development-card"
                }`}
              >
                {/* Accent */}
                <div className="team-card-accent"></div>

                {/* Card Header */}
                <div className="card-header">
                  <div className="profile-info">
                    <div
                      className={`profile-avatar ${
                        isDesignTeam ? "design-avatar" : "development-avatar"
                      }`}
                    >
                      <FaUserCircle />
                    </div>

                    <div className="profile-text">
                      <h3>{member.name}</h3>

                      <span className="profile-role">
                        {member.designation}
                      </span>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="menu-container">
                    <button
                      type="button"
                      className="menu-button"
                      onClick={() => toggleMenu(member.id)}
                      aria-label={`Actions for ${member.name}`}
                    >
                      <FaEllipsisV />
                    </button>

                    {menuOpen === member.id && (
                      <div className="menu-dropdown">
                        <div className="menu-dropdown-title">
                          Actions
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(member.id)}
                        >
                          <FaTrash />
                          <span>Remove Member</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="team-card-divider"></div>

                {/* Details */}
                <div className="card-details">
                  <div className="detail-item">
                    <div className="detail-icon-box designation-icon">
                      <FaUserTie />
                    </div>

                    <div className="detail-content">
                      <span>Designation</span>
                      <strong>{member.designation}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon-box team-icon">
                      <FaUsers />
                    </div>

                    <div className="detail-content">
                      <span>Department</span>

                      <span
                        className={`team-tag ${
                          isDesignTeam ? "design" : "dev"
                        }`}
                      >
                        <span className="team-tag-dot"></span>
                        {member.team}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="team-card-footer">
                  <span className="member-status">
                    <span className="status-dot"></span>
                    Active Member
                  </span>

                  <span className="member-arrow">
                    <FaArrowRight />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="team-empty-state">
          <div className="empty-icon">
            <FaUsers />
          </div>

          <h3>No Team Members</h3>

          <p>
            There are currently no team members available.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamPreview;