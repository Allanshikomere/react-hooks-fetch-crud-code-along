
import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  function handleUpdatedItem(updatedItem) {
    let updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleDeletedItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem);
    setItems(updatedItems);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm />
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
  {itemsToDisplay.map((item) => (
    <React.Fragment key={item.id}>
      <Item item={item} />
      <Item
        item={item}
        onUpdateItem={handleUpdatedItem}
        onDeleteItem={handleDeletedItem}
      />
    </React.Fragment>
  ))}
</ul>

    </div>
  );
}
export default ShoppingList;