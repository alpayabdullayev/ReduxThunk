import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategory,
  DeleteCategory,
  FetchCategories,
  UpdateCategory,
  addBasket,addWishlist
} from "./categoriesSlice";
import "./index.scss";
import CategoryCards from "../../components/CategoryCards";
import BasketCards from "../../components/BasketCards";

const Categories = () => {
  const categories = useSelector((state) => state.category.entity);
  const basket = useSelector((state) => state.category.basket);
  const wishlist = useSelector((state) => state.category.wishlist);
  const loading = useSelector((state) => state.category.loading);
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editCategory, setEditCategory] = useState({
    id: null,
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(FetchCategories());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  

  function handleAddCategory(e) {
    e.preventDefault();
    if (newCategory.name.trim() === "" || newCategory.description.trim() === "") {
      return;
    }
    dispatch(AddCategory(newCategory));
    setNewCategory({ name: "", description: "" });
  }

  function handleRemoveItem(id) {
    dispatch(DeleteCategory(id));
  }

  const handleUpdate = (id, name, description) => {
    setEditCategory({ id, name, description });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    dispatch(
      UpdateCategory({
        id: editCategory.id,
        category: {
          name: editCategory.name,
          description: editCategory.description,
        },
      })
    );
    setEditCategory({ id: null, name: "", description: "" });
  };





  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="categorySection">
          {categories.map((category) => (
            <CategoryCards
              key={category.id}
              category={category}
              {...category}
              handleRemoveItem={handleRemoveItem}
              handleUpdate={handleUpdate}
              addBasket={addBasket}
              addWishlist={addWishlist}
            />
          ))}
        </div>
      )}

      {editCategory.id ? (
        <div>
          <form action="" onSubmit={handleUpdateCategory}>
            <input
              type="text"
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editCategory.description}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  description: e.target.value,
                })
              }
            />
            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        <form action="" onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <input
            type="text"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
          />
          <button type="submit">Add</button>
        </form>
      )}

      {basket.map((item) => (
        <BasketCards key={item.id} item={item} {...item} />
      ))}

      {wishlist.map((item)=>(
        <div>
          <h1>{item.id}</h1>
          <h1>{item.name}</h1>
        </div>
      ))}
    </>
  );
};

export default Categories;
