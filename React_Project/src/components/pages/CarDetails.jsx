import { useState } from "react";
import { useParams } from "react-router-dom";
import carsData from "../../services/carsApi";
import latestCarsData from "../../services/latestCarsApi";
import Navbar from "../Navbar";
import "./CarDetails.css";
import emailjs from "@emailjs/browser";

const IconCalendar = () => (
  <svg
    viewBox="0 0 24 24"
    className="cd-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
  </svg>
);

const IconPin = () => (
  <svg
    viewBox="0 0 24 24"
    className="cd-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

const IconTag = () => (
  <svg
    viewBox="0 0 24 24"
    className="cd-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M20.5 12.6 12.9 20.2a2 2 0 0 1-2.8 0l-6.3-6.3a2 2 0 0 1 0-2.8L11.4 3.5a2 2 0 0 1 1.5-.6l6 .2a1 1 0 0 1 1 1l.2 6a2 2 0 0 1-.6 1.5Z" />
    <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

const IconUser = () => (
  <svg
    viewBox="0 0 24 24"
    className="cd-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path
      d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconPhone = () => (
  <svg
    viewBox="0 0 24 24"
    className="cd-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
  </svg>
);

const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    className="cd-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CarDetails() {
  const { id } = useParams();

  const allCars = [...carsData, ...latestCarsData];

  const car = allCars.find((car) => car.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [sent, setSent] = useState(false);

  if (!car) {
    return (
      <>
        <h1>Car Not Found</h1>
      </>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "default_service",
        "template_muy0lwr",
        {
          car_title: car.title,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `I am interested in this car: ${car.title}`,
        },
        {
          publicKey: "9uAGpOcU7Ci8sBFkG",
        },
      );

      setSent(true);

      setForm({
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="cd-page">
        <div className="cd-container">
          {/* -------- Main column -------- */}
          <div className="cd-main">
            <div className="cd-image-frame">
              <img src={car.image} alt={car.title} className="cd-image" />
              <span className="cd-price-badge">
                <IconTag />
                {car.price}
              </span>
            </div>

            <div className="cd-heading-row">
              <div>
                <h1 id="car_title" className="cd-title">
                  {car.title}
                </h1>
                <div className="cd-meta-line">
                  <span className="cd-meta-item">
                    <IconCalendar />
                    {car.year}
                  </span>
                  <span className="cd-meta-divider" />
                  <span className="cd-meta-item">
                    <IconPin />
                    {car.location}
                  </span>
                </div>
              </div>
              <h2 className="cd-price-desktop">{car.price}</h2>
            </div>

            <div className="cd-specs-grid">
              <div className="cd-spec-card">
                <IconCalendar />
                <div>
                  <span className="cd-spec-label">Year</span>
                  <span className="cd-spec-value">{car.year}</span>
                </div>
              </div>
              <div className="cd-spec-card">
                <IconPin />
                <div>
                  <span className="cd-spec-label">Location</span>
                  <span className="cd-spec-value">{car.location}</span>
                </div>
              </div>
            </div>

            <section className="cd-description-section">
              <h3 className="cd-section-title">Description</h3>
              <div className="cd-divider" />
              <p className="cd-description-text">{car.descrption}</p>
            </section>
          </div>

          <aside className="cd-sidebar">
            <div className="cd-contact-card">
              <div className="cd-contact-header">
                <span className="cd-contact-eyebrow">Contact Seller</span>
                <h3 className="cd-contact-title">Interested in this car?</h3>
                <p className="cd-contact-sub">
                  Send your details and the seller will get back to you shortly.
                </p>
              </div>

              {sent ? (
                <div className="cd-success">
                  Your message has been sent. The seller will contact you soon.
                </div>
              ) : (
                <form className="cd-form" onSubmit={handleSubmit}>
                  <div className="cd-field">
                    <label htmlFor="cd-name" className="cd-label">
                      <IconUser /> Name
                    </label>
                    <input
                      id="cd-name"
                      name="name"
                      type="text"
                      className="cd-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="cd-field">
                    <label htmlFor="cd-phone" className="cd-label">
                      <IconPhone /> Phone Number
                    </label>
                    <input
                      id="cd-phone"
                      name="phone"
                      type="tel"
                      className="cd-input"
                      placeholder="+20 1xx xxx xxxx"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="cd-field">
                    <label htmlFor="cd-email" className="cd-label">
                      <IconMail /> Email
                    </label>
                    <input
                      id="cd-email"
                      name="email"
                      type="email"
                      className="cd-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="cd-submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
