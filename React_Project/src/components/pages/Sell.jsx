import "./sell.css";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import VehicleStep from "../VehicleStep";
import DetailsStep from "../DetailsStep";
import PricingStep from "../PricingStep";
import PhotosStep from "../PhotosStep";
import PreviewStep from "../PreviewStep";

import MotorMatchFooter from "../MotorMatchFooter";
function Sell() {
  const [currentStep, setCurrentStep] = useState(1);
  const [listingEnabled] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotice(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar />
      <div className="sell_container_text">
        <p id="create_listing">Create listing</p>
        <h1 id="sell_your_car">Sell your car in minutes</h1>
        <p id="sell_description">
          List in 5 simple steps. We'll suggest a fair price and reach 3.2M
          buyers.
        </p>
      </div>
      {showNotice && !listingEnabled && (
        <div className="sell_notice">
          <h3>🚧 Vehicle Listings Are Currently Unavailable</h3>

          <p>
            This feature is currently under development. Only the website
            administrator can publish vehicles at the moment.
          </p>
        </div>
      )}

      <div className="sell_container">
        <div className="sidebar_container_left">
          <div
            className={currentStep === 1 ? "step active" : "step"}
            onClick={() => setCurrentStep(1)}
          >
            <span className="circle">1</span>
            <p>Vehicle</p>
          </div>
          <div
            className={currentStep === 2 ? "step active" : "step"}
            onClick={() => setCurrentStep(2)}
          >
            <span className="circle">2</span>
            <p>Details</p>
          </div>
          <div
            className={currentStep === 3 ? "step active" : "step"}
            onClick={() => setCurrentStep(3)}
          >
            <span className="circle">3</span>
            <p>Photos</p>
          </div>
          <div
            className={currentStep === 4 ? "step active" : "step"}
            onClick={() => setCurrentStep(4)}
          >
            <span className="circle">4</span>
            <p>Pricing</p>
          </div>
          <div
            className={currentStep === 5 ? "step active" : "step"}
            onClick={() => setCurrentStep(5)}
          >
            <span className="circle">5</span>
            <p>Preview</p>
          </div>
        </div>
        <div className="content_container_right">
          {currentStep === 1 && <VehicleStep next={() => setCurrentStep(2)} />}

          {currentStep === 2 && (
            <DetailsStep
              back={() => setCurrentStep(1)}
              next={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <PhotosStep
              back={() => setCurrentStep(2)}
              next={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 4 && (
            <PricingStep
              back={() => setCurrentStep(3)}
              next={() => setCurrentStep(5)}
            />
          )}

          {currentStep === 5 && <PreviewStep back={() => setCurrentStep(4)} />}
        </div>
      </div>
      <MotorMatchFooter />
    </>
  );
}

export default Sell;
