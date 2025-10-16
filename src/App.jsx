import { ItemsProvider } from "./context/ItemsProvider.jsx";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import GroceryList from "./components/GroceryList.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <ItemsProvider>
      <div className="app">
        <Header />
        <Form />
        <GroceryList />
        <Footer />
      </div>
    </ItemsProvider>
  );
}
