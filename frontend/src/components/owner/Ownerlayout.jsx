import React from "react";
import { Outlet } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";
import "./Owner.css";

export default function OwnerLayout() {
  return (
    <div className="owner-layout">
      
      <OwnerSidebar />

      <div className="owner-content">
        <Outlet />
      </div>

    </div>
  );
}