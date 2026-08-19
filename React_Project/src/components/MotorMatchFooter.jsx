import { useEffect, useRef } from "react";

const links = {
  Marketplace: ["Browse cars", "Sell a car", "Dashboard", "Financing"],
  Company: ["About", "Careers", "Press", "Contact"],
  Resources: ["Help center", "Buyer guide", "Seller guide", "Trust & safety"],
  Legal: ["Terms", "Privacy", "Cookies", "Licenses"],
};

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

export default function MotorMatchFooter() {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    function randBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function makeParticle() {
      return {
        x: randBetween(0, W),
        y: randBetween(0, H),
        r: randBetween(1, 2.5),
        vx: randBetween(-0.15, 0.15),
        vy: randBetween(-0.3, -0.08),
        alpha: randBetween(0.2, 0.7),
        life: 0,
        maxLife: randBetween(200, 500),
      };
    }

    function resize() {
      const rect = footer.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    }

    function initParticles() {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        const p = makeParticle();
        p.life = Math.floor(Math.random() * p.maxLife);
        particlesRef.current.push(p);
      }
    }

    function drawLines() {
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const opacity = (1 - dist / 90) * 0.18;
            ctx.strokeStyle = `rgba(249,115,22,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function drawMouseConnections() {
      const { x: mx, y: my } = mouseRef.current;
      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.5;
          ctx.strokeStyle = `rgba(249,115,22,${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      particlesRef.current = particlesRef.current.map((p) => {
        p.life++;
        if (p.life > p.maxLife) return makeParticle();

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const force = ((80 - dist) / 80) * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const lifeRatio = p.life / p.maxLife;
        const fade =
          lifeRatio < 0.1
            ? lifeRatio / 0.1
            : lifeRatio > 0.85
              ? (1 - lifeRatio) / 0.15
              : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${p.alpha * fade})`;
        ctx.fill();

        return p;
      });

      drawLines();
      drawMouseConnections();
      animFrameRef.current = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    const onResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    if (dotRef.current) {
      dotRef.current.style.left = x + "px";
      dotRef.current.style.top = y + "px";
      dotRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -999, y: -999 };
    if (dotRef.current) dotRef.current.style.opacity = "0";
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        // الخلفية اهي ياض
        background: "linear-gradient(180deg, #0a121f 0%, #050c14 60%, #02050a 100%)",
        // الخلفية 
        width: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.45,
        }}
      />

      {/* Glow dot */}
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#f97316",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          filter: "blur(1px)",
          zIndex: 10,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Main grid */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "56px 48px 40px",
          display: "grid",
          gridTemplateColumns: "260px repeat(4, 1fr)",
          gap: 32,
        }}
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                background: "#f97316",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CarIcon />
            </div>
            <span style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
              Drive Marcket
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "#8b8fa8",
              marginBottom: 20,
            }}
          >
            The cleanest marketplace to buy and sell cars. The website was built
            by Engineer <span style={{ color: "#f97316" }}>Yousef Ali El-Siri.</span>
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["★ 4.9 — 12.4k reviews", "Trusted since 2019"].map((text) => (
              <span
                key={text}
                style={{
                  background: "#1e2030",
                  border: "0.5px solid #2e3150",
                  borderRadius: 20,
                  padding: "5px 12px",
                  fontSize: 12,
                  color: "#b0b4cc",
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                marginBottom: 16,
                letterSpacing: "0.02em",
              }}
            >
              {title}
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {items.map((item) => (
                <li key={item}>
                  <a  
                    href="#"
                    style={{
                      fontSize: 13,
                      color: "#8b8fa8",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#f97316";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#8b8fa8";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "0.5px solid #1e2030",
          padding: "18px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "#555870" }}>
          © 2026{" "}
          <a href="#" style={{ color: "#f97316", textDecoration: "none" }}>
            Drive Market, Inc.
          </a>{" "}
          /Under the supervision of Engineer <span style={{ color: "#f97316" }}>Yousef Ali El-Siri.</span>
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Sitemap"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ fontSize: 12, color: "#555870", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555870")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
