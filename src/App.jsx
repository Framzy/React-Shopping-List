import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import GroceryList from "./components/GroceryList.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("items");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to parse localStorage items:", e);
      return [];
    }
  });

  useEffect(() => {
    async function fetchGroceryItems() {
      try {
        const response = await fetch("/data/groceryItems.json");
        if (!response.ok) return;
        const data = await response.json();
        // only set if we don't already have saved items
        setItems((prev) => (prev && prev.length ? prev : data));
      } catch (e) {
        console.error("Failed to fetch grocery items:", e);
      }
    }

    // fetch only when items is empty (on first load)
    if (!items || items.length === 0) {
      fetchGroceryItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // we intentionally run once on mount

  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save items to localStorage:", e);
    }
  }, [items]);

  const quantityNum = useMemo(
    () =>
      [...Array(10)].map((_, i) => (
        <option value={i + 1} key={i + 1}>
          {i + 1}
        </option>
      )),
    []
  );

  function handleAddItem(item) {
    setItems([...items, item]);
  }
  function handleEditItem(id, newName, newQuantity) {
    const index = items.findIndex((index) => index.id === id);

    const newItems = [...items];
    newItems[index] = { ...items[index], name: newName, quantity: newQuantity };
    setItems(newItems);
    console.log("edit item dengan id : " + id);
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
    console.log("delete item dengan id : " + id);
  }

  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} quantityNum={quantityNum} />
      <GroceryList
        items={items}
        quantityNum={quantityNum}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onCheckedItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Footer items={items} />
    </div>
  );
}
