import { useState } from "react";
import { useItems } from "../context/useItems.jsx";
import Item from "./Item.jsx";
import { useMemo } from "react";

export default function GroceryList() {
  const { items, clearItems, searchTerm } = useItems();
  const [sortBy, setSortBy] = useState("input");

  const filteredList = useMemo(() => {
    return searchTerm
      ? items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : items;
  }, [items, searchTerm]);

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "checked":
        return sorted.sort((a, b) => a.checked - b.checked);
      default:
        return sorted;
    }
  }, [items, sortBy]);

  return (
    <>
      <div className="list">
        <ul>
          {(searchTerm ? filteredList : sortedItems).map((item) => (
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
