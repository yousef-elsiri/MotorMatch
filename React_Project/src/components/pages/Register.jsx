import { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "./Register.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-()\s]{7,20}$/;

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const passwordStrength = getPasswordStrength(formData.password);

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstName":
        return value.trim() ? "" : "First name is required.";
      case "lastName":
        return value.trim() ? "" : "Last name is required.";
      case "username":
        if (!value.trim()) return "Username is required.";
        if (value.trim().length < 3)
          return "Username must be at least 3 characters.";
        if (!/^[a-zA-Z0-9_]+$/.test(value.trim()))
          return "Username can only contain letters, numbers, and underscores.";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!EMAIL_REGEX.test(value.trim()))
          return "Enter a valid email address.";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!PHONE_REGEX.test(value.trim()))
          return "Enter a valid phone number.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password.";
        if (value !== allValues.password) return "Passwords do not match.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formData, [name]: value };
    setFormData(updatedValues);

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, updatedValues),
        ...(name === "password" && touched.confirmPassword
          ? {
              confirmPassword: validateField(
                "confirmPassword",
                updatedValues.confirmPassword,
                updatedValues,
              ),
            }
          : {}),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, formData),
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key], formData);
    });
    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const isValid = validateAll();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      // Simulated network request — replace with real API call.
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      console.log(response.data);

      setSubmitSuccess(true);
      setFormData(initialFormData);
      setTouched({});
      setErrors({});
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: "Something went wrong. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `input-wrapper${errors[name] && touched[name] ? " has-error" : ""}${
      touched[name] && !errors[name] && formData[name] ? " is-valid" : ""
    }`;

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">
            <span className="logo-mark"></span>
          </div>
          <h1 className="register-title">Create Your Account</h1>
          <p className="register-subtitle">
            Join us in a few quick steps and get full access to your dashboard.
          </p>
        </div>

        {submitSuccess && (
          <div className="alert alert-success" role="status">
            <FaCheckCircle aria-hidden="true" />
            <span>Account created successfully! You can now sign in.</span>
          </div>
        )}

        {errors.form && (
          <div className="alert alert-error" role="alert">
            <FaExclamationCircle aria-hidden="true" />
            <span>{errors.form}</span>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className={fieldClass("firstName")}>
                <FaUser className="input-icon" aria-hidden="true" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.firstName}
                  aria-describedby="firstName-error"
                />
              </div>
              {errors.firstName && touched.firstName && (
                <span className="field-error" id="firstName-error">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className={fieldClass("lastName")}>
                <FaUser className="input-icon" aria-hidden="true" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.lastName}
                  aria-describedby="lastName-error"
                />
              </div>
              {errors.lastName && touched.lastName && (
                <span className="field-error" id="lastName-error">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className={fieldClass("username")}>
              <FaUser className="input-icon" aria-hidden="true" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.username}
                aria-describedby="username-error"
              />
            </div>
            {errors.username && touched.username && (
              <span className="field-error" id="username-error">
                {errors.username}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className={fieldClass("email")}>
                <FaEnvelope className="input-icon" aria-hidden="true" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
              </div>
              {errors.email && touched.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className={fieldClass("phone")}>
                <FaPhone className="input-icon" aria-hidden="true" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.phone}
                  aria-describedby="phone-error"
                />
              </div>
              {errors.phone && touched.phone && (
                <span className="field-error" id="phone-error">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className={fieldClass("password")}>
              <FaLock className="input-icon" aria-hidden="true" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.password && (
              <div className="password-strength" aria-hidden="true">
                <div className="strength-bars">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`strength-bar${i < passwordStrength ? " filled" : ""} strength-${passwordStrength}`}
                    />
                  ))}
                </div>
                <span className="strength-label">
                  {strengthLabels[passwordStrength]}
                </span>
              </div>
            )}
            {errors.password && touched.password && (
              <span className="field-error" id="password-error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={fieldClass("confirmPassword")}>
              <FaLock className="input-icon" aria-hidden="true" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="field-error" id="confirmPassword-error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="login-link">
            Already have an account? <a href="/profile">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
