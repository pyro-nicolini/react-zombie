import { useContext, useState } from "react";
import Button from "../components/Button";
import zom1 from "../images/zom1.png";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { userContext } from "../context/UserContext";

function RegisterPage() {
  const { auth, setAuth, handleSubmitRegister, error, exito, email, password, pass2, loading  } = useContext(userContext);
  const navigate = useNavigate();


  {loading && (
    <div className="column">
      <img src="../src/images/logo.png" className="spinner" alt="Cargando..." />
      <p className="white" style={{ position: "relative", top: "-10rem" }}>
        <strong>{"Cargando..."}</strong>
      </p>
    </div>
  )}
  
  return (
    <form onSubmit={handleSubmitRegister} className="form">
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
          value={email.value} onChange={email.onChange}
          className="flex"
          placeholder="Email"
        />
      </div>

      <div className="titleForm">
        <label>Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={password.value} onChange={password.onChange}
          className="flex"
          placeholder="contraseña"
        />
      </div>
      <div className="titleForm">
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="pass2"
          value={pass2.value} onChange={pass2.onChange}
          className="flex"
          placeholder="Re-ingresar contraseña"
        />
      </div>
      <div className="column space gap">
        <Button type="submit" className={`logBtn`} buttonText={"Registrar"} />
        <p style={{ fontSize: "0.9rem" }}>¿Ya tienes una cuenta?</p>
        <Link to="/login" className="link">
          {" "}
          Iniciar Sesión
        </Link>
      </div>
    </form>
  );
}

export default RegisterPage;
