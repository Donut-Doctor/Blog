import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero.jpg)`,
      }}
    >
      <div className="overlay">
        <h1>VAGABOND'S DIARY</h1>
        <p>Tales of Wanderlust & Wonder</p>
      </div>
    </div>
  );
}

export default Hero;
