import React from 'react';
import { 
  Users, 
  Square, 
  TrendingUp, 
  DollarSign,
  Bell,
  Settings 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import './AdminDashboard.css';

const weeklyData = [
  { day: 'Mon', bookings: 45 },
  { day: 'Tue', bookings: 52 },
  { day: 'Wed', bookings: 48 },
  { day: 'Thu', bookings: 61 },
  { day: 'Fri', bookings: 78 },
  { day: 'Sat', bookings: 95 },
  { day: 'Sun', bookings: 68 },
];

const revenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15200 },
  { month: 'Mar', revenue: 18900 },
  { month: 'Apr', revenue: 16700 },
  { month: 'May', revenue: 21300 },
  { month: 'Jun', revenue: 24800 },
];

const AdminDashboard = () => {
  return (
    <div className="main-content-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-titles">
          <h2>Dashboard</h2>
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

      {/* Top Stat Cards */}
      <div className="stats-grid">
        {/* Card 1: Active Users */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="icon-box blue-bg"><Users size={20} /></div>
            <span className="trend-badge pos-trend">+12.5%</span>
          </div>
          <p className="stat-label">Active Users</p>
          <h3 className="stat-value">2,847</h3>
        </div>

        {/* Card 2: Available Slots */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="icon-box green-bg"><Square size={20} /></div>
            <span className="trend-badge slot-badge">156/291</span>
          </div>
          <p className="stat-label">Available Slots</p>
          <h3 className="stat-value">53.6%</h3>
        </div>

        {/* Card 3: Reservations */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="icon-box purple-bg"><TrendingUp size={20} /></div>
            <span className="trend-badge pos-trend">+8.2%</span>
          </div>
          <p className="stat-label">Reservations Today</p>
          <h3 className="stat-value">123</h3>
        </div>

        {/* Card 4: Revenue */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="icon-box orange-bg"><DollarSign size={20} /></div>
            <span className="trend-badge rev-badge">+18.4%</span>
          </div>
          <p className="stat-label">Today's Revenue</p>
          <h3 className="stat-value">$4,256</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Weekly Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
              <Tooltip cursor={{fill: '#f5f5f5'}} />
              <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Gradient Stats */}
      <div className="gradient-stats-grid">
        <div className="grad-card blue-grad">
          <p className="grad-label">Average Occupancy Rate</p>
          <h4 className="grad-value">78.4%</h4>
          <p className="grad-sub">+5.2% from last month</p>
        </div>
        <div className="grad-card purple-grad">
          <p className="grad-label">Avg. Parking Duration</p>
          <h4 className="grad-value">2.4 hrs</h4>
          <p className="grad-sub">Optimal range: 2-3 hours</p>
        </div>
        <div className="grad-card green-grad">
          <p className="grad-label">New Users This Week</p>
          <h4 className="grad-value">342</h4>
          <p className="grad-sub">+28% growth rate</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;