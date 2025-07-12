import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import nature from "../assets/images/nature.jpg";
import travel from "../assets/images/travel.jpg";
import urban from "../assets/images/urban.jpg";

function Categories() {
  const categories = [
    {
      name: "Nature",
      image: nature,
      description: "Discover stories from forests, oceans, and the wild.",
    },
    {
      name: "Travel",
      image: travel,
      description: "Explore journeys, hidden destinations, and experiences.",
    },
    {
      name: "Urban",
      image: urban,
      description: "City life, architecture, and modern culture.",
    },
  ];

  return (
    <div className="category-section">
      <h2 className="category-title">Explore Categories</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link to={`/category/${cat.name}`} className="category-card" key={cat.name}>
            <img src={cat.image} alt={cat.name} className="category-img" />
            <div className="category-info">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
