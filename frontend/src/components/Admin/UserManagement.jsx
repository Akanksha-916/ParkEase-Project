import React, { useState } from 'react';
import { 
  Users, 
  Car, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  ShieldX,
  UserCircle2
} from 'lucide-react';
import './UserManagement.css';

const initialUsers = [
  { id: 1, name: 'John Smith', email: 'john.smith@email.com', type: 'user', status: 'active', totalBookings: 24, phone: '+1 234-567-8901' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', type: 'driver', status: 'active', totalBookings: 18, phone: '+1 234-567-8902' },
  { id: 3, name: 'Mike Wilson', email: 'mike.w@email.com', type: 'user', status: 'pending', totalBookings: 0, phone: '+1 234-567-8903' },
  { id: 4, name: 'Emma Davis', email: 'emma.davis@email.com', type: 'driver', status: 'active', totalBookings: 45, phone: '+1 234-567-8904' },
  { id: 5, name: 'James Brown', email: 'james.b@email.com', type: 'user', status: 'blocked', totalBookings: 8, phone: '+1 234-567-8905' },
];

const avatarColors = [
  'linear-gradient(135deg, #7c3aed, #4f46e5)',
  'linear-gradient(135deg, #0ea5e9, #6366f1)',
  'linear-gradient(135deg, #10b981, #0ea5e9)',
  'linear-gradient(135deg, #f97316, #ef4444)',
  'linear-gradient(135deg, #a855f7, #ec4899)',
];

const statusConfig = {
  active: { label: 'Active', className: 'active', icon: CheckCircle },
  pending: { label: 'Pending Review', className: 'pending', icon: Clock },
  blocked: { label: 'Blocked', className: 'blocked', icon: XCircle },
};

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
    <div className="um-main-wrapper">
      <header className="um-header">
        <div className="header-titles">
          <h2>Users & Drivers</h2>
          <p>Admin Dashboard • Management Panel</p>
        </div>
        <div className="header-actions">
          <div className="live-indicator">
            <span className="dot"></span> Live
          </div>
        </div>
      </header>

      <div className="um-content-body">
        {/* Stats Grid */}
        <div className="um-stats-grid">
          <div className="um-stat-card stat-blue">
            <div className="stat-header">
              <div className="um-icon-box"><Users size={18} /></div>
              <span className="stat-value">{users.filter(u => u.type === 'user').length}</span>
            </div>
            <p className="stat-label">Total Users</p>
          </div>
          <div className="um-stat-card stat-purple">
            <div className="stat-header">
              <div className="um-icon-box"><Car size={18} /></div>
              <span className="stat-value">{users.filter(u => u.type === 'driver').length}</span>
            </div>
            <p className="stat-label">Total Drivers</p>
          </div>
          <div className="um-stat-card stat-yellow">
            <div className="stat-header">
              <div className="um-icon-box"><Clock size={18} /></div>
              <span className="stat-value">{users.filter(u => u.status === 'pending').length}</span>
            </div>
            <p className="stat-label">Pending Review</p>
          </div>
          <div className="um-stat-card stat-red">
            <div className="stat-header">
              <div className="um-icon-box"><XCircle size={18} /></div>
              <span className="stat-value">{users.filter(u => u.status === 'blocked').length}</span>
            </div>
            <p className="stat-label">Blocked</p>
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

        {/* Users List */}
        <div className="um-users-list">
          {filteredUsers.map((user, index) => {
            const config = statusConfig[user.status];
            const StatusIcon = config.icon;
            return (
              <div key={user.id} className="um-user-row-card transparent-card">
                <div className="user-info-section">
                  <div 
                    className="avatar-box" 
                    style={{ background: avatarColors[index % avatarColors.length] }}
                  >
                    {getInitials(user.name)}
                  </div>
                  <div className="user-meta">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>

                <div className="user-type-section">
                   <span className={`type-tag ${user.type}`}>
                     {user.type === 'user' ? <UserCircle2 size={14} /> : <Car size={14} />}
                     {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                   </span>
                </div>

                <div className="user-contact-section">
                  <p>{user.phone}</p>
                </div>

                <div className="user-bookings-section">
                  <span className="count">{user.totalBookings}</span>
                  <span className="label">bookings</span>
                </div>

                <div className="user-status-section">
                  <span className={`status-pill ${config.className}`}>
                    <StatusIcon size={14} />
                    {config.label}
                  </span>
                </div>

                <div className="user-actions-section">
                  {user.status === 'pending' ? (
                    <div className="dual-action-buttons">
                      <button className="btn-approve" onClick={() => updateUserStatus(user.id, 'active')}>
                        <ShieldCheck size={14} /> Approve
                      </button>
                      <button className="btn-block-outline" onClick={() => updateUserStatus(user.id, 'blocked')}>
                        <ShieldX size={14} /> Block
                      </button>
                    </div>
                  ) : (
                    <button 
                      className={user.status === 'blocked' ? 'btn-unblock' : 'btn-block-outline'}
                      onClick={() => updateUserStatus(user.id, user.status === 'blocked' ? 'active' : 'blocked')}
                    >
                      {user.status === 'blocked' ? <ShieldCheck size={14} /> : <ShieldX size={14} />}
                      {user.status === 'blocked' ? 'Unblock' : 'Block User'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;