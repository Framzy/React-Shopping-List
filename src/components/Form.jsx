import { useState } from "react";
import { useItems } from "../context/useItems.jsx";

export default function Form() {
  const { addItem, quantityNum } = useItems();
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
    addItem(newItem);

    console.log(newItem);
    setName("");
    setQuantity(1);
  }

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
