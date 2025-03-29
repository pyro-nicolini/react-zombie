import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Pagar from "./pages/Pagar";
import Footer from "./components/Footer";
import Pizza from "./pages/Pizza";
import AllPizzas from "./components/AllPizzas";
import NotFound from "./pages/404";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/allpizzas" element={<AllPizzas />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<Cart cuponPromo={"movistar"} />} />
              <Route path="/pizza" element={<Pizza />} />
              <Route path="/pagar" element={<Pagar />} />
            </Routes>
          </main>
          <Footer
            footerTextA={"© 2025 -"}
            footerLink={"Zombie Pizza"}
            footerTextB={"- Derechos reservados"}
          />
        </div>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
