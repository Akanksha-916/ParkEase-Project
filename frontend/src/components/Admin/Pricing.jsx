import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Settings,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import './Pricing.css';

const initialRules = [
  { id: 1, location: 'Downtown Plaza', basePrice: 5, peakMultiplier: 1.5, offPeakDiscount: 20, status: 'active' },
  { id: 2, location: 'Airport Parking', basePrice: 8, peakMultiplier: 2.0, offPeakDiscount: 15, status: 'active' },
  { id: 3, location: 'Shopping Mall', basePrice: 4, peakMultiplier: 1.3, offPeakDiscount: 25, status: 'active' },
];

const priceComparisonData = [
  { time: '6AM', dynamic: 13000 },
  { time: '9AM', dynamic: 16500 },
  { time: '12PM', dynamic: 18800 },
  { time: '3PM', dynamic: 16800 },
  { time: '6PM', dynamic: 22000 },
  { time: '9PM', dynamic: 24800 },
];

const Pricing = () => {
  const [rules, setRules] = useState(initialRules);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' } : rule
    ));
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const filteredRules = rules.filter(rule => {
    const matchesName = rule.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = rule.basePrice.toString().includes(searchTerm);
    return matchesName || matchesPrice;
  });

  return (
    <div className="pricing-container">
      <header className="pricing-header">
        <div className="header-titles">
          <h2>Dynamic Pricing</h2>
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

      {/* Stats Grid with Centered Badges */}
      <div className="pricing-stats-grid">
        <div className="p-stat-card green-grad">
          <div className="p-stat-header">
            <div className="p-icon-box"><TrendingUp size={20}/></div>
            <span className="p-badge centered">vs static</span>
          </div>
          <p className="p-label">Revenue Increase</p>
          <h3 className="p-value">+23%</h3>
        </div>

        <div className="p-stat-card blue-grad">
          <div className="p-stat-header">
            <div className="p-icon-box"><DollarSign size={20}/></div>
            <span className="p-badge centered">Dynamic</span>
          </div>
          <p className="p-label">Avg. Price/Hour</p>
          <h3 className="p-value">$6.40</h3>
        </div>

        <div className="p-stat-card purple-grad">
          <div className="p-stat-header">
            <div className="p-icon-box"><TrendingUp size={20}/></div>
            <span className="p-badge centered count">{rules.filter(r => r.status === 'active').length}</span>
          </div>
          <p className="p-label">Active Locations</p>
          <h3 className="p-value">94%</h3>
        </div>
      </div>

      <div className="pricing-chart-card">
        <h3>Dynamic vs Standard Pricing Impact</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={priceComparisonData}>
              <defs>
                <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="dynamic" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorDynamic)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rules-section">
        <h3 className="rules-main-heading">Location Pricing Rules</h3>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by location or address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
        
        {filteredRules.map(rule => (
          <div key={rule.id} className="rule-card">
            <div className="rule-card-header">
              <div className="rule-loc-info">
                <div className={`loc-icon ${rule.status === 'active' ? 'blue' : 'gray'}`}>
                  <DollarSign size={20} color="white" />
                </div>
                <div>
                  <h4>{rule.location}</h4>
                  <p>Dynamic pricing configuration</p>
                </div>
              </div>
              {/* Corrected Active/Inactive Toggle Layout */}
              <div className="rule-status-container">
                <span className={`status-badge-modern ${rule.status}`}>
                  {rule.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                </span>
                <label className="switch-modern">
                  <input type="checkbox" checked={rule.status === 'active'} onChange={() => toggleStatus(rule.id)} />
                  <span className="slider-modern"></span>
                </label>
              </div>
            </div>

            <div className="rule-controls-grid">
              <div className="control-group">
                <label>Base Price (per hour)</label>
                <div className="base-input-row">
                  <input type="number" value={rule.basePrice} onChange={(e) => updateRule(rule.id, 'basePrice', parseFloat(e.target.value) || 0)} />
                  <span className="price-label-symbol">${rule.basePrice}</span>
                </div>
              </div>

              <div className="control-group">
                <label>Peak Multiplier: {rule.peakMultiplier}x</label>
                <input type="range" min="1" max="3" step="0.1" value={rule.peakMultiplier} onChange={(e) => updateRule(rule.id, 'peakMultiplier', parseFloat(e.target.value))} />
                <p className="sub-calc">Peak: ${(rule.basePrice * rule.peakMultiplier).toFixed(2)}/hr</p>
              </div>

              <div className="control-group">
                <label>Off-Peak Discount: {rule.offPeakDiscount}%</label>
                <input type="range" min="0" max="50" step="5" value={rule.offPeakDiscount} onChange={(e) => updateRule(rule.id, 'offPeakDiscount', parseInt(e.target.value))} />
                <p className="sub-calc">Off-Peak: ${(rule.basePrice * (1 - rule.offPeakDiscount/100)).toFixed(2)}/hr</p>
              </div>
            </div>

            <div className="rule-preview-footer">
              <div className="preview-box">
                <p>Off-Peak Rate</p>
                <strong className="blue-text">${(rule.basePrice * (1 - rule.offPeakDiscount/100)).toFixed(2)}</strong>
              </div>
              <div className="preview-box">
                <p>Standard Rate</p>
                <strong className="gray-text">${rule.basePrice.toFixed(2)}</strong>
              </div>
              <div className="preview-box">
                <p>Peak Rate</p>
                <strong className="green-text">${(rule.basePrice * rule.peakMultiplier).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;