import { useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import Navbar from "../Navbar";
import emailjs from "@emailjs/browser";
import adminImage from "../../API_imges/admin.png";
import MotorMatchFooter from "../MotorMatchFooter";

const ICONS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3,7 12,13 21,7" />
    </>
  ),
  phone: (
    <path d="M6 3h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
  ),
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-11.9 7.8L3 21l1.7-6.1A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1" />
      <path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </>
  ),
  code: (
    <>
      <polyline points="9,7 4,12 9,17" />
      <polyline points="15,7 20,12 15,17" />
    </>
  ),
  palette: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8.5" cy="10.5" r="1.1" />
      <circle cx="12" cy="8" r="1.1" />
      <circle cx="15.5" cy="10.5" r="1.1" />
      <path d="M8 15c1 1 2 1.5 4 1.5s4-1 4-2.7c0-1-.8-1.3-1.8-1.3H13c-1 0-1.5-.5-1.5-1.2" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <line x1="7" y1="7.5" x2="7" y2="7.5" />
      <line x1="7" y1="16.5" x2="7" y2="16.5" />
    </>
  ),
  gitBranch: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="8" r="2" />
      <path d="M6 7v10" />
      <path d="M6 12c0-3 3-4 6-4h4" />
    </>
  ),
  api: (
    <>
      <path d="M6 15a4 4 0 1 1 .5-8" />
      <path d="M18 9a4 4 0 1 1-.5 8" />
      <path d="M8 12h8" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="8" r="2.3" />
      <path d="M15.5 14c2.5.3 4.5 2.6 4.5 6" />
    </>
  ),
  node: <path d="M12 2 3 7v10l9 5 9-5V7z M3 7l9 5 9-5 M12 12v10" />,
  layers: (
    <>
      <polygon points="12,3 21,8 12,13 3,8" />
      <polyline points="3,13 12,18 21,13" />
      <polyline points="3,17.5 12,22.5 21,17.5" />
    </>
  ),
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
    </>
  ),
  car: (
    <>
      <path d="M4 16V12l2-5h12l2 5v4" />
      <path d="M3 16h18v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7.5" cy="16" r="1.4" />
      <circle cx="16.5" cy="16" r="1.4" />
    </>
  ),
  tag: (
    <>
      <path d="M20 12.5 12.5 20 4 11.5V4h7.5z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  message: <path d="M4 5h16v11H8l-4 4z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 4.5 3.2 7.7 8 9 4.8-1.3 8-4.5 8-9V6z" />,
  bolt: <polygon points="13,2 4,14 11,14 10,22 20,9 13,9" />,
  arrow: (
    <>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14,6 20,12 14,18" />
    </>
  ),
  admin: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M18.5 4.5 20 6l-2.3 2.3" />
    </>
  ),
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name] || ICONS.info}
    </svg>
  );
}

const badges = [
  "Website Owner",
  "Developer & Designer",
  "Available for Projects",
];

const aboutTags = [
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Node.js",
  "Responsive Design",
  "UI/UX",
  "Full Stack Development",
];

const skills = [
  { icon: "code", name: "HTML5", level: "Advanced", value: 95 },
  { icon: "palette", name: "CSS3", level: "Advanced", value: 92 },
  { icon: "bolt", name: "JavaScript", level: "Advanced", value: 90 },
  { icon: "layers", name: "React.js", level: "Advanced", value: 93 },
  { icon: "layout", name: "Responsive Design", level: "Advanced", value: 94 },
  { icon: "gitBranch", name: "Git & GitHub", level: "Advanced", value: 88 },
  { icon: "api", name: "REST APIs", level: "Intermediate", value: 82 },
  { icon: "users", name: "UI / UX", level: "Advanced", value: 90 },
  { icon: "node", name: "Node.js", level: "Intermediate", value: 78 },
  { icon: "server", name: "Laravel", level: "Intermediate", value: 75 },
];

const pages = [
  {
    icon: "home",
    name: "Home",
    desc: "Main landing page of the platform",
    path: "/",
  },
  {
    icon: "car",
    name: "Browse Cars",
    desc: "Search and filter available listings",
    path: "/browse",
  },
  {
    icon: "tag",
    name: "Sell Your Car",
    desc: "List a new vehicle for sale",
    path: "/sell",
  },
  {
    icon: "grid",
    name: "Dashboard",
    desc: "User account overview & activity",
    path: "/dashboard/porsche",
  },
  {
    icon: "message",
    name: "Messages",
    desc: "Conversations between buyers & sellers",
    path: "/messages",
  },
  {
    icon: "admin",
    name: "Admin",
    desc: "You are here — site management",
    path: "/admin",
  },
];

const responsibilities = [
  {
    hash: "a3f9c2",
    msg: "Designed the complete UI/UX system",
    time: "Ongoing",
  },
  {
    hash: "e71b04",
    msg: "Developed every page in React from scratch",
    time: "Ongoing",
  },
  {
    hash: "9c2d8a",
    msg: "Built and structured the backend & database",
    time: "Ongoing",
  },
  {
    hash: "f4a112",
    msg: "Optimized performance, load speed & SEO",
    time: "Ongoing",
  },
  {
    hash: "0d6e77",
    msg: "Maintains, updates and ships new features",
    time: "Continuous",
  },
];

const contactMethods = [
  {
    icon: "mail",
    title: "Email",
    value: "yousefelsery.web@gmail.com",
    link: "mailto:yousefelsery.web@gmail.com",
  },
  {
    icon: "phone",
    title: "Phone",
    value: "+20 109 957 9630",
    link: "tel:+20 109 957 9630",
  },
  {
    icon: "chat",
    title: "WhatsApp",
    value: "Message me",
    link: "https://wa.me/201099579630",
  },
  {
    icon: "link",
    title: "GitHub",
    value: "github.com/yousef-elsiri",
    link: "https://github.com/yousef-elsiri",
  },
  {
    icon: "briefcase",
    title: "LinkedIn",
    value: "linkedin.com/in/yousef-ali-el-siri",
    link: "https://linkedin.com/in/yousef-ali-el-siri-3a92303a0/",
  },
];

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies Used", value: "15+" },
  { label: "Years of Experience", value: "0" },
  { label: "Websites Built", value: "11" },
];

function SectionHeading({ file, title, subtitle }) {
  return (
    <div className="section-heading">
      <div className="section-eyebrow">
        <span className="eyebrow-dot" />
        {file}
      </div>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    emailjs
      .send(
        "service_kj99eem", // Service ID
        "template_rxqlvel", // Template ID
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "9uAGpOcU7Ci8sBFkG", // Public Key
      )
      .then(() => {
        setSent(true);

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setSent(false), 4000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message");
      });
  }

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <section className="hero">
          <div className="hero-profile">
            <div className="avatar-wrap">
              <div
                className="avatar-placeholder"
                title="Yousef Ali Elsiri"
                style={{ backgroundImage: `url(${adminImage})` }}
              ></div>
              <span className="status-dot" title="Available" />
            </div>

            <h1>Yousef Ali Elsiri</h1>
            <p className="hero-role">Full Stack Developer</p>

            <div className="badge-row">
              {badges.map((b) => (
                <span className="badge" key={b}>
                  {b}
                </span>
              ))}
            </div>

            <p className="hero-bio">
              I'm the developer and designer behind this platform. I designed
              and developed this website with a focus on{" "}
              <span className="accent-text">modern UI</span>, performance,
              responsiveness, and a smooth user experience.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Get in Touch
              </a>
              <a href="#pages" className="btn btn-ghost">
                View Site Pages
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-titlebar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="panel-filename">profile.js</span>
            </div>
            <pre className="panel-code">
              <code>
                <span className="tok-key">const</span>{" "}
                <span className="tok-var">developer</span> = {"{"}
                {"\n"} name:{" "}
                <span className="tok-str">"Yousef Ali Elsiri"</span>,{"\n"}{" "}
                role: <span className="tok-str">"Full Stack Developer"</span>,
                {"\n"} status: <span className="tok-str">"available"</span>,
                {"\n"} stack: [<span className="tok-str">"React"</span>,{" "}
                <span className="tok-str">"Node"</span>,{" "}
                <span className="tok-str">"Laravel"</span>],
                {"\n"} owns: <span className="tok-str">"this website"</span>,
                {"\n"}
                {"}"};
              </code>
            </pre>
          </div>
        </section>

        <section className="section" id="about">
          <SectionHeading file="about.md" title="About Me" />
          <div className="card about-card">
            <p>
              I'm a front-end focused full stack developer who designed, built
              and maintains this entire platform end to end. My work spans clean
              component architecture in <strong>React</strong>, expressive
              styling with modern <strong>CSS</strong>, and interfaces that stay
              fast and usable on every screen size. I care about the small
              details — spacing, motion, and load times — as much as the big
              picture.
            </p>
            <p>
              Replace this paragraph with your own story: your background, what
              you specialize in, and what drives how you build products.
            </p>
            <div className="tag-row">
              {aboutTags.map((t) => (
                <span className="tag-pill" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <SectionHeading
            file="skills.json"
            title="My Skills"
            subtitle="Tools and technologies I use to build this platform."
          />
          <div className="skills-grid">
            {skills.map((s) => (
              <div className="skill-card" key={s.name}>
                <div className="skill-icon">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3>{s.name}</h3>
                <span className="skill-level">{s.level}</span>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: "" }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="pages">
          <SectionHeading
            file="routes.js"
            title="My Pages"
            subtitle="The pages that make up this website."
          />
          <div className="pages-grid">
            {pages.map((p) => (
              <Link to={p.path} className="page-card" key={p.name}>
                <div className="page-icon">
                  <Icon name={p.icon} size={20} />
                </div>
                <div className="page-info">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
                <Icon name="arrow" size={16} />
              </Link>
            ))}
          </div>
        </section>

        <section className="section" id="ownership">
          <SectionHeading
            file="commits.log"
            title="Website Developer & Owner"
            subtitle="Everything on this site was designed, built and is maintained by me."
          />
          <div className="card log-card">
            {responsibilities.map((r) => (
              <div className="log-row" key={r.hash}>
                <span className="log-hash">{r.hash}</span>
                <span className="log-msg">{r.msg}</span>
                <span className="log-time">{r.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="stats">
          <div className="stats-row">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <SectionHeading
            file="contact.js"
            title="Contact Me"
            subtitle="Have a project in mind? Reach out through any of these."
          />

          <div className="contact-grid">
            {contactMethods.map((c) => (
              <a
                className="contact-card"
                href={c.link}
                target={c.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                key={c.title}
              >
                <div className="contact-icon">
                  <Icon name={c.icon} size={20} />
                </div>
                <div className="contact-info">
                  <span className="contact-title">{c.title}</span>
                  <span className="contact-value">{c.value}</span>
                </div>
              </a>
            ))}
          </div>

          <form className="contact-form card" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Let's work together"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me a bit about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary form-submit">
              Send Message
            </button>

            {sent && (
              <p className="form-success">
                ✓ Message sent — I'll get back to you soon.
              </p>
            )}
          </form>
        </section>
      </div>
      <MotorMatchFooter />
    </>
  );
}
