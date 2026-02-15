import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RoleDashboard = () => {

  const [activeRole, setActiveRole] = useState('None');
  const navigate = useNavigate();

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold'
  };

  const activeStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#0056b3'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Select Access Level</h2>
      
      <div className="button-group">

        {/* ⭐ USER BUTTON UPDATED */}
        <button 
          style={activeRole === 'User' ? activeStyle : buttonStyle} 
          onClick={() => {
            setActiveRole('User');
            navigate("/UserDashboard"); // redirect to UserDashboard
          }}
        >
          User
        </button>

        <button 
          style={activeRole === 'Vendor' ? activeStyle : buttonStyle} 
          onClick={() => setActiveRole('Vendor')}
        >
          Vendors
        </button>

        <button 
          style={activeRole === 'Admin' ? activeStyle : buttonStyle} 
          onClick={() => {
            setActiveRole('Admin');
            navigate("/AdminDashboard"); // redirect to AdminDashboard
          }}
        >
          Admin
        </button>

      </div>

      <hr style={{ margin: '20px 0' }} />

      <div className="content-area">
        <h3>Current View: <span style={{ color: '#007bff' }}>{activeRole}</span></h3>
        <p>This is where the {activeRole.toLowerCase()} specific content would go.</p>
      </div>
    </div>
  );
};

export default RoleDashboard;