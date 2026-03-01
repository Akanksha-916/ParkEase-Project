import React, { useState } from 'react';
import { 
  MapPin, Plus, ArrowLeft, Square, CheckCircle2, 
  Wrench, Edit, Trash2, Clock, X, Image as ImageIcon 
} from 'lucide-react';
import './ParkingManagement.css';

const initialLocations = [
  { id: 1, name: 'Downtown Plaza', address: '123 Main St, City Center', totalSlots: 120, availableSlots: 45, status: 'active' },
  { id: 2, name: 'Airport Parking', address: '456 Airport Rd, Terminal A', totalSlots: 350, availableSlots: 112, status: 'active' },
  { id: 3, name: 'Shopping Mall', address: '789 Commerce Blvd', totalSlots: 280, availableSlots: 78, status: 'active' },
  { id: 4, name: 'University Campus', address: '321 College Ave', totalSlots: 180, availableSlots: 23, status: 'active' },
  { id: 5, name: 'Business District', address: '555 Corporate Dr', totalSlots: 200, availableSlots: 67, status: 'inactive' },
];

const initialSlots = [
  { id: '1-1', locationId: 1, slotNumber: 'A-101', status: 'available' },
  { id: '1-2', locationId: 1, slotNumber: 'A-102', status: 'occupied', vehicle: 'ABC-123', checkIn: '08:30 AM' },
  { id: '1-3', locationId: 1, slotNumber: 'A-103', status: 'reserved', vehicle: 'XYZ-789' },
  { id: '1-4', locationId: 1, slotNumber: 'A-104', status: 'maintenance' },
  { id: '1-5', locationId: 1, slotNumber: 'A-105', status: 'available' },
  { id: '1-6', locationId: 1, slotNumber: 'A-106', status: 'occupied', vehicle: 'DEF-456', checkIn: '09:15 AM' },
  { id: '1-7', locationId: 1, slotNumber: 'A-107', status: 'available' },
  { id: '1-8', locationId: 1, slotNumber: 'A-108', status: 'available' },
  { id: '1-9', locationId: 1, slotNumber: 'B-201', status: 'occupied', vehicle: 'GHI-789', checkIn: '07:45 AM' },
  { id: '1-10', locationId: 1, slotNumber: 'B-202', status: 'available' },
  { id: '1-11', locationId: 1, slotNumber: 'B-203', status: 'reserved', vehicle: 'JKL-012' },
  { id: '1-12', locationId: 1, slotNumber: 'B-204', status: 'available' },
];

const ParkingManagement = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [slots, setSlots] = useState(initialSlots);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSlotStatus = (id, newStatus) => {
    setSlots(slots.map(slot => slot.id === id ? { ...slot, status: newStatus } : slot));
  };

  const filteredSlots = filterStatus === 'all' 
    ? slots.filter(s => s.locationId === selectedLocation?.id)
    : slots.filter(s => s.locationId === selectedLocation?.id && s.status === filterStatus);

  if (selectedLocation) {
    return (
      <div className="pm-container">
        <div className="pm-header-back">
          <button className="back-btn" onClick={() => setSelectedLocation(null)}>
            <ArrowLeft size={18} /> Back to Locations
          </button>
          <div className="location-title">
            <h2>{selectedLocation.name}</h2>
            <p>{selectedLocation.address}</p>
          </div>
        </div>

        <div className="pm-stats-row">
          <div className="mini-stat-card avail">
            <div className="icon-circ green"><CheckCircle2 size={20}/></div>
            <div><span>Available</span><strong>6</strong></div>
          </div>
          <div className="mini-stat-card occup">
            <div className="icon-circ blue"><Square size={20}/></div>
            <div><span>Occupied</span><strong>3</strong></div>
          </div>
          <div className="mini-stat-card resrv">
            <div className="icon-circ orange"><Clock size={20}/></div>
            <div><span>Reserved</span><strong>2</strong></div>
          </div>
          <div className="mini-stat-card maint">
            <div className="icon-circ red"><Wrench size={20}/></div>
            <div><span>Maintenance</span><strong>1</strong></div>
          </div>
        </div>

        <div className="filter-bar filter-bar-border">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Slots</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="slots-grid">
          {filteredSlots.map(slot => (
            <div key={slot.id} className={`slot-card border-${slot.status}`}>
              <div className="slot-card-top">
                <div className="slot-id">
                  <span className={`dot ${slot.status}`}></span>
                  {slot.slotNumber}
                </div>
                <span className={`badge-status ${slot.status}`}>{slot.status}</span>
              </div>
              
              {slot.vehicle && (
                <div className="slot-details">
                  <p><strong>Vehicle:</strong> {slot.vehicle}</p>
                  {slot.checkIn && <p><strong>Check-in:</strong> {slot.checkIn}</p>}
                </div>
              )}

              <div className="slot-actions">
                {slot.status !== 'available' && slot.status !== 'maintenance' && (
                  <button className="btn-open" onClick={() => updateSlotStatus(slot.id, 'available')}>
                    Open
                  </button>
                )}
                
                {slot.status !== 'maintenance' && (
                  <button className="btn-maint" onClick={() => updateSlotStatus(slot.id, 'maintenance')}>
                    Maintenance
                  </button>
                )}

                {slot.status === 'maintenance' && (
                  <button className="btn-open" onClick={() => updateSlotStatus(slot.id, 'available')}>
                    Finish Maint
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`pm-container ${isModalOpen ? 'blur-bg' : ''}`}>
        <div className="pm-header-main">
          <div>
            <h2>All Parking Locations</h2>
            <p>Click on a location to manage its parking slots</p>
          </div>
          <button className="add-loc-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add Location
          </button>
        </div>

        <div className="locations-grid">
          {initialLocations.map(loc => (
            <div key={loc.id} className="loc-card" onClick={() => setSelectedLocation(loc)}>
              <div className="loc-card-top">
                <div className="loc-icon-box">
                  <MapPin color="white" />
                </div>
                <div className="loc-info">
                  <h3>{loc.name}</h3>
                  <p>{loc.address}</p>
                </div>
                <span className={`badge-active ${loc.status}`}>{loc.status}</span>
              </div>
              
              <div className="loc-stats-grid">
                <div className="loc-stat blue">
                  <p>Total Slots</p>
                  <h4>{loc.totalSlots}</h4>
                </div>
                <div className="loc-stat green">
                  <p>Available</p>
                  <h4>{loc.availableSlots}</h4>
                </div>
              </div>

              <div className="loc-card-footer">
                <span>Click to view slots</span>
                <div className="footer-icons">
                  <button 
                    className="icon-btn" 
                    title="Edit Location"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      console.log("Edit:", loc.name);
                    }}
                  >
                    <Edit size={14}/>
                  </button>
                  <button 
                    className="icon-btn red" 
                    title="Delete Location"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      if(window.confirm(`Delete ${loc.name}?`)) {
                        console.log("Delete:", loc.id);
                      }
                    }}
                  >
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* CORRECTED BACK BUTTON LOCATION */}
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <h3>Add New Location</h3>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Location Name</label>
                <input type="text" placeholder="e.g., Downtown Plaza" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Full address" />
              </div>
              <div className="form-group">
                <label>Total Slots</label>
                <input type="number" placeholder="e.g., 120" />
              </div>

              {/* NEW FIELD: ADD PIC */}
              <div className="form-group">
                <label>Add Pic</label>
                <div className="custom-file-upload">
                  <ImageIcon size={18} />
                  <input type="file" accept="image/*" />
                  <span>Choose Image</span>
                </div>
              </div>

              {/* CORRECTED SUBMIT BUTTON CSS */}
              <button className="submit-loc-btn-updated" onClick={() => setIsModalOpen(false)}>
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParkingManagement;