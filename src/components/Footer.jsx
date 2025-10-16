import { useItems } from "../context/useItems.jsx";

export default function Footer() {
  const { items } = useItems();

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
