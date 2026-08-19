import "./LatestListings.css";
import latestCarsData from "../services/latestCarsApi";
import Cars_card from "./Cars_card";
import { useEffect, useState } from "react";
function LatestListings() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  if (loading) {
    return (
      <div className="cars_grid">
        <div className="skeleton_card"></div>
        <div className="skeleton_card"></div>
        <div className="skeleton_card"></div>
        <div className="skeleton_card"></div>
        <div className="skeleton_card"></div>
        <div className="skeleton_card"></div>
      </div>
    );
  }
  return (
    <section id="latest-listings" className="latest_listings">
      <div className="latest_listings_header">
        <h1>Latest Listings</h1>
        <p>Recently added vehicles</p>
      </div>

      <div className="latest_listings_grid">
        {latestCarsData.map((car) => (
          <Cars_card
            key={car.id}
            id={car.id}
            title={car.title}
            price={car.price}
            year={car.year}
            location={car.location}
            image={car.image}
          />
        ))}
      </div>
    </section>
  );
}

export default LatestListings;
