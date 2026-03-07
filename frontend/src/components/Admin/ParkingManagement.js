import React, { useState, useRef } from 'react'; // Added useRef
import { 
  MapPin, Plus, ArrowLeft, CheckCircle2, Wrench, Car, Clock,
  Edit, Trash2, ChevronRight, Bike, PersonStanding, ParkingSquare,
  Layers, LayoutGrid, X, Database, Zap, Image, Upload // Added Upload
} from 'lucide-react';
import './ParkingManagement.css';

// ─── DATA DEFINITIONS ────────────────────────────────────────────────────────
const initialLocations = [
  { id: 1, name: 'Downtown Plaza', address: '123 Main St, City Center', totalSlots: 120, availableSlots: 45, status: 'active', color: '#7c3aed', carSlots: 80, bikeSlots: 25, bicycleSlots: 15 },
  { id: 2, name: 'Airport Parking', address: '456 Airport Rd, Terminal A', totalSlots: 350, availableSlots: 112, status: 'active', color: '#0ea5e9', carSlots: 270, bikeSlots: 50, bicycleSlots: 30 },
  { id: 3, name: 'Shopping Mall', address: '789 Commerce Blvd', totalSlots: 280, availableSlots: 78, status: 'active', color: '#10b981', carSlots: 200, bikeSlots: 50, bicycleSlots: 30 },
  { id: 4, name: 'University Campus', address: '321 College Ave', totalSlots: 180, availableSlots: 23, status: 'active', color: '#f97316', carSlots: 100, bikeSlots: 50, bicycleSlots: 30 },
  { id: 5, name: 'Business District', address: '555 Corporate Dr', totalSlots: 200, availableSlots: 67, status: 'inactive', color: '#94a3b8', carSlots: 150, bikeSlots: 30, bicycleSlots: 20 },
];

const initialSlots = [
  { id: '1-1', locationId: 1, slotNumber: 'A-101', status: 'available', type: 'car' },
  { id: '1-2', locationId: 1, slotNumber: 'A-102', status: 'occupied', vehicle: 'ABC-123', checkIn: '08:30 AM', type: 'car' },
  { id: '1-3', locationId: 1, slotNumber: 'A-103', status: 'reserved', vehicle: 'XYZ-789', type: 'car' },
  { id: '1-4', locationId: 1, slotNumber: 'A-104', status: 'maintenance', type: 'car' },
  { id: '1-5', locationId: 1, slotNumber: 'A-105', status: 'available', type: 'bike' },
  { id: '1-6', locationId: 1, slotNumber: 'A-106', status: 'occupied', vehicle: 'DEF-456', checkIn: '09:15 AM', type: 'car' },
  { id: '1-7', locationId: 1, slotNumber: 'A-107', status: 'available', type: 'bike' },
  { id: '1-8', locationId: 1, slotNumber: 'A-108', status: 'available', type: 'bicycle' },
];

// ─── VISUAL CONFIG ───────────────────────────────────────────────────────────
const statusCfg = {
  available:   { label: 'Available',   dot: '#10b981', stripe: 'linear-gradient(135deg,rgba(209,250,229,0.4),rgba(167,243,208,0.4))', badge: 'rgba(16,185,129,0.12)', badgeText: '#059669', border: '#22c55e' },
  occupied:    { label: 'Occupied',    dot: '#3b82f6', stripe: 'linear-gradient(135deg,rgba(219,234,254,0.4),rgba(191,219,254,0.4))', badge: 'rgba(59,130,246,0.12)',  badgeText: '#2563eb', border: '#3b82f6' },
  reserved:    { label: 'Reserved',    dot: '#f97316', stripe: 'linear-gradient(135deg,rgba(255,237,213,0.4),rgba(254,215,170,0.4))', badge: 'rgba(249,115,22,0.12)',  badgeText: '#ea580c', border: '#f97316' },
  maintenance: { label: 'Maintenance', dot: '#ef4444', stripe: 'linear-gradient(135deg,rgba(254,226,226,0.4),rgba(254,202,202,0.4))', badge: 'rgba(239,68,68,0.12)',    badgeText: '#dc2626', border: '#ef4444' },
};

const vehicleTypeCfg = {
  car:     { label: 'Car',     icon: Car,           color: '#4f46e5', bg: 'rgba(79,70,229,0.08)'  },
  bike:    { label: 'Bike',    icon: Bike,          color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
  bicycle: { label: 'Bicycle', icon: PersonStanding, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
};

const ParkingManagement = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [slots, setSlots] = useState(initialSlots);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New States and Refs for Image Handling
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const updateSlotStatus = (id, newStatus) => {
    setSlots(slots.map(slot => slot.id === id ? { ...slot, status: newStatus } : slot));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file.name); // You can store the file object here for upload
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  if (selectedLocation) {
    const locationSlots = slots.filter(s => s.locationId === selectedLocation.id);
    const filteredSlots = locationSlots.filter(s => {
      const statusOk = filterStatus === 'all' || s.status === filterStatus;
      const typeOk = filterType === 'all' || s.type === filterType;
      return statusOk && typeOk;
    });

    return (
      <div className="pm-container">
        <div className="pm-location-hero" style={{ background: `linear-gradient(135deg, ${selectedLocation.color}cc 0%, ${selectedLocation.color}aa 100%)` }}>
          <div className="hero-content">
            <button className="back-btn-round" onClick={() => setSelectedLocation(null)}>
              <ArrowLeft size={20} />
            </button>
            <div className="hero-text">
              <span className="hero-subtitle">Parking Location</span>
              <h2>{selectedLocation.name}</h2>
              <p><MapPin size={14} /> {selectedLocation.address}</p>
            </div>
            <div className="hero-type-stats">
              <div className="type-stat">
                <Car size={16} color="#c4b5fd" />
                <strong>{selectedLocation.carSlots}</strong>
                <span>Cars</span>
              </div>
              <div className="type-stat">
                <Bike size={16} color="#93c5fd" />
                <strong>{selectedLocation.bikeSlots}</strong>
                <span>Bikes</span>
              </div>
              <div className="type-stat">
                <PersonStanding size={16} color="#6ee7b7" />
                <strong>{selectedLocation.bicycleSlots}</strong>
                <span>Bicycles</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pm-stats-row-grid">
          {[
            { label: 'Available', count: 6, icon: CheckCircle2, color: '#059669', grad: 'linear-gradient(135deg,rgba(209,250,229,0.4),rgba(167,243,208,0.4))', pct: 50 },
            { label: 'Occupied', count: 3, icon: Car, color: '#2563eb', grad: 'linear-gradient(135deg,rgba(219,234,254,0.4),rgba(191,219,254,0.4))', pct: 25 },
            { label: 'Reserved', count: 2, icon: Clock, color: '#ea580c', grad: 'linear-gradient(135deg,rgba(255,237,213,0.4),rgba(254,215,170,0.4))', pct: 17 },
            { label: 'Maintenance', count: 1, icon: Wrench, color: '#dc2626', grad: 'linear-gradient(135deg,rgba(254,226,226,0.4),rgba(254,202,202,0.4))', pct: 8 },
          ].map(stat => (
            <div key={stat.label} className="status-stat-card" style={{ background: stat.grad }}>
              <div className="stat-card-top">
                <div className="stat-icon-box"><stat.icon size={16} color={stat.color} /></div>
                <span className="stat-number" style={{ color: stat.color }}>{stat.count}</span>
              </div>
              <p className="stat-label" style={{ color: stat.color }}>{stat.label}</p>
              <div className="stat-progress-bg"><div className="stat-progress-bar" style={{ width: `${stat.pct}%`, background: stat.color }} /></div>
              <span className="stat-pct" style={{ color: stat.color }}>{stat.pct}%</span>
            </div>
          ))}
        </div>

        <div className="pm-filter-panel">
          <div className="filter-group">
            <Layers size={16} className="filter-icon" />
            <span className="filter-label">Status:</span>
            {['all', 'available', 'occupied', 'reserved', 'maintenance'].map(s => (
              <button key={s} className={`filter-pill ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="filter-divider" />
          <div className="filter-group">
            <LayoutGrid size={16} className="filter-icon" />
            <span className="filter-label">Type:</span>
            {['all', 'car', 'bike', 'bicycle'].map(t => (
              <button key={t} className={`filter-pill ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}>
                {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
              </button>
            ))}
          </div>
          <div className="filter-count">Showing <strong>{filteredSlots.length}</strong> slots</div>
        </div>

        <div className="slots-grid-detailed">
          {filteredSlots.map(slot => {
            const sc = statusCfg[slot.status];
            const vc = vehicleTypeCfg[slot.type];
            const VIcon = vc.icon;
            return (
              <div key={slot.id} className="detailed-slot-card">
                <div className="detailed-slot-top-bar" style={{ background: sc.border }} />
                <div className="detailed-bay-illustration" style={{ background: sc.stripe }}>
                   <div className="bay-lane-line left" style={{ background: sc.dot }} />
                   <div className="bay-lane-line right" style={{ background: sc.dot }} />
                   <div className="bay-icon-container">
                      <VIcon size={24} style={{ color: slot.status === 'available' ? '#94a3b8' : sc.dot, opacity: slot.status === 'available' ? 0.4 : 1 }} />
                   </div>
                   <div className="bay-label" style={{ color: sc.dot }}>{slot.slotNumber}</div>
                </div>
                <div className="detailed-card-body">
                  <div className="detailed-card-header">
                    <div className="detailed-slot-id">
                      <span className="detailed-dot" style={{ background: sc.dot, boxShadow: `0 0 6px ${sc.dot}` }} />
                      {slot.slotNumber}
                    </div>
                    <span className="detailed-badge" style={{ background: sc.badge, color: sc.badgeText, border: `1px solid ${sc.badgeText}55` }}>{sc.label}</span>
                  </div>
                  <div className="detailed-type-pill" style={{ background: vc.bg, color: vc.color }}>
                    <VIcon size={12} /> {vc.label} Slot
                  </div>
                  {slot.vehicle && (
                    <div className="detailed-vehicle-info">
                      <div className="info-row"><Car size={12} /> <strong>{slot.vehicle}</strong></div>
                      <div className="info-row text-muted"><Clock size={12} /> Since {slot.checkIn || '08:00 AM'}</div>
                    </div>
                  )}
                  <div className="detailed-actions">
                    <button className="btn-detailed-open" onClick={() => updateSlotStatus(slot.id, 'available')}>✓ Open</button>
                    <button className="btn-detailed-maint" onClick={() => updateSlotStatus(slot.id, 'maintenance')}>⚠ Maint.</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="pm-container">
      <div className="pm-header-main">
        <div className="header-titles">
          <h2>Parking Management</h2>
          <p>Welcome back, Admin • Thursday, March 5</p>
        </div>
        <button className="add-loc-btn-figma" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Location
        </button>
      </div>

      <div className="pm-summary-row">
        <div className="summary-card purp">
          <div className="card-glow"></div>
          <div className="card-icon-container"><MapPin size={22} /></div>
          <strong>5</strong>
          <span>Total Locations</span>
        </div>
        <div className="summary-card blue">
          <div className="card-glow"></div>
          <div className="card-icon-container"><Database size={22} /></div>
          <strong>1,130</strong>
          <span>Total Capacity</span>
        </div>
        <div className="summary-card green">
          <div className="card-glow"></div>
          <div className="card-icon-container"><Zap size={22} /></div>
          <strong>325</strong>
          <span>Available Now</span>
        </div>
        <div className="summary-card orange">
          <div className="card-glow"></div>
          <div className="card-icon-container"><LayoutGrid size={22} /></div>
          <strong>800/205</strong>
          <span>Car + Bike Slots</span>
        </div>
      </div>

      <div className="locations-grid">
        {initialLocations.map(loc => {
           const occupancy = Math.round(((loc.totalSlots - loc.availableSlots) / loc.totalSlots) * 100);
           return (
            <div key={loc.id} className="loc-card-figma" onClick={() => setSelectedLocation(loc)}>
              <div className="loc-top-accent" style={{ background: loc.status === 'active' ? loc.color : '#cbd5e1' }} />
              <div className="loc-card-main">
                <div className="loc-header-row">
                  <div className="loc-icon-figma" style={{ background: loc.color, boxShadow: `0 4px 12px ${loc.color}44` }}>
                    <MapPin size={20} color="white" />
                  </div>
                  <div className="loc-title-block">
                    <h4>{loc.name}</h4>
                    <p>{loc.address}</p>
                  </div>
                  <span className={`loc-status-badge ${loc.status}`}>{loc.status}</span>
                </div>

                <div className="loc-stats-grid-figma">
                  <div className="loc-stat-box" style={{ background: `${loc.color}11` }}>
                    <span>Total Slots</span>
                    <strong style={{ color: loc.color }}>{loc.totalSlots}</strong>
                  </div>
                  <div className="loc-stat-box green">
                    <span>Available</span>
                    <strong className="text-emerald">{loc.availableSlots}</strong>
                  </div>
                </div>

                <div className="loc-breakdown-box">
                  <p className="breakdown-label">VEHICLE SLOT BREAKDOWN</p>
                  <div className="breakdown-item">
                    <Car size={12} color="#4f46e5" /> <span className="label">Cars</span>
                    <div className="progress-bg"><div className="progress-bar" style={{ width: '70%', background: '#4f46e5' }} /></div>
                    <span className="count">80</span>
                  </div>
                  <div className="breakdown-item">
                    <Bike size={12} color="#0ea5e9" /> <span className="label">Bikes</span>
                    <div className="progress-bg"><div className="progress-bar" style={{ width: '20%', background: '#0ea5e9' }} /></div>
                    <span className="count">25</span>
                  </div>
                  <div className="breakdown-item">
                    <PersonStanding size={12} color="#10b981" /> <span className="label">Bicycles</span>
                    <div className="progress-bg"><div className="progress-bar" style={{ width: '10%', background: '#10b981' }} /></div>
                    <span className="count">15</span>
                  </div>
                </div>

                <div className="loc-occupancy-section">
                  <div className="occ-header"><span>Occupancy</span><strong>{occupancy}%</strong></div>
                  <div className="occ-progress-bg"><div className="occ-progress-bar" style={{ width: `${occupancy}%`, background: loc.color }} /></div>
                </div>
              </div>
              <div className="loc-card-footer-figma">
                <span className="view-link"><ChevronRight size={14} /> View all slots</span>
                <div className="footer-actions">
                  <button className="icon-btn-small" onClick={(e) => e.stopPropagation()}><Edit size={14}/></button>
                  <button className="icon-btn-small red" onClick={(e) => e.stopPropagation()}><Trash2 size={14}/></button>
                </div>
              </div>
            </div>
           )
        })}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-figma" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            <div className="modal-header-figma">
              <MapPin size={20} color="#7c3aed" /> <h3>Add New Parking Location</h3>
            </div>
            <div className="modal-body-figma">
              <label>Location Name</label>
              <input type="text" placeholder="e.g., Downtown Plaza" />
              <label>Address</label>
              <input type="text" placeholder="Full address" />
              
              {/* --- UPDATED ADD PIC FIELD --- */}
              <label>Add Pic</label>
              <div 
                style={{ position: 'relative', cursor: 'pointer' }} 
                onClick={triggerFilePicker}
              >
                <Image size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  readOnly
                  placeholder={selectedImage || "Click to choose a picture"} 
                  style={{ paddingLeft: '38px', cursor: 'pointer' }} 
                />
                <Upload size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7c3aed' }} />
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
              </div>

              <div className="slot-config-divider"><span>VEHICLE SLOT CONFIGURATION</span></div>
              <div className="slot-input-row">
                <div className="slot-input-card car">
                  <div className="slot-icon-circle"><Car size={16} color="white" /></div>
                  <span className="slot-label">Car Slots</span>
                  <input type="number" placeholder="0" />
                </div>
                <div className="slot-input-card bike">
                  <div className="slot-icon-circle"><Bike size={16} color="white" /></div>
                  <span className="slot-label">Bike Slots</span>
                  <input type="number" placeholder="0" />
                </div>
                <div className="slot-input-card bicycle">
                  <div className="slot-icon-circle"><PersonStanding size={16} color="white" /></div>
                  <span className="slot-label">Bicycle Slots</span>
                  <input type="number" placeholder="0" />
                </div>
              </div>
              <button className="submit-create-btn" onClick={() => setIsModalOpen(false)}>
                <ParkingSquare size={18} /> Create Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingManagement;