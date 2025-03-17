import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { useState } from "react";
import Profile from "./pages/Profile";
import Pizza from "./pages/Pizza/p001";
import AllPizzas from "./components/AllPizzas";
import NotFound from "./pages/404";

function App() {
  const [totalisimo, setTotalisimo] = useState(0);
  const [auth, setAuth] = useState({
    autorizado: true,
    users: [{ email: "prueba@prueba.com", pass: "prueba@prueba.com" }],
    input: { email: "", pass: "", pass2: "", exito: "", error: "" },
    autenticado: { email: "prueba@prueba.com" },
  });

  const controlCambios = (e) => {
    setAuth((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        [e.target.name]: e.target.value,
        error: "",
        exito: "",
      },
    }));
  };

  const cerrarSesion = () => {
    setAuth((prev) => ({
      ...prev,
      autorizado: false,
      autenticado: null,
      input: { email: "", pass: "", error: "", exito: "" },
    }));
  };

  return (
    <div className="app">
      <Navbar onLogout={cerrarSesion} auth={auth} total={totalisimo} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<Profile auth={auth} onLogout={cerrarSesion} />}
          />
          <Route path="/allpizzas" element={<AllPizzas />} />
          <Route path="/404" element={<NotFound />} />
          <Route
            path="/login"
            element={
                <LoginPage
                  setAuth={setAuth}
                  auth={auth}
                  onChange={controlCambios}
                  values={auth.input}
                />
            }
          />
          <Route
            path="/register"
            element={
                <RegisterPage
                  setAuth={setAuth}
                  auth={auth}
                  onChange={controlCambios}
                  values={auth.input}
                />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart cuponPromo={"movistar"} setTotalisimo={setTotalisimo} />
            }
          />
          <Route path="/pizza/p001" element={<Pizza />} />
        </Routes>
      </main>

      <Footer
        footerTextA={"© 2025 -"}
        footerLink={"Zombie Pizza"}
        footerTextB={"- Todos los derechos reservados"}
      />
    </div>
  );
}

export default App;
