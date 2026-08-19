import "./DetailsStep.css";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
function DetailsStep({ next, back }) {
  return (
    <>
      <div className="details">
        <h2>Details</h2>
        <p>Help buyers picture themselves driving it.</p>

        <div className="details-grid">
          <div className="input-box">
            <label>BODY TYPE</label>
            <select>
              <option>Coupe</option>
            </select>
          </div>

          <div className="input-box">
            <label>TRANSMISSION</label>
            <select>
              <option>Automatic</option>
            </select>
          </div>

          <div className="input-box">
            <label>FUEL</label>
            <select>
              <option>Gasoline</option>
            </select>
          </div>

          <div className="input-box">
            <label>EXTERIOR COLOR</label>
            <input type="text" placeholder="Carrara White" />
          </div>

          <div className="input-box">
            <label>INTERIOR COLOR</label>
            <input type="text" placeholder="Black" />
          </div>

          <div className="input-box">
            <label>DRIVETRAIN</label>
            <select>
              <option>AWD</option>
            </select>
          </div>
        </div>

        <div className="input-box description">
          <label>DESCRIPTION</label>

          <textarea placeholder="Tell buyers about the condition, history and standout features."></textarea>
        </div>
        <div className="buttons">
          <button className="back" onClick={back}>
            <GoChevronLeft /> Back
          </button>

          <span>Step 2 of 5</span>

          <button className="continue" onClick={next}>
            Continue <GoChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailsStep;
