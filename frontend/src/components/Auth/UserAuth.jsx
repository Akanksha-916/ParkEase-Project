import { useState } from "react";
import "./Auth.css";

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!isLogin && formData.name.trim() === "") {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isLogin) {
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Login Successful");
    } else {
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Account Created Successfully");
      setIsLogin(true);
    }

    // Reset form after submit
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={`auth-tri-wrapper ${isLogin ? "login" : "register"}`}>
      
      {/* Background Triangle Layer */}
      <div className="triangle-layer"></div>

      <div className="auth-content">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{isLogin ? "User Login" : "Create Account"}</h1>

          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

          <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? (
              <>
                New here? <span>Register</span>
              </>
            ) : (
              <>
                Already have an account? <span>Login</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
