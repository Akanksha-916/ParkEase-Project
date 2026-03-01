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

// Mock data integration
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
  const [userData, setUserData] = useState(initialUserData);

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your personal information and preferences</p>
      </header>

      {/* Main Profile Card */}
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
            <p className="sub-text">{userData.phone}</p>
          </div>
        </div>
        <div className="hero-right">
          <div className="points-badge">
            <Award size={24} className="award-icon" />
            <span className="points-value">{userData.points}</span>
            <span className="points-label">Points</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Total Bookings</span>
            <TrendingUp size={20} className="icon-blue" />
          </div>
          <div className="stat-value">28</div>
          <div className="stat-footer">+12% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Cancelled</span>
            <MapPin size={20} className="icon-purple" />
          </div>
          <div className="stat-value">3</div>
          <div className="stat-footer">Quick access saved</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Total Expenses</span>
            <Award size={20} className="icon-green" />
          </div>
          <div className="stat-value">$45</div>
          <div className="stat-footer">With smart bookings</div>
        </div>
      </div>

      {/* Personal Information Form */}
      <section className="info-section">
        <div className="section-header">
          <h2>Personal Information</h2>
          <button className="edit-link" onClick={() => setIsEditing(!isEditing)}>
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
            <label><Mail size={16} /> Email Address</label>
            <input 
              type="email" 
              defaultValue={userData.email} 
              disabled={!isEditing} 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label><Phone size={16} /> Phone Number</label>
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
          <div className="form-group full-width">
            <label><Car size={16} /> Vehicle Type</label>
            <select disabled={!isEditing} className="form-input select-input">
              <option>Sedan</option>
              <option>SUV</option>
              <option>Truck</option>
            </select>
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
        className={`switch ${enabled ? 'active' : ''}`} 
        onClick={() => setEnabled(!enabled)}
      >
        <span className="slider" />
      </button>
    </div>
  );
}