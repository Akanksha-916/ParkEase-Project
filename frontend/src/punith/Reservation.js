import React from "react";
import { 
  MapPin, 
  Clock, 
  Navigation,
  Edit3,
  Trash2,
  CheckCircle2
} from "lucide-react";
import "./Reservation.css";

export default function Reservation() {
  return (
    <div className="bookings-wrapper">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your active and upcoming parking reservations</p>
      </div>

      {/* Active Booking Card */}
      <div className="active-card">
        <div className="active-card-header">
          <div className="active-title-area">
            <div className="status-indicator">
              <CheckCircle2 size={16} />
              <span>Active Booking</span>
            </div>
            <h2>Downtown Plaza Parking</h2>
          </div>
          <div className="active-price-area">
            <span className="price-tag">$20</span>
            <span className="duration-tag">4 hours</span>
          </div>
        </div>

        {/* This is the inner glass container from the Figma */}
        <div className="glass-info-bar">
          <div className="info-column">
            <label>Booking ID</label>
            <div className="info-value">B001</div>
          </div>
          <div className="info-column">
            <label>Slot Number</label>
            <div className="info-value">A-45</div>
          </div>
          <div className="info-column">
            <label>Date</label>
            <div className="info-value">Feb 14, 2026</div>
          </div>
        </div>

        <div className="active-details">
          <div className="detail-row">
            <MapPin size={18} />
            <span>123 Main Street, Downtown</span>
          </div>
          <div className="detail-row">
            <Clock size={18} />
            <span>14:00 - 18:00</span>
          </div>
        </div>

        <div className="active-actions">
          <button className="btn-get-directions">
            <Navigation size={18} />
            Get Directions
          </button>
          <button className="btn-modify-active">
            <Edit3 size={18} />
            Modify
          </button>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="upcoming-container">
        <h2 className="upcoming-section-title">Upcoming Bookings</h2>
        <div className="upcoming-card">
          <div className="upcoming-main-info">
            <div className="upcoming-top">
              <h3>Central Mall Parking</h3>
              <span className="badge-upcoming">upcoming</span>
              <div className="upcoming-price-mobile">
                <span className="price-purple">$9</span>
                <span className="duration-small">3 hours</span>
              </div>
            </div>
            
            <div className="upcoming-loc">
              <MapPin size={14} />
              <span>456 Oak Avenue, Central District</span>
            </div>

            <div className="upcoming-grid">
              <div className="grid-item">
                <label>Booking ID</label>
                <div className="grid-val">B002</div>
              </div>
              <div className="grid-item">
                <label>Date</label>
                <div className="grid-val">Feb 16</div>
              </div>
              <div className="grid-item">
                <label>Time</label>
                <div className="grid-val">10:00 - 13:00</div>
              </div>
              <div className="grid-item">
                <label>Slot</label>
                <div className="grid-val">B-12</div>
              </div>
            </div>
          </div>

          <div className="upcoming-side-actions">
            <div className="side-price-group">
              <span className="price-purple">$9</span>
              <span className="duration-small">3 hours</span>
            </div>
            <div className="side-btns">
              <button className="btn-up-modify"><Edit3 size={14} /> Modify</button>
              <button className="btn-up-cancel"><Trash2 size={14} /> Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Tips */}
      <div className="tips-card">
        <h3>💡 Booking Tips</h3>
        <ul>
          <li className="t-blue">Arrive 5-10 minutes before your booking start time</li>
          <li className="t-purple">You'll receive an alert 30 minutes before your booking expires</li>
          <li className="t-red">Cancel at least 2 hours in advance for a full refund</li>
          <li className="t-green">Save frequent locations to favorites for quick booking</li>
        </ul>
      </div>
    </div>
  );
}