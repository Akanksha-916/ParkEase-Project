import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function UserDashboard() {

  const navigate = useNavigate();
  // ================= STATE =================
  const [activeParking, setActiveParking] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [selectedStat, setSelectedStat] = useState(null);
  const [filter, setFilter] = useState("monthly");

  // ================= TIMER =================
  useEffect(() => {
    let interval;
    if (activeParking) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeParking]);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const extendParking = () => {
    alert("Parking Extended by 30 minutes 🚗");
  };

  const endParking = () => {
    setActiveParking(false);
    alert("Parking Session Ended");
  };

  // ================= ANALYTICS DATA =================

  const monthlySpending = [
    { name: "Jan", spending: 2000 },
    { name: "Feb", spending: 2500 },
    { name: "Mar", spending: 1800 },
    { name: "Apr", spending: 3000 },
  ];

  const weeklySpending = [
    { name: "Week 1", spending: 600 },
    { name: "Week 2", spending: 800 },
    { name: "Week 3", spending: 550 },
    { name: "Week 4", spending: 900 },
  ];

  const monthlyTime = [
    { name: "Jan", hours: 12 },
    { name: "Feb", hours: 18 },
    { name: "Mar", hours: 10 },
    { name: "Apr", hours: 22 },
  ];

  const weeklyTime = [
    { name: "Week 1", hours: 3 },
    { name: "Week 2", hours: 5 },
    { name: "Week 3", hours: 4 },
    { name: "Week 4", hours: 6 },
  ];

  const spendingData =
    filter === "monthly" ? monthlySpending : weeklySpending;

  const timeData =
    filter === "monthly" ? monthlyTime : weeklyTime;

  // ================= PIE DATA =================

  const pieColors = ["#c5aced", "#8045dd", "#4605ae", "#876bb4"];

  const pieDataMap = {
    bookings: [
      { name: "Completed", value: 2 },
      { name: "Cancelled", value: 1 },
      { name: "Active", value: 1 },
    ],
    active: [
      { name: "Running Session", value: activeParking ? 1 : 0 },
      { name: "Idle", value: activeParking ? 0 : 1 },
    ],
    saved: [
      { name: "Mall", value: 2 },
      { name: "Airport", value: 2 },
      { name: "Office", value: 1 },
    ],
    cancel: [
      { name: "Refunded", value: 2 },
      { name: "Non-Refunded", value: 0 },
    ],
    default: [
      { name: "Bookings", value: 2 },
      { name: "Saved", value: 5 },
      { name: "Cancelled", value: 2 },
    ],
  };

  const pieData = pieDataMap[selectedStat] || pieDataMap.default;


  /* ================= DETAILED DATA ================= */

const bookingDetails = [
  { id: 1, location: "Airport Parking", slot: "A12", date: "12 Mar 2026", amount: 1200, status: "Completed" },
  { id: 2, location: "City Mall", slot: "B05", date: "18 Mar 2026", amount: 900, status: "Completed" },
];

const savedLocations = [
  { name: "Airport Parking", address: "Pune Airport Road" },
  { name: "City Mall", address: "MG Road Pune" },
  { name: "Office Parking", address: "Hinjewadi Phase 1" },
  { name: "Railway Station", address: "Pune Station Area" },
  { name: "IT Park", address: "Baner Road" },
];

const cancelledBookings = [
  { id: 3, location: "Metro Mall", date: "05 Mar 2026", refund: "₹500", status: "Refunded" },
  { id: 4, location: "Westend Mall", date: "08 Mar 2026", refund: "₹700", status: "Refunded" },
];

const spendingBreakdown = [
  { type: "Parking Fees", amount: "₹4000" },
  { type: "Service Charges", amount: "₹560" },
];

const timeBreakdown = [
  { location: "Airport Parking", hours: "6 hrs" },
  { location: "City Mall", hours: "4 hrs" },
  { location: "Office Parking", hours: "5.2 hrs" },
];

  // ================= UI =================

  return (
    <div className="dashboard">

      <h1 className="page-title">ParkEase Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="stats-grid">

        <div className="stat-card" onClick={() => setSelectedStat("bookings")}>
          <h3>Total Bookings</h3>
          <p>2</p>
        </div>

        <div className="stat-card" onClick={() => setSelectedStat("active")}>
          <h3>Active Parking</h3>
          <p>{activeParking ? "1" : "0"}</p>
        </div>

        <div className="stat-card" onClick={() => setSelectedStat("saved")}>
          <h3>Saved Locations</h3>
          <p>5</p>
        </div>

        <div className="stat-card" onClick={() => setSelectedStat("cancel")}>
          <h3>Cancel Booking</h3>
          <p>2</p>
        </div>
      </div>

              {/* ================= DETAILED CONTENT ================= */}
{selectedStat && (
  <div className="detail-popup">
    <div className="detail-popup-header">
      <h3>Detailed Information</h3>
      <button onClick={() => setSelectedStat(null)}>✕</button>
    </div>

    {/* BOOKINGS */}
    {selectedStat === "bookings" &&
  bookingDetails.map((item) => (
    <div key={item.id} className="detail-card-vibrant">
      <div className="detail-flex">
        <div>
          <p><strong>{item.location}</strong></p>
          <p>Slot: {item.slot}</p>
          <p>Date: {item.date}</p>
          <p>Amount: ₹{item.amount}</p>
          <p>Status: {item.status}</p>
        </div>

        <div className="booking-actions">
          <button
            className="btn-book"
            onClick={() => navigate("/dashboard/parking")}
          >
            Book Again
          </button>

          <button
            className="btn-delete"
            onClick={() =>
              alert("History Deleted (Demo Only)")
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))
}

    {/* SAVED */}
    {selectedStat === "saved" &&
  savedLocations.map((item, index) => (
    <div key={index} className="detail-card-vibrant">
      <div className="detail-flex">
        <div>
          <p><strong>{item.name}</strong></p>
          <p>{item.address}</p>
        </div>

        <button
          className="btn-book"
          onClick={() => navigate("/dashboard/parking")}
        >
          Book Now
        </button>
      </div>
    </div>
  ))
}

    {/* CANCEL */}
    {selectedStat === "cancel" &&
      cancelledBookings.map((item) => (
        <div key={item.id} className="detail-card-vibrant cancel">
          <p><strong>{item.location}</strong></p>
          <p>Date: {item.date}</p>
          <p>Refund: {item.refund}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}

    {/* SPENDING */}
    {selectedStat === "spending" &&
      spendingBreakdown.map((item, index) => (
        <div key={index} className="detail-row-vibrant">
          <span>{item.type}</span>
          <span>{item.amount}</span>
        </div>
      ))}

    {/* TIME */}
    {selectedStat === "time" &&
      timeBreakdown.map((item, index) => (
        <div key={index} className="detail-row-vibrant">
          <span>{item.location}</span>
          <span>{item.hours}</span>
        </div>
      ))}
  </div>
)}

      {/* ================= KPI + PIE ================= */}
      <div className="kpi-pie-wrapper">

        <div className="kpi-grid">
          <div className="kpi-card">
            <p>Total Spending</p>
            <h2>₹4,560</h2>
            <span className="growth positive">+12% this month</span>
          </div>

          <div className="kpi-card">
            <p>Avg Parking Time</p>
            <h2>5.2 hrs</h2>
            <span className="growth positive">+8% increase</span>
          </div>

          <div className="kpi-card">
            <p>Peak Usage Day</p>
            <h2>Saturday</h2>
            <span className="growth neutral">Stable</span>
          </div>
        </div>

        <div className="pie-card">
          <h3>
            {selectedStat
              ? `Detailed ${selectedStat} Overview`
              : "Overall Usage Summary"}
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={4}
                animationDuration={600}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>


      {/* ================= ACTIVE PARKING ================= */}
      {activeParking && (
        <div className="active-parking">
          <div>
            <h2>🚗 Active Parking</h2>
            <p><strong>Location:</strong> Airport Parking</p>
            <p><strong>Slot:</strong> A12</p>
            <p><strong>Elapsed:</strong> {formatTime()}</p>
          </div>

          <div className="active-buttons">
            <button className="btn-primary" onClick={extendParking}>
              Extend 30 mins
            </button>
            <button className="btn-danger" onClick={endParking}>
              End Session
            </button>
          </div>
        </div>
      )}

      {/* ================= MAP ================= */}
      <div className="card">
        <h2>🗺️ Nearby Parking Map</h2>
        <iframe
          title="map"
          className="map"
          src="https://maps.google.com/maps?q=pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="card analytics-card">

        <div className="analytics-header">
          <h2>Management Analytics</h2>

          <div className="toggle-group">
            <button
              className={filter === "weekly" ? "active-toggle" : ""}
              onClick={() => setFilter("weekly")}
            >
              Weekly
            </button>
            <button
              className={filter === "monthly" ? "active-toggle" : ""}
              onClick={() => setFilter("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Spending Chart */}
        <div className="chart-box premium-chart">
          <h3>Spending Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={spendingData}>
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="spending"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#colorSpending)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Chart */}
        <div className="chart-box premium-chart">
          <h3>Time Spent on Parking</h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeData}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#06b6d4"
                strokeWidth={3}
                fill="url(#colorTime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>


      </div>

    </div>
  );
}