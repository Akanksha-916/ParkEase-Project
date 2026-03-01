import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  UsersRound,
  Activity,
  BrainCircuit,
  BadgePercent
} from 'lucide-react';

// ---------------- STYLES ----------------
const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 100,
    fontFamily: "'Inter', sans-serif",
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '12px',
    marginBottom: '40px',
  },
  logoIcon: {
    backgroundColor: '#4f46e5',
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItem: (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    color: isActive ? '#4f46e5' : '#64748b',
    backgroundColor: isActive ? '#f0f3ff' : 'transparent',
    borderRight: isActive ? '4px solid #4f46e5' : 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    textDecoration: 'none',
  }),
  profileSection: {
    padding: '24px',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: 'auto',
  }
};

// ---------------- SIDEBAR ----------------
const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoSection}>
        <div style={styles.logoIcon}>
          <MapPin size={20} color="white"/>
        </div>
        <div>
          <h1 style={{margin:0, fontSize: '20px', color: '#1e293b'}}>ParkEasy</h1>
          <p style={{margin:0, fontSize:'11px', color: '#64748b'}}>Admin Panel</p>
        </div>
      </div>

      <nav style={{flexGrow:1}}>
        <NavLink to="/AdminDashboard" style={({isActive}) => styles.navItem(isActive)}>
          <LayoutDashboard size={20}/> Dashboard
        </NavLink>

        <NavLink to="/ParkingManagement" style={({isActive}) => styles.navItem(isActive)}>
          <MapPin size={20}/> Parking Management
        </NavLink>

        <NavLink to="/UserManagement" style={({isActive}) => styles.navItem(isActive)}>
          <UsersRound size={20}/> Users & Drivers
        </NavLink>

        <NavLink to="/Activitylogs" style={({isActive}) => styles.navItem(isActive)}>
          <Activity size={20}/> Activity Logs
        </NavLink>

        <NavLink to="/Pricing" style={({isActive}) => styles.navItem(isActive)}>
          <BadgePercent size={20}/> Dynamic Pricing
        </NavLink>
      </nav>

      <div style={styles.profileSection}>
        <div style={{
          width:'40px', height:'40px', backgroundColor:'#4f46e5',
          color:'white', borderRadius:'50%', display:'flex',
          alignItems:'center', justifyContent:'center', fontWeight: 'bold'
        }}>
          A
        </div>
        <div>
          <p style={{margin:0, fontSize: '14px', fontWeight: '600'}}>Admin User</p>
          <p style={{margin:0, fontSize:'12px', color: '#64748b'}}>Super Admin</p>
        </div>
      </div>
    </aside>
  );
};

// ---------------- ADMIN LAYOUT ----------------
const AdminLayout = () => {
  return (
    <div style={{display:'flex', backgroundColor:'#f8faff', minHeight:'100vh'}}>
      <Sidebar />
      <main style={{marginLeft:'260px', flexGrow:1, padding:'32px'}}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;