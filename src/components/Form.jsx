import { useState } from "react";
import { useItems } from "../context/useItems.jsx";

export default function Form() {
  const { addItem, quantityNum, searchTerm, setSearchTerm } = useItems();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFind, setIsFind] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      checked: false,
    };

    addItem(newItem);
    setName("");
    setQuantity(1);
  }

  function toggleFindMode() {
    setIsFind((prev) => !prev);
    setSearchTerm(""); // reset pencarian
  }

  return (
    <>
      {isFind ? (
        <div className="form-container default">
          <h3>Cari barang belanjaan</h3>
          <form className="find-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Ketik nama barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <button className="find-close" onClick={toggleFindMode}>
            &times;
          </button>
        </div>
      ) : (
        <div className="form-container find">
          <h3>Hari ini belanja apa kita?</h3>
          <form className="add-form" onSubmit={handleSubmit}>
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
              <button type="submit">Tambah</button>
            </div>
          </form>
          <button className="find-open" onClick={toggleFindMode}>
            🔍
          </button>
        </div>
      )}
    </>
  );
}
