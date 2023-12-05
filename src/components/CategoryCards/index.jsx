import React from "react";
import { useDispatch } from "react-redux";

const CategoryCards = ({ id, name, description, category, handleRemoveItem, handleUpdate, addBasket }) => {

    const dispatch = useDispatch()

    

  return (
    <>
      <div className="categoryCard">
        <p>id:{id}</p>
        <h1>Name:{name}</h1>
        <p>description:{description}</p>
        <button onClick={() => handleRemoveItem(id)}>Delete</button>
        <button onClick={() => handleUpdate(id, name, description)}>Edit</button>
        <button onClick={() => dispatch(addBasket(category))}>addBasket</button>
      </div>
    </>
  );
};

export default CategoryCards;