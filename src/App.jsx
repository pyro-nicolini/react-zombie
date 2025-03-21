import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Pizza from "./pages/Pizza/p001";
import AllPizzas from "./components/AllPizzas";
import NotFound from "./pages/404";
import AuthProvider from "./context/AuthContext";

function App() {
  const [totalisimo, setTotalisimo] = useState(0);
  return (
        <AuthProvider>
    <div className="app">
        <Navbar total={totalisimo} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/allpizzas" element={<AllPizzas />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
            <Route 
              path="/login" 
              element={<LoginPage/>} 
            />
            <Route 
              path="/register" 
              element={<RegisterPage/>} 
            />
            <Route path="/cart" element={<Cart cuponPromo={"movistar"} setTotalisimo={setTotalisimo} />} />
            <Route path="/pizza/p001" element={<Pizza />} />
          </Routes>
        </main>
        <Footer footerTextA={"© 2025 -"} footerLink={"Zombie Pizza"} footerTextB={"- Derechos reservados"} />
      </div>
    </AuthProvider>
  );
}

export default App;