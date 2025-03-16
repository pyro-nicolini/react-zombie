import { Link } from "react-router-dom"; // Importa Link
import logo from "../images/logo.png";
import Button from "./Button";

const Navbar = ({ onLogout, auth, total }) => {
  const { autorizado, autenticado } = auth || {};

  const email = autenticado ? autenticado.email : "";

  return (
    <div className="fixed">
      <div className="nav" id="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="navLogo" />
        </Link>
        {autorizado ? (
          <div className="account">
            <p>Perfil</p>
            <Button
              className="perfil"
              buttonText={`${email}`}
              buttonImg={" "}
            />
          </div>
        ) : null}
        <div className="menu">
          <Link to="/" className="navLink">
            {" "}
            {/* Usa Link para navegación */}
            <Button buttonText={"Inicio"} className="navLink" />
          </Link>
          {autorizado ? (
            <>
              <Link to="/" onClick={onLogout}>
                <Button className="navLink red" buttonText={"Cerrar Sesión"} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="navLink" buttonText={"Iniciar Sesión"} />
              </Link>
              <Link to="/register">
                <Button className="navLink" buttonText={"Registrar"} />
              </Link>
            </>
          )}
          <div className="info">
            <Link to="/promos">
              <Button className="navLink" buttonText={"Promos"} />
            </Link>
            <Link to="/cart">
              <Button className="navLink" buttonText={"Carrito"} />
            </Link>
          </div>
        </div>
        {autorizado ? (
          <Link to="/cart">
            <Button
              buttonText={`🛒 Total: ${Math.round(total * 1000).toLocaleString(
                "es-CL",
                {
                  style: "currency",
                  currency: "CLP",
                }
              )}`}
              className="total"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
