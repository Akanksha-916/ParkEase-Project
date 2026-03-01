import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  const location = useLocation();
  const newBooking = location.state;

  // ---------------- ACTIVE BOOKINGS ----------------
  const [activeBookings, setActiveBookings] = useState([]);

  // ---------------- UPCOMING BOOKINGS ----------------
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  // ---------------- TIME CONFLICT CHECK ----------------
  const isTimeConflict = (existingBooking, newBooking) => {
    if (
      existingBooking.slot === newBooking.slot &&
      existingBooking.date === newBooking.date
    ) {
      const existingStart = existingBooking.timeStart;
      const existingEnd = existingBooking.timeEnd;
      const newStart = newBooking.timeStart;
      const newEnd = newBooking.timeEnd;

      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      ) {
        return true;
      }
    }
    return false;
  };

  // ---------------- ADD NEW BOOKING ----------------
  useEffect(() => {
    if (newBooking) {

      const conflict = activeBookings.some(existing =>
        isTimeConflict(existing, newBooking)
      );

      if (conflict) {
        alert("⚠ This slot is already booked for selected time!");
        return;
      }

      const bookingWithId = {
        id: "B" + Math.floor(Math.random() * 100000),
        ...newBooking,
        isEditing: false
      };

      setActiveBookings(prev => [bookingWithId, ...prev]);
    }

  }, [newBooking]);

  // ---------------- CANCEL ----------------
  const handleCancel = (bookingId, type) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      if (type === "active") {
        setActiveBookings(activeBookings.filter(b => b.id !== bookingId));
      } else {
        setUpcomingBookings(upcomingBookings.filter(b => b.id !== bookingId));
      }
    }
  };

  // ---------------- MODIFY TOGGLE ----------------
  const handleModifyToggle = (bookingId, type) => {
    const toggleList = (list, setList) => {
      setList(
        list.map(b =>
          b.id === bookingId
            ? { ...b, isEditing: !b.isEditing }
            : { ...b, isEditing: false }
        )
      );
    };

    if (type === "active") toggleList(activeBookings, setActiveBookings);
    else toggleList(upcomingBookings, setUpcomingBookings);
  };

  // ---------------- SAVE MODIFY ----------------
  const handleSaveModify = (bookingId, type, updatedBooking) => {
    const updateList = (list, setList) => {
      setList(
        list.map(b =>
          b.id === bookingId
            ? { ...updatedBooking, isEditing: false }
            : b
        )
      );
    };

    if (type === "active") updateList(activeBookings, setActiveBookings);
    else updateList(upcomingBookings, setUpcomingBookings);
  };

  // ---------------- MODIFY FORM ----------------
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
          <button onClick={() => handleSaveModify(booking.id, type, booking)}>
            Save
          </button>
          <button onClick={() => handleModifyToggle(booking.id, type)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bookings-wrapper">

      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your parking reservations</p>
      </div>

      {/* ---------------- ACTIVE BOOKINGS ---------------- */}
      {activeBookings.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No bookings yet.
        </p>
      ) : (
        activeBookings.map(booking => (
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
                <label>Slot</label>
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

              <button
                className="btn-modify-active"
                onClick={() => handleModifyToggle(booking.id, "active")}
              >
                <Edit3 size={18} /> Modify
              </button>

              <button
                className="btn-modify-active"
                onClick={() => handleCancel(booking.id, "active")}
              >
                <XCircle size={18} /> Cancel
              </button>
            </div>

            {booking.isEditing && renderModifyForm(booking, "active")}
          </div>
        ))
      )}

    </div>
  );
}