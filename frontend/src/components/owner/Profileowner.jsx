import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Camera,
  TrendingUp,
  Car,
  Building
} from "lucide-react";

import "./Profileowner.css";

const initialOwnerData = {
  name: "Alex Johnson",
  email: "owner@parkease.com",
  phone: "+91 9876543210",
  parkingName: "City Center Parking",
  location: "Mumbai, India",
  totalSlots: 50,
  availableSlots: 18,
  totalRevenue: "$4200",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Owner"
};

export default function ProfileOwner() {

  const [isEditing, setIsEditing] = useState(false);
  const [activeStat, setActiveStat] = useState(null);
  const [ownerData] = useState(initialOwnerData);

  const bookings = [
    { id: 1, user: "Rahul Sharma", slot: "A1", date: "3 March 2026", amount: "$10" },
    { id: 2, user: "Priya Patel", slot: "B3", date: "2 March 2026", amount: "$12" }
  ];

  const slots = [
    { id: 1, slot: "A1", status: "Occupied" },
    { id: 2, slot: "A2", status: "Available" },
    { id: 3, slot: "A3", status: "Available" }
  ];

  const revenue = [
    { id: 1, date: "1 March 2026", amount: "$120" },
    { id: 2, date: "2 March 2026", amount: "$150" }
  ];

  return (
    <div className="profile-container">

      <header className="profile-header">
        <h1>Owner Profile</h1>
        <p>Manage your parking business and account settings</p>
      </header>

      {/* HERO CARD */}

      <div className="profile-hero-card">

        <div className="profile-hero-left">

          <div className="avatar-wrapper">
            <img src={ownerData.avatar} alt="owner" className="profile-img" />
            <button className="camera-btn">
              <Camera size={14}/>
            </button>
          </div>

          <div className="user-meta">
            <h2>{ownerData.name}</h2>
            <p>{ownerData.email}</p>
            <p>{ownerData.phone}</p>
          </div>

        </div>

        <div className="points-badge">
          <TrendingUp size={22}/>
          <span className="points-value">{ownerData.totalRevenue}</span>
          <span className="points-label">Total Revenue</span>
        </div>

      </div>

      {/* OWNER STATS */}

      <div className="stats-grid">

        <div className="stat-card" onClick={()=>setActiveStat("bookings")}>
          <div className="stat-header">
            <span>Total Bookings</span>
            <Car size={20} className="icon-blue"/>
          </div>

          <div className="stat-value">142</div>
          <div className="stat-footer">Bookings received</div>
        </div>


        <div className="stat-card" onClick={()=>setActiveStat("slots")}>
          <div className="stat-header">
            <span>Parking Slots</span>
            <Building size={20} className="icon-purple"/>
          </div>

          <div className="stat-value">{ownerData.availableSlots}/{ownerData.totalSlots}</div>
          <div className="stat-footer">Available slots</div>
        </div>


        <div className="stat-card" onClick={()=>setActiveStat("revenue")}>
          <div className="stat-header">
            <span>Revenue History</span>
            <TrendingUp size={20} className="icon-green"/>
          </div>

          <div className="stat-value">{ownerData.totalRevenue}</div>
          <div className="stat-footer">Total earnings</div>
        </div>

      </div>

      {/* DETAILS PANEL */}

      {activeStat && (

        <div className="details-panel">

          <div className="details-header">

            <h2>
              {activeStat === "bookings" && "Recent Bookings"}
              {activeStat === "slots" && "Parking Slot Status"}
              {activeStat === "revenue" && "Revenue History"}
            </h2>

            <button
              className="close-btn"
              onClick={()=>setActiveStat(null)}
            >
              Close
            </button>

          </div>


          {/* BOOKINGS */}

          {activeStat === "bookings" &&
            bookings.map((b)=>(
              <div className="booking-card" key={b.id}>

                <div className="booking-info">
                  <h3>{b.user}</h3>
                  <p>Slot: {b.slot}</p>
                  <p>{b.date}</p>
                  <p>Amount: {b.amount}</p>
                </div>

              </div>
            ))
          }


          {/* SLOT STATUS */}

          {activeStat === "slots" &&
            slots.map((s)=>(
              <div className="booking-card" key={s.id}>

                <div className="booking-info">
                  <h3>Slot {s.slot}</h3>
                  <p>Status: {s.status}</p>
                </div>

              </div>
            ))
          }


          {/* REVENUE */}

          {activeStat === "revenue" &&
            revenue.map((r)=>(
              <div className="booking-card" key={r.id}>

                <div className="booking-info">
                  <h3>{r.date}</h3>
                  <p>Earnings: {r.amount}</p>
                </div>

              </div>
            ))
          }

        </div>
      )}


      {/* BUSINESS INFORMATION */}

      <section className="info-section">

        <div className="section-header">
          <h2>Business Information</h2>

          <button
            className="edit-link"
            onClick={()=>setIsEditing(!isEditing)}
          >
            {isEditing ? "Save" : "Edit"}
          </button>

        </div>

        <div className="form-grid">

          <div className="form-group">
            <label><User size={16}/> Owner Name</label>
            <input type="text" defaultValue={ownerData.name} disabled={!isEditing}/>
          </div>

          <div className="form-group">
            <label><Mail size={16}/> Email</label>
            <input type="email" defaultValue={ownerData.email} disabled={!isEditing}/>
          </div>

          <div className="form-group">
            <label><Phone size={16}/> Phone</label>
            <input type="text" defaultValue={ownerData.phone} disabled={!isEditing}/>
          </div>

          <div className="form-group">
            <label><Building size={16}/> Parking Name</label>
            <input type="text" defaultValue={ownerData.parkingName} disabled={!isEditing}/>
          </div>

          <div className="form-group">
            <label><MapPin size={16}/> Location</label>
            <input type="text" defaultValue={ownerData.location} disabled={!isEditing}/>
          </div>

        </div>

      </section>


      {/* NOTIFICATIONS */}

      <section className="info-section">

        <div className="section-header-simple">
          <Bell size={22}/>
          <h2>Notification Preferences</h2>
        </div>

        <ToggleItem
          title="New Booking Alerts"
          desc="Receive notifications when a new parking booking is made"
          defaultChecked
        />

        <ToggleItem
          title="Payment Notifications"
          desc="Get notified when payments are received"
          defaultChecked
        />

        <ToggleItem
          title="Parking Slot Updates"
          desc="Receive updates about slot availability"
          defaultChecked
        />

      </section>


      {/* SECURITY */}

      <section className="info-section">

        <div className="section-header-simple">
          <Shield size={22}/>
          <h2>Security</h2>
        </div>

        <ToggleItem
          title="Two Factor Authentication"
          desc="Enable extra security for your account"
        />

        <ToggleItem
          title="Login Alerts"
          desc="Receive alerts when a new device logs into your account"
        />

      </section>

    </div>
  );
}


function ToggleItem({title, desc, defaultChecked}) {

  const [enabled, setEnabled] = useState(defaultChecked);

  return (

    <div className="toggle-row">

      <div className="toggle-text">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>

      <button
        className={`switch ${enabled ? "active" : ""}`}
        onClick={()=>setEnabled(!enabled)}
      >
        <span className="slider"/>
      </button>

    </div>

  );
}