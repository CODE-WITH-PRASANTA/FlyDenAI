import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Plane,
  Globe2,
  FileText,
  Ticket,
  BadgePercent,
  Users,
  UserRound,
  MessageSquareQuote,
  Newspaper,
  Megaphone,
  Phone,
  Image,
  Trophy,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  X,
  BriefcaseBusiness,
  BookOpen,
  CreditCard,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
} from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({
  sidebarOpen = true,
  mobileSidebarOpen = false,
  toggleMobileSidebar,
}) => {
  const location = useLocation()

  const [openMenus, setOpenMenus] = useState({})

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/',
    },

    {
      title: 'Visa Management',
      icon: Plane,
      children: [
        {
          title: 'Post Visa',
          path: '/visa/post-visa',
          icon: FileText,
        },
        {
          title: 'Preview',
          path: '/visa/preview',
          icon: CheckCircle2,
        },
      ],
    },

    {
      title: 'Country Manage',
      icon: Globe2,
      children: [
        {
          title: 'Country',
          path: '/country/manage',
          icon: Globe2,
        },
        {
          title: 'Visa Type',
          path: '/country/visa-type',
          icon: ClipboardList,
        },
      ],
    },

    {
      title: 'Visa Notes',
      icon: BookOpen,
      children: [
        {
          title: 'Payment',
          path: '/visa-notes/payment',
          icon: CreditCard,
        },
        {
          title: 'Delivered',
          path: '/visa-notes/delivered',
          icon: CheckCircle2,
        },
      ],
    },

    {
      title: 'Dummy Ticket',
      icon: Ticket,
      children: [
        {
          title: 'Manage Ticket',
          path: '/dummy-ticket/manage',
          icon: Ticket,
        },
        {
          title: 'Booking Holder',
          path: '/dummy-ticket/holder',
          icon: UserRound,
        },
        {
          title: 'Insurance Lead',
          path: '/dummy-ticket/insurance',
          icon: BriefcaseBusiness,
        },
      ],
    },

    {
      title: 'Discount Coupon',
      icon: BadgePercent,
      children: [
        {
          title: 'Generate Coupon',
          path: '/discount-coupon/generate',
          icon: BadgePercent,
        },
      ],
    },

    {
      title: 'Client Enquiry',
      icon: Users,
      children: [
        {
          title: 'Visa Clients',
          path: '/client/visa-clients',
          icon: Plane,
        },
        {
          title: 'Study Abroad Clients',
          path: '/client/study-abroad',
          icon: BookOpen,
        },
        {
          title: 'Intern Abroad Clients',
          path: '/client/intern-abroad',
          icon: BriefcaseBusiness,
        },
      ],
    },

    {
      title: 'Team Management',
      icon: Users,
      children: [
        {
          title: 'Post Team Member',
          path: '/team/post-member',
          icon: UserRound,
        },
        {
          title: 'Preview',
          path: '/team/preview',
          icon: Users,
        },
      ],
    },

    {
      title: 'Testimonial',
      icon: MessageSquareQuote,
      children: [
        {
          title: 'Client Action',
          path: '/testimonial/client-action',
          icon: UserRound,
        },
        {
          title: 'Post Testimonial',
          path: '/testimonial/post',
          icon: MessageSquareQuote,
        },
      ],
    },

    {
      title: 'Blog Management',
      icon: Newspaper,
      children: [
        {
          title: 'Post Blog',
          path: '/blog/post',
          icon: FileText,
        },
        {
          title: 'Preview',
          path: '/blog/preview',
          icon: Newspaper,
        },
      ],
    },

    {
      title: 'Manage Advertise',
      icon: Megaphone,
      children: [
        {
          title: 'Banner',
          path: '/advertise/banner',
          icon: Image,
        },
        {
          title: 'Post Milestone',
          path: '/advertise/post-milestone',
          icon: Trophy,
        },
      ],
    },

    {
      title: 'Contact Management',
      icon: Phone,
      path: '/contact/manage',
    },

    {
      title: 'Media Upload',
      icon: Image,
      path: '/media/upload',
    },

    {
      title: 'Our Successful Clients',
      icon: Trophy,
      path: '/clients/successful',
    },

    {
      title: 'Director & Achievement Manage',
      icon: Award,
      path: '/director-achievement-manage',
    },

    {
      title: 'FAQ Management',
      icon: HelpCircle,
      children: [
        {
          title: 'Post FAQ',
          path: '/faq/post-faq',
          icon: HelpCircle,
        },
        {
          title: 'View All',
          path: '/faq/preview',
          icon: ClipboardList,
        },
      ],
    },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (children) => {
    return children?.some((item) => location.pathname === item.path)
  }

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleMobileLink = () => {
    if (window.innerWidth <= 991 && toggleMobileSidebar) {
      toggleMobileSidebar()
    }
  }

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? 'sidebar--open' : 'sidebar--closed'
      } ${
        mobileSidebarOpen
          ? 'sidebar--mobile-open'
          : 'sidebar--mobile-closed'
      }`}
    >

      {/* =====================================================
          LOGO AREA
      ===================================================== */}

      <div className="sidebar__header">

        <Link
          to="/"
          className="sidebar__brand"
          onClick={handleMobileLink}
        >
          <div className="sidebar__brand-icon">
            F
          </div>

          {sidebarOpen && (
            <div className="sidebar__brand-content">
              <span className="sidebar__brand-name">
                FlyDenAi
              </span>

              <span className="sidebar__brand-subtitle">
                Global Opportunities
              </span>
            </div>
          )}
        </Link>

        <button
          type="button"
          className="sidebar__mobile-close"
          onClick={toggleMobileSidebar}
        >
          <X size={20} />
        </button>

      </div>

      {/* =====================================================
          MENU
      ===================================================== */}

      <div className="sidebar__menu-wrapper">

        <div className="sidebar__menu-title">
          MENU
        </div>

        <nav className="sidebar__nav">

          {menuItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children?.length > 0
            const active = item.path
              ? isActive(item.path)
              : isParentActive(item.children)

            return (
              <div
                className={`sidebar__menu-group ${
                  active ? 'sidebar__menu-group--active' : ''
                }`}
                key={item.title}
              >

                {hasChildren ? (
                  <button
                    type="button"
                    className={`sidebar__menu-button ${
                      active ? 'sidebar__menu-button--active' : ''
                    }`}
                    onClick={() => toggleMenu(item.title)}
                  >
                    <span className="sidebar__menu-left">

                      <span className="sidebar__menu-icon">
                        <Icon size={19} />
                      </span>

                      {sidebarOpen && (
                        <span className="sidebar__menu-text">
                          {item.title}
                        </span>
                      )}

                    </span>

                    {sidebarOpen && (
                      <span className="sidebar__menu-arrow">
                        {openMenus[item.title] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`sidebar__menu-link ${
                      active ? 'sidebar__menu-link--active' : ''
                    }`}
                    onClick={handleMobileLink}
                  >
                    <span className="sidebar__menu-left">

                      <span className="sidebar__menu-icon">
                        <Icon size={19} />
                      </span>

                      {sidebarOpen && (
                        <span className="sidebar__menu-text">
                          {item.title}
                        </span>
                      )}

                    </span>
                  </Link>
                )}

                {hasChildren &&
                  sidebarOpen &&
                  openMenus[item.title] && (
                    <div className="sidebar__submenu">

                      {item.children.map((child) => {
                        const ChildIcon = child.icon

                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={handleMobileLink}
                            className={`sidebar__submenu-link ${
                              isActive(child.path)
                                ? 'sidebar__submenu-link--active'
                                : ''
                            }`}
                          >
                            <span className="sidebar__submenu-dot">
                              <ChildIcon size={14} />
                            </span>

                            <span className="sidebar__submenu-text">
                              {child.title}
                            </span>
                          </Link>
                        )
                      })}

                    </div>
                  )}

              </div>
            )
          })}

        </nav>

      </div>

      {/* =====================================================
          SIDEBAR BOTTOM WIDGET
      ===================================================== */}

      {sidebarOpen && (
        <div className="sidebar__bottom-card">

          <div className="sidebar__bottom-icon">
            <CircleDollarSign size={22} />
          </div>

          <div className="sidebar__bottom-content">
            <h4>
              FlyDenAi
            </h4>

            <p>
              Visa Application, Study Abroad & Intern Abroad
            </p>

            <Link
              to="/"
              onClick={handleMobileLink}
            >
              Explore Services
            </Link>
          </div>

        </div>
      )}

    </aside>
  )
}

export default Sidebar