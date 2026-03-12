import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../services/authService";

export default function OwnerAuth() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  const [isLogin, setIsLogin] = useState(mode === "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {

      localStorage.setItem("owner", JSON.stringify(formData));

      navigate("/owner/dashboard");

    } else {

      localStorage.setItem("owner", JSON.stringify(formData));

      setIsLogin(true);
    }
  };

  return (
    <div className={`owner-theme auth-tri-wrapper ${isLogin ? "login" : "register"}`}>

      <div className="triangle-layer"></div>

      <div className="auth-content">

        <form className="auth-form" onSubmit={handleSubmit}>

          <h1>{isLogin ? "Owner Login" : "Owner Register"}</h1>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Owner Name"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}
            <span>{isLogin ? "Register" : "Login"}</span>
          </p>

        </form>

      </div>

    </div>
  );
}