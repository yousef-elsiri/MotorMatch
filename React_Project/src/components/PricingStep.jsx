import "./PricingStep.css";
import { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
function PricingStep() {
  const min = 0;
  const max = 92000;
  const [price, setPrice] = useState(0);
  const [negotiable, setNegotiable] = useState("Yes");
  const [listingType, setListingType] = useState("Private seller");
  const percent = (price / max) * 100;
  const message =
    price === 0
      ? "Enter your asking price."
      : price < 78000
        ? "Your price is below the suggested range."
        : price <= 92000
          ? "Your price is competitive — expect strong interest."
          : "Your price is above the suggested range.";

  return (
    <>
      <div className="price-box">
        <h2>Set your price</h2>
        <p>Our model suggests a fair market range based on similar listings.</p>
        <div className="inputs">
          <div className="input-box">
            <label>ASKING PRICE</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price === 0 ? "" : price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
          </div>
          <div className="input-box">
            <label>NEGOTIABLE</label>
            <select
              value={negotiable}
              onChange={(e) => setNegotiable(e.target.value)}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="input-box">
            <label>LISTING TYPE</label>
            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
            >
              <option>Private seller</option>
              <option>Dealer</option>
            </select>
          </div>
        </div>
        <div className="suggested">
          <div className="head">
            <h4>Suggested range</h4>
            <span>{price === 0 ? "$0" : `$${price.toLocaleString()}`}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{
              background: `linear-gradient(
              to right,
              #ff7a29 0%,
              #ff7a29 ${percent}%,
              #0d1118 ${percent}%,
              #0d1118 100%
            )`,
            }}
          />
          <p>{message}</p>
        </div>
        <div className="buttons">
          <button className="back">
            <GoChevronLeft /> Back
          </button>
          <span>Step 4 of 5</span>
          <button className="continue">
            Continue <GoChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default PricingStep;
