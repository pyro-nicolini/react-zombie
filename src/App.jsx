import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Button from "./components/Button";
import Footer from "./components/Footer";
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";
import { useState } from "react";
import Promos from "./components/Promos";

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
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <div className="twins">
                <LoginPage
                  setAuth={setAuth}
                  auth={auth}
                  onChange={controlCambios}
                  values={auth.input}
                />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="twins">
                <RegisterPage
                  setAuth={setAuth}
                  auth={auth}
                  onChange={controlCambios}
                  values={auth.input}
                />
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <Cart cuponPromo={"movistar"} setTotalisimo={setTotalisimo} />
            }
          />
          <Route path="/promos" element={<Promos />} />
          {/* Agrega más rutas aquí según lo necesites */}
        </Routes>
      </div>

      <Footer
        footerTextA={"© 2025 -"}
        footerLink={"Zombie Pizza"}
        footerTextB={"- Todos los derechos reservados"}
      />
    </div>
  );
}

export default App;
