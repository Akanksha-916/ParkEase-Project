import React, { useState } from "react";
import "./OwnerDashboard.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selectedStat, setSelectedStat] = useState(null);

  // Example detailed data
  const details = {
    spaces: ["Space A", "Space B", "Space C", "Space D"],
    bookings: [
      { id: 1, date: "10 Mar", slot: "A1", user: "John" },
      { id: 2, date: "11 Mar", slot: "B3", user: "Alice" }
    ],
    earnings: [
      { id: 1, amount: 1200, date: "10 Mar" },
      { id: 2, amount: 900, date: "11 Mar" }
    ]
  };

  return (
    <div className="owner-dashboard">
      <h1 className="dashboard-title">Owner Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div
          className="dashboard-card"
          onClick={() => setSelectedStat(selectedStat === "spaces" ? null : "spaces")}
        >
          <h3>Total Spaces</h3>
          <p>12</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => setSelectedStat(selectedStat === "bookings" ? null : "bookings")}
        >
          <h3>Today's Bookings</h3>
          <p>5</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => setSelectedStat(selectedStat === "earnings" ? null : "earnings")}
        >
          <h3>Total Earnings</h3>
          <p>₹4500</p>
        </div>
      </div>

      {/* Dropdown/Popup for Selected Card */}
      {selectedStat && (
        <div className="detail-popup">
          <div className="detail-popup-header">
            <h3>{selectedStat === "spaces" ? "Spaces Details" : selectedStat === "bookings" ? "Bookings Details" : "Earnings Details"}</h3>
            <button onClick={() => setSelectedStat(null)}>✕</button>
          </div>

          <div className="detail-popup-body">
            {selectedStat === "spaces" &&
              details.spaces.map((space, idx) => (
                <div key={idx} className="detail-card">{space}</div>
              ))
            }

            {selectedStat === "bookings" &&
              details.bookings.map((b) => (
                <div key={b.id} className="detail-card">
                  <p><strong>User:</strong> {b.user}</p>
                  <p><strong>Slot:</strong> {b.slot}</p>
                  <p><strong>Date:</strong> {b.date}</p>
                </div>
              ))
            }

            {selectedStat === "earnings" &&
              details.earnings.map((e) => (
                <div key={e.id} className="detail-card">
                  <p><strong>Amount:</strong> ₹{e.amount}</p>
                  <p><strong>Date:</strong> {e.date}</p>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Weekly Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#6d28d9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

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
    </div>
  );
}