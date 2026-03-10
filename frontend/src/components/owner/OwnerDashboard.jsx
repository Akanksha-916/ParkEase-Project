import React from "react";
import "./OwnerDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const bookingData = [
  { day: "Mon", bookings: 4 },
  { day: "Tue", bookings: 6 },
  { day: "Wed", bookings: 3 },
  { day: "Thu", bookings: 8 },
  { day: "Fri", bookings: 5 },
  { day: "Sat", bookings: 9 },
  { day: "Sun", bookings: 7 }
];

const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 3500 },
  { month: "Mar", revenue: 3000 },
  { month: "Apr", revenue: 4500 }
];

export default function OwnerDashboard() {
  return (
    <div className="owner-dashboard">

      <h1 className="dashboard-title">Owner Dashboard</h1>

      {/* Stats Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Spaces</h3>
          <p>12</p>
        </div>

        <div className="dashboard-card">
          <h3>Today's Bookings</h3>
          <p>5</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Earnings</h3>
          <p>₹4500</p>
        </div>

      </div>


      {/* Charts Section */}

      <div className="charts-section">

        {/* Booking Chart */}

        <div className="chart-card">
          <h3>Weekly Bookings</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#6d28d9"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>


        {/* Revenue Chart */}

        <div className="chart-card">
          <h3>Revenue Overview</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6d28d9" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>


      {/* Parking Status */}

      <div className="parking-status">

        <h3>Parking Space Status</h3>

        <div className="status-grid">

          <div className="status available">Available: 7</div>
          <div className="status booked">Booked: 3</div>
          <div className="status maintenance">Maintenance: 2</div>

        </div>

      </div>

    </div>
  );
}