import { useEffect, useReducer, useMemo } from "react";
import { ItemsContext } from "./ItemsContext.jsx";

function itemsReducer(state, action) {
  switch (action.type) {
    case "load":
      return action.payload;

    case "add":
      return [...state, action.payload];

    case "edit": {
      const { id, updates } = action.payload;
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([, v]) => v !== undefined)
      );

      return state.map((item) =>
        item.id === id ? { ...item, ...cleanUpdates } : item
      );
    }

    case "delete":
      return state.filter((item) => item.id !== action.payload);

    case "toggle":
      return state.map((item) => {
        return item.id === action.payload
          ? { ...item, checked: !item.checked }
          : item;
      });

    case "clear":
      return [];

    default:
      return state;
  }
}

export function ItemsProvider({ children }) {
  const [items, dispatch] = useReducer(itemsReducer, []);

  // is only run once when the component mounts or local storage/ cache has been deleted
  useEffect(() => {
    async function fetchData() {
      try {
        const local = localStorage.getItem("items");
        if (local) {
          dispatch({ type: "load", payload: JSON.parse(local) });
        } else {
          console.log("local:", local); // Add this line
          const response = await fetch("/data/groceryItems.json");
          if (!response.ok) return;
          const data = await response.json();
          dispatch({ type: "load", payload: data });
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }

    fetchData();
  }, []); // its only run once

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
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

  // Fungsi helper (bisa langsung dipakai di komponen)
  const addItem = (item) => dispatch({ type: "add", payload: item });
  const editItem = (id, name, quantity) =>
    dispatch({ type: "edit", payload: { id, updates: { name, quantity } } });
  const deleteItem = (id) => dispatch({ type: "delete", payload: id });
  const toggleItem = (id) => dispatch({ type: "toggle", payload: id });
  const clearItems = () => dispatch({ type: "clear" });

  return (
    <ItemsContext.Provider
      value={{
        items,
        quantityNum,
        addItem,
        editItem,
        deleteItem,
        toggleItem,
        clearItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
