import { Link } from "react-router-dom";
 function Cars_card({ id, title, price, year, location, image }) {
  return (
    <Link to={`/car/${id}`} className="cars_card_container">
      <img src={image} alt="" className="test_img" />
      <div className="card_content">
        <div className="text_sail">
          <h2 id="text_sail">{title}</h2>
          <h2 id="text_price">{price}</h2>
        </div>
        <p id="text_description_car">
          {year} | {location}
        </p>
      </div>
    </Link>
  );
}

export default Cars_card;
