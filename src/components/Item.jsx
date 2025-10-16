import { useState } from "react";
import { useItems } from "../context/useItems.jsx";

export default function Item({ item }) {
  const { quantityNum, toggleItem, editItem, deleteItem } = useItems();

  const [isEditing, setIsEditing] = useState(false);
  let component;

  if (isEditing) {
    component = (
      <>
        <input
          type="text"
          value={item.name}
          onChange={(e) => editItem(item.id, e.target.value)}
        />
        <select
          value={item.quantity}
          onChange={(e) => {
            editItem(item.id, item.name, e.target.value);
            console.log(e.target.value);
          }}
        >
          {quantityNum}
        </select>
        <button className="edit" onClick={() => setIsEditing(false)}>
          &#10004;
        </button>
      </>
    );
  } else {
    component = (
      <>
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
      </>
    );
  }

  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => toggleItem(item.id)}
      />
      {component}
      <button className="del" onClick={() => deleteItem(item.id)}>
        &times;
      </button>
    </li>
  );
}
