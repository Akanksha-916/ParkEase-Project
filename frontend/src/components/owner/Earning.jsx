import React from "react";
import "./Earning.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 3500 },
  { month: "Mar", revenue: 4200 },
  { month: "Apr", revenue: 3000 },
  { month: "May", revenue: 4800 }
];

export default function Earning() {
  return (
    <div className="earning-container">

      <h1 className="earning-title">Earnings</h1>

      {/* Earnings Summary */}

      <div className="earning-cards">

        <div className="earning-card">
          <h3>Total Earnings</h3>
          <p>₹18,500</p>
        </div>

        <div className="earning-card">
          <h3>This Month</h3>
          <p>₹4,800</p>
        </div>

        <div className="earning-card">
          <h3>Today</h3>
          <p>₹650</p>
        </div>

      </div>


      {/* Revenue Chart */}

      <div className="revenue-chart">

        <h3>Monthly Revenue</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#6d28d9" />
          </BarChart>
        </ResponsiveContainer>

      </div>


      {/* Earnings History */}

      <div className="earning-table">

        <h3>Recent Transactions</h3>

        <table>

          <thead>
            <tr>
              <th>User</th>
              <th>Parking Space</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Rahul</td>
              <td>Space 2</td>
              <td>10 Mar</td>
              <td>₹200</td>
            </tr>

            <tr>
              <td>Priya</td>
              <td>Space 1</td>
              <td>10 Mar</td>
              <td>₹150</td>
            </tr>

            <tr>
              <td>Amit</td>
              <td>Space 3</td>
              <td>11 Mar</td>
              <td>₹300</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}