import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [auth, setAuth] = useState({
    autorizado: false,
    users: [{ email: "prueba@prueba.com", pass: "prueba@prueba.com" }],
    input: { email: "", pass: "", pass2: "", exito: "", error: "" },
    autenticado: null,
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
    <div
      className="bg-dark d-flex"
      style={{
        justifyContent: "space-between",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Navbar onLogout={cerrarSesion} auth={auth} />
      {auth.autorizado ? <Home /> : null}
      <div className="d-flex m-3 justify-content-center gap-5">
        {auth.autorizado ? null : (
          <>
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
          </>
        )}
      </div>
      <Footer footerText="© 2021 - Pizzería Mamma Mia! - Todos los derechos reservados" />
    </div>
  );
}

export default App;
