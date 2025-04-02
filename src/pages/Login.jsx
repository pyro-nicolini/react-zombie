import { useContext, useState } from "react";
import Button from "../components/Button";
import zom2 from "../images/zom2.png";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useInput from "../hooks/useInput";

function LoginPage() {
  const email = useInput("");
  const password = useInput("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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

      setAuth({
        autorizado: true,
        autenticado: { email: data.email },
      });

      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/cart", { replace: true });
      }, 1500);
    } catch (e) {
      console.error("Error in login process:", e);
      setError("Error connecting to the server. Please try again.");
    } finally {
    }
  };

  // useEffect(() => {
  //   console.log('Autorizado: ', auth.autorizado);
  //   console.log('Logueado con:', auth.autenticado);
  // }, [auth]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="flex">
        <img src={zom2} alt="Zombie" className="zombie2" />
      </div>
      <h3>🔓 Iniciar Sesión</h3>
      {error && <p className="alert">{error}</p>}
      {exito && <p className="exito">{exito}</p>}
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
          name="password"
          {...password}
          className="flex"
          placeholder="Contraseña"
        />
      </div>
      <div className="column gap">
        <Button type="submit" className="logBtn" buttonText="Iniciar Sesión" />
        <Link to="/register" className="link">
          ¿Olvidaste tu contraseña?
        </Link>
        <Link to="/register" className="link">
          Crea una Cuenta
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
