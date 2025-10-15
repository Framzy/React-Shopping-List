import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Sabun Mandi",
    quantity: 3,
    checked: true,
  },
  {
    id: 2,
    name: "Beras perliter",
    quantity: 3,
    checked: false,
  },
  {
    id: 3,
    name: "Sabun Cuci Piring",
    quantity: 1,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
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
      <Form onAddItem={handleAddItem} />
      <GroceryList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckedItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return (
    <>
      <h1>MY Shopping List 📝</h1>
    </>
  );
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    console.log("Beli " + name + " sebanyak " + quantity);

    const newItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      checked: false,
    };
    onAddItem(newItem);

    console.log(newItem);
    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(10)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
    </option>
  ));

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Hari ini belanja apa kita?</h3>
        <div className="form-control">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {quantityNum}
          </select>
          <input
            type="text"
            placeholder="nama barang..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Tambah</button>
        </div>
      </form>
    </>
  );
}

function GroceryList({ items, onDeleteItem, onCheckedItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  switch (sortBy) {
    case "name":
      sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "checked":
      sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
      break;

    default:
      sortedItems = items;
      break;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onCheckedItem={onCheckedItem}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function Item({ item, onDeleteItem, onCheckedItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onCheckedItem(item.id)}
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
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}

function Footer({ items }) {
  let totalItems = items.length;
  let totalChecked = items.filter((item) => item.checked).length;
  let percentage = Math.round((totalChecked / totalItems) * 100);

  return (
    <footer className="stats">
      Ada {totalItems} barang di daftar belanjaan, {totalChecked} barang sudah
      dibeli {percentage ? "(" + percentage + "%)" : ""}
    </footer>
  );
}
