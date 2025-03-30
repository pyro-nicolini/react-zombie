import { Routes, Route, Navigate } from "react-router-dom";
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
import CartProvider from "./context/CartContext";

import { AuthContext } from "./context/AuthContext"; // provider movidos en Main.jsx
import { useContext } from "react";

function App() {
  const { auth } = useContext(AuthContext);

  return (
      <CartProvider>
        <div className="app">
          <Navbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  auth.autorizado ? <Profile /> : <Navigate to="/login" />
                }
                />
              <Route path="/allpizzas" element={<AllPizzas />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
              <Route
                path="/login"
                element={auth.autorizado ? <Navigate to="/" /> : <LoginPage />}
                />
              <Route
                path="/register"
                element={
                  auth.autorizado ? <Navigate to="/" /> : <RegisterPage />
                }
                />
              <Route path="/cart" element={<Cart cuponPromo={"movistar"} />} />
              <Route path="/pizzas/:id" element={<Pizza />} />
              <Route path="/pagar" element={<Pagar />} />
            </Routes>
          </main>
          <Footer
            footerTextA={"© 2025 -"}
            footerLink={"Zombie Pizza"}
            footerTextB={"- Derechos reservados"}
            />
        </div>
            </CartProvider>
  );
}

export default App;
