import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added to enable navigation
import "./parking.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { 
  Search, SlidersHorizontal, MapPin, Star, Navigation, 
  Clock, Zap, Heart, ArrowLeft, Shield, CheckCircle2, XCircle, Calendar
} from "lucide-react";


const mockData = [
  {
    id: 1,
    name: "Downtown Plaza Parking",
    address: "123 Main Street, Downtown",
    distance: 0.5,
    price: 5,
    rating: 4.5,
    reviews: 328,
    availableSlots: 45,
    totalSlots: 150,
    occupiedSlots: 105,
    predictedAvailability: 75,
    features: ["24/7 Security", "EV Charging", "Covered"],
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Central Mall Parking",
    address: "456 Oak Avenue, Central District",
    distance: 1.2,
    price: 3,
    rating: 4.7,
    reviews: 512,
    availableSlots: 120,
    totalSlots: 200,
    occupiedSlots: 80,
    predictedAvailability: 85,
    features: ["Covered", "CCTV", "Wheelchair Access"],
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Business District Garage",
    address: "321 Corporate Blvd, Financial District",
    distance: 2.1,
    price: 8,
    rating: 4.6,
    reviews: 445,
    availableSlots: 15,
    totalSlots: 100,
    occupiedSlots: 85,
    predictedAvailability: 25,
    features: ["Valet Service", "EV Charging", "Car Wash"],
    image: "https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Riverside Open Parking",
    address: "555 River Road, Riverside",
    distance: 3.5,
    price: 2,
    rating: 4.1,
    reviews: 156,
    availableSlots: 85,
    totalSlots: 200,
    occupiedSlots: 115,
    predictedAvailability: 95,
    features: ["Open Air", "Affordable", "24/7 Access"],
    image: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=800"
  },

  {
  id: 5,
  name: "City Center Smart Parking",
  address: "78 MG Road, City Center",
  distance: 0.8,
  price: 6,
  rating: 4.4,
  reviews: 289,
  availableSlots: 60,
  totalSlots: 180,
  occupiedSlots: 120,
  predictedAvailability: 70,
  features: ["EV Charging", "24/7 Security", "Smart Sensors"],
  image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=800"
},

{
  id: 6,
  name: "Metro Station Parking Hub",
  address: "Near Metro Gate 3, Andheri",
  distance: 1.5,
  price: 4,
  rating: 4.3,
  reviews: 412,
  availableSlots: 95,
  totalSlots: 220,
  occupiedSlots: 125,
  predictedAvailability: 80,
  features: ["Covered", "CCTV", "Metro Access"],
  image: "https://images.unsplash.com/photo-1593941707882-a5bba53b6c6d?auto=format&fit=crop&q=80&w=800"
},

{
  id: 7,
  name: "Tech Park Underground Parking",
  address: "Phase 2 IT Park, Hinjewadi",
  distance: 4.2,
  price: 7,
  rating: 4.8,
  reviews: 601,
  availableSlots: 35,
  totalSlots: 140,
  occupiedSlots: 105,
  predictedAvailability: 40,
  features: ["Covered", "EV Charging", "Car Wash"],
  image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?auto=format&fit=crop&q=80&w=800"
},

{
  id: 8,
  name: "Airport Long Stay Parking",
  address: "Terminal 2, Airport Road",
  distance: 6.8,
  price: 10,
  rating: 4.6,
  reviews: 890,
  availableSlots: 150,
  totalSlots: 300,
  occupiedSlots: 150,
  predictedAvailability: 85,
  features: ["24/7 Access", "Shuttle Service", "Security Patrol"],
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
},

{
  id: 9,
  name: "Hospital Visitor Parking",
  address: "City Hospital Road",
  distance: 2.9,
  price: 3,
  rating: 4.2,
  reviews: 198,
  availableSlots: 25,
  totalSlots: 90,
  occupiedSlots: 65,
  predictedAvailability: 35,
  features: ["Wheelchair Access", "24/7 Security", "Affordable"],
  image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&q=80&w=800"
},

{
  id: 10,
  name: "Luxury Mall VIP Parking",
  address: "Grand Mall, VIP Entrance",
  distance: 1.0,
  price: 12,
  rating: 4.9,
  reviews: 720,
  availableSlots: 20,
  totalSlots: 80,
  occupiedSlots: 60,
  predictedAvailability: 30,
  features: ["Valet Service", "Covered", "Premium Security"],
  image: "https://images.unsplash.com/photo-1592840062661-4d3a14f28b5b?auto=format&fit=crop&q=80&w=800"
}
];

function ParkingCard({ data, onSelect }) {
  const isLow = data.availableSlots < 20;
  return (
    <div className="pe-card">
      <div className="pe-card-img-wrapper">
        <img src={data.image} alt={data.name} />
        <div className={`pe-slots-badge ${isLow ? 'low' : 'high'}`}>{data.availableSlots} slots available</div>
        <button className="pe-heart-btn"><Heart size={18} /></button>
      </div>
      <div className="pe-card-body">
        <h3>{data.name}</h3>
        <p className="pe-card-addr"><MapPin size={14} /> {data.address}</p>
        <div className="pe-card-stats-row">
          <div className="pe-stat"><span><Navigation size={14}/> {data.distance} km</span><small>Distance</small></div>
          <div className="pe-stat"><span><Clock size={14}/> ${data.price}/hr</span><small>Price</small></div>
          <div className="pe-stat"><span><Star size={14} fill="#facc15" color="#facc15"/> {data.rating}</span><small>{data.reviews} reviews</small></div>
        </div>
        <button className="pe-view-details-btn" onClick={onSelect}>View Details & Book</button>
      </div>
    </div>
  );
}

export default function ParkingPage() {
  const [activeId, setActiveId] = useState(null); 
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const selectedParking = mockData.find(p => p.id === activeId);
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="parkeasy-container">
      <main className="pe-main">
        {!activeId ? (
          <>
            <header className="pe-header">
              <h1>Find Parking</h1>
              <p>Search and filter parking locations near you</p>
            </header>

            <section className="pe-search-filter-card">
              <div className="pe-search-row">
                <div className="pe-input-wrapper">
                  <Search className="pe-icon-search" size={20} />
                  <input type="text" placeholder="Search by location or address..." />
                </div>
                <button 
                  className={`pe-filter-toggle-btn ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={18} /> <span>Filters</span>
                </button>
              </div>

              {showFilters && (
                <div className="pe-expanded-filters">
                  <div className="pe-filter-row">
                    <div className="pe-filter-item">
                      <label>Max Price: $50/hr</label>
                      <input type="range" className="pe-slider" />
                    </div>
                    <div className="pe-filter-item">
                      <label>Max Distance: 10 km</label>
                      <input type="range" className="pe-slider" />
                    </div>
                    <div className="pe-filter-item">
                      <label>Min Availability: 0%</label>
                      <input type="range" className="pe-slider" />
                    </div>
                    <div className="pe-filter-item">
                      <label>Sort By</label>
                      <select className="pe-select">
                        <option>Distance</option>
                        <option>Price</option>
                        <option>Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <div className="pe-results-label">
              Found <span className="highlight">{mockData.length}</span> parking locations
            </div>

            <div className="pe-grid">
              {mockData.map(item => (
                <ParkingCard key={item.id} data={item} onSelect={() => setActiveId(item.id)} />
              ))}
            </div>
          </>
        ) : (
          <div className="pe-details-view">
            <button className="pd-back-btn" onClick={() => {setActiveId(null); setSelectedSlot("");}}>
              <ArrowLeft size={16} /> Back to search
            </button>

            <div className="pd-hero-container">
              <div className="pd-hero-image-box">
                <img src={selectedParking.image} alt={selectedParking.name} />
                <div className="pd-hero-overlay">
                  <h1>{selectedParking.name}</h1>
                </div>
              </div>
              <div className="pd-hero-details">
                <div className="pd-hero-left">
                  <p className="pd-location"><MapPin size={18} /> {selectedParking.address}</p>
                  <div className="pd-meta-row">
                    <Star size={16} fill="#facc15" color="#facc15" /> <b>{selectedParking.rating}</b> ({selectedParking.reviews} reviews)
                    <Navigation size={16} className="pd-nav-icon" /> {selectedParking.distance} km away
                  </div>
                </div>
                <div className="pd-hero-right">
                  <span className="pd-price-val">${selectedParking.price}</span>
                  <span className="pd-price-sub">per hour</span>
                </div>
              </div>
            </div>

            <div className="pd-live-section">
              <h3>Live Slot Status</h3>
              <div className="pd-slot-grid">
                {Array.from({length: 30}).map((_, i) => {
                  const slotName = `A-${i+1}`;
                  const isOcc = [0, 2, 6, 9, 11, 14, 15, 16, 17, 19, 20, 21, 22, 28, 29].includes(i);
                  return (
                    <div 
                      key={i} 
                      className={`pd-slot-box ${isOcc ? 'is-occ' : 'is-avail'} ${selectedSlot === slotName ? 'active' : ''}`}
                      onClick={() => !isOcc && setSelectedSlot(slotName)}
                    >
                      {slotName}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pd-booking-form-card">
              <h3>Book Your Spot</h3>
              <div className="pd-form-grid">
                <div className="pd-input-group">
                  <label>Enter Slot Name</label>
                  <input type="text" placeholder="e.g. A-2" value={selectedSlot} readOnly />
                </div>
                <div className="pd-input-group">
                  <label>From Date</label>
                  <input type="date" defaultValue="2026-02-14" />
                </div>
                <div className="pd-input-group">
                  <label>To Date</label>
                  <input type="date" defaultValue="2026-02-14" />
                </div>
                <div className="pd-input-group">
                  <label>Duration (hours)</label>
                  <input type="number" defaultValue="8" />
                </div>
                <div className="pd-input-group">
                  <label>Start Time</label>
                  <input type="time" defaultValue="09:00" />
                </div>
                <div className="pd-input-group">
                  <label>End Time</label>
                  <input type="time" defaultValue="17:00" />
                </div>
              </div>
              
              {/* ✅ Only fix for linking pages */}
              {!selectedSlot ? (
  <button
    className="pd-confirm-booking-btn"
    onClick={() => alert("Please select a slot before confirming!")}
  >
    Confirm Booking
  </button>

  
) : (
  <div style={{ marginTop: "20px" }}>
    <PayPalScriptProvider
      options={{
        "client-id": "client_id", // 👈 paste your sandbox client id
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: selectedParking.price.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function () {
            alert("Payment Successful via PayPal!");

            navigate("/Reservation", {
  state: {
    name: selectedParking.name,
    slot: selectedSlot,
    address: selectedParking.address,
    date: selectedDate,
    timeStart: selectedStartTime,
    timeEnd: selectedEndTime,
    price: selectedParking.price,
    duration: selectedDuration,
  },
});
          });
        }}
        onError={(err) => {
          console.error(err);
          alert("Payment Failed!");
        }}
      />
    </PayPalScriptProvider>
  </div>
)}


<div className="fake-payment-section">
  <hr style={{ margin: "20px 0" }} />
  <p style={{ textAlign: "center", fontWeight: "600" }}>OR Pay Using</p>

  <div className="fake-payment-buttons">
    <button
      className="upi-btn"
      onClick={() => {
        alert("UPI Payment Successful (Demo)");
        navigate("/Reservation", {
          state: {
            name: selectedParking.name,
            slot: selectedSlot,
            address: selectedParking.address,
            date: "2026-02-14",
            timeStart: "14:00",
            timeEnd: "18:00",
            price: selectedParking.price,
            duration: 4,
          },
        });
      }}
    >
      Pay via UPI
    </button>

    <button
      className="gpay-btn"
      onClick={() => {
        alert("Google Pay Payment Successful (Demo)");
        navigate("/Reservation", {
          state: {
            name: selectedParking.name,
            slot: selectedSlot,
            address: selectedParking.address,
            date: "2026-02-14",
            timeStart: "14:00",
            timeEnd: "18:00",
            price: selectedParking.price,
            duration: 4,
          },
        });
      }}
    >
      Google Pay
    </button>

    <button
      className="phonepe-btn"
      onClick={() => {
        alert("PhonePe Payment Successful (Demo)");
        navigate("/Reservation", {
          state: {
            name: selectedParking.name,
            slot: selectedSlot,
            address: selectedParking.address,
            date: "2026-02-14",
            timeStart: "14:00",
            timeEnd: "18:00",
            price: selectedParking.price,
            duration: 4,
          },
        });
      }}
    >
      PhonePe
    </button>
  </div>
</div>


            </div>
          </div>
        )}
      </main>
    </div>
  );
}
