import React from "react";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Navigation,
  Clock,
  CreditCard,
  Star,
  User,
  TrendingUp
} from "lucide-react";

export default function UserDashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">ParkEase</h2>
        <ul>
          <li className="active"><MapPin size={18}/> Dashboard</li>
          <li onClick={() => navigate("/parking")}><Navigation size={18}/> Find Parking</li>
          <li><Clock size={18}/> My Bookings</li>
          <li><CreditCard size={18}/> Payments</li>
          <li onClick={() => navigate("/profile")}><User size={18}/> Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* PREMIUM WELCOME BANNER */}
        <div className="welcome-banner">
          <div>
            <h1>Welcome back, Nilakshi 👋</h1>
            <p>Your smart parking assistant is ready.</p>
            <button
              className="premium-btn"
              onClick={() => navigate("/parking")}
            >
              🚗 Book a Slot
            </button>
          </div>
          <TrendingUp size={70} className="banner-icon"/>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card glow">
            <h3>Total Bookings</h3>
            <p>24</p>
          </div>

          <div className="stat-card glow">
            <h3>Active Parking</h3>
            <p>2</p>
          </div>

          <div className="stat-card glow">
            <h3>Saved Locations</h3>
            <p>5</p>
          </div>

          <div className="stat-card glow">
            <h3>Wallet Balance</h3>
            <p>₹1,250</p>
          </div>
        </div>

        {/* Availability Section */}
        <div className="availability-section">
          <h2>Live Parking Availability</h2>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>75% slots available near you</p>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h2>Recent Activity</h2>

          <div className="activity-card">
            <span>🚗 Booked MG Road Parking</span>
            <span>Today</span>
          </div>

          <div className="activity-card">
            <span>💳 Payment Successful</span>
            <span>Yesterday</span>
          </div>

          <div className="activity-card">
            <span>⭐ Rated City Mall Parking</span>
            <span>2 days ago</span>
          </div>

        </div>

      </div>
    </div>
  );
}