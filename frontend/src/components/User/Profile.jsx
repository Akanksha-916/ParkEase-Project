import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Car,
  MapPin,
  Bell,
  Shield,
  Camera,
  Award,
  TrendingUp
} from "lucide-react";
import "./Profile.css";

const initialUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  vehicleNumber: "ABC-1234",
  vehicleType: "Sedan",
  points: 450,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeStat, setActiveStat] = useState(null);
  const [userData] = useState(initialUserData);

  const bookings = [
    { id: 1, location: "Mall Parking A1", date: "3 March 2026", price: "$10" },
    { id: 2, location: "City Center B2", date: "27 Feb 2026", price: "$12" }
  ];

  const cancelled = [
    { id: 1, location: "Airport Parking", date: "20 Feb 2026" }
  ];

  const expenses = [
    { id: 1, location: "Downtown Parking", date: "10 Feb 2026", price: "$15" },
    { id: 2, location: "Metro Station", date: "15 Feb 2026", price: "$20" }
  ];

  return (
    <div className="profile-container">

      <header className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your personal information and preferences</p>
      </header>

      {/* HERO */}
      <div className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="avatar-wrapper">
            <img src={userData.avatar} alt="Profile" className="profile-img" />
            <button className="camera-btn">
              <Camera size={14} />
            </button>
          </div>

          <div className="user-meta">
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
          </div>
        </div>

        <div className="points-badge">
          <Award size={22} />
          <span className="points-value">{userData.points}</span>
          <span className="points-label">Points</span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card" onClick={() => setActiveStat("bookings")}>
          <div className="stat-header">
            <span>Total Bookings</span>
            <TrendingUp size={20} className="icon-blue" />
          </div>
          <div className="stat-value">28</div>
          <div className="stat-footer">+12% from last month</div>
        </div>

        <div className="stat-card" onClick={() => setActiveStat("cancelled")}>
          <div className="stat-header">
            <span>Cancelled</span>
            <MapPin size={20} className="icon-purple" />
          </div>
          <div className="stat-value">3</div>
          <div className="stat-footer">Quick access saved</div>
        </div>

        <div className="stat-card" onClick={() => setActiveStat("expenses")}>
          <div className="stat-header">
            <span>Total Expenses</span>
            <Award size={20} className="icon-green" />
          </div>
          <div className="stat-value">$45</div>
          <div className="stat-footer">With smart bookings</div>
        </div>

      </div>

      {/* DETAILS PANEL */}

      {activeStat && (
        <div className="details-panel">

          <div className="details-header">
            <h2>
              {activeStat === "bookings" && "Booking History"}
              {activeStat === "cancelled" && "Cancelled Bookings"}
              {activeStat === "expenses" && "Expense History"}
            </h2>

            <button
              className="close-btn"
              onClick={() => setActiveStat(null)}
            >
              Close
            </button>
          </div>

          {/* BOOKINGS */}

          {activeStat === "bookings" &&
            bookings.map((b) => (
              <div className="booking-card" key={b.id}>
                <div className="booking-info">
                  <h3>{b.location}</h3>
                  <p>{b.date}</p>
                  <p>Amount: {b.price}</p>
                </div>

                <div className="booking-actions">
                  <button className="btn-book">Book Again</button>
                  <button className="btn-delete">Delete</button>
                </div>
              </div>
            ))}

          {/* CANCELLED */}

          {activeStat === "cancelled" &&
            cancelled.map((c) => (
              <div className="booking-card" key={c.id}>
                <div className="booking-info">
                  <h3>{c.location}</h3>
                  <p>{c.date}</p>
                </div>

                <div className="booking-actions">
                  <button className="btn-book">Book Again</button>
                </div>
              </div>
            ))}

          {/* EXPENSES */}

          {activeStat === "expenses" &&
            expenses.map((e) => (
              <div className="booking-card" key={e.id}>
                <div className="booking-info">
                  <h3>{e.location}</h3>
                  <p>{e.date}</p>
                  <p>Amount: {e.price}</p>
                </div>

                <div className="booking-actions">
                  <button className="btn-book">Book Again</button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* PERSONAL INFO */}

      <section className="info-section">
        <div className="section-header">
          <h2>Personal Information</h2>

          <button
            className="edit-link"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label><User size={16} /> Full Name</label>
            <input
              type="text"
              defaultValue={userData.name}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label><Mail size={16} /> Email</label>
            <input
              type="email"
              defaultValue={userData.email}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label><Phone size={16} /> Phone</label>
            <input
              type="text"
              defaultValue={userData.phone}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label><Car size={16} /> Vehicle Number</label>
            <input
              type="text"
              defaultValue={userData.vehicleNumber}
              disabled={!isEditing}
              className="form-input"
            />
          </div>

        </div>
      </section>

      {/* Notification Preferences */}
      <section className="info-section">
        <div className="section-header-simple">
          <Bell size={22} className="header-icon-purple" />
          <h2>Notification Preferences</h2>
        </div>
        <div className="toggle-list">
          <ToggleItem 
            title="Booking Confirmations" 
            desc="Receive confirmation emails and SMS for new bookings" 
            defaultChecked 
          />
          <ToggleItem 
            title="Expiry Alerts" 
            desc="Get notified 30 minutes before your booking expires" 
            defaultChecked 
          />
          <ToggleItem 
            title="Smart Recommendations" 
            desc="Receive AI-powered parking suggestions based on your history" 
            defaultChecked 
          />
          <ToggleItem 
            title="Special Offers" 
            desc="Get notified about discounts and promotions" 
            defaultChecked 
          />
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="info-section">
        <div className="section-header-simple">
          <Shield size={22} className="header-icon-purple" />
          <h2>Privacy & Security</h2>
        </div>
        <div className="toggle-list">
          <ToggleItem 
            title="Share Location Data" 
            desc="Allow ParkEasy to access your location for better recommendations" 
            defaultChecked 
          />
          <ToggleItem 
            title="Save Booking History" 
            desc="Store your booking history for analytics and recommendations" 
            defaultChecked 
          />
        </div>
      </section>
    </div>
  );
}


function ToggleItem({ title, desc, defaultChecked }) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="toggle-row">
      <div className="toggle-text">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>

      <button
        className={`switch ${enabled ? "active" : ""}`}
        onClick={() => setEnabled(!enabled)}
      >
        <span className="slider" />
      </button>
    </div>
  );
}