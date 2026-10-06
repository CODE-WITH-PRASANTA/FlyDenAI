import React from 'react'


import './Dashboard.css'
import EcommerceMetrics from '../../Components/EcommerceMetrics/EcommerceMetrics'
import MonthlySalesChart from '../../Components/MonthlySalesChart/MonthlySalesChart'
import StatisticsChart from '../../Components/StatisticsChart/StatisticsChart'
import MonthlyTarget from '../../Components/MonthlyTarget/MonthlyTarget'
import RecentOrders from '../../Components/RecentOrders/RecentOrders'

const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* =====================================================
          PAGE META
      ===================================================== */}

      <PageMeta
        title="FlyDenAi Admin Dashboard | Intelligent Business Management Panel"
        description="FlyDenAi Admin Dashboard – Monitor analytics, manage sales insights, track revenue goals, and control intelligent business operations with precision and AI-powered insights."
      />

      {/* =====================================================
          DASHBOARD GRID
      ===================================================== */}

      <div className="dashboard__grid">

        {/* =================================================
            LEFT SECTION
        ================================================= */}

        <div className="dashboard__left-section">

          <div className="dashboard__metrics">
            <EcommerceMetrics />
          </div>

          <div className="dashboard__sales-chart">
            <MonthlySalesChart />
          </div>

        </div>

        {/* =================================================
            MONTHLY TARGET
        ================================================= */}

        <div className="dashboard__target-section">
          <MonthlyTarget />
        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="dashboard__statistics-section">
          <StatisticsChart />
        </div>

        {/* =================================================
            DEMOGRAPHICS
        ================================================= */}

        <div className="dashboard__demographic-section">
          <DemographicCard />
        </div>

        {/* =================================================
            RECENT ORDERS
        ================================================= */}

        <div className="dashboard__orders-section">
          <RecentOrders />
        </div>

      </div>

    </div>
  )
}

export default Dashboard