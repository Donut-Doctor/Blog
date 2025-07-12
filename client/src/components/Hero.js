import React from "react";
import "./Hero.css";
import heroImg from "../assets/images/hero.jpg";

function Hero() {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-overlay">
        <h1>VAGABOND'S DIARY</h1>
        <p>Tales of Wanderlust & Wonder</p>
      </div>
    </div>
  );
}

export default Hero;
