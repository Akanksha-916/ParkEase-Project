import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Wallet,
  User
} from "lucide-react";

import "./OwnerDashboard.css";

export default function OwnerSidebar() {

  const menuItems = [
    { name: "Dashboard", path: "/owner/dashboard", icon: <LayoutDashboard size={20}/> },
    { name: "Manage Spaces", path: "/owner/spaces", icon: <MapPin size={20}/> },
    { name: "Bookings", path: "/owner/bookings", icon: <Calendar size={20}/> },
    { name: "Earnings", path: "/owner/earnings", icon: <Wallet size={20}/> },
    { name: "Profile", path: "/owner/profileowner", icon: <User size={20}/> }
  ];

  return (
    <div className="owner-sidebar">

      <h2 className="sidebar-title">ParkEase Owner</h2>

      <ul>

        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}

      </ul>

    </div>
  );
}