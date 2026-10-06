import React from 'react'
import Chart from 'react-apexcharts'

import ChartTab from '../common/ChartTab'

import './StatisticsChart.css'

const StatisticsChart = () => {
  const options = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },

    colors: ['#465FFF', '#9CB9FF'],

    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'line',
      toolbar: {
        show: false,
      },
    },

    stroke: {
      curve: 'straight',
      width: [2, 2],
    },

    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },

    markers: {
      size: 0,
      strokeColors: '#fff',
      strokeWidth: 2,

      hover: {
        size: 6,
      },
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,

      x: {
        format: 'dd MMM yyyy',
      },
    },

    xaxis: {
      type: 'category',

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

      tooltip: {
        enabled: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#6B7280'],
        },
      },

      title: {
        text: '',

        style: {
          fontSize: '0px',
        },
      },
    },
  }

  const series = [
    {
      name: 'Sales',

      data: [
        180,
        190,
        170,
        160,
        175,
        165,
        170,
        205,
        230,
        210,
        240,
        235,
      ],
    },

    {
      name: 'Revenue',

      data: [
        40,
        30,
        50,
        40,
        55,
        40,
        70,
        100,
        110,
        120,
        150,
        140,
      ],
    },
  ]

  return (
    <div className="statistics-chart">

      {/* Header */}

      <div className="statistics-chart__header">

        <div className="statistics-chart__heading">

          <h3 className="statistics-chart__title">
            Statistics
          </h3>

          <p className="statistics-chart__description">
            Target you’ve set for each month
          </p>

        </div>

        <div className="statistics-chart__tabs">
          <ChartTab />
        </div>

      </div>

      {/* Chart */}

      <div className="statistics-chart__scroll">

        <div className="statistics-chart__chart-wrapper">

          <Chart
            options={options}
            series={series}
            type="area"
            height={310}
          />

        </div>

      </div>

    </div>
  )
}

export default StatisticsChart