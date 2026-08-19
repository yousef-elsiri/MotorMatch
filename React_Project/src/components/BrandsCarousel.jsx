import "./BrandsCarousel.css";
import bmw from "../assets/bmw (1).svg";
import audi from "../assets/audi.svg";
import chevrolet from "../assets/chevrolet.svg";
import ferrari from "../assets/ferrari.svg";
import ford from "../assets/ford.svg";
import honda from "../assets/honda.svg";
import hyundai from "../assets/hyundai.svg";
import kia from "../assets/kia.svg";
import lamborghini from "../assets/lamborghini.svg";
import mazda from "../assets/mazda.svg";
import nissan from "../assets/nissan.svg";
import porsche from "../assets/porsche.svg";
import tesla from "../assets/tesla.svg";
import volkswagen from "../assets/volkswagen.svg";

function BrandsCarousel() {
  const brands = [
    bmw,
    audi,
    chevrolet,
    ferrari,
    ford,
    honda,
    hyundai,
    kia,
    lamborghini,
    mazda,
    nissan,
    porsche,
    tesla,
    volkswagen,
  ];

  return (
    <section className="brands_carousel">
      <div className="brands_carousel_container">
        {brands.map((brand) => (
          <div className="brand" key={brand}>
            <img src={brand} alt={brand} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandsCarousel;
