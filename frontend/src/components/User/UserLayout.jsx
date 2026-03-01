import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, User, Calendar, CreditCard } from "lucide-react";

const styles = {
  sidebar: {
    width: "250px",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    padding: "20px",
    height: "100vh",
    position: "fixed",
  },
  navItem: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 15px",
    marginBottom: "10px",
    textDecoration: "none",
    color: isActive ? "#4f46e5" : "#6b7280",
    backgroundColor: isActive ? "#eef2ff" : "transparent",
    borderRadius: "8px",
    fontWeight: isActive ? "600" : "400",
  }),
};

export default function UserLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={styles.sidebar}>
        <h2 style={{ marginBottom: "30px" }}>ParkEasy</h2>

        <NavLink to="/dashboard" style={({ isActive }) => styles.navItem(isActive)}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="/dashboard/bookings" style={({ isActive }) => styles.navItem(isActive)}>
          <Calendar size={18} /> My Bookings
        </NavLink>

        <NavLink to="/dashboard/payments" style={({ isActive }) => styles.navItem(isActive)}>
          <CreditCard size={18} /> Payments
        </NavLink>

        <NavLink to="/dashboard/profile" style={({ isActive }) => styles.navItem(isActive)}>
          <User size={18} /> Profile
        </NavLink>
      </aside>

      <main style={{ marginLeft: "250px", padding: "30px", width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
}