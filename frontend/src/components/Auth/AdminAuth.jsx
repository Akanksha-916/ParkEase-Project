import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid admin email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && formData.name.trim() === "") {
      newErrors.name = "Admin name required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isLogin) {
      // Dummy Admin Credentials
      if (
        formData.email === "admin@parkease.com" &&
        formData.password === "admin123"
      ) {
        localStorage.setItem("admin", JSON.stringify(formData));
        localStorage.setItem("role", "admin");
        alert("Admin Login Successful");
        navigate("/admin-dashboard");
      } else {
        alert("Invalid Admin Credentials");
        return;
      }
    } else {
      // Register Admin
      localStorage.setItem("admin", JSON.stringify(formData));
      localStorage.setItem("role", "admin");
      alert("Admin Account Created");
      navigate("/admin-dashboard");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div
      className={`auth-tri-wrapper admin-theme ${
        isLogin ? "login" : "register"
      }`}
    >
      <div className="triangle-layer"></div>

      <div className="auth-content">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{isLogin ? "Admin Login" : "Create Admin Account"}</h1>

          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Admin Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
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
            {isLogin ? "Login as Admin" : "Create Account"}
          </button>

          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "New admin? " : "Already have account? "}
            <span>
              {isLogin ? "Create Account" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}