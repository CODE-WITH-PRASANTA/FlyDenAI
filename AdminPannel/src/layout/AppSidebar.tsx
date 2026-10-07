import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  ChevronDownIcon,
  GridIcon,
  UserCircleIcon,
  PageIcon,
  ListIcon,
  TableIcon,
  PlugInIcon,
  BoxCubeIcon,
  HorizontaLDots,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";
import companylogo from "../Asserts/logo-main.png";

import "./AppSidebar.css";

// =========================================================
// TYPES
// =========================================================

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
  }[];
};

// =========================================================
// NAVIGATION ITEMS
// =========================================================

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <GridIcon />,
    path: "/",
  },

  // =======================================================
  // VISA MANAGEMENT
  // =======================================================

  {
    name: "Visa Management",
    icon: <BoxCubeIcon />,
    subItems: [
      {
        name: "Post Visa",
        path: "/visa/post-visa",
      },
      {
        name: "Preview",
        path: "/visa/preview",
      },
    ],
  },

  // =======================================================
  // COUNTRY MANAGEMENT
  // =======================================================

  {
    name: "Country Manage",
    icon: <TableIcon />,
    subItems: [
      {
        name: "Country",
        path: "/country/manage",
      },
      {
        name: "Visa Type",
        path: "/country/visa-type",
      },
    ],
  },

  // =======================================================
  // VISA NOTES
  // =======================================================

  {
    name: "Visa Notes",
    icon: <BoxCubeIcon />,
    subItems: [
      {
        name: "Payment",
        path: "/visa-notes/payment",
      },
      {
        name: "Delivered",
        path: "/visa-notes/delivered",
      },
    ],
  },

  // =======================================================
  // DUMMY TICKET
  // =======================================================

  {
    name: "Dummy Ticket",
    icon: <BoxCubeIcon />,
    subItems: [
      {
        name: "Manage Ticket",
        path: "/dummy-ticket/manage",
      },
      {
        name: "Booking Holder",
        path: "/dummy-ticket/holder",
      },
      {
        name: "Insurance Lead",
        path: "/dummy-ticket/insurance",
      },
    ],
  },

  // =======================================================
  // DISCOUNT COUPON
  // =======================================================

  {
    name: "Discount Coupon",
    icon: <BoxCubeIcon />,
    subItems: [
      {
        name: "Generate Coupon",
        path: "/discount-coupon/generate",
      },
    ],
  },

  // =======================================================
  // CLIENT ENQUIRY REMOVED
  // =======================================================

  // =======================================================
  // TEAM MANAGEMENT
  // =======================================================

  {
    name: "Team Management",
    icon: <TableIcon />,
    subItems: [
      {
        name: "Post Team Member",
        path: "/team/post-member",
      },
      {
        name: "Preview",
        path: "/team/preview",
      },
    ],
  },

  // =======================================================
  // TESTIMONIAL
  // =======================================================

  {
    name: "Testimonial",
    icon: <PageIcon />,
    subItems: [
      {
        name: "Client Action",
        path: "/testimonial/client-action",
      },
      {
        name: "Post Testimonial",
        path: "/testimonial/post",
      },
    ],
  },

  // =======================================================
  // BLOG MANAGEMENT
  // =======================================================

  {
    name: "Blog Management",
    icon: <ListIcon />,
    subItems: [
      {
        name: "Post Blog",
        path: "/blog/post",
      },
      {
        name: "Preview",
        path: "/blog/preview",
      },
    ],
  },

  // =======================================================
  // ADVERTISE MANAGEMENT
  // =======================================================

  {
    name: "Manage Advertise",
    icon: <BoxCubeIcon />,
    subItems: [
      {
        name: "Banner",
        path: "/advertise/banner",
      },
      {
        name: "Post Milestone",
        path: "/advertise/post-milestone",
      },
    ],
  },

  // =======================================================
  // CONTACT
  // =======================================================

  {
    name: "Contact Management",
    icon: <PlugInIcon />,
    path: "/contact/manage",
  },

  // =======================================================
  // MEDIA
  // =======================================================

  {
    name: "Media Upload",
    icon: <BoxCubeIcon />,
    path: "/media/upload",
  },

  // =======================================================
  // SUCCESSFUL CLIENTS
  // =======================================================

  {
    name: "Our Successful Clients",
    icon: <UserCircleIcon />,
    path: "/clients/successful",
  },

  // =======================================================
  // DIRECTOR
  // =======================================================

  {
    name: "Director & Achievement Manage",
    icon: <UserCircleIcon />,
    path: "/director-achievement-manage",
  },

  // =======================================================
  // FAQ
  // =======================================================

  {
    name: "FAQ Management",
    icon: <PageIcon />,
    subItems: [
      {
        name: "Post FAQ",
        path: "/faq/post-faq",
      },
      {
        name: "View All",
        path: "/faq/preview",
      },
    ],
  },
];

// =========================================================
// COMPONENT
// =========================================================

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] =
    useState<Record<number, number>>({});

  const subMenuRefs = useRef<
    Record<number, HTMLDivElement | null>
  >({});

  // =========================================================
  // ACTIVE ROUTE
  // =========================================================

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  // =========================================================
  // AUTO OPEN ACTIVE SUBMENU
  // =========================================================

  useEffect(() => {
    let matched = false;

    navItems.forEach((nav, index) => {
      if (
        nav.subItems?.some((sub) =>
          isActive(sub.path)
        )
      ) {
        setOpenSubmenu({
          index,
        });

        matched = true;
      }
    });

    if (!matched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  // =========================================================
  // SUBMENU HEIGHT
  // =========================================================

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = openSubmenu.index;
      const ref = subMenuRefs.current[key];

      if (ref) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: ref.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  // =========================================================
  // SUBMENU TOGGLE
  // =========================================================

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) =>
      prev?.index === index
        ? null
        : {
            index,
          }
    );
  };

  // =========================================================
  // SIDEBAR STATE
  // =========================================================

  const sidebarExpanded =
    isExpanded || isHovered || isMobileOpen;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <aside
      className={`app-sidebar ${
        sidebarExpanded
          ? "app-sidebar-expanded"
          : "app-sidebar-collapsed"
      } ${
        isMobileOpen
          ? "app-sidebar-mobile-open"
          : "app-sidebar-mobile-closed"
      }`}
      onMouseEnter={() => {
        if (!isExpanded) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* =====================================================
          SINGLE LOGO
          SAME LOGO ON ALL SIDEBAR STATES
      ===================================================== */}

      <div className="sidebar-logo-section">
        <Link
          to="/"
          className="sidebar-logo-link"
          aria-label="Go to Dashboard"
        >
          <img
            src={companylogo}
            alt="Company Logo"
            className="sidebar-logo"
          />
        </Link>
      </div>

      {/* =====================================================
          MENU
      ===================================================== */}

      <div className="sidebar-menu-scroll">
        <nav
          className="sidebar-navigation"
          aria-label="Main Navigation"
        >
          {/* =================================================
              MENU TITLE
          ================================================= */}

          <div
            className={`sidebar-menu-heading ${
              sidebarExpanded
                ? "sidebar-menu-heading-expanded"
                : "sidebar-menu-heading-collapsed"
            }`}
          >
            {sidebarExpanded ? (
              <span>Main Menu</span>
            ) : (
              <HorizontaLDots className="sidebar-dots-icon" />
            )}
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <ul className="sidebar-nav-list">
            {navItems.map((nav, index) => {
              const hasSubmenu =
                !!nav.subItems?.length;

              const submenuOpen =
                openSubmenu?.index === index;

              const directActive =
                !!nav.path &&
                isActive(nav.path);

              const childActive =
                nav.subItems?.some((sub) =>
                  isActive(sub.path)
                ) || false;

              const active =
                directActive || childActive;

              return (
                <li
                  key={nav.name}
                  className="sidebar-nav-list-item"
                >
                  {/* =================================================
                      SUBMENU ITEM
                  ================================================= */}

                  {hasSubmenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleSubmenuToggle(index)
                        }
                        aria-expanded={submenuOpen}
                        className={`sidebar-menu-item ${
                          active
                            ? "sidebar-menu-item-active"
                            : "sidebar-menu-item-inactive"
                        } ${
                          !sidebarExpanded
                            ? "sidebar-menu-item-collapsed"
                            : ""
                        }`}
                      >
                        <span
                          className={`sidebar-menu-icon ${
                            active
                              ? "sidebar-menu-icon-active"
                              : "sidebar-menu-icon-inactive"
                          }`}
                        >
                          {nav.icon}
                        </span>

                        {sidebarExpanded && (
                          <>
                            <span className="sidebar-menu-text">
                              {nav.name}
                            </span>

                            <ChevronDownIcon
                              className={`sidebar-chevron ${
                                submenuOpen
                                  ? "sidebar-chevron-open"
                                  : ""
                              }`}
                            />
                          </>
                        )}
                      </button>

                      {/* =================================================
                          SUBMENU
                      ================================================= */}

                      {sidebarExpanded && (
                        <div
                          ref={(element) => {
                            subMenuRefs.current[index] =
                              element;
                          }}
                          className="sidebar-submenu-wrapper"
                          style={{
                            height: submenuOpen
                              ? `${
                                  subMenuHeight[index] ||
                                  0
                                }px`
                              : "0px",
                          }}
                        >
                          <ul className="sidebar-submenu">
                            {nav.subItems?.map(
                              (sub) => {
                                const subActive =
                                  isActive(
                                    sub.path
                                  );

                                return (
                                  <li
                                    key={sub.name}
                                    className="sidebar-submenu-list-item"
                                  >
                                    <Link
                                      to={sub.path}
                                      className={`sidebar-submenu-item ${
                                        subActive
                                          ? "sidebar-submenu-item-active"
                                          : "sidebar-submenu-item-inactive"
                                      }`}
                                    >
                                      <span
                                        className={`sidebar-submenu-dot ${
                                          subActive
                                            ? "sidebar-submenu-dot-active"
                                            : ""
                                        }`}
                                      />

                                      <span>
                                        {sub.name}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    /* =================================================
                       DIRECT LINK
                    ================================================= */

                    nav.path && (
                      <Link
                        to={nav.path}
                        className={`sidebar-menu-item ${
                          active
                            ? "sidebar-menu-item-active"
                            : "sidebar-menu-item-inactive"
                        } ${
                          !sidebarExpanded
                            ? "sidebar-menu-item-collapsed"
                            : ""
                        }`}
                      >
                        <span
                          className={`sidebar-menu-icon ${
                            active
                              ? "sidebar-menu-icon-active"
                              : "sidebar-menu-icon-inactive"
                          }`}
                        >
                          {nav.icon}
                        </span>

                        {sidebarExpanded && (
                          <span className="sidebar-menu-text">
                            {nav.name}
                          </span>
                        )}
                      </Link>
                    )
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;