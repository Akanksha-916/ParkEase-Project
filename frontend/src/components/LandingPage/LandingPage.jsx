import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleReserve = () => {
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      navigate("/reserve");
    } else {
      navigate("/auth?mode=login");
    }
  };

  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">ParkEase</h2>

        <div className="login-wrapper">
          <button
            className="nav-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Login
          </button>

          {showDropdown && (
  <div className="dropdown">
    <button onClick={() => navigate("/user-auth?mode=login")}>
      User Login
    </button>
    <button onClick={() => navigate("/admin-auth?mode=login")}>
      Admin Login
    </button>
  </div>
)}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero reveal">
        <div className="hero-left">
          <h1>
            Smart Parking <span>Made Effortless</span>
          </h1>

          <p>
            Discover available parking spaces instantly and reserve securely.
            Designed for efficiency, built for convenience.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleReserve}>
              Explore More 
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/user-auth?mode=register")}
            >
              Create Account
            </button>
          </div>

          <div className="stats">
            <div>
              <h3>⚡</h3>
              <p>Real-Time Updates</p>
            </div>
            <div>
              <h3>🔒</h3>
              <p>Secure Booking System</p>
            </div>
            <div>
              <h3>🛠</h3>
              <p>Instant Confirmation</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="mock-card">
            <h3>🚗 Slot Available</h3>
            <p>Real-time availability updated instantly</p>
            <button onClick={handleReserve}>Reserve Now</button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider"></div>

      {/* How It Works */}
      <section className="how reveal">
        <h2>How ParkEase Works</h2>

        <div className="how-container">
          <div className="how-card">
            <h3>1️⃣ Search</h3>
            <p>Find nearby parking slots based on availability.</p>
          </div>

          <div className="how-card">
            <h3>2️⃣ Reserve</h3>
            <p>Secure your slot instantly with one click.</p>
          </div>

          <div className="how-card">
            <h3>3️⃣ Park</h3>
            <p>Arrive and park smoothly without delays.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h2>Experience Smart Parking Today</h2>
        <button className="primary-btn" onClick={handleReserve}>
          Get Started
        </button>
      </section>

      <footer className="footer">
        © 2026 ParkEase | Intelligent Parking System
      </footer>
    </div>
  );
}
