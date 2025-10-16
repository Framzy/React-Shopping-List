export default function Footer({ items }) {
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
