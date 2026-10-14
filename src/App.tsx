import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Rewards from "./pages/Rewards";
import Recycling from "./pages/Recycling";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import "./index.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/recycling" element={<Recycling />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
