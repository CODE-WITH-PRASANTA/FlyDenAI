import React, { useState } from "react";
import {
  FaEllipsisV,
  FaTrash,
  FaUserTie,
  FaUsers,
  FaUserCircle,
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
    { id: 1, name: "Amit Sharma", designation: "Project Manager", team: "Design Team" },
    { id: 2, name: "Priya Singh", designation: "Frontend Developer", team: "Development Team" },
    { id: 3, name: "Ravi Mehta", designation: "Backend Engineer", team: "Development Team" },
    { id: 4, name: "Sneha Patel", designation: "UI/UX Designer", team: "Design Team" },
  ]);

  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleRemove = (id: number) => {
    if (window.confirm("Remove this team member?")) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
      setMenuOpen(null);
    }
  };

  return (
    <div className="team-preview-container">
      <h2>Team Preview Section</h2>
      <div className="team-cards">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="card-header">
              <div className="profile-info">
                <FaUserCircle className="profile-icon" />
                <h3>{member.name}</h3>
              </div>
              <div className="menu-container">
                <FaEllipsisV className="menu-icon" onClick={() => toggleMenu(member.id)} />
                {menuOpen === member.id && (
                  <div className="menu-dropdown">
                    <button onClick={() => handleRemove(member.id)}>
                      <FaTrash /> Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card-details">
              <p>
                <FaUserTie className="detail-icon" /> 
                <strong>Designation:</strong> {member.designation}
              </p>
              <p>
                <FaUsers className="detail-icon" /> 
                <strong>Team:</strong> 
                <span className={`team-tag ${member.team.includes("Design") ? "design" : "dev"}`}>
                  {member.team}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPreview;
