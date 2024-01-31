import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import your Home component
import Products from "./pages/Products"; // Import your Products component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
