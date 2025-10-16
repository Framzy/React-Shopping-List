import { useState } from "react";
import { useItems } from "../context/useItems.jsx";
import Item from "./Item.jsx";
import { useMemo } from "react";

export default function GroceryList() {
  const { items, clearItems } = useItems();
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = useMemo(() => {
    switch (sortBy) {
      case "name":
        return items.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "checked":
        return items.slice().sort((a, b) => a.checked - b.checked);
      default:
        return items;
    }
  }, [items, sortBy]);

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item item={item} key={item.id} quantity={item.quantity} />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={clearItems}>Bersihkan Daftar</button>
      </div>
    </>
  );
}
