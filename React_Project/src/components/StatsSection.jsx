import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 220, suffix: "K+", label: "Active listings" },
  { value: 3.2, suffix: "M", label: "Monthly buyers", isFloat: true },
  { value: 48, suffix: "K", label: "Verified dealers" },
  { value: 4.9, suffix: "★", label: "Average rating", isFloat: true },
];

function useCountUp(target, duration = 1800, started = false, isFloat = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(
        isFloat ? +(target * eased).toFixed(1) : Math.floor(target * eased),
      );
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started]);
  return count;
}

function AnimatedStat({ value, suffix, label, delay, started, isFloat }) {
  const count = useCountUp(value, 1800, started, isFloat);
  const display = isFloat ? count.toFixed(1) + suffix : count + suffix;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: "#0f0f0f",
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        {display}
      </div>
      <div style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", fontWeight: 400 }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "",
        padding: "48px 24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        ref={ref}
        style={{
          background: "#f97316",
          borderRadius: 20,
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          gap: 48,
          maxWidth: "100%",
          marginBottom: "100px",
          flexWrap: "wrap",
        }}
      >
        {/* Title */}
        <div
          style={{
            flex: "0 0 auto",
            maxWidth: 200,
            opacity: started ? 1 : 0,
            transform: started ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.5s ease 0ms, transform 0.5s ease 0ms",
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0f0f0f",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Trusted by drivers across the country
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 150,
            flexShrink: 0,
          }}
        />

        {/* Stats Grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "24px 32px",
          }}
        >
          {stats.map((s, i) => (
            <AnimatedStat
              key={i}
              {...s}
              delay={100 + i * 120}
              started={started}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
