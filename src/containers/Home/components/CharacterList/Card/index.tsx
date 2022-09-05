import React from "react";

type CardDataType = { image: string; name: string };

const Card = ({ image, name }: CardDataType) => {
  return (
    <div
      className={`flex ${
        name === "loading" && "animate-pulse"
      } flex-col rounded-lg bg-white`}
    >
      <img className="flex-shrink rounded-t-lg" src={image} alt="" />
      <h2 className="name flex p-4 font-bold">{name}</h2>
    </div>
  );
};

export default Card;
