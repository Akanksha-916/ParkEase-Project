import React from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Navigation, ArrowRight, Sparkles, 
  AlertCircle, TrendingUp, Calendar, Clock, Wallet
} from "lucide-react";

import "./UserDashboard.css";

const mockUser = { name: "Alex Johnson" };

export default function UserDashboard() {
  return (
    <main className="dashboard-content">

      {/* --- HERO SECTION --- */}
      <section className="hero-banner">
        <div className="hero-text">
          <h1>Welcome back, {mockUser.name}! 👋</h1>
          <p>Find and book parking spots with AI-powered recommendations</p>
        </div>
        <Link to="/Parking" className="find-parking-pill" style={{textDecoration:'none'}}>
          <MapPin size={16}/>
          <span>Find Parking</span>
        </Link>
      </section>

      {/* --- REFINED STATS SECTION --- */}
      <section className="stats-row">
        <StatCard 
          label="Active" 
          value="1" 
          icon={<Clock size={22} />} 
          type="active" 
        />
        <StatCard 
          label="Upcoming" 
          value="1" 
          icon={<Calendar size={22} />} 
          type="upcoming" 
        />
        <StatCard 
          label="Total Bookings" 
          value="5" 
          icon={<TrendingUp size={22} />} 
          type="total" 
        />
        <StatCard 
          label="Total Spent" 
          value="$343" 
          icon={<Wallet size={22} />} 
          type="spent" 
        />
      </section>

      {/* --- ACTIVE ALERT --- */}
      <section className="active-alert">
        <div className="alert-left">
          <div className="alert-icon-wrapper">
            <AlertCircle size={32} className="orange-icon"/>
          </div>
          <div className="alert-info">
            <h3>Active Booking</h3>
            <p>Downtown Plaza Parking - Slot A-45</p>
            <div className="meta">
              <span className="meta-item">⏰ 14:00 - 18:00</span>
              <span className="meta-item">📅 Feb 14</span>
            </div>
          </div>
        </div>
        <button className="navigate-orange-btn">
          <Navigation size={18}/>
          <span>Navigate</span>
        </button>
      </section>

      {/* --- SMART RECOMMENDATIONS --- */}
      <section className="unified-card">
        <div className="card-inner-header">
          <div className="title-area">
            <div className="icon-bg-purple">
              <Sparkles size={18} color="white"/>
            </div>
            <h2>Smart Recommendations</h2>
          </div>
          <Link to="/Parking" className="v-all">
            View All <ArrowRight size={14}/>
          </Link>
        </div>
        <div className="p-grid">
          <ParkingCard name="Downtown Plaza" dist="0.5 km away" slots="45/150" rating="4.5" price="$5" pred="75%"/>
          <ParkingCard name="Central Mall" dist="1.2 km away" slots="120/200" rating="4.7" price="$3" pred="85%"/>
          <ParkingCard name="Airport Long-term" dist="8.5 km away" slots="280/500" rating="4.3" price="$15" pred="90%"/>
        </div>
      </section>

      {/* --- UPCOMING BOOKINGS --- */}
      <section className="unified-card">
        <div className="card-inner-header">
          <h2>Upcoming Bookings</h2>
          <Link to="/Reservation" className="v-all">
            View All <ArrowRight size={14}/>
          </Link>
        </div>
        <div className="upcoming-item">
          <div className="u-info">
            <h3>Central Mall Parking</h3>
            <p>456 Oak Avenue, Central District</p>
            <div className="u-meta">
              <span><Calendar size={14}/> Feb 16, 2026</span>
              <span><Clock size={14}/> 10:00 - 13:00</span>
              <span><MapPin size={14}/> Slot B-12</span>
            </div>
          </div>
          <div className="u-price">
            <span className="amt">$9</span>
            <span className="dur">3 hours</span>
          </div>
        </div>
      </section>

      {/* --- QUICK ACTIONS --- */}
      <section className="quick-actions-grid">
        <Link to="/Parking" className="action-card" style={{textDecoration:'none', color:'inherit'}}>
          <div className="action-icon blue"><MapPin size={20}/></div>
          <div className="action-text">
            <h3>Nearby Parking</h3>
            <p>Find parking spots near you</p>
          </div>
        </Link>
        <div className="action-card">
          <div className="action-icon purple"><TrendingUp size={20}/></div>
          <div className="action-text">
            <h3>Best Deals</h3>
            <p>View affordable parking options</p>
          </div>
        </div>
        <div className="action-card">
          <div className="action-icon pink"><Star size={20}/></div>
          <div className="action-text">
            <h3>Top Rated</h3>
            <p>Explore highly rated locations</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper Components
function StatCard({ label, value, icon, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon-container">{icon}</div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

function ParkingCard({ name, dist, slots, rating, price, pred }) {
  return (
    <div className="p-item">
      <div className="p-head">
        <div className="p-name-dist">
          <h3>{name} Parking</h3>
          <span className="dist">{dist}</span>
        </div>
        <div className="p-rating">
          <Star size={12} fill="#FFB800" color="#FFB800"/>
          <span>{rating}</span>
        </div>
      </div>
      <div className="p-details">
        <div className="row"><span>Available</span><span className="avail">{slots} slots</span></div>
        <div className="row"><span>Price</span><span className="bold">{price}/hour</span></div>
        <div className="row"><span>AI Prediction</span><span className="purple-txt">{pred}</span></div>
      </div>
    </div>
  );
}