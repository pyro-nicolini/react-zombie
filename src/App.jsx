import "./App.css";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState, useEffect } from "react";

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
        {auth.autorizado ? (
          <div style={{ width: "100%" }}>
            {" "}
            <Cart cuponPromo={"movistar"} setTotalisimo={setTotalisimo} />
            &&
            <Home />
          </div>
        ) : (
          <div className="twins">
            <Register
              setAuth={setAuth}
              auth={auth}
              onChange={controlCambios}
              values={auth.input}
            />
            <Login
              setAuth={setAuth}
              auth={auth}
              onChange={controlCambios}
              values={auth.input}
            />
          </div>
        )}
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
