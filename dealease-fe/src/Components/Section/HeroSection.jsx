// solla
import React from "react";
import { Button } from "../Button/Button";
import "../../assets/scss/herosection.scss";
import "../../assets/scss/global.scss";
export function HeroSection() {
  return (
    <div className="hero-container">
      <video src="../.../../public/videos/video.mp4" autoPlay loop muted />
      <h1>Make a Deal Now</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn-outline"
          buttonSize="btn-large"
        >
          Get Started
        </Button>
        <Button
          className="btns"
          buttonStyle="btn-primary"
          buttonSize="btn-large"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
export default HeroSection;
