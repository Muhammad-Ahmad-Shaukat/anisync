import React from "react";

const AnimeCard = ({ image, name, rating }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>Rating: {rating}/10</p>
      </div>
    </div>
  );
};

export default AnimeCard;