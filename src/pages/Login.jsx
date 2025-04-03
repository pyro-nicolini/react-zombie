import { useContext, useState } from "react";
import Button from "../components/Button";
import zom2 from "../images/zom2.png";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

function LoginPage() {
  const {  auth, setAuth, handleSubmitLogin, error, exito, email, password, pass2, loading  } = useContext(userContext);

  // useEffect(() => {
  //   console.log('Autorizado: ', auth.autorizado);
  //   console.log('Logueado con:', auth.autenticado);
  // }, [auth]);


  const navigate = useNavigate();
  
  {loading && (
    <div className="column">
      <img src="../src/images/logo.png" className="spinner" alt="Cargando..." />
      <p className="white" style={{ position: "relative", top: "-1rem" }}>
        <strong>{"Cargando..."}</strong>
      </p>
    </div>
  )}
  {loading && (
    <div className="column">
      <img src="../src/images/logo.png" className="spinner" alt="Cargando..." />
      <p className="white" style={{ position: "relative", top: "-1rem" }}>
        <strong>{"Cargando..."}</strong>
      </p>
    </div>
  )}
  

  return (
    
    <form onSubmit={handleSubmitLogin} className="form">

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
