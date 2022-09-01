import React from "react";

const Card = ({ image, name }: { image: string; name: string }) => {
  return (
    <div
      className={`flex ${
        name === "loading" && "animate-pulse"
      } flex-col rounded-lg bg-white`}
    >
      <img className="flex-shrink rounded-t-lg" src={image} alt="" />
      <h2 className="name flex-grow p-4 font-bold">
        {name === "error" ? "Not found" : name}
      </h2>
    </div>
  );
};

export default Card;
