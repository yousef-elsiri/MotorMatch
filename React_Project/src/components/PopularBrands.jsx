import "./PopularBrands.css";
import { Link } from "react-router-dom";

function PopularBrands() {
  const brands = [
    { id: 1, name: "Porsche", listings: 120 },
    { id: 2, name: "Tesla", listings: 133 },
    { id: 3, name: "BMW", listings: 445 },
    { id: 4, name: "Mercedes", listings: 412 },
    { id: 5, name: "Audi", listings: 193 },
    { id: 6, name: "Ford", listings: 101 },
    { id: 7, name: "Toyota", listings: 387 },
    { id: 8, name: "Honda", listings: 276 },
    { id: 9, name: "Nissan", listings: 214 },
    { id: 10, name: "Chevrolet", listings: 168 },
    { id: 11, name: "Lexus", listings: 142 },
    { id: 12, name: "Hyundai", listings: 221 },
  ];
  return (
    <div className="popular_brands_container" >
      <h1 id="popular_brands_title">Popular brands</h1>
      <p id="popular_brands_description">Shop by manufacturer</p>
      <div className="brands_grid">
        {brands.map((brand) => (
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`/dashboard/${brand.name}`} className="brand_card" key={brand.id}>
            <div className="brand_logo">
              {brand.name.slice(0, 2).toUpperCase()}
            </div>  
            <h3 id="brand_name">{brand.name}</h3>
            <p id="listings">{brand.listings} listings</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularBrands;
