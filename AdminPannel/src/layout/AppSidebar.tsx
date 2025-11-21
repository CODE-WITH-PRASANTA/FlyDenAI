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
import companylogo from "../Asserts/Logo.png";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/" },

  {
    icon: <BoxCubeIcon />,
    name: "Visa Management",
    subItems: [
      { name: "Post Visa", path: "/visa/post-visa" },
      { name: "Preview", path: "/visa/preview" },
    ],
  },
  {
    icon: <TableIcon />,
    name: "Country Manage",
    subItems: [
      { name: "Country", path: "/country/manage" },
      { name: "Visa Type", path: "/country/visa-type" },
    ],
  },

  {
    icon: <BoxCubeIcon />,
    name: "Visa Notes",
    subItems: [
      { name: "Payment", path: "/visa-notes/payment" },
      { name: "Delivered", path: "/visa-notes/delivered" },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Client Enquiry",
    subItems: [
      { name: "Visa Clients", path: "/client/visa-clients" },
      { name: "Study Abroad Clients", path: "/client/study-abroad" },
      { name: "Intern Abroad Clients", path: "/client/intern-abroad" },
    ],
  },

  {
    icon: <TableIcon />,
    name: "Team Management",
    subItems: [
      { name: "Post Team Member", path: "/team/post-member" },
      { name: "Preview", path: "/team/preview" },
    ],
  },

  {
    icon: <PageIcon />,
    name: "Testimonial",
    subItems: [
      { name: "Client Action", path: "/testimonial/client-action" },
      { name: "Post Testimonial", path: "/testimonial/post" },
    ],
  },

  {
    icon: <ListIcon />,
    name: "Blog Management",
    subItems: [
      { name: "Post Blog", path: "/blog/post" },
      { name: "Preview", path: "/blog/preview" },
    ],
  },

  {
    icon: <BoxCubeIcon />,
    name: "Manage Advertise",
    subItems: [
      { name: "Banner", path: "/advertise/banner" },
      { name: "Post Milestone", path: "/advertise/post-milestone" },
    ],
  },

  { icon: <PlugInIcon />, name: "Contact Management", path: "/contact/manage" },

  { icon: <BoxCubeIcon />, name: "Media Upload", path: "/media/upload" },

  {
    icon: <UserCircleIcon />,
    name: "Our Successful Clients",
    path: "/clients/successful",
  },

  {
    icon: <UserCircleIcon />,
    name: "Director & Achievement Manage",
    path: "/director-achievement-manage",
  },

  // 🎟 **New Discount Coupon Section**
  {
    icon: <BoxCubeIcon />,
    name: "Discount Coupon",
    subItems: [
      { name: "Generate Coupon", path: "/discount-coupon/generate" },
      { name: "View Coupons", path: "/discount-coupon/preview" },
    ],
  },

  // FAQ MANAGEMENT
  {
    icon: <PageIcon />,
    name: "FAQ Management",
    subItems: [
      { name: "Post FAQ", path: "/faq/post-faq" },
      { name: "View All", path: "/faq/preview" },
    ],
  },
];


const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{ index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  // Auto-expand submenu for active route
  useEffect(() => {
    let matched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems?.some((sub) => isActive(sub.path))) {
        setOpenSubmenu({ index });
        matched = true;
      }
    });
    if (!matched) setOpenSubmenu(null);
  }, [location, isActive]);

  // Calculate submenu height dynamically
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

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev?.index === index ? null : { index }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 mt-16 lg:mt-0 flex flex-col h-[calc(100vh-4rem)] lg:h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== LOGO SECTION ===== */}
      <div
        className={`py-5 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          <img
            src={companylogo}
            alt="Company Logo"
            width={isExpanded || isHovered || isMobileOpen ? 150 : 32}
            height={isExpanded || isHovered || isMobileOpen ? 40 : 32}
          />
        </Link>
      </div>

      {/* ===== MENU SECTION ===== */}
      <div className="flex flex-col overflow-y-auto no-scrollbar duration-300 ease-linear">
        <nav>
          <h2
            className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
              !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              "Main Menu"
            ) : (
              <HorizontaLDots className="size-6" />
            )}
          </h2>

          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {/* MAIN MENU ITEM */}
                {nav.subItems ? (
                  <button
                    onClick={() => handleSubmenuToggle(index)}
                    className={`menu-item group ${
                      openSubmenu?.index === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "lg:justify-start"
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        openSubmenu?.index === index
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <ChevronDownIcon
                        className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                          openSubmenu?.index === index
                            ? "rotate-180 text-brand-500"
                            : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  nav.path && (
                    <Link
                      to={nav.path}
                      className={`menu-item group ${
                        isActive(nav.path)
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span
                        className={`menu-item-icon-size ${
                          isActive(nav.path)
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{nav.name}</span>
                      )}
                    </Link>
                  )
                )}

                {/* ===== SUBMENU ===== */}
                {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      if (el) subMenuRefs.current[index] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu?.index === index
                          ? `${subMenuHeight[index] || 0}px`
                          : "0px",
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className={`menu-dropdown-item ${
                              isActive(sub.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
