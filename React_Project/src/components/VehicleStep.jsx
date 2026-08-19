import "./VehicleStep.css";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

function VehicleStep({ next }) {
  
  return (
    <>
      <div className="car-form">
        <h2>Tell us about your car</h2>
        <p>Start with year, make and model.</p>
        <div className="form-grid">
          <div className="input-box">
            <label>YEAR</label>
            <select>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
          <div className="input-box">
            <label>MAKE</label>
            <input type="text" placeholder="Enter your make" />
          </div>
          <div className="input-box">
            <label>MODEL</label>
            <input type="text" placeholder="Enter your model" />
          </div>
          <div className="input-box">
            <label>TRIM</label>
            <input type="text" placeholder="Carrera S" />
          </div>
          <div className="input-box">
            <label>VIN</label>
            <input type="text" placeholder="17-character VIN" />
          </div>
          <div className="input-box">
            <label>MILEAGE</label>
            <input type="number" placeholder="12,400" />
          </div>
        </div>
        <div className="buttons">
          <button className="back">
            <GoChevronLeft /> Back
          </button>
          <span>Step 1 of 5</span>
          <button className="continue"onClick={next}  >
            Continue <GoChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default VehicleStep;
