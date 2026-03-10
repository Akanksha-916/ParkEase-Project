import React from "react";
import "./Booking.css";

export default function Booking() {
  return (
    <div className="booking-container">

      <h1 className="booking-title">Bookings</h1>

      {/* Booking Form */}

      <div className="booking-form">

        <h3>Create New Booking</h3>

        <div className="form-grid">

          <input type="text" placeholder="User Name" />

          <select>
            <option>Select Parking Space</option>
            <option>Space 1</option>
            <option>Space 2</option>
            <option>Space 3</option>
          </select>

          <input type="date" />

          <input type="time" />

        </div>

        <button className="book-btn">Confirm Booking</button>

      </div>


      {/* Booking List */}

      <div className="booking-table">

        <h3>Recent Bookings</h3>

        <table>

          <thead>
            <tr>
              <th>User</th>
              <th>Space</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Rahul</td>
              <td>Space 2</td>
              <td>10 Mar</td>
              <td>10:30 AM</td>
              <td className="status confirmed">Confirmed</td>
            </tr>

            <tr>
              <td>Priya</td>
              <td>Space 1</td>
              <td>10 Mar</td>
              <td>11:00 AM</td>
              <td className="status pending">Pending</td>
            </tr>

            <tr>
              <td>Amit</td>
              <td>Space 3</td>
              <td>11 Mar</td>
              <td>09:00 AM</td>
              <td className="status confirmed">Confirmed</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}