import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, Search, Calendar, Car, User, Bell, ChevronDown 
} from "lucide-react";

export default function AppLayout() {

  const location = useLocation();
  const mockUser = { name: "Alex Johnson", email: "alex.johnson@email.com" };

  return (
    <>
      <style>{`
        .top-nav { 
          background: white; 
          height: 70px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 0 40px; 
          border-bottom: 1px solid #F0F0F0; 
          position: sticky; 
          top: 0; 
          z-index: 1000; 
          font-family: 'Inter', sans-serif;
        }
        .nav-logo-section { display: flex; align-items: center; }
        .logo { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 20px; color: #6366F1; text-decoration: none; }
        .logo-icon { background: #6366F1; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .nav-controls-section { display: flex; align-items: center; gap: 40px; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-item { text-decoration: none; color: #666; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
        .nav-item:hover { color: #6366F1; }
        .nav-item.active { color: #6366F1; font-weight: 700; }
        .nav-actions { display: flex; align-items: center; gap: 20px; padding-left: 20px; border-left: 1px solid #F1F1F1; }
        .notification-bell { position: relative; color: #666; cursor: pointer; }
        .notification-bell .dot { position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #EF4444; border-radius: 50%; border: 2px solid white; }
        .user-profile { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .user-profile img { width: 34px; height: 34px; border-radius: 50%; background: #F3F4F6; }
        .user-info { display: flex; flex-direction: column; }
        .user-name { font-size: 13px; font-weight: 700; color: #1A1A1A; }
        .user-email { font-size: 11px; color: #999; }
      `}</style>

      <nav className="top-nav">

        <div className="nav-logo-section">
          <Link to="/" className="logo">
            <div className="logo-icon">P</div>
            <span>ParkEasy</span>
          </Link>
        </div>

        <div className="nav-controls-section">

          <div className="nav-links">

            <Link 
              to="/UserDashboard" 
              className={`nav-item ${location.pathname === "/UserDashboard" ? "active" : ""}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link 
              to="/Parking" 
              className={`nav-item ${location.pathname === "/Parking" ? "active" : ""}`}
            >
              <Search size={18} /> Search Parking
            </Link>

            {/* ✅ FIXED PATH (REMOVE .js) */}
            <Link 
              to="/Reservation" 
              className={`nav-item ${location.pathname === "/Reservation" ? "active" : ""}`}
            >
              <Calendar size={18} /> My Reservations
            </Link>

            {/* <Link to="/vehicles" className="nav-item">
              <Car size={18} /> My Vehicles
            </Link> */}

            <Link to="/Profile" className="nav-item">
              <User size={18} /> Profile
            </Link>

          </div>

          <div className="nav-actions">

            <div className="notification-bell">
              <Bell size={20} />
              <div className="dot"></div>
            </div>

            <div className="user-profile">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
              <div className="user-info">
                <span className="user-name">{mockUser.name}</span>
                <span className="user-email">{mockUser.email}</span>
              </div>
              <ChevronDown size={16} color="#999" />
            </div>

          </div>

        </div>

      </nav>

      {/* ⭐ VERY IMPORTANT — renders routed pages */}
      <Outlet />

    </>
  );
}