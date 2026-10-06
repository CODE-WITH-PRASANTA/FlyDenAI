import React from 'react'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from '../../icons'

import Badge from '../ui/badge/Badge'

import './EcommerceMetrics.css'

const EcommerceMetrics = () => {
  return (
    <div className="ecommerce-metrics">

      {/* Customers Metric */}

      <div className="ecommerce-metrics__card">

        <div className="ecommerce-metrics__icon">
          <GroupIcon />
        </div>

        <div className="ecommerce-metrics__bottom">

          <div className="ecommerce-metrics__content">

            <span className="ecommerce-metrics__label">
              Customers
            </span>

            <h4 className="ecommerce-metrics__value">
              3,782
            </h4>

          </div>

          <div className="ecommerce-metrics__badge">
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>

        </div>

      </div>

      {/* Orders Metric */}

      <div className="ecommerce-metrics__card">

        <div className="ecommerce-metrics__icon">
          <BoxIconLine />
        </div>

        <div className="ecommerce-metrics__bottom">

          <div className="ecommerce-metrics__content">

            <span className="ecommerce-metrics__label">
              Orders
            </span>

            <h4 className="ecommerce-metrics__value">
              5,359
            </h4>

          </div>

          <div className="ecommerce-metrics__badge">
            <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge>
          </div>

        </div>

      </div>

    </div>
  )
}

export default EcommerceMetrics