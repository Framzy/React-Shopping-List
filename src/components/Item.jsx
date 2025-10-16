import { useState } from "react";

export default function Item({
  item,
  quantityNum,
  onEditItem,
  onDeleteItem,
  onCheckedItem,
}) {
  const [isEditing, setIsEditing] = useState(false);
  let component;

  if (isEditing) {
    component = (
      <>
        <input
          type="text"
          value={item.name}
          onChange={(e) => onEditItem(item.id, e.target.value)}
        />
        <select
          value={item.quantity}
          onChange={(e) => {
            onEditItem(item.id, item.name, e.target.value);
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
        onChange={() => onCheckedItem(item.id)}
      />
      {component}
      <button className="del" onClick={() => onDeleteItem(item.id)}>
        &times;
      </button>
    </li>
  );
}
