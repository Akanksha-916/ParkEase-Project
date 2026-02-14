import { useState } from "react";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleMouseMove = (e) => {
    const card = document.querySelector(".auth-form");
    if (!card) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    card.style.transform = `translateY(0) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  return (
    <div
      className={`auth-tri-wrapper ${isLogin ? "login" : "register"}`}
      onMouseMove={handleMouseMove}
    >
      {/* Triangle animation */}
      <div className="triangle-layer"></div>

      {/* Content */}
      <div className="auth-content">
        {isLogin ? (
          <div className="auth-form">
            <h1>Welcome Back</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <p onClick={() => setIsLogin(false)}>
              New here? <span>Register</span>
            </p>
          </div>
        ) : (
          <div className="auth-form">
            <h1>Create Account</h1>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
            <p onClick={() => setIsLogin(true)}>
              Already have an account? <span>Login</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
