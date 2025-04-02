import { useState } from "react";
import Button from "../components/Button";
import zom1 from "../images/zom1.png";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

function RegisterPage() {
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const email = useInput("");
  const password = useInput("");
  const pass2 = useInput("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass2.value !== password.value) {
      return setError("Las contraseñas no coinciden");
    }

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await response.json();

    if (data?.error) {
      setExito("");
      setError(data.error);
      return;
    }
    setError("");
    setExito("Authentication successful!");

    localStorage.setItem("token", data.token);

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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
          {...email}
          className="flex"
          placeholder="Email"
        />
      </div>

      <div className="titleForm">
        <label>Contraseña:</label>
        <input
          type="password"
          name="pass"
          {...password}
          className="flex"
          placeholder="contraseña"
        />
      </div>
      <div className="titleForm">
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="pass2"
          {...pass2}
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
