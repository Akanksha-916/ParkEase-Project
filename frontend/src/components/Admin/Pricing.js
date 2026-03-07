import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Bell, Settings, Search, 
  SlidersHorizontal, MapPin, ChevronDown, ChevronUp, Clock 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import './Pricing.css';

const initialRules = [
  { id: 1, location: 'Downtown Plaza', basePrice: 5, peakMultiplier: 1.5, offPeakDiscount: 20, status: 'active', color: '#7c3aed' },
  { id: 2, location: 'Airport Parking', basePrice: 8, peakMultiplier: 2.0, offPeakDiscount: 15, status: 'active', color: '#0ea5e9' },
  { id: 3, location: 'Shopping Mall', basePrice: 4, peakMultiplier: 1.3, offPeakDiscount: 25, status: 'active', color: '#10b981' },
];

const priceComparisonData = [
  { time: '6AM', dynamic: 13000 }, { time: '9AM', dynamic: 16500 },
  { time: '12PM', dynamic: 18800 }, { time: '3PM', dynamic: 16800 },
  { time: '6PM', dynamic: 22000 }, { time: '9PM', dynamic: 24800 },
];

const occupancyData = [
  { name: 'Occ.', value: 78 },
  { name: 'Avail.', value: 22 },
];
const OCC_COLORS = ['#7c3aed', 'rgba(255, 255, 255, 0.4)']; // Fix for

const Pricing = () => {
  const [rules, setRules] = useState(initialRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRule, setExpandedRule] = useState(1);

  const toggleStatus = (id) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' } : rule));
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, [field]: value } : rule));
  };

  const filteredRules = rules.filter(rule => rule.location.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pricing-main-wrapper">
      <header className="pricing-header">
        <div className="header-titles">
          <h2>Dynamic Pricing</h2>
          <p>Welcome back, Admin</p>
        </div>
        <div className="header-actions">
          <Bell size={20} color="white" style={{cursor: 'pointer'}} />
          <Settings size={20} color="white" style={{cursor: 'pointer'}} />
        </div>
      </header>

      <div className="pricing-content-body">
        {/* Stat Boxes */}
        <div className="pricing-stats-grid">
          <div className="p-stat-card card-design-1"><h3 className="p-value">+23%</h3><p className="p-label">Revenue Growth</p></div>
          <div className="p-stat-card card-design-2"><h3 className="p-value">$6.40</h3><p className="p-label">Avg. Hourly Rate</p></div>
          <div className="p-stat-card card-design-3"><h3 className="p-value">94%</h3><p className="p-label">Active Spots</p></div>
        </div>

        {/* Charts Section */}
        <div className="pricing-charts-container">
          <div className="pricing-chart-card">
            <h3 className="occ-title">Performance Insights</h3>
            <p className="occ-sub">Revenue over time</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={priceComparisonData}>
                <defs><linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="dynamic" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorDynamic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="occupancy-card">
            <h3 className="occ-title">Occupancy Rate</h3>
            <p className="occ-sub">Real-time activity</p>
            <div style={{ position: 'relative', height: '120px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    innerRadius={35}
                    outerRadius={45}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={OCC_COLORS[index % OCC_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="radial-center-text">78%</div>
            </div>
          </div>
        </div>

        <div className="rules-section">
          <div className="search-bar-container">
            <div className="search-input-wrapper" style={{flex: 1, position: 'relative'}}>
              <Search size={18} className="search-icon" style={{position: 'absolute', left: 14, top: 10}} />
              <input placeholder="Search locations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button className="filter-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 16px', borderRadius: '12px', border: '1px solid #f1f5f9', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>
              <SlidersHorizontal size={16} /><span>Filters</span>
            </button>
          </div>

          {filteredRules.map(rule => {
            const isExpanded = expandedRule === rule.id;
            const offPeakPrice = rule.basePrice * (1 - rule.offPeakDiscount / 100);
            const peakPrice = rule.basePrice * rule.peakMultiplier;
            const upliftPercent = ((peakPrice - rule.basePrice) / rule.basePrice) * 100;

            return (
              <div key={rule.id} className="rule-card">
                <div className="rule-card-header" onClick={() => setExpandedRule(isExpanded ? null : rule.id)}>
                  <div className="header-left">
                    <div className="location-icon-box" style={{ background: rule.status === 'active' ? rule.color : '#cbd5e1' }}><DollarSign size={16} color="white" /></div>
                    <div className="location-info"><h4>{rule.location}</h4><p>Base: ${rule.basePrice}/hr · Peak: ${peakPrice.toFixed(2)}/hr</p></div>
                  </div>
                  <div className="header-center-pills">
                    <div className="summary-pill"><span className="pill-label">Off-Peak</span><strong className="pill-val blue">${offPeakPrice.toFixed(2)}</strong></div>
                    <div className="summary-pill"><span className="pill-label">Base</span><strong className="pill-val grey">${rule.basePrice.toFixed(2)}</strong></div>
                    <div className="summary-pill"><span className="pill-label">Peak</span><strong className="pill-val green">${peakPrice.toFixed(2)}</strong></div>
                  </div>
                  <div className="header-right">
                    <span className={`status-tag ${rule.status}`}>{rule.status}</span>
                    <div className={`figma-switch ${rule.status === 'active' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleStatus(rule.id); }}><div className="switch-knob" /></div>
                    {isExpanded ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="rule-card-body">
                    <div className="rule-controls-grid">
                      <div className="control-group"><label>Base Price / hr</label>
                        <div className="input-with-preview">
                          <input type="number" value={rule.basePrice} onChange={(e) => updateRule(rule.id, 'basePrice', parseFloat(e.target.value) || 0)} />
                          <div className="price-tag" style={{ background: `${rule.color}15`, color: rule.color }}>${rule.basePrice}</div>
                        </div>
                      </div>
                      <div className="control-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><label>Multiplier</label><span style={{ color: '#10b981', fontWeight: 800, fontSize: '11px' }}>{rule.peakMultiplier}x</span></div>
                        <input type="range" className="figma-slider" min="1" max="3" step="0.1" value={rule.peakMultiplier} onChange={(e) => updateRule(rule.id, 'peakMultiplier', parseFloat(e.target.value))} />
                      </div>
                      <div className="control-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><label>Discount</label><span style={{ color: '#0ea5e9', fontWeight: 800, fontSize: '11px' }}>{rule.offPeakDiscount}%</span></div>
                        <input type="range" className="figma-slider" min="0" max="50" step="5" value={rule.offPeakDiscount} onChange={(e) => updateRule(rule.id, 'offPeakDiscount', parseInt(e.target.value))} />
                      </div>
                    </div>
                    <div className="price-preview-strip">
                      <p className="preview-strip-title">PRICE PREVIEW</p>
                      <div className="strip-flex">
                        <div className="strip-item offpeak-block"><span className="l">Off-Peak</span><span className="v">${offPeakPrice.toFixed(2)}</span><span className="s">late night</span></div>
                        <div className="strip-item standard-block"><span className="l">Standard</span><span className="v">${rule.basePrice.toFixed(2)}</span><span className="s">normal hours</span></div>
                        <div className="strip-item peak-block"><span className="l">Peak</span><span className="v">${peakPrice.toFixed(2)}</span><span className="s">rush hours</span></div>
                        <div className="strip-item uplift-block"><span className="l">Uplift</span><span className="v">+{upliftPercent.toFixed(0)}%</span><span className="s">max uplift</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;