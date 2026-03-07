import React from 'react';
import { 
  Activity, CheckCircle, AlertCircle, XCircle, 
  LogIn, CreditCard, Calendar, Settings, LogOut, Wifi 
} from 'lucide-react';
import './Activitylogs.css';

const activityLogs = [
  { id: 1, type: 'login', user: 'John Smith', action: 'User logged in successfully', timestamp: '2 minutes ago', status: 'success' },
  { id: 2, type: 'booking', user: 'Sarah Johnson', action: 'New booking created for Downtown Plaza - Slot A-105', timestamp: '5 minutes ago', status: 'success' },
  { id: 3, type: 'payment', user: 'Mike Wilson', action: 'Payment of $25 completed', timestamp: '8 minutes ago', status: 'success' },
  { id: 4, type: 'error', user: 'System', action: 'Failed to process payment for Emma Davis', timestamp: '12 minutes ago', status: 'error' },
  { id: 5, type: 'cancellation', user: 'James Brown', action: 'Booking cancelled - Refund initiated', timestamp: '15 minutes ago', status: 'warning' },
  { id: 6, type: 'system', user: 'Admin', action: 'Parking slot A-104 marked for maintenance', timestamp: '18 minutes ago', status: 'warning' },
];

const typeConfig = {
  login: { icon: LogIn, bg: 'rgba(59,130,246,0.1)', color: '#2563eb', label: 'Login' },
  logout: { icon: LogOut, bg: 'rgba(100,116,139,0.1)', color: '#475569', label: 'Logout' },
  booking: { icon: Calendar, bg: 'rgba(16,185,129,0.1)', color: '#059669', label: 'Booking' },
  payment: { icon: CreditCard, bg: 'rgba(139,92,246,0.1)', color: '#7c3aed', label: 'Payment' },
  cancellation: { icon: XCircle, bg: 'rgba(249,115,22,0.1)', color: '#ea580c', label: 'Cancel' },
  error: { icon: AlertCircle, bg: 'rgba(239,68,68,0.1)', color: '#dc2626', label: 'Error' },
  system: { icon: Settings, bg: 'rgba(100,116,139,0.1)', color: '#475569', label: 'System' },
};

const statusConfig = {
  success: { icon: CheckCircle, label: 'Success', className: 'status-success' },
  warning: { icon: AlertCircle, label: 'Warning', className: 'status-warning' },
  error: { icon: XCircle, label: 'Error', className: 'status-error' },
};

const Activitylogs = () => {
  const stats = [
    { label: 'Total Events', value: '1,247', icon: Activity, accent: '#3b82f6', tint: 'rgba(59, 130, 246, 0.15)' },
    { label: 'Success', value: '1,176', icon: CheckCircle, accent: '#10b981', tint: 'rgba(16, 185, 129, 0.15)' },
    { label: 'Warnings', value: '43', icon: AlertCircle, accent: '#f59e0b', tint: 'rgba(245, 158, 11, 0.15)' },
    { label: 'Errors', value: '15', icon: XCircle, accent: '#ef4444', tint: 'rgba(239, 68, 68, 0.15)' },
  ];

  return (
    <div className="activity-main-wrapper">
      <header className="activity-header">
        <div className="header-titles">
          <h2>Activity Monitoring</h2>
          <p>System integrity dashboard • Friday, March 6</p>
        </div>
        <div className="live-pill-top">
           <span className="dot pulse"></span> Live
        </div>
      </header>

      <div className="activity-content-body">
        {/* Top Statistics Grid */}
        <div className="activity-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card-prism">
              <div className="prism-accent-line" style={{ background: stat.accent }}></div>
              <div className="stat-prism-content">
                <div className="stat-icon-prism" style={{ backgroundColor: stat.tint }}>
                  <stat.icon size={20} color={stat.accent} strokeWidth={2.5} />
                </div>
                <div className="stat-info-prism">
                  <span className="stat-label-prism">{stat.label}</span>
                  <h3 className="stat-value-prism" style={{ color: stat.accent }}>{stat.value}</h3>
                </div>
              </div>
              <div className="prism-light-effect"></div>
            </div>
          ))}
        </div>

        {/* System Status Banner */}
        <div className="live-status-banner">
          <div className="banner-left">
            <div className="status-item">
              <span className="dot-small bg-green pulse-small"></span>
              <span className="text-green-banner">System Online</span>
            </div>
            <span className="divider">|</span>
            <div className="status-item">
              <Wifi size={14} className="text-violet" />
              <span className="text-muted-banner">Real-time monitoring active</span>
            </div>
          </div>
          <div className="banner-right">
            <span><span className="dot-small bg-green"></span> 7 success</span>
            <span><span className="dot-small bg-yellow"></span> 2 warning</span>
            <span><span className="dot-small bg-red"></span> 1 error</span>
          </div>
        </div>

        {/* Activity Feed Section */}
        <div className="feed-section-header">
          <h3>Activity Feed</h3>
          <div className="live-badge-mini">
            <Activity size={12} /> Live
          </div>
        </div>

        <div className="feed-container-individual">
          {activityLogs.map((log) => {
            const type = typeConfig[log.type] || typeConfig.system;
            const status = statusConfig[log.status];
            const TypeIcon = type.icon;
            const StatusIcon = status.icon;

            return (
              <div key={log.id} className="activity-item-card">
                <div className="card-left-section">
                  <div className="type-icon-box-mini" style={{ background: type.bg }}>
                    <TypeIcon size={18} color={type.color} />
                  </div>
                  <div className="card-text-content">
                    <p className="log-action-text">{log.action}</p>
                    <div className="log-meta-info">
                      <span className="log-user">{log.user}</span>
                      <span className="log-type-pill" style={{ background: type.bg, color: type.color }}>
                        {type.label}
                      </span>
                      <span className="log-timestamp">{log.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className={`log-status-badge ${status.className}`}>
                  <StatusIcon size={14} />
                  {status.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activitylogs;