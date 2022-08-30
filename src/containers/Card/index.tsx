import React from "react";

const Card = ({ image, name }: { image: string; name: string }) => {
  return (
    <div
      className={`flex ${
        name === "loading" && "animate-pulse"
      } flex-col rounded-lg bg-white`}
    >
      <img className="rounded-t-lg" src={image} alt="" />
      <h2 className="name truncate p-4 font-bold">{name}</h2>
    </div>
  );
};

export default Card;
