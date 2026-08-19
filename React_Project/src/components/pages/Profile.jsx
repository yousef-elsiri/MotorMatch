import "./Profile.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setSuccess(false);
    setLoading(true);

    if (!form.email || !form.password) {
      setLoading(false);
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setLoading(false);
      setError("Please enter a valid email.");
      return;
    }

    if (form.password.length < 8) {
      setLoading(false);
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: form.email,
        password: form.password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login_page">
      <div className="login_left">
        <div className="left_overlay"></div>

        <div className="left_content">
          <span className="left_badge">🚗 Premium Marketplace</span>

          <h1>
            Buy, Sell & Discover
            <br />
            Your Dream Car
          </h1>

          <p>
            MotorMatch helps you buy and sell vehicles with confidence. Browse
            thousands of verified listings from trusted sellers.
          </p>

          <div className="left_features">
            <div className="feature">
              <span>✔</span>
              <p>15,000+ Verified Cars</p>
            </div>

            <div className="feature">
              <span>✔</span>
              <p>Secure Transactions</p>
            </div>

            <div className="feature">
              <span>✔</span>
              <p>Trusted Dealers</p>
            </div>
          </div>

          <div className="left_stats">
            <div>
              <h2>15K+</h2>
              <span>Cars</span>
            </div>

            <div>
              <h2>4.9★</h2>
              <span>Rating</span>
            </div>

            <div>
              <h2>120+</h2>
              <span>Dealers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login_right">
        <div className="login_card">
          <form onSubmit={handleLogin}>
            <h1>Welcome Back</h1>
            <p>Sign in to continue to MotorMatch</p>

            <div className="input_box">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="input_box">
              <label>Password</label>

              <div className="password_box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                <span
                  className="eye_icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <a href="#" style={{ color: "#ff7b00" }}>
                Forgot Password?
              </a>
            </div>

            {error && <p className="error_message">{error}</p>}
            {success && <p className="success_message">✓ Login Successful</p>}

            <button className="login_btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <p className="register_link">
              Don't have an account? <Link to="/register">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
