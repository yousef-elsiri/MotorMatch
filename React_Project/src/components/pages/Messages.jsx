
import "./Messages.css";

/* -------------------------------------------------------------------- */
/*  DECORATIVE DATA                                                      */
/* -------------------------------------------------------------------- */

const PARTICLES = Array.from({ length: 18 }, (_, i) => i);

const SHAPES = [
  { className: "shape shape-ring", style: { top: "12%", left: "10%" } },
  { className: "shape shape-square", style: { top: "68%", left: "14%" } },
  { className: "shape shape-triangle", style: { top: "20%", left: "86%" } },
  { className: "shape shape-ring shape-ring-sm", style: { top: "78%", left: "82%" } },
  { className: "shape shape-diamond", style: { top: "48%", left: "6%" } },
  { className: "shape shape-square shape-square-sm", style: { top: "8%", left: "62%" } },
];

/* -------------------------------------------------------------------- */
/*  COMPONENT                                                            */
/* -------------------------------------------------------------------- */

export default function Messages() {
  const handleGoBack = () => {
    if (typeof window !== "undefined") window.history.back();
  };

  return (
    <main className="error-page">
      <div className="error-bg" aria-hidden="true">
        <div className="bg-gradient" />
        <div className="glow-orb glow-orb-orange" />
        <div className="glow-orb glow-orb-white" />

        {SHAPES.map((shape, i) => (
          <span key={i} className={shape.className} style={shape.style} />
        ))}

        <div className="glow-line glow-line-1" />
        <div className="glow-line glow-line-2" />

        <div className="particle-field">
          {PARTICLES.map((p) => (
            <span key={p} className={`particle particle-${(p % 6) + 1}`} />
          ))}
        </div>
      </div>

      <section className="error-content">
        <p className="error-eyebrow">AutoPulse · Brand Intelligence</p>

        <h1 className="error-code" aria-label="404">
          <span>4</span>
          <span className="error-code-zero">0</span>
          <span>4</span>
        </h1>

        <h2 className="error-title">Page Not Found</h2>
        <p className="error-subtitle">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="error-actions">
          <a className="btn btn-primary" href="/">
            <span className="btn-arrow">←</span> Back Home
          </a>
          <button className="btn btn-secondary" onClick={handleGoBack} type="button">
            Go Back
          </button>
        </div>

        <div className="glass-card">
          <div className="glass-row">
            <span className="glass-label">Status Code</span>
            <span className="glass-value glass-value-code">404</span>
          </div>
          <div className="glass-divider" />
          <div className="glass-row">
            <span className="glass-label">Description</span>
            <span className="glass-value">Requested resource was not found.</span>
          </div>
          <div className="glass-divider" />
          <div className="glass-row">
            <span className="glass-label">Support</span>
            <a className="glass-value glass-link" href="mailto:yousefelsery.web@gmail.com">
              yousefelsery.web@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
