import {  useMemo } from "react";
import "./Dashboard.css";
import Navbar from "../Navbar";
import { LuCar } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
const YEARS = Array.from({ length: 13 }, (_, i) => 2014 + i);

function wobble(seed, i) {
  return Math.sin(seed * 12.9898 + i * 78.233) * 0.5 + 0.5;
}

function buildSeries(seed, start, end) {
  return YEARS.map((year, i) => {
    const t = i / (YEARS.length - 1);
    const base = start + (end - start) * t;
    const noise = (wobble(seed, i) - 0.5) * (end - start) * 0.06;
    return Math.max(0, Math.round(base + noise));
  });
}

const RAW_BRANDS = [
  {
    id: "porsche",
    name: "Porsche",
    subtitle: "Luxury Sports",
    country: "Germany",
    founded: 1931,
    ceo: "Oliver Blume",
    seed: 1.1,
    salesRange: [178, 320],
    priceRange: [78000, 118000],
    marketShare: 4.2,
    rating: 4.8,
    horsepower: 420,
    electric: 18,
    suv: 46,
    luxury: 96,
    ranking: 9,
    topModel: "911",
    models: ["911", "Cayenne", "Macan", "Taycan", "Panamera"],
    summary:
      "Porsche has held firm as a symbol of performance engineering, blending combustion heritage with an accelerating electric lineup from 2014 to 2026.",
  },
  {
    id: "tesla",
    name: "Tesla",
    subtitle: "Electric",
    country: "United States",
    founded: 2003,
    ceo: "Elon Musk",
    seed: 2.7,
    salesRange: [35, 2150],
    priceRange: [38000, 52000],
    marketShare: 11.6,
    rating: 4.5,
    horsepower: 480,
    electric: 100,
    suv: 38,
    luxury: 72,
    ranking: 4,
    topModel: "Model Y",
    models: ["Model Y", "Model 3", "Model S", "Model X", "Cybertruck"],
    summary:
      "Tesla has shown continuous growth in annual sales and average vehicle prices from 2014 to 2026, maintaining one of the strongest positions in the global automotive market.",
  },
  {
    id: "bmw",
    name: "BMW",
    subtitle: "Luxury",
    country: "Germany",
    founded: 1916,
    ceo: "Oliver Zipse",
    seed: 3.4,
    salesRange: [1980, 2680],
    priceRange: [42000, 63000],
    marketShare: 7.8,
    rating: 4.6,
    horsepower: 335,
    electric: 24,
    suv: 41,
    luxury: 88,
    ranking: 6,
    topModel: "3 Series",
    models: ["3 Series", "X5", "5 Series", "X3", "i4"],
    summary:
      "BMW has balanced its performance heritage with an expanding electric portfolio, posting steady price appreciation and resilient global demand through 2026.",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    subtitle: "Luxury",
    country: "Germany",
    founded: 1926,
    ceo: "Ola Källenius",
    seed: 4.2,
    salesRange: [2050, 2720],
    priceRange: [45000, 66000],
    marketShare: 8.1,
    rating: 4.7,
    horsepower: 349,
    electric: 22,
    suv: 44,
    luxury: 92,
    ranking: 5,
    topModel: "E-Class",
    models: ["E-Class", "GLC", "C-Class", "S-Class", "EQS"],
    summary:
      "Mercedes has reinforced its premium positioning with consistent price growth and a broadening EQ electric range across the last twelve years.",
  },
  {
    id: "audi",
    name: "Audi",
    subtitle: "Luxury",
    country: "Germany",
    founded: 1909,
    ceo: "Gernot Döllner",
    seed: 5.5,
    salesRange: [1740, 2050],
    priceRange: [40000, 58000],
    marketShare: 6.4,
    rating: 4.5,
    horsepower: 310,
    electric: 26,
    suv: 43,
    luxury: 85,
    ranking: 8,
    topModel: "A4",
    models: ["A4", "Q5", "A6", "Q7", "e-tron GT"],
    summary:
      "Audi has maintained a technology-forward identity, with quattro performance and the e-tron family driving steady growth through 2026.",
  },
  {
    id: "ford",
    name: "Ford",
    subtitle: "American",
    country: "United States",
    founded: 1903,
    ceo: "Jim Farley",
    seed: 6.1,
    salesRange: [4980, 4180],
    priceRange: [29000, 44000],
    marketShare: 9.3,
    rating: 4.1,
    horsepower: 290,
    electric: 12,
    suv: 52,
    luxury: 58,
    ranking: 3,
    topModel: "F-150",
    models: ["F-150", "Explorer", "Escape", "Mustang", "Mach-E"],
    summary:
      "Ford has leaned on truck and SUV dominance to offset a maturing sedan lineup, while the Mach-E signals a gradual electric transition.",
  },
  {
    id: "toyota",
    name: "Toyota",
    subtitle: "Japanese",
    country: "Japan",
    founded: 1937,
    ceo: "Koji Sato",
    seed: 7.3,
    salesRange: [9120, 10800],
    priceRange: [24000, 34000],
    marketShare: 14.9,
    rating: 4.7,
    horsepower: 260,
    electric: 9,
    suv: 40,
    luxury: 62,
    ranking: 1,
    topModel: "Corolla",
    models: ["Corolla", "RAV4", "Camry", "Hilux", "bZ4X"],
    summary:
      "Toyota has retained global sales leadership through relentless reliability and a hybrid-first strategy that continues to outsell rivals worldwide.",
  },
  {
    id: "honda",
    name: "Honda",
    subtitle: "Japanese",
    country: "Japan",
    founded: 1948,
    ceo: "Toshihiro Mibe",
    seed: 8.6,
    salesRange: [4520, 5150],
    priceRange: [23000, 31000],
    marketShare: 7.2,
    rating: 4.6,
    horsepower: 252,
    electric: 8,
    suv: 36,
    luxury: 60,
    ranking: 7,
    topModel: "Civic",
    models: ["Civic", "CR-V", "Accord", "Pilot", "e:Ny1"],
    summary:
      "Honda has combined engineering efficiency with dependable value, sustaining a loyal global following while gradually building out its EV roadmap.",
  },
  {
    id: "nissan",
    name: "Nissan",
    subtitle: "Japanese",
    country: "Japan",
    founded: 1933,
    ceo: "Ivan Espinosa",
    seed: 9.2,
    salesRange: [4100, 3520],
    priceRange: [22000, 29500],
    marketShare: 5.6,
    rating: 4.0,
    horsepower: 245,
    electric: 15,
    suv: 39,
    luxury: 55,
    ranking: 10,
    topModel: "Rogue",
    models: ["Rogue", "Altima", "Leaf", "Qashqai", "Ariya"],
    summary:
      "Nissan pioneered mass-market EVs with the Leaf, and continues refining its lineup while working to rebuild sales momentum through 2026.",
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    subtitle: "American",
    country: "United States",
    founded: 1911,
    ceo: "Mary Barra",
    seed: 10.4,
    salesRange: [6350, 5980],
    priceRange: [27000, 39000],
    marketShare: 8.6,
    rating: 4.2,
    horsepower: 305,
    electric: 14,
    suv: 47,
    luxury: 57,
    ranking: 2,
    topModel: "Silverado",
    models: ["Silverado", "Equinox", "Malibu", "Tahoe", "Bolt EV"],
    summary:
      "Chevrolet has anchored General Motors' volume with truck and SUV strength, while the Bolt lineup opened the door to broader electrification.",
  },
  {
    id: "lexus",
    name: "Lexus",
    subtitle: "Luxury",
    country: "Japan",
    founded: 1989,
    ceo: "Koji Sato",
    seed: 11.8,
    salesRange: [650, 980],
    priceRange: [41000, 56000],
    marketShare: 3.1,
    rating: 4.8,
    horsepower: 295,
    electric: 20,
    suv: 48,
    luxury: 90,
    ranking: 11,
    topModel: "RX",
    models: ["RX", "ES", "NX", "GX", "RZ"],
    summary:
      "Lexus has cultivated a reputation for refinement and dependability, with the RX crossover anchoring steady growth in the luxury segment.",
  },
  {
    id: "hyundai",
    name: "Hyundai",
    subtitle: "Value",
    country: "South Korea",
    founded: 1967,
    ceo: "José Muñoz",
    seed: 12.9,
    salesRange: [4520, 4980],
    priceRange: [20000, 28500],
    marketShare: 6.9,
    rating: 4.3,
    horsepower: 240,
    electric: 19,
    suv: 42,
    luxury: 61,
    ranking: 12,
    topModel: "Tucson",
    models: ["Tucson", "Elantra", "Santa Fe", "Ioniq 5", "Kona"],
    summary:
      "Hyundai has closed the gap on legacy rivals with sharp design and fast-growing EV credentials, led by the award-winning Ioniq 5.",
  },
];

const BRANDS = RAW_BRANDS.map((b) => ({
  ...b,
  sales: buildSeries(b.seed, b.salesRange[0], b.salesRange[1]),
  price: buildSeries(b.seed + 0.37, b.priceRange[0], b.priceRange[1]),
}));

/* -------------------------------------------------------------------- */
/*  SMALL HELPERS                                                       */
/* -------------------------------------------------------------------- */

function formatK(num) {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : `${num}`;
}

function formatUSD(num) {
  return `$${num.toLocaleString("en-US")}`;
}

function totalSold(sales) {
  return sales.reduce((a, b) => a + b, 0);
}

function avgPrice(price) {
  return Math.round(price.reduce((a, b) => a + b, 0) / price.length);
}

/* -------------------------------------------------------------------- */
/*  ICONS (inline SVG, no external packages)                            */
/* -------------------------------------------------------------------- */

const Icon = {
  cars: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2A2 2 0 0 1 19.5 8L21 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="13" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </svg>
  ),
  price: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.3-5 3 2.2 2.7 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  share: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 9 9h-9V3z" fill="currentColor" stroke="none" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17.3 6.1 20.5l1.3-6.6-4.9-4.6 6.6-.7L12 2.5z" />
    </svg>
  ),
};

/* -------------------------------------------------------------------- */
/*  SUB COMPONENTS                                                       */
/* -------------------------------------------------------------------- */

function Sidebar({ brands, activeId, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-mark">
          <LuCar />
        </div>
        <div>
          <p className="sidebar-title">Drive Market</p>
          <p className="sidebar-subtitle">Brand Intelligence</p>
        </div>
      </div>

      <nav className="brand-list">
        {brands.map((brand) => (
          <button
            key={brand.id}
            className={`brand-card ${brand.id === activeId ? "brand-card-active" : ""}`}
            onClick={() => onSelect(brand.id)}
          >
            <span className="brand-logo">{brand.name.charAt(0)}</span>
            <span className="brand-meta">
              <span className="brand-name">{brand.name}</span>
              <span className="brand-subtitle">{brand.subtitle}</span>
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function StatCard({ icon, value, label, accent }) {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      <div className="stat-icon">{icon}</div>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function SalesChart({ brand }) {
  const max = Math.max(...brand.sales);
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Sales Analytics</h3>
        <span className="panel-hint">Units sold · 2014 – 2026</span>
      </div>
      <div className="bar-chart" key={brand.id}>
        {brand.sales.map((val, i) => (
          <div className="bar-column" key={YEARS[i]}>
            <span className="bar-value">{formatK(val)}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  "--target-height": `${(val / max) * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            </div>
            <span className="bar-year">{YEARS[i]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PriceGrowth({ brand }) {
  const max = Math.max(...brand.price);
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Price Growth</h3>
        <span className="panel-hint">Average car price · 2014 – 2026</span>
      </div>
      <div className="price-list" key={brand.id}>
        {brand.price.map((val, i) => (
          <div className="price-row" key={YEARS[i]}>
            <span className="price-year">{YEARS[i]}</span>
            <div className="price-track">
              <div
                className="price-fill"
                style={{
                  "--target-width": `${(val / max) * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            </div>
            <span className="price-value">{formatUSD(val)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <p className="info-label">{label}</p>
      <p className="info-value">{value}</p>
    </div>
  );
}

function ExtraAnalytics({ brand }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Extra Analytics</h3>
        <span className="panel-hint">Brand fundamentals</span>
      </div>
      <div className="info-grid">
        <InfoCard label="Top Selling Model" value={brand.topModel} />
        <InfoCard label="Average Horsepower" value={`${brand.horsepower} hp`} />
        <InfoCard label="Electric Vehicles" value={`${brand.electric}%`} />
        <InfoCard label="SUV Share" value={`${brand.suv}%`} />
        <InfoCard label="Luxury Score" value={`${brand.luxury} / 100`} />
        <InfoCard label="Global Ranking" value={`#${brand.ranking}`} />
        <InfoCard label="Country" value={brand.country} />
        <InfoCard label="Founded" value={brand.founded} />
        <InfoCard label="CEO" value={brand.ceo} />
        <InfoCard label="Popular Models" value={brand.models.join(" · ")} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                       */
/* -------------------------------------------------------------------- */

export default function BrandDashboard() {
  const navigate = useNavigate();
  const { brand: brandParam } = useParams();

  const brand = useMemo(
    () => BRANDS.find((b) => b.id === brandParam?.toLowerCase()) ?? BRANDS[0],
    [brandParam],
  );

  console.log("Brand from URL:", brandParam);
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <Sidebar brands={BRANDS} activeId={brand.id} onSelect={(id) => navigate(`/dashboard/${id}`)} />
        <main className="main-content" key={brand.id}>
          <header className="brand-header">
            <h1>{brand.name}</h1>
            <p>{brand.summary}</p>
          </header>

          <div className="stats-grid">
            <StatCard
              icon={Icon.cars}
              value={formatK(totalSold(brand.sales))}
              label="Total Cars Sold"
              accent="orange"
            />
            <StatCard
              icon={Icon.price}
              value={formatUSD(avgPrice(brand.price))}
              label="Average Price"
              accent="green"
            />
            <StatCard
              icon={Icon.share}
              value={`${brand.marketShare}%`}
              label="Market Share"
              accent="orange"
            />
            <StatCard
              icon={Icon.star}
              value={brand.rating.toFixed(1)}
              label="Customer Rating"
              accent="green"
            />
          </div>

          <SalesChart brand={brand} />
          <PriceGrowth brand={brand} />
          <ExtraAnalytics brand={brand} />

          <section className="footer-card">
            <p>{brand.summary}</p>
          </section>
        </main>
      </div>
    </>
  );
}
