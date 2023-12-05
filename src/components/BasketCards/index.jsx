import React from "react";

const BasketCards = ({name,description,count}) => {
  return (
    <>
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>count {count}</p>
      </div>
    </>
  );
};

export default BasketCards;
