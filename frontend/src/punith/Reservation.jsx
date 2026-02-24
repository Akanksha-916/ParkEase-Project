import React, { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Navigation,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import "./Reservation.css";

export default function Reservation() {
  // Dynamic bookings state
  const [activeBookings, setActiveBookings] = useState([
    {
      id: "B001",
      name: "Downtown Plaza Parking",
      slot: "A-45",
      date: "2026-02-14",
      timeStart: "14:00",
      timeEnd: "18:00",
      price: 20,
      duration: 4,
      address: "123 Main Street, Downtown",
      isEditing: false
    }
  ]);

  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: "B002",
      name: "Central Mall Parking",
      slot: "B-12",
      date: "2026-02-16",
      timeStart: "10:00",
      timeEnd: "13:00",
      price: 9,
      duration: 3,
      address: "456 Oak Avenue, Central District",
      isEditing: false
    }
  ]);

  const handleCancel = (bookingId, type) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      if (type === "active") {
        setActiveBookings(activeBookings.filter(b => b.id !== bookingId));
      } else {
        setUpcomingBookings(upcomingBookings.filter(b => b.id !== bookingId));
      }
    }
  };

  const handleModifyToggle = (bookingId, type) => {
    const toggleList = (list, setList) => {
      setList(list.map(b => b.id === bookingId ? {...b, isEditing: !b.isEditing} : {...b, isEditing: false}));
    };
    if(type === "active") toggleList(activeBookings, setActiveBookings);
    else toggleList(upcomingBookings, setUpcomingBookings);
  };

  const handleSaveModify = (bookingId, type, updatedBooking) => {
    const updateList = (list, setList) => {
      setList(list.map(b => b.id === bookingId ? {...updatedBooking, isEditing: false} : b));
    };
    if(type === "active") updateList(activeBookings, setActiveBookings);
    else updateList(upcomingBookings, setUpcomingBookings);
  };

  const renderModifyForm = (booking, type) => (
    <div className="modify-inline-form">
      <div className="modify-card">
        <h4>Modify Booking</h4>
        <label>Slot</label>
        <input 
          type="text" 
          value={booking.slot} 
          onChange={e => booking.slot = e.target.value} 
        />
        <label>Date</label>
        <input 
          type="date" 
          value={booking.date} 
          onChange={e => booking.date = e.target.value} 
        />
        <label>Start Time</label>
        <input 
          type="time" 
          value={booking.timeStart} 
          onChange={e => booking.timeStart = e.target.value} 
        />
        <label>End Time</label>
        <input 
          type="time" 
          value={booking.timeEnd} 
          onChange={e => booking.timeEnd = e.target.value} 
        />
        <label>Duration (hours)</label>
        <input 
          type="number" 
          value={booking.duration} 
          onChange={e => booking.duration = e.target.value} 
        />
        <div className="modal-actions">
          <button onClick={() => handleSaveModify(booking.id, type, booking)}>Save</button>
          <button onClick={() => handleModifyToggle(booking.id, type)}>Close</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bookings-wrapper">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your active and upcoming parking reservations</p>
      </div>

      {/* Active Bookings */}
      {activeBookings.map(booking => (
        <div key={booking.id} className="active-card">
          <div className="active-card-header">
            <div className="active-title-area">
              <div className="status-indicator">
                <CheckCircle2 size={16} />
                <span>Active Booking</span>
              </div>
              <h2>{booking.name}</h2>
            </div>
            <div className="active-price-area">
              <span className="price-tag">${booking.price}</span>
              <span className="duration-tag">{booking.duration} hours</span>
            </div>
          </div>

          <div className="glass-info-bar">
            <div className="info-column">
              <label>Booking ID</label>
              <div className="info-value">{booking.id}</div>
            </div>
            <div className="info-column">
              <label>Slot Number</label>
              <div className="info-value">{booking.slot}</div>
            </div>
            <div className="info-column">
              <label>Date</label>
              <div className="info-value">{booking.date}</div>
            </div>
          </div>

          <div className="active-details">
            <div className="detail-row">
              <MapPin size={18} />
              <span>{booking.address}</span>
            </div>
            <div className="detail-row">
              <Clock size={18} />
              <span>{booking.timeStart} - {booking.timeEnd}</span>
            </div>
          </div>

          <div className="active-actions">
            <button className="btn-get-directions">
              <Navigation size={18} /> Get Directions
            </button>
            <button className="btn-modify-active" onClick={() => handleModifyToggle(booking.id, "active")}>
              <Edit3 size={18} /> Modify
            </button>
            <button className="btn-modify-active" onClick={() => handleCancel(booking.id, "active")}>
              <XCircle size={18} /> Cancel
            </button>
          </div>

          {booking.isEditing && renderModifyForm(booking, "active")}
        </div>
      ))}

      {/* Upcoming Bookings */}
      <div className="upcoming-container">
        <h2 className="upcoming-section-title">Upcoming Bookings</h2>
        {upcomingBookings.map(booking => (
          <div key={booking.id} className="upcoming-card">
            <div className="upcoming-main-info">
              <div className="upcoming-top">
                <h3>{booking.name}</h3>
                <span className="badge-upcoming">upcoming</span>
                <div className="upcoming-price-mobile">
                  <span className="price-purple">${booking.price}</span>
                  <span className="duration-small">{booking.duration} hours</span>
                </div>
              </div>

              <div className="upcoming-loc">
                <MapPin size={14} />
                <span>{booking.address}</span>
              </div>

              <div className="upcoming-grid">
                <div className="grid-item">
                  <label>Booking ID</label>
                  <div className="grid-val">{booking.id}</div>
                </div>
                <div className="grid-item">
                  <label>Date</label>
                  <div className="grid-val">{booking.date}</div>
                </div>
                <div className="grid-item">
                  <label>Time</label>
                  <div className="grid-val">{booking.timeStart} - {booking.timeEnd}</div>
                </div>
                <div className="grid-item">
                  <label>Slot</label>
                  <div className="grid-val">{booking.slot}</div>
                </div>
              </div>
            </div>

            <div className="upcoming-side-actions">
              <div className="side-price-group">
                <span className="price-purple">${booking.price}</span>
                <span className="duration-small">{booking.duration} hours</span>
              </div>
              <div className="side-btns">
                <button className="btn-up-modify" onClick={() => handleModifyToggle(booking.id, "upcoming")}>
                  <Edit3 size={14} /> Modify
                </button>
                <button className="btn-up-cancel" onClick={() => handleCancel(booking.id, "upcoming")}>
                  <Trash2 size={14} /> Cancel
                </button>
              </div>
            </div>

            {booking.isEditing && renderModifyForm(booking, "upcoming")}
          </div>
        ))}
      </div>
    </div>
  );
}