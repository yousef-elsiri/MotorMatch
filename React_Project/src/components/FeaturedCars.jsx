import "./FeaturedCars.css";
import Cars_card from "./Cars_card";
import { IoArrowForward } from "react-icons/io5";
import carsData from "../services/carsApi";
import { useEffect, useState } from "react";
function FeaturedCars() {
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
    <section className="featured_cars_container">
      <div className="featured_cars_header">
        <div className="featured_cars_text">
          <h1 id="featured_cars_title">Featured Cars</h1>
          <p id="featured_cars_description">
            Hand-picked premium listings from verified dealers
          </p>
        </div>
        <div
          onClick={() => {
            document.getElementById("latest-listings").scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="Browse_all"
        >
          Browse all <IoArrowForward />
        </div>
      </div>
      <div className="cars_grid">
        {carsData.map((car) => (
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

export default FeaturedCars;
