import React, { useState } from 'react';
import { 
  Users, 
  Car, 
  Search, 
  User as UserIcon, 
  UserCheck, 
  UserX,
  Bell,
  Settings
} from 'lucide-react';
import './UserManagement.css';

const initialUsers = [
  { id: 1, name: 'John Smith', email: 'john.smith@email.com', type: 'user', status: 'active', joinDate: '2024-01-15', totalBookings: 24, phone: '+1 234-567-8901' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', type: 'driver', status: 'active', joinDate: '2024-02-20', totalBookings: 18, phone: '+1 234-567-8902' },
  { id: 3, name: 'Mike Wilson', email: 'mike.w@email.com', type: 'user', status: 'pending', joinDate: '2026-02-10', totalBookings: 0, phone: '+1 234-567-8903' },
  { id: 4, name: 'Emma Davis', email: 'emma.davis@email.com', type: 'driver', status: 'active', joinDate: '2023-11-05', totalBookings: 45, phone: '+1 234-567-8904' },
  { id: 5, name: 'James Brown', email: 'james.b@email.com', type: 'user', status: 'blocked', joinDate: '2024-03-12', totalBookings: 8, phone: '+1 234-567-8905' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const updateUserStatus = (id, newStatus) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filterType === 'all' || user.type === filterType;
    const statusMatch = filterStatus === 'all' || user.status === filterStatus;
    return searchMatch && typeMatch && statusMatch;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="um-container">
      {/* Header Section */}
      <header className="um-header">
        <div className="header-titles">
          <h2>Users & Drivers</h2>
          <p>Welcome back, Admin</p>
        </div>
        <div className="header-actions">
          <div className="notification-wrapper">
            <Bell size={22} />
            <span className="notification-dot"></span>
          </div>
          <Settings size={22} className="settings-icon" />
        </div>
      </header>

      {/* Stats Cards */}
      <div className="um-stats-grid">
        <div className="um-stat-card">
          <div className="um-icon-box blue-bg"><Users size={24} /></div>
          <div className="um-stat-info">
            <p>Total Users</p>
            <h3>5</h3>
          </div>
        </div>
        <div className="um-stat-card">
          <div className="um-icon-box purple-bg"><Car size={24} /></div>
          <div className="um-stat-info">
            <p>Total Drivers</p>
            <h3>3</h3>
          </div>
        </div>
        <div className="um-stat-card">
          <div className="um-icon-box yellow-bg"><UserCheck size={24} /></div>
          <div className="um-stat-info">
            <p>Pending</p>
            <h3>2</h3>
          </div>
        </div>
        <div className="um-stat-card">
          <div className="um-icon-box red-bg"><UserX size={24} /></div>
          <div className="um-stat-info">
            <p>Blocked</p>
            <h3>1</h3>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="um-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="select-group">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="user">User</option>
            <option value="driver">Driver</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="um-table-card">
        <table className="um-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Join Date</th>
              <th>Bookings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-profile">
                    <div className="avatar-circle">{getInitials(user.name)}</div>
                    <div className="user-details">
                      <p className="name">{user.name}</p>
                      <p className="email">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`type-badge ${user.type}`}>
                    {user.type === 'user' ? <UserIcon size={12} /> : <Car size={12} />}
                    {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  </span>
                </td>
                <td><p className="contact-text">{user.phone}</p></td>
                <td><p className="date-text">{user.joinDate}</p></td>
                <td><p className="booking-count">{user.totalBookings}</p></td>
                <td>
                  <span className={`status-badge ${user.status}`}>{user.status}</span>
                </td>
                <td>
                  {user.status === 'pending' ? (
                    <button className="action-btn approve" onClick={() => updateUserStatus(user.id, 'active')}>Approve</button>
                  ) : (
                    <button 
                      className={`action-btn ${user.status === 'blocked' ? 'unblock' : 'block'}`}
                      onClick={() => updateUserStatus(user.id, user.status === 'blocked' ? 'active' : 'blocked')}
                    >
                      {user.status === 'blocked' ? 'Unblock' : 'Block'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;