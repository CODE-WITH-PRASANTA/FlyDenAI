import React, { useState } from 'react'
import Chart from 'react-apexcharts'

import { Dropdown } from '../ui/dropdown/Dropdown'
import { DropdownItem } from '../ui/dropdown/DropdownItem'
import { MoreDotIcon } from '../../icons'

import './MonthlySalesChart.css'

const MonthlySalesChart = () => {
  const [isOpen, setIsOpen] = useState(false)

  const options = {
    colors: ['#465fff'],

    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Outfit',
    },

    yaxis: {
      title: {
        text: undefined,
      },
    },

    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },

      y: {
        formatter: (val) => `${val}`,
      },
    },
  }

  const series = [
    {
      name: 'Sales',
      data: [
        168,
        385,
        201,
        298,
        187,
        195,
        291,
        110,
        215,
        390,
        280,
        112,
      ],
    },
  ]

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className="monthly-sales-chart">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="monthly-sales-chart__header">

        <h3 className="monthly-sales-chart__title">
          Monthly Sales
        </h3>

        <div className="monthly-sales-chart__menu-wrapper">

          <button
            type="button"
            className="monthly-sales-chart__menu-button dropdown-toggle"
            onClick={toggleDropdown}
            aria-label="Monthly sales options"
          >
            <MoreDotIcon />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="monthly-sales-chart__dropdown"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="monthly-sales-chart__dropdown-item"
            >
              View More
            </DropdownItem>

            <DropdownItem
              onItemClick={closeDropdown}
              className="monthly-sales-chart__dropdown-item"
            >
              Delete
            </DropdownItem>
          </Dropdown>

        </div>

      </div>

      {/* =====================================================
          CHART
      ===================================================== */}

      <div className="monthly-sales-chart__scroll">

        <div className="monthly-sales-chart__chart-wrapper">

          <Chart
            options={options}
            series={series}
            type="bar"
            height={180}
          />

        </div>

      </div>

    </div>
  )
}

export default MonthlySalesChart