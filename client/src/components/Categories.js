import React from "react";
import "./Categories.css";
import natureImg from "../assets/images/category-nature.jpg";
import travelImg from "../assets/images/category-travel.jpg";
import urbanImg from "../assets/images/category-urban.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Nature",
    description: "Forests, mountains, oceans and all things wild.",
    image: natureImg,
  },
  {
    name: "Travel",
    description: "Journey logs, wanderer tales, and nomad guides.",
    image: travelImg,
  },
  {
    name: "Urban",
    description: "Cities, cultures, cafes and concrete jungles.",
    image: urbanImg,
  },
];

function Categories() {
  const navigate = useNavigate();

  const handleFilter = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <div key={cat.name} className="category-card" onClick={() => handleFilter(cat.name)}>
          <img src={cat.image} alt={cat.name} />
          <div className="cat-info">
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
