import React from "react";
import welcomeImg from "../assets/images/welcome.jpg";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome container">
      <div className="welcome-text">
        <h2>WELCOME TO VAGABOND’S DIARY!</h2>
        <p>
          Dive into stories from across the globe — nature, travel, urban tales and more. 
          Vagabond’s Diary is your gateway to real wanderlust-driven narratives.
        </p>
      </div>
      <img src={welcomeImg} alt="welcome" />
    </div>
  );
}

export default Welcome;
