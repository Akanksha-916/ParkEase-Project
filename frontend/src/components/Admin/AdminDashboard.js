import React from 'react';
import { 
  Users, 
  Square, 
  TrendingUp, 
  DollarSign,
  Bell,
  Settings,
  ArrowUpRight,
  Zap,
  Star,
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Cell 
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

const occupancyData = [
  { name: 'Occupied', value: 78, fill: '#8b5cf6' },
  { name: 'Available', value: 22, fill: '#e0e7ff' },
];

const recentBookings = [
  { user: 'Sarah J.', slot: 'A-105', time: '2 min ago', amount: '$12', color: '#7c3aed' },
  { user: 'Robert T.', slot: 'T1-A02', time: '8 min ago', amount: '$35', color: '#0ea5e9' },
  { user: 'Emma D.', slot: 'M-103', time: '15 min ago', amount: '$8', color: '#10b981' },
  { user: 'John S.', slot: 'B-201', time: '23 min ago', amount: '$6', color: '#f97316' },
];

const AdminDashboard = () => {
  return (
    <div className="main-content-container">
      <header className="dashboard-header">
        <div className="header-titles">
          <h2>Dashboard</h2>
          <p>Welcome back, Admin - Thursday, March 5</p>
        </div>
        <div className="header-actions">
          <div className="notification-wrapper">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </div>
          <Settings size={20} className="settings-icon" />
          <div className="status-indicator">
             <span className="live-dot"></span> Live
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <div className="command-center-banner">
          <div className="banner-circles"></div>
          <div className="banner-text">
            <p className="banner-greeting">Good morning, Admin 👋</p>
            <h1 className="banner-title">ParkEasy Command Center</h1>
            <p className="banner-subtitle">Here's what's happening today.</p>
          </div>
          <div className="system-status-box">
            <p>System Status</p>
            <div className="status-pill">
              <span className="pulse-dot"></span>
              All Systems Operational
            </div>
          </div>
        </div>

        <div className="stats-grid-v2">
          <div className="glass-stat-card border-blue">
            <div className="card-top">
              <div className="icon-wrapper bg-blue"><Users size={18} /></div>
              <div className="trend-label trend-up"><ArrowUpRight size={10} /> 12.5%</div>
            </div>
            <p className="card-label">Active Users</p>
            <h3 className="card-value">2,847</h3>
            <div className="progress-bar-container"><div className="progress-bar bg-blue-grad" style={{width: '80%'}}></div></div>
          </div>

          <div className="glass-stat-card border-green">
            <div className="card-top">
              <div className="icon-wrapper bg-green"><Square size={18} /></div>
              <div className="trend-label trend-info">156/291</div>
            </div>
            <p className="card-label">Available Slots</p>
            <h3 className="card-value">53.6%</h3>
            <div className="progress-bar-container"><div className="progress-bar bg-green-grad" style={{width: '53.6%'}}></div></div>
          </div>

          <div className="glass-stat-card border-purple">
            <div className="card-top">
              <div className="icon-wrapper bg-purple"><TrendingUp size={18} /></div>
              <div className="trend-label trend-up"><ArrowUpRight size={10} /> 8.2%</div>
            </div>
            <p className="card-label">Reservations Today</p>
            <h3 className="card-value">123</h3>
            <div className="progress-bar-container"><div className="progress-bar bg-purple-grad" style={{width: '60%'}}></div></div>
          </div>

          <div className="glass-stat-card border-orange">
            <div className="card-top">
              <div className="icon-wrapper bg-orange"><DollarSign size={18} /></div>
              <div className="trend-label trend-up"><ArrowUpRight size={10} /> 18.4%</div>
            </div>
            <p className="card-label">Today's Revenue</p>
            <h3 className="card-value">$4,256</h3>
            <div className="progress-bar-container"><div className="progress-bar bg-orange-grad" style={{width: '90%'}}></div></div>
          </div>
        </div>

        <div className="charts-row-v2">
          <div className="chart-box-large">
            <div className="chart-header">
              <div>
                <h3>Weekly Bookings</h3>
                <p>Last 7 days activity</p>
              </div>
              <div className="live-badge"><Zap size={12} /> Live</div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: 'rgba(124, 58, 237, 0.05)'}} />
                <Bar dataKey="bookings" fill="url(#barGrad)" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box-small radial-container">
            <h3>Occupancy Rate</h3>
            <p>Real-time activity</p>
            <div className="radial-wrapper">
              <ResponsiveContainer width="100%" height={140}>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={occupancyData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#ede9fe' }}>
                    {occupancyData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="radial-center-text">
                <span className="radial-val">78%</span>
              </div>
            </div>
            <div className="legend-custom">
               <div className="leg-item"><span className="dot purple"></span> Occ.</div>
               <div className="leg-item"><span className="dot light"></span> Avail.</div>
            </div>
          </div>
        </div>

        <div className="charts-row-v2">
          <div className="chart-box-large">
            <div className="chart-header">
              <div>
                <h3>Monthly Revenue</h3>
              </div>
              <div className="peak-badge">$24,800 peak</div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revGrad)" dot={{fill: '#10b981', r: 4}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box-small bookings-list-container">
            <div className="chart-header">
              <h3>Recent</h3>
              <Star size={14} className="star-icon" />
            </div>
            <div className="bookings-scroll-list">
              {recentBookings.slice(0, 4).map((b, i) => (
                <div key={i} className="booking-item">
                  <div className="user-avatar" style={{background: b.color}}>{b.user.charAt(0)}</div>
                  <div className="booking-info">
                    <p className="user-name">{b.user}</p>
                    <p className="location-text">{b.slot}</p>
                  </div>
                  <div className="booking-meta">
                    <p className="price">{b.amount}</p>
                    <p className="time">{b.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-stats-grid">
           <div className="solid-grad-card grad-indigo">
              <p>Average Occupancy</p>
              <h2>78.4%</h2>
              <span>↑ +5.2%</span>
           </div>
           <div className="solid-grad-card grad-pink">
              <p>Avg. Duration</p>
              <h2>2.4 hrs</h2>
              <span>Optimal range</span>
           </div>
           <div className="solid-grad-card grad-teal">
              <p>New Users</p>
              <h2>342</h2>
              <span>↑ +28%</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;