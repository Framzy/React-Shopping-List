import { useState } from "react";
import { useItems } from "../context/useItems.jsx";

export default function Item({ item }) {
  const { quantityNum, toggleItem, editItem, deleteItem } = useItems();

  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li key={item.id}>
        <input
          type="text"
          value={item.name}
          onChange={(e) => editItem(item.id, { name: e.target.value })}
        />
        <select
          value={item.quantity}
          onChange={(e) => editItem(item.id, { quantity: e.target.value })}
        >
          {quantityNum}
        </select>
        <button className="edit" onClick={() => setIsEditing(false)}>
          &#10004;
        </button>
      </li>
    );
  }

  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => toggleItem(item.id)}
      />
      <span
        style={
          item.checked
            ? { textDecoration: "line-through", color: "#0000008a" }
            : {}
        }
      >
        {item.name} : {item.quantity}
      </span>
      <button className="edit" onClick={() => setIsEditing(true)}>
        ✏️
      </button>
      <button className="del" onClick={() => deleteItem(item.id)}>
        &times;
      </button>
    </li>
  );
}
