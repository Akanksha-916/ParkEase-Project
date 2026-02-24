import React from 'react';
import { Activity, CheckCircle, AlertCircle, XCircle, Bell, Settings } from 'lucide-react';
import './Activitylogs.css';

const activityLogs = [
  { id: 1, type: 'login', user: 'John Smith', action: 'User logged in successfully', timestamp: '2 minutes ago', status: 'success' },
  { id: 2, type: 'booking', user: 'Sarah Johnson', action: 'New booking created for Downtown Plaza - Slot A-105', timestamp: '5 minutes ago', status: 'success' },
  { id: 3, type: 'payment', user: 'Mike Wilson', action: 'Payment of $25 completed', timestamp: '8 minutes ago', status: 'success' },
  { id: 4, type: 'cancellation', user: 'James Brown', action: 'Booking cancelled - Refund initiated', timestamp: '15 minutes ago', status: 'warning' },
  { id: 5, type: 'system', user: 'Admin', action: 'Parking slot A-104 marked for maintenance', timestamp: '18 minutes ago', status: 'warning' },
  { id: 6, type: 'booking', user: 'Robert Taylor', action: 'New booking created for Airport Parking - Slot T1-A02', timestamp: '22 minutes ago', status: 'success' },
  { id: 7, type: 'payment', user: 'Lisa Anderson', action: 'Payment of $35 completed', timestamp: '28 minutes ago', status: 'success' },
  { id: 8, type: 'login', user: 'Michael Chen', action: 'Driver logged in successfully', timestamp: '32 minutes ago', status: 'success' },
  { id: 9, type: 'system', user: 'System', action: 'ML model prediction completed - 94.2% accuracy', timestamp: '40 minutes ago', status: 'success' },
];

const Activitylogs = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="log-icon text-green" />;
      case 'warning': return <AlertCircle className="log-icon text-yellow" />;
      case 'error': return <XCircle className="log-icon text-red" />;
      default: return <Activity className="log-icon" />;
    }
  };

  return (
    <div className="activity-container">
      {/* Header Section */}
      <header className="activity-header">
        <div className="header-titles">
          <h2>Activity Logs</h2>
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

      {/* Stats Cards Row */}
      <div className="activity-stats-grid">
        <div className="activity-stat-card">
          <div className="stat-icon-box blue-bg"><Activity size={24} /></div>
          <div className="stat-content">
            <p>Total Events</p>
            <h3>1,247</h3>
          </div>
        </div>
        <div className="activity-stat-card">
          <div className="stat-icon-box green-bg"><CheckCircle size={24} /></div>
          <div className="stat-content">
            <p>Success</p>
            <h3>1,189</h3>
          </div>
        </div>
        <div className="activity-stat-card">
          <div className="stat-icon-box yellow-bg"><AlertCircle size={24} /></div>
          <div className="stat-content">
            <p>Warnings</p>
            <h3>43</h3>
          </div>
        </div>
        <div className="activity-stat-card">
          <div className="stat-icon-box red-bg"><XCircle size={24} /></div>
          <div className="stat-content">
            <p>Errors</p>
            <h3>15</h3>
          </div>
        </div>
      </div>

      {/* Main Activity Feed */}
      <div className="activity-feed-card">
        <div className="feed-header">
          <h3>Recent Activity</h3>
          <p>Live feed of system events</p>
        </div>
        <div className="feed-list">
          {activityLogs.map((log) => (
            <div key={log.id} className="feed-item">
              <div className="feed-icon-col">
                {getStatusIcon(log.status)}
              </div>
              <div className="feed-content-col">
                <p className="action-text">{log.action}</p>
                <div className="meta-row">
                  <span className="user-name">{log.user}</span>
                  <span className={`type-badge badge-${log.type}`}>{log.type}</span>
                  <span className={`status-badge badge-${log.status}`}>{log.status}</span>
                  <span className="timestamp">{log.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activitylogs;