import "../components/Hero.css";
import { LuSparkles } from "react-icons/lu";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { IoIosTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";
function Hero() {
  const [activeTab, setActiveTab] = useState("Buy");

  return (
    <section className="hero_section">
      <div className="badge">
        <span className="badge_icon">
          <LuSparkles />
        </span>
        <span className="badge_text">
          38,420 verified listings updated today
        </span>
      </div>
      <h1 className="hero_section_title">
        Find the car that
        <span className="hero_section_title_2"> moves you.</span>
      </h1>
      <p className="hero_section_description">
        Search 200,000+ vehicles from trusted dealers and private sellers.
        Transparent pricing, instant financing estimates, and side-by-side
        comparisons.
      </p>
      <div className="search_panel">
        <div className="tabs_container">
          <button
            className={`Buy_tap ${activeTab === "Buy" ? "active" : ""}`}
            onClick={() => setActiveTab("Buy")}
          >
            Buy
          </button>
          <button
            className={`Sell_tap ${activeTab === "Sell" ? "active" : ""}`}
            onClick={() => setActiveTab("Sell")}
          >
            Sell
          </button>
          <button
            className={`Finance_tap ${activeTab === "Finance" ? "active" : ""}`}
            onClick={() => setActiveTab("Finance")}
          >
            Finance
          </button>
          <button
            className={`Trade-in_tap ${activeTab === "Trade-in" ? "active" : ""}`}
            onClick={() => setActiveTab("Trade-in")}
          >
            Trade-in
          </button>
        </div>
        <div className="filters_container">
          <div className="filter_item">
            <label htmlFor="brand">BRAND</label>
            <select id="brand">
              <option>Any Brand</option>
            </select>
          </div>

          <div className="filter_item">
            <label htmlFor="model">MODEL</label>
            <select id="model">
              <option>Any Model</option>
            </select>
          </div>

          <div className="filter_item">
            <label htmlFor="max_price">MAX PRICE</label>
            <input type="number" id="max_price" placeholder="$100,000" />
          </div>

          <div className="filter_item">
            <label htmlFor="year">YEAR</label>
            <select id="year">
              <option>2020+</option>
            </select>
          </div>

          <div className="filter_item">
            <label htmlFor="location">LOCATION</label>
            <select id="location">
              <option>United States</option>
            </select>
          </div>
          <Link
            className="search_button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              marginLeft: "10px",
            }}
            to="/browse"
          >
            <IoSearchOutline />
          </Link>
        </div>
      </div>

      <div className="description_icon">
        <div className="description-1">
          <span className="icon-1">
            <GoShieldCheck />
          </span>
          <span className="description_text">Verified sellers</span>
        </div>
        <div className="description-2">
          <span className="icon-2">
            <IoIosTrendingUp />
          </span>
          <span className="description_text">Fair market pricing</span>
        </div>
        <div className="description-3">
          <span className="icon-3">
            <LuSparkles />
          </span>
          <span className="description_text">Free vehicle history</span>
        </div>
      </div>
    </section>
  );
}
export default Hero;
