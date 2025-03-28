import { useContext } from "react";
import Button from "../components/Button";
import zom1 from "../images/zom1.png";
import {AuthContext} from "../context/AuthContext";
import { controlCambios } from "../utilities/helper";
import { Link } from "react-router-dom";

function RegisterPage() {
  const { auth, setAuth } = useContext(AuthContext)
  const { email = "", pass = "", pass2 = "", error, exito } = auth.input || {};


  const validarRegistro = (e) => {
    e.preventDefault();

    if (!email?.trim() || !pass?.trim() || !pass2?.trim()) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Todos los campos son obligatorios",
          exito: "",
        },
      }));
    }

    if (pass !== pass2) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Las contraseñas no coinciden",
          exito: "",
        },
      }));
    }

    if (pass.length < 6) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "La contraseña debe tener al menos 6 caracteres",
          exito: "",
        },
      }));
    }

    const usuarioEncontrado = auth.users.find((user) => user.email === email);

    if (usuarioEncontrado) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "El email ya está registrado",
          exito: "",
        },
      }));
    }

    setAuth((prev) => ({
      ...prev,
      users: [...prev.users, { email, pass }],
      input: {
        email: "",
        pass: "",
        pass2: "",
        error: "",
        exito: "Usuario creado exitosamente",
      },
    }));

    alert(`${email} creado exitosamente`);
  };

  return (
    <form onSubmit={validarRegistro} className="form">
      <div className="flex">
        <img src={zom1} alt="" className="zombie2" />
      </div>
      <h3>🔐 Registrar Usuario</h3>
      {error && <div className="alert">{error}</div>}
      {exito && <div className="exito">{exito}</div>}

      <div className="titleForm">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => controlCambios(e, setAuth)}
          className="flex"
          placeholder="Email"
        />
      </div>

      <div className="titleForm">
        <label>Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={pass}
          onChange={(e) => controlCambios(e, setAuth)}
          className="flex"
          placeholder="contraseña"
        />
      </div>
      <div className="titleForm">
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="pass2"
          value={pass2}
          onChange={(e) => controlCambios(e, setAuth)}
          className="flex"
          placeholder="Re-ingresar contraseña"
        />
      </div>
      <div className="column space gap">
        <Button type="submit" className={`logBtn`} buttonText={"Registrar"} />
        <p style={{ fontSize: "0.9rem" }}>¿Ya tienes una cuenta?</p>
        <Link to="/login" className="link"> Iniciar Sesión
        </Link>

      </div>
    </form>
  );
}

export default RegisterPage;
