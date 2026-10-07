import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import './MainLayout.css'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev)
  }

  return (
    <div className="main-layout">

      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      <div
        className={`main-layout__overlay ${
          mobileSidebarOpen ? 'main-layout__overlay--show' : ''
        }`}
        onClick={toggleMobileSidebar}
      />

      <div
        className={`main-layout__content ${
          sidebarOpen
            ? 'main-layout__content--sidebar-open'
            : 'main-layout__content--sidebar-closed'
        }`}
      >
        <Topbar
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />

        <main className="main-layout__main">
          {children}
        </main>
      </div>

    </div>
  )
}

export default MainLayout