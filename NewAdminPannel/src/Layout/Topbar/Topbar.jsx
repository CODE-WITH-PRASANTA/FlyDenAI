import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  X,
} from 'lucide-react'
import './Topbar.css'

const Topbar = ({
  toggleSidebar,
  toggleMobileSidebar,
}) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleMenuClick = () => {
    if (window.innerWidth <= 991) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  return (
    <header className="topbar">

      <div className="topbar__left">

        <button
          type="button"
          className="topbar__menu-button"
          onClick={handleMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={21} />
        </button>

        <div className="topbar__page-info">
          <span className="topbar__page-label">
            Admin Panel
          </span>

          <span className="topbar__page-title">
            Global Opportunities
          </span>
        </div>

      </div>

      <div className="topbar__right">

        {/* SEARCH */}

        <div
          className={`topbar__search ${
            searchOpen ? 'topbar__search--open' : ''
          }`}
        >
          <button
            type="button"
            className="topbar__icon-button topbar__search-button"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            {searchOpen ? (
              <X size={19} />
            ) : (
              <Search size={19} />
            )}
          </button>

          {searchOpen && (
            <div className="topbar__search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search here..."
                autoFocus
              />
            </div>
          )}
        </div>

        {/* NOTIFICATION */}

        <div className="topbar__dropdown-wrapper">

          <button
            type="button"
            className="topbar__icon-button"
            onClick={() =>
              setNotificationOpen((prev) => !prev)
            }
          >
            <Bell size={19} />

            <span className="topbar__notification-dot" />
          </button>

          {notificationOpen && (
            <div className="topbar__dropdown topbar__notification-dropdown">

              <div className="topbar__dropdown-header">
                <div>
                  <h4>Notifications</h4>
                  <span>Recent updates</span>
                </div>

                <span className="topbar__notification-count">
                  3
                </span>
              </div>

              <div className="topbar__notification-item">
                <div className="topbar__notification-icon">
                  <Bell size={15} />
                </div>

                <div>
                  <strong>
                    New client enquiry
                  </strong>

                  <p>
                    A new visa enquiry has been received.
                  </p>

                  <small>
                    Just now
                  </small>
                </div>
              </div>

              <div className="topbar__notification-item">
                <div className="topbar__notification-icon">
                  <UserCircle size={15} />
                </div>

                <div>
                  <strong>
                    Team update
                  </strong>

                  <p>
                    Team information has been updated.
                  </p>

                  <small>
                    15 min ago
                  </small>
                </div>
              </div>

              <div className="topbar__notification-item">
                <div className="topbar__notification-icon">
                  <Settings size={15} />
                </div>

                <div>
                  <strong>
                    System update
                  </strong>

                  <p>
                    Admin panel settings were updated.
                  </p>

                  <small>
                    1 hour ago
                  </small>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* PROFILE */}

        <div className="topbar__dropdown-wrapper">

          <button
            type="button"
            className="topbar__profile-button"
            onClick={() =>
              setProfileOpen((prev) => !prev)
            }
          >

            <div className="topbar__profile-avatar">
              <User size={18} />
            </div>

            <div className="topbar__profile-info">
              <span className="topbar__profile-name">
                Admin
              </span>

              <span className="topbar__profile-role">
                Administrator
              </span>
            </div>

            <ChevronDown
              className={`topbar__profile-arrow ${
                profileOpen
                  ? 'topbar__profile-arrow--open'
                  : ''
              }`}
              size={16}
            />

          </button>

          {profileOpen && (
            <div className="topbar__dropdown topbar__profile-dropdown">

              <div className="topbar__profile-dropdown-header">

                <div className="topbar__large-avatar">
                  <User size={21} />
                </div>

                <div>
                  <strong>Admin</strong>
                  <span>Administrator</span>
                </div>

              </div>

              <div className="topbar__dropdown-divider" />

              <Link
                to="/profile"
                className="topbar__dropdown-link"
                onClick={() => setProfileOpen(false)}
              >
                <UserCircle size={17} />
                Profile
              </Link>

              <Link
                to="/settings"
                className="topbar__dropdown-link"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={17} />
                Settings
              </Link>

              <button
                type="button"
                className="topbar__dropdown-link topbar__logout"
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  )
}

export default Topbar