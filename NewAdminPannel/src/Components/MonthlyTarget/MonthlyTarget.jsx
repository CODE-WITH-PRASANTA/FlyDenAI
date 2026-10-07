import React, { useState } from 'react'
import Chart from 'react-apexcharts'

import { Dropdown } from '../ui/dropdown/Dropdown'
import { DropdownItem } from '../ui/dropdown/DropdownItem'
import { MoreDotIcon } from '../../icons'

import './MonthlyTarget.css'

const MonthlyTarget = () => {
  const series = [75.55]

  const options = {
    colors: ['#465FFF'],

    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'radialBar',
      height: 330,

      sparkline: {
        enabled: true,
      },
    },

    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,

        hollow: {
          size: '80%',
        },

        track: {
          background: '#E4E7EC',
          strokeWidth: '100%',
          margin: 5,
        },

        dataLabels: {
          name: {
            show: false,
          },

          value: {
            fontSize: '36px',
            fontWeight: '600',
            offsetY: -40,
            color: '#1D2939',

            formatter: function (val) {
              return val + '%'
            },
          },
        },
      },
    },

    fill: {
      type: 'solid',
      colors: ['#465FFF'],
    },

    stroke: {
      lineCap: 'round',
    },

    labels: ['Progress'],
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className="monthly-target">

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="monthly-target__main">

        {/* Header */}

        <div className="monthly-target__header">

          <div className="monthly-target__heading">

            <h3 className="monthly-target__title">
              Monthly Target
            </h3>

            <p className="monthly-target__description">
              Target you’ve set for each month
            </p>

          </div>

          {/* Dropdown */}

          <div className="monthly-target__menu-wrapper">

            <button
              type="button"
              className="monthly-target__menu-button dropdown-toggle"
              onClick={toggleDropdown}
              aria-label="Monthly target options"
            >
              <MoreDotIcon />
            </button>

            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="monthly-target__dropdown"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="monthly-target__dropdown-item"
              >
                View More
              </DropdownItem>

              <DropdownItem
                onItemClick={closeDropdown}
                className="monthly-target__dropdown-item"
              >
                Delete
              </DropdownItem>
            </Dropdown>

          </div>

        </div>

        {/* =================================================
            RADIAL CHART
        ================================================= */}

        <div className="monthly-target__chart-section">

          <div
            className="monthly-target__chart"
            id="chartDarkStyle"
          >
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          {/* Percentage Badge */}

          <span className="monthly-target__percentage">
            +10%
          </span>

        </div>

        {/* Description */}

        <p className="monthly-target__message">
          You earn $3287 today, it's higher than last month.
          Keep up your good work!
        </p>

      </div>

      {/* =====================================================
          BOTTOM STATISTICS
      ===================================================== */}

      <div className="monthly-target__statistics">

        {/* Target */}

        <div className="monthly-target__stat">

          <p className="monthly-target__stat-label">
            Target
          </p>

          <p className="monthly-target__stat-value">
            $20K

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z"
                fill="#D92D20"
              />
            </svg>
          </p>

        </div>

        <div className="monthly-target__divider" />

        {/* Revenue */}

        <div className="monthly-target__stat">

          <p className="monthly-target__stat-label">
            Revenue
          </p>

          <p className="monthly-target__stat-value">
            $20K

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg>
          </p>

        </div>

        <div className="monthly-target__divider" />

        {/* Today */}

        <div className="monthly-target__stat">

          <p className="monthly-target__stat-label">
            Today
          </p>

          <p className="monthly-target__stat-value">
            $20K

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg>
          </p>

        </div>

      </div>

    </div>
  )
}

export default MonthlyTarget