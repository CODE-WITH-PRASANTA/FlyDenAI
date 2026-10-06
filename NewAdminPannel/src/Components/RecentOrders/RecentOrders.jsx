import React, { useState } from 'react'
import './RecentOrders.css'

const RecentOrders = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')

  const orders = [
    {
      id: '#ORD-1001',
      customer: 'Rahul Sharma',
      product: 'Visa Application',
      category: 'Tourist Visa',
      amount: '₹24,999',
      status: 'Delivered',
      date: '06 Oct 2026',
    },
    {
      id: '#ORD-1002',
      customer: 'Priya Das',
      product: 'Study Abroad',
      category: 'Student Visa',
      amount: '₹48,500',
      status: 'Pending',
      date: '05 Oct 2026',
    },
    {
      id: '#ORD-1003',
      customer: 'Amit Kumar',
      product: 'Dummy Ticket',
      category: 'Flight Booking',
      amount: '₹2,499',
      status: 'Delivered',
      date: '05 Oct 2026',
    },
    {
      id: '#ORD-1004',
      customer: 'Sneha Patel',
      product: 'Intern Abroad',
      category: 'Internship',
      amount: '₹35,000',
      status: 'Canceled',
      date: '04 Oct 2026',
    },
    {
      id: '#ORD-1005',
      customer: 'Arjun Singh',
      product: 'Visa Consultation',
      category: 'Consultation',
      amount: '₹4,999',
      status: 'Delivered',
      date: '03 Oct 2026',
    },
  ]

  const filteredOrders =
    statusFilter === 'All'
      ? orders
      : orders.filter(
          (order) => order.status === statusFilter
        )

  const getStatusClass = (status) => {
    if (status === 'Delivered') {
      return 'recent-orders__status--delivered'
    }

    if (status === 'Pending') {
      return 'recent-orders__status--pending'
    }

    return 'recent-orders__status--canceled'
  }

  const handleFilter = (status) => {
    setStatusFilter(status)
    setFilterOpen(false)
  }

  return (
    <div className="recent-orders">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="recent-orders__header">

        <div className="recent-orders__heading">
          <h3 className="recent-orders__title">
            Recent Orders
          </h3>

          <p className="recent-orders__subtitle">
            Latest customer activities and applications
          </p>
        </div>

        <div className="recent-orders__actions">

          {/* Filter */}

          <div className="recent-orders__filter-wrapper">

            <button
              type="button"
              className={`recent-orders__action-button ${
                filterOpen
                  ? 'recent-orders__action-button--active'
                  : ''
              }`}
              onClick={() =>
                setFilterOpen((prev) => !prev)
              }
            >
              <span className="recent-orders__filter-icon">
                ☰
              </span>

              Filter
            </button>

            {filterOpen && (
              <div className="recent-orders__filter-menu">

                <button
                  type="button"
                  className={
                    statusFilter === 'All'
                      ? 'recent-orders__filter-option recent-orders__filter-option--active'
                      : 'recent-orders__filter-option'
                  }
                  onClick={() => handleFilter('All')}
                >
                  All Orders
                </button>

                <button
                  type="button"
                  className={
                    statusFilter === 'Delivered'
                      ? 'recent-orders__filter-option recent-orders__filter-option--active'
                      : 'recent-orders__filter-option'
                  }
                  onClick={() => handleFilter('Delivered')}
                >
                  Delivered
                </button>

                <button
                  type="button"
                  className={
                    statusFilter === 'Pending'
                      ? 'recent-orders__filter-option recent-orders__filter-option--active'
                      : 'recent-orders__filter-option'
                  }
                  onClick={() => handleFilter('Pending')}
                >
                  Pending
                </button>

                <button
                  type="button"
                  className={
                    statusFilter === 'Canceled'
                      ? 'recent-orders__filter-option recent-orders__filter-option--active'
                      : 'recent-orders__filter-option'
                  }
                  onClick={() => handleFilter('Canceled')}
                >
                  Canceled
                </button>

              </div>
            )}

          </div>

          {/* See All */}

          <button
            type="button"
            className="recent-orders__action-button recent-orders__see-all"
          >
            See all
          </button>

        </div>

      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="recent-orders__table-wrapper">

        <table className="recent-orders__table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>

                  {/* Customer */}

                  <td>

                    <div className="recent-orders__customer">

                      <div className="recent-orders__avatar">
                        {order.customer.charAt(0)}
                      </div>

                      <div className="recent-orders__customer-info">

                        <strong>
                          {order.customer}
                        </strong>

                        <span>
                          {order.id}
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* Service */}

                  <td>

                    <div className="recent-orders__service">

                      <strong>
                        {order.product}
                      </strong>

                      <span>
                        {order.category}
                      </span>

                    </div>

                  </td>

                  {/* Amount */}

                  <td>

                    <span className="recent-orders__amount">
                      {order.amount}
                    </span>

                  </td>

                  {/* Status */}

                  <td>

                    <span
                      className={`recent-orders__status ${getStatusClass(
                        order.status
                      )}`}
                    >
                      <span className="recent-orders__status-dot" />

                      {order.status}
                    </span>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="recent-orders__empty"
                >
                  No orders found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="recent-orders__footer">

        <span>
          Showing {filteredOrders.length} of {orders.length}{' '}
          orders
        </span>

        <span>
          Updated recently
        </span>

      </div>

    </div>
  )
}

export default RecentOrders