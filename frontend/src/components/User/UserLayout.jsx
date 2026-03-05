import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  Search,
  ChevronDown,
  Car
} from "lucide-react";
import "./UserLayout.css";

export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/user-auth");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setNotificationOpen(false);
    setSidebarOpen(false);
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">ParkEasy</h2>
          <X className="close-icon" onClick={() => setSidebarOpen(false)} />
        </div>

        <nav className="nav-links">
          <NavLink to="/dashboard" end className="nav-item">
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/parking" className="nav-item">
            <Car size={18} /> Find Parking
          </NavLink>

          <NavLink to="/dashboard/reservation" className="nav-item">
            <Calendar size={18} /> Reservations
          </NavLink>

          <NavLink to="/dashboard/payments" className="nav-item">
            <CreditCard size={18} /> Payments
          </NavLink>

          <NavLink to="/dashboard/profile" className="nav-item">
            <User size={18} /> Profile
          </NavLink>
        </nav>

        <div className="logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </div>
      </aside>

      {/* Main Area */}
      <div className="main">

        {/* Topbar */}
        <header className="topbar">

          <div className="topbar-left">
            <Menu
              className="menu-icon"
              onClick={() => setSidebarOpen(true)}
            />

            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search parking, bookings..." />
            </div>
          </div>

          <div className="topbar-right">

            {/* Notifications */}
            <div
              className="notification"
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setDropdownOpen(false);
              }}
            >
              <Bell size={20} />
              <span className="badge">3</span>
            </div>

            {notificationOpen && (
              <div className="notification-dropdown">
                <p>🚗 Slot booked successfully</p>
                <p>💳 Payment received</p>
                <p>⭐ Please rate your parking</p>
              </div>
            )}

            {/* User Dropdown */}
            <div
              className="user-dropdown"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setNotificationOpen(false);
              }}
            >
              <div className="avatar">N</div>
              <span>Nilakshi</span>
              <ChevronDown size={16} />
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <p onClick={() => handleNavigate("/dashboard/profile")}>
                  My Profile
                </p>
                <p onClick={() => handleNavigate("/dashboard/payments")}>
                  Payments
                </p>
                <p className="logout-text" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}

          </div>
        </header>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}