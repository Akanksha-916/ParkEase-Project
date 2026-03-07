import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Users,
  Activity,
  DollarSign,
  Bell,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/AdminDashboard', icon: LayoutDashboard },
  { name: 'Parking', path: '/ParkingManagement', icon: MapPin },
  { name: 'Users', path: '/UserManagement', icon: Users },
  { name: 'Activity', path: '/Activitylogs', icon: Activity },
  { name: 'Pricing', path: '/Pricing', icon: DollarSign },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: "'Inter', sans-serif" }}>
      
      {/* --- TOP NAVBAR --- */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '60px'
        }}>
          
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/AdminDashboard')}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-100%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'rotate(45deg)',
                animation: 'shine 4s infinite'
              }} />
              <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', fontFamily: 'serif' }}>P</span>
            </div>
            <span style={{ fontSize: '19px', fontWeight: 800, color: '#2563eb', letterSpacing: '-0.5px' }}>
              ParkEasy
            </span>
          </div>

          {/* Navigation Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#2563eb' : (hoveredItem === item.name ? '#1d4ed8' : '#64748b'),
                  border: isActive ? '1px solid #3b82f6' : '1px solid transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.1)' : 'none',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '14px',
                })}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}

            <button style={{
              position: 'relative',
              padding: '10px',
              marginLeft: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'transform 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Bell size={22} />
              <span style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '9px',
                height: '9px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white'
              }}></span>
            </button>
            
            <button 
              onClick={() => navigate("/AdminAuth")}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '10px' }}
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>

        <div style={{ 
          height: '3px', 
          background: 'linear-gradient(to right, #a855f7, #3b82f6, #6366f1)' 
        }} />
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      {/* ADJUSTED: Reduced paddingTop to 63px to sit right under nav, removed horizontal padding/spacer div */}
      <main style={{ paddingTop: '63px' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          30% { left: 100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;