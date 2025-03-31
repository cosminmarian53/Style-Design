import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import your Home component
import Products from "./pages/Products"; // Import your Products component
import Login from "./pages/Login"; // Import your Login component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
